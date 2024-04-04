import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Input, ThemeProvider, createTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save'; 
import './App.css';

function App() {
  const [activity, setActivity] = useState('');
  const [activitiesList, setActivitiesList] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 
  const [editedActivity, setEditedActivity] = useState(''); 

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  const addActivity = () => {
    if (activity.trim() !== '') {
      setActivitiesList([...activitiesList, activity.trim()]);
      setActivity('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && editIndex === null) {
      addActivity();
    }
  };

  const removeActivity = (index) => {
    const newActivitiesList = activitiesList.filter((_, idx) => idx !== index);
    setActivitiesList(newActivitiesList);
  };
  
  const handleEditKeyPress = (event) => {
    if (event.key === 'Enter') {
      saveEdit();
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedActivity(activitiesList[index]);
  };

  const handleEditChange = (event) => {
    setEditedActivity(event.target.value);
  };

  const saveEdit = () => {
    if (editedActivity.trim() === '') {
     const isDeleteConfirmed = window.confirm('Czy na pewno chcesz usunąć tę czynność?');
     if (isDeleteConfirmed) {
       const updatedActivities = activitiesList.filter((_, idx) => idx !== editIndex);
       setActivitiesList(updatedActivities); } 
   } else { 
     const updatedActivities = [...activitiesList];
     updatedActivities[editIndex] = editedActivity.trim();
     setActivitiesList(updatedActivities);}
   setEditIndex(null);
   setEditedActivity('');
 };
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <>
        <h1>Hej!</h1>
        <p>Wybierz dzisiejszą czynność. Co dzisiaj będziesz robić?</p>
        <TextField
          label="Wpisz czynność..."
          variant="outlined"
          value={activity}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          onClick={addActivity}
          style={{ marginBottom: '20px' }}
          disabled={editIndex !== null} 
        >
          Dodaj
        </Button>
        <List>
          {activitiesList.map((item, index) => (
            <ListItem key={index}>
              {editIndex === index ? (
                <Input
                  value={editedActivity}
                  onChange={handleEditChange}
                  onKeyPress={handleEditKeyPress} 
                  fullWidth
                  autoFocus
                  endAdornment={
                    <IconButton onClick={saveEdit}>
                      <SaveIcon />
                    </IconButton>
                  }
                />
              ) : (
                <>
                  <ListItemText primary={item} />
                  <IconButton edge="end" aria-label="edit" onClick={() => startEdit(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => removeActivity(index)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </>
    </ThemeProvider>
  );
}

export default App;
