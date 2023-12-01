import React, { useState, useEffect } from 'react';
import './InventoryTable.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
import { Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from '@mui/material';

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
const MenuTable = ({ query }) => {
  
  //Props to use
  const [changed, setChanged] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [pendingSaveRow, setPendingSaveRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  /**
   * Used to Reload the page with the SELECT query
   */
  useEffect(() => {
    const reloadData = async () => {
      try {
        const result = await fetchDataFromQuery(query);
        const newRows = result.map(row => { //Each row that is created needs an ID, ingredient, count, min, and isNew to false as they were already in the database
          return {
            id: randomId(),
            itemid: row.itemid,
            itemname: row.itemname,
            itemprice: row.itemprice,
            ingredients: row.ingredients,
            images: row.images,
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
      console.log(pendingSaveRow);
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
    const ingredientsArray = ingredients.ingredients.toString().split(',');
    const psqlArray = "{" + ingredientsArray.join(',') + "}";
    const query = `UPDATE pricelist SET itemid='${ingredients.itemid}', itemname='${ingredients.itemname}', itemprice=${ingredients.itemprice}, ingredients='${psqlArray}', images='${ingredients.images}' WHERE itemid='${ingredients.itemid}';`;
    console.log(query);
    await insertDataFromQuery(query);
  };

  /**
   * Add a new Ingredient to the database
   * @param {*} ingredients the new ingredient to insert
   */
  const addNewIngredient = async (ingredients) => {
    const ingredientsArray = ingredients.ingredients.split(',');

    // Format the array into a PostgreSQL array string
    const psqlArray = "{" + ingredientsArray.join(',') + "}";
    console.log(psqlArray);
    const query = `INSERT INTO pricelist (itemid, itemname, itemprice,ingredients,images) VALUES ('${ingredients.itemid}', '${ingredients.itemname}', ${ingredients.itemprice},'${psqlArray}','${ingredients.images}');`;
    console.log(query);
    await insertDataFromQuery(query);
  };

  /**
   * Delete an ingredient from the database
   * @param {*} ingredients the ingredient to be deleted
   */
  const deleteIngredient = async (ingredients) => {
    await insertDataFromQuery(`DELETE FROM pricelist WHERE itemname='${ingredients.itemname}';`);
  };

  /**
   * 
   * @param {*} props Used to change and configure whenever a new recod is added 
   * @returns 
   */
  function EditToolbar(props) {
    const { 
      setRows, 
      setRowModesModel,
      openDialog, 
      handleOpenDialog,
      handleCloseDialog,
      ingredients,
      selectedIngredients,
      handleIngredientChange,
      processRowUpdate,
      dialogMode,
      currentEditingId,
      setPendingSaveRow,
      setChanged
    } = props;
    
  
    const handleClick = () => {
      console.log(dialogMode);
      if (dialogMode === 'add') {
        // Adding a new item
        const randI = randomId();
        // handleOpenDialog(dialogMode, randI);
        // setOpenDialog(true);

        const newItem = { id: randI, itemid: '', itemname: '', itemprice: '', ingredients: selectedIngredients.join(','), images:'', isNew: true };
        setRows((oldRows) => [...oldRows, newItem]);
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [newItem.id]: { mode: GridRowModes.Edit, fieldToFocus: 'itemid' },
        }));
        //setChanged(!changed);
      } else if (dialogMode === 'edit') {
        // Updating an existing item
        const updatedRows = rows.map(row => {
          if (row.id === currentEditingId) {
            const editedRow = { ...row, ingredients: selectedIngredients.join(',') };
            console.log(editedRow);
            setPendingSaveRow(editedRow);
            setRowModesModel((oldModel) => ({
              ...oldModel,
              [editedRow.id]: { mode: GridRowModes.Edit, fieldToFocus: 'itemid' },
            }));
            return editedRow;
          }
          //console.log(row);
          return row;
        });
        setRows(updatedRows);
        setChanged(!changed);

        // const editedRow = rows.find((row) => row.id === currentEditingId);
        // console.log(editedRow);
        // setPendingSaveRow(editedRow);

      }
      setOpenDialog(false);
    }


  
    //Button
    return (
      <>
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Add Item
        </Button>
      </GridToolbarContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add New Item</DialogTitle>
      <DialogContent>
        {ingredients.map((ingredient) => (
          <FormControlLabel
            key={ingredient.id}
            control={
              <Checkbox
                checked={selectedIngredients.includes(ingredient.ingredient)}
                onChange={(event) => handleIngredientChange(event, ingredient.ingredient)}
              />
            }
            label={ingredient.ingredient}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleClick}>Add Item</Button>
      </DialogActions>
      </Dialog>
      </>
    );
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    // Fetch ingredients from inventory
    const fetchIngredients = async () => {
      const query = 'SELECT * FROM inventory ORDER BY ingredient'; // Replace with your actual query
      const result = await fetchDataFromQuery(query);
      const data = result.map(row => { //Each row that is created needs an ID, ingredient, count, min, and isNew to false as they were already in the database
        return {
          id:randomId(),
          ingredient: row.ingredient,
          count: row.count,
          min: row.min,
          isNew: false,
        };
      });
      setIngredients(data);
      //console.log(data);
    };

    fetchIngredients();
  }, [openDialog]);

  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentEditingId, setCurrentEditingId] = useState(null);

  const handleOpenDialog = (mode, id = null) => {
    setDialogMode('add');
    setCurrentEditingId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleIngredientChange = (event, ingredient) => {
    if (event.target.checked) {
      // Add the ingredient if it's not already in the selectedIngredients array
      setSelectedIngredients(prevIngredients => {
        if (!prevIngredients.includes(ingredient)) {
          return [...prevIngredients, ingredient];
        }
        return prevIngredients;
      });
    } else {
      // Remove the ingredient from the selectedIngredients array
      setSelectedIngredients(prevIngredients =>
        prevIngredients.filter(item => item !== ingredient)
      );
    }
  };

  const handleEditClick = (id, field) => () => {
    if (field === 'ingredients') {
      const row = rows.find(r => r.id === id);
      if (row) {
        setSelectedIngredients(row.ingredients.toString().split(','));
        setDialogMode('edit');
        setCurrentEditingId(id);
        setOpenDialog(true);
      }
    } else {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    }
  };

  //Return Row to Visible
  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setChanged(!changed);
  };

  //Delete Row
  const handleDeleteClick = (id) => async () => {
    const deletingRow = rows.find((row) => row.id === id);
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

  const handleOpen = (imgSrc) => {
    setSelectedImg(imgSrc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //If the processed Row is new, then return isNew, otherwise, update
  const processRowUpdate = (newRow) => {
    if(newRow.isNew === true) {
      setPendingSaveRow(newRow);
    }
    const updatedRow = { ...newRow, isNew: false };
    //console.log(newRow.ingredients);
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
    { field: 'itemid', headerName: 'itemid', width: 300, editable: true },
    {
      field: 'itemname',
      headerName: 'itemname',
      width: 250,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'itemprice',
      headerName: 'itemprice',
      type: 'number',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'ingredients',
      headerName: 'ingredients',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'images',
      headerName: 'images',
      width: 200,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      renderCell: (params) => <img height={20} width={20} src={params.value} onClick={() => handleOpen(params.value)}/>,
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
            onClick={handleEditClick(id, 'ingredients')} // Pass the field name here
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
          toolbar: { setRows, setRowModesModel,openDialog,handleOpenDialog,handleCloseDialog,ingredients,selectedIngredients,handleIngredientChange,processRowUpdate,dialogMode,currentEditingId,setPendingSaveRow,setChanged},
        }} 
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <IconButton onClick={handleClose} style={{ position: 'absolute', right: 0, top: 0 }}>
            <CloseIcon />
          </IconButton>
          <img src={selectedImg} alt="Full Size" style={{ maxWidth: '100%' }} />
        </DialogContent>
      </Dialog>
    </Box>
    
  );
};

export default MenuTable;
