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

const fetchDataFromQuery = async (query) => {
    try {
        const response = await fetch('http://localhost:9000/query', {
          method: 'POST',
          body: JSON.stringify({ query }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    const insertDataFromQuery = async (query) => {
      try {
          console.log(query);
          fetch('http://localhost:9000/update-data', {
            method: 'PUT',
            body: JSON.stringify({ query }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          console.error('Error fetching data', error);
        }
      };

    const isImageUrl = (column) => {
      if(column === "images"){
        return true;
      }
      else {
        return false;
      }
    };
    

const DatabaseTable = ({ query }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ident, setIDs] = useState();
  const [changed, setChanged] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [pendingSaveRow, setPendingSaveRow] = useState(null);

  useEffect(() => {
    const reloadData = async () => {
      setLoading(true);
        setError(null);
        try {
          const result = await fetchDataFromQuery(query);
          //setData(result);
          const newRows = result.map(row => {
            return {
              id:randomId(),
              ingredient: row.ingredient,
              count: row.count,
              min: row.min,
              isNew: false,
            };
          });
          setRows(newRows);
          //setQuerys(query);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    }

    reloadData();
  }, [changed]);

  useEffect(() => {
    const updateRowInDatabase = async () => {
      //const updatedRow = rows.find(row => row.id === ident);
      if (pendingSaveRow) {
        try {

          if (pendingSaveRow.isNew) {
            await addNewIngredient(pendingSaveRow);
          } else {
            console.log(pendingSaveRow.count);
            await updateIngredient(pendingSaveRow);
          }
          //setChanged(!changed);
          // Add logic to re-fetch data or update the state with the new row data
        } catch (error) {
          console.error('Error updating row:', error);
        }
        setPendingSaveRow(null); // Reset the pending row
      }
    };
    updateRowInDatabase();
    setChanged(!changed);
  }, [pendingSaveRow]);

  const updateIngredient = async (ingredients) => {
    await insertDataFromQuery(`UPDATE inventory SET ingredient='${ingredients.ingredient}', count=${ingredients.count}, min=${ingredients.min} WHERE ingredient='${ingredients.ingredient}';`);
  };

  const addNewIngredient = async (ingredients) => {
    //fetchDataFromQuery(`UPDATE your_table_name SET ingredient='${ingredient.ingredient}', count=${ingredient.count}, min=${ingredient.min} WHERE id=${ingredient.id}`);
    await insertDataFromQuery(`INSERT INTO inventory (ingredient, count, min) VALUES ('${ingredients.ingredient}', ${ingredients.count}, ${ingredients.min});`);
    //const query = `UPDATE your_table_name SET ingredient='${ingredient.ingredient}', count=${ingredient.count}, min=${ingredient.min} WHERE id=${ingredient.id}`;
    //setChanged(!changed);
  };

  function EditToolbar(props) {
    const { setRows, setRowModesModel, setIDs} = props;
  
    const handleClick = () => {
      const new_id = randomId();
      setIDs(new_id);
      const newIngredient = { id: new_id, ingredient: '', count: '', min: '', isNew: true };
      setRows((oldRows) => [...oldRows, newIngredient]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newIngredient.id]: { mode: GridRowModes.Edit, fieldToFocus: 'ingredient' },
      }));
      //setChanged(!changed);
       // Call the function to add the new ingredient
       //updateIngredient(newIngredient);
  
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const updatedRow = rows.find(row => row.id === id);
    if (!updatedRow) {
      console.error('Row not found');
      return;
    }
  
    setIDs(id);
    
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

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

  const processRowUpdate = (newRow) => {
    //const updatedRow = newRow;
    //if(updatedRow.isNew === true) {
      if(newRow.isNew === true) {
        setPendingSaveRow(newRow);
      }
      console.log(newRow.min);
      const updatedRow = { ...newRow, isNew: false };

      if(newRow.isNew === false) {
        setPendingSaveRow(updatedRow);
      }
    // } else {
    //   updatedRow = { ...newRow, isNew: false };
    //   setPendingSaveRow(updatedRow);
    // }
    setChanged(!changed);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  

  const columns = [
    { field: 'ingredient', headerName: 'ingredient', width: 180, editable: true },
    {
      field: 'count',
      headerName: 'count',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'min',
      headerName: 'min',
      type: 'number',
      width: 180,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
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
          toolbar: { setRows, setRowModesModel, setIDs},
        }}
      />
    </Box>
  );
};

export default DatabaseTable;
