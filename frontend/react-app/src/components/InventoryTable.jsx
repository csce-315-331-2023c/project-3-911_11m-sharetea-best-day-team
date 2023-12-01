import React, { useState, useEffect } from 'react';
import './InventoryTable.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';

/**
 * Thomas Zheng
 * @param {*} query the query to reload the page
 * @returns Inventory as rows
 */
const fetchDataFromQuery = async (query) => {
  try {
    //Make API call
    const response = await fetch('https://backend-heli.onrender.com/query', {
      method: 'POST',
      body: JSON.stringify({ query }), //Put the query in the body
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json(); //retreive response as a json
    return data;
  } catch (error) {
    console.error('Error fetching data', error);
  }
};

/**
 * Insert, Update, and Delete API call
 * @param {*} query 
 */
const insertDataFromQuery = async (query) => {
  try {
    //Make API call, no output
    fetch('https://backend-heli.onrender.com/update-data', {
      method: 'PUT',
      body: JSON.stringify({ query }), //Using PUT call
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching data', error);
  }
}

/**
 * Database Component for Inventory
 * @param {*} param0 query to run database component 
 * @returns table
 */
const InventoryTable = ({ query }) => {
  
  //Props to use
  const [changed, setChanged] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [pendingSaveRow, setPendingSaveRow] = useState(null);

  /**
   * Used to Reload the page with the SELECT query
   */
  useEffect(() => {
    const reloadData = async () => {
      try {
        const result = await fetchDataFromQuery(query);
        const newRows = result.map(row => { //Each row that is created needs an ID, ingredient, count, min, and isNew to false as they were already in the database
          return {
            id:randomId(),
            ingredient: row.ingredient,
            count: row.count,
            min: row.min,
            isNew: false,
          };
        });
        setRows(newRows); // set the new Rows
      } catch (err) {
        console.error('Error fetching data', err);
      }
    }

    reloadData();
  }, [changed]); //Reload when changes happen

  /** 
   * Used to either update or insert when a row is updated, Determined by whether the row isNew or not. New means insert, not New means update
  */
  useEffect(() => {
    const updateRowInDatabase = async () => {
      if (pendingSaveRow) {
        try {
          if (pendingSaveRow.isNew) {
            await addNewIngredient(pendingSaveRow);
          } else {
            await updateIngredient(pendingSaveRow);
          }
          // Add logic to re-fetch data or update the state with the new row data
        } catch (error) {
          console.error('Error updating row:', error);
        }
        setPendingSaveRow(null); // Reset the pending row
      }
    };
    updateRowInDatabase();
    setChanged(!changed); //Reload the page after finished with PUT request
  }, [pendingSaveRow]);

  /**
   * Update the Ingredient in the database
   * @param {*} ingredients the new ingredient to update
   */
  const updateIngredient = async (ingredients) => {
    await insertDataFromQuery(`UPDATE inventory SET ingredient='${ingredients.ingredient}', count=${ingredients.count}, min=${ingredients.min} WHERE ingredient='${ingredients.ingredient}';`);
  };

  /**
   * Add a new Ingredient to the database
   * @param {*} ingredients the new ingredient to insert
   */
  const addNewIngredient = async (ingredients) => {
    await insertDataFromQuery(`INSERT INTO inventory (ingredient, count, min) VALUES ('${ingredients.ingredient}', ${ingredients.count}, ${ingredients.min});`);
  };

  /**
   * Delete an ingredient from the database
   * @param {*} ingredients the ingredient to be deleted
   */
  const deleteIngredient = async (ingredients) => {
    await insertDataFromQuery(`DELETE FROM inventory WHERE ingredient='${ingredients.ingredient}';`);
  };

  /**
   * 
   * @param {*} props Used to change and configure whenever a new recod is added 
   * @returns 
   */
  function EditToolbar(props) {
    const { setRows, setRowModesModel} = props;
  
    const handleClick = () => {
      const new_id = randomId(); //With a new row, there is a new ID
      const newIngredient = { id: new_id, ingredient: '', count: '', min: '', isNew: true }; // Define row as New
      setRows((oldRows) => [...oldRows, newIngredient]); // Add new Row to the table
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newIngredient.id]: { mode: GridRowModes.Edit, fieldToFocus: 'ingredient' },
      })); 
    };
  
    //Button
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Ingredient
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  //Change row to editable
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  //Return Row to Visible
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  //Delete Row
  const handleDeleteClick = (id) => async () => {
    const deletingRow = rows.find((row) => row.id == id);
    await deleteIngredient(deletingRow);
    setRows(rows.filter((row) => row.id !== id));

  };

  //Cancel deleting Row
  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  //If the processed Row is new, then return isNew, otherwise, update
  const processRowUpdate = (newRow) => {
    if(newRow.isNew === true) {
      setPendingSaveRow(newRow);
    }
    const updatedRow = { ...newRow, isNew: false };
    if(newRow.isNew === false) {
      setPendingSaveRow(updatedRow);
    }
    setChanged(!changed);
    return updatedRow;
  };

  //Handle the row model change
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  

  //Columns for the table
  const columns = [
    { field: 'ingredient', headerName: 'ingredient', width: 300, editable: true },
    {
      field: 'count',
      headerName: 'count',
      type: 'number',
      width: 250,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'min',
      headerName: 'min',
      type: 'number',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 200,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  //Return
  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel},
        }}
      />
    </Box>
  );
};

export default InventoryTable;
