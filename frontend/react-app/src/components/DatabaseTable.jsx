import React, { useState, useEffect } from 'react';
import './DatabaseTable.css';
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
 * Fetches data from the API using the provided query.
 * @author Thomas Zheng
 * @param {string} query - The query to be sent to the API.
 * @returns {Promise} - A promise that resolves to the fetched data.
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
 * Inserts data into the database using an API call.
 * @author Thomas Zheng
 * @param {string} query - The query to be executed.
 * @returns {Promise<void>} - A promise that resolves when the data is successfully inserted.
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
 * Represents a database table component.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.query - The SELECT query used to fetch data for the table.
 * @returns {JSX.Element} - The DatabaseTable component.
 */
const DatabaseTable = ({ query }) => {
  
  //Props to use
  const [changed, setChanged] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [pendingSaveRow, setPendingSaveRow] = useState(null);

  /**
   * Used to Reload the page with the SELECT query
   */
  useEffect(() => {
    /**
     * Reloads the data by fetching it from the query and updating the rows in the database table.
     * Each row that is created needs an ID, ingredient, count, min, and isNew set to false as they were already in the database.
     * @returns {Promise<void>} A promise that resolves when the data is reloaded successfully.
     */
    const reloadData = async () => {
      try {
        const result = await fetchDataFromQuery(query);
        const newRows = result.map(row => {
          return {
            id: randomId(),
            ingredient: row.ingredient,
            count: row.count,
            min: row.min,
            isNew: false,
          };
        });
        setRows(newRows);
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
    /**
     * Updates a row in the database.
     * If the row is new, it adds a new ingredient.
     * Otherwise, it updates the existing ingredient.
     * After updating the row, it may fetch new data or update the state with the new row data.
     * @returns {Promise<void>} A promise that resolves when the row is successfully updated.
     * @throws {Error} If there is an error updating the row.
     */
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
   * Updates the ingredient in the inventory table.
   * @param {Object} ingredients - The ingredient object containing the updated values.
   * @param {string} ingredients.ingredient - The name of the ingredient.
   * @param {number} ingredients.count - The updated count of the ingredient.
   * @param {number} ingredients.min - The updated minimum threshold of the ingredient.
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   */
  const updateIngredient = async (ingredients) => {
    await insertDataFromQuery(`UPDATE inventory SET ingredient='${ingredients.ingredient}', count=${ingredients.count}, min=${ingredients.min} WHERE ingredient='${ingredients.ingredient}';`);
  };

  /**
   * Adds a new ingredient to the inventory table.
   * @param {Object} ingredients - The ingredient object containing ingredient, count, and min properties.
   * @returns {Promise<void>} - A promise that resolves when the data is successfully inserted.
   */
  const addNewIngredient = async (ingredients) => {
    await insertDataFromQuery(`INSERT INTO inventory (ingredient, count, min) VALUES ('${ingredients.ingredient}', ${ingredients.count}, ${ingredients.min});`);
  };

  /**
   * Deletes an ingredient from the inventory table.
   * @param {Object} ingredients - The ingredient object to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
   */
  const deleteIngredient = async (ingredients) => {
    await insertDataFromQuery(`DELETE FROM inventory WHERE ingredient='${ingredients.ingredient}';`);
  };


  /**
   * EditToolbar component for managing table rows.
   * @param {Object} props - The component props.
   * @param {Function} props.setRows - Function to set the table rows.
   * @param {Function} props.setRowModesModel - Function to set the row modes model.
   * @returns {JSX.Element} - The rendered EditToolbar component.
   */
  function EditToolbar(props) {
    const { setRows, setRowModesModel} = props;
  
    /**
     * Handles the click event for adding a new row to the table.
     */
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

  /**
   * Handles the event when row editing is stopped.
   * @param {object} params - The parameters for the event.
   * @param {object} event - The event object.
   */
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  //Change row to editable
  /**
   * Handles the click event for editing a row.
   * @param {string} id - The ID of the row to be edited.
   */
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  //Return Row to Visible
  /**
   * Handles the click event for saving a row.
   * @param {string} id - The ID of the row.
   */
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  //Delete Row
  /**
   * Handles the click event for deleting a row.
   * @param {number} id - The ID of the row to be deleted.
   * @returns {Promise<void>}
   */
  const handleDeleteClick = (id) => async () => {
    const deletingRow = rows.find((row) => row.id == id);
    await deleteIngredient(deletingRow);
    setRows(rows.filter((row) => row.id !== id));
  };

  //Cancel deleting Row
  /**
   * Handles the cancel click event for a specific row.
   * @param {string} id - The ID of the row.
   */
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
  /**
   * Process the row update and handle pending save row.
   * @param {Object} newRow - The new row object.
   * @returns {Object} - The updated row object.
   */
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
  /**
   * Handles the change of the row modes model.
   * @param {any} newRowModesModel - The new row modes model.
   */
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

export default DatabaseTable;
