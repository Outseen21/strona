import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, ThemeProvider, createTheme, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import './App.css';

function App() {
  const [activityDetails, setActivityDetails] = useState({
    activity: '',
    date: '',
    place: '',
    time: '',
  });
  const [activitiesList, setActivitiesList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1); 
  const handleChange = (event, field) => {
    setActivityDetails({ ...activityDetails, [field]: event.target.value });
  };

  const addActivity = () => {
    if (activityDetails.activity.trim() !== '') {
      setActivitiesList([...activitiesList, { ...activityDetails }]);
      setActivityDetails({ activity: '', date: '', place: '', time: '' }); // Reset input fields
    }
  };

  const removeActivity = (index) => {
    setActivitiesList(activitiesList.filter((_, idx) => idx !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setActivityDetails({ ...activitiesList[index] });
  };

  const saveEdit = () => {
    if (!activityDetails.activity.trim() && !window.confirm('Czy na pewno chcesz usunąć tę czynność?')) {
      return;
    }
    const updatedActivities = [...activitiesList];
    updatedActivities[editIndex] = { ...activityDetails };
    setActivitiesList(updatedActivities);
    setEditIndex(-1);
    setActivityDetails({ activity: '', date: '', place: '', time: '' });
  };

  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem('activitiesList'));
    if (storedActivities) {
      setActivitiesList(storedActivities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('activitiesList', JSON.stringify(activitiesList));
  }, [activitiesList]);

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <h1>Hej!</h1>
      <p>Wybierz dzisiejszą czynność. Co dzisiaj będziesz robić?</p>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Czynność"
            variant="outlined"
            value={activityDetails.activity}
            onChange={(e) => handleChange(e, 'activity')}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Data"
            variant="outlined"
            value={activityDetails.date}
            onChange={(e) => handleChange(e, 'date')}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Miejsce"
            variant="outlined"
            value={activityDetails.place}
            onChange={(e) => handleChange(e, 'place')}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Godzina"
            variant="outlined"
            value={activityDetails.time}
            onChange={(e) => handleChange(e, 'time')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={editIndex === -1 ? addActivity : saveEdit}
            className="addButton"
          >
            {editIndex === -1 ? 'Dodaj' : 'Zapisz'}
          </Button>
        </Grid>
      </Grid>
      <List>
        {activitiesList.map((item, index) => (
          <ListItem key={index} secondaryAction={
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => startEdit(index)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => removeActivity(index)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText
              primary={item.activity}
              secondary={`Data: ${item.date}, Miejsce: ${item.place}, Godzina: ${item.time}`}
            />
          </ListItem>
        ))}
      </List>
    </ThemeProvider>
  );
}

export default App;
