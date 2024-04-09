import React, { useState, useEffect } from 'react';
import {
  TextField, Button, List, ListItem, ListItemText, IconButton, ThemeProvider, createTheme, Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './App.css';

function App() {
  const [activityDetails, setActivityDetails] = useState({
    activity: '',
    date: null, 
    time: null, 
    place: '',
  });
  const [activitiesList, setActivitiesList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleChange = (event, field) => {
    setActivityDetails({ ...activityDetails, [field]: event.target.value });
  };

  const addActivity = () => {
    if (activityDetails.activity.trim() !== '') {
      setActivitiesList([...activitiesList, { ...activityDetails }]);
      setActivityDetails({ activity: '', date: null, time: null, place: '' });
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
    setActivityDetails({ activity: '', date: null, time: null, place: '' });
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
          <h1>Hej!</h1>
          <p>Wybierz dzisiejszą czynność. Co dzisiaj będziesz robić?</p>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                label="Czynność"
                variant="outlined"
                value={activityDetails.activity}
                onChange={(e) => handleChange(e, 'activity')}
                fullWidth
                sx={{ mb: 1 }}
              />
            </Grid>
            <Grid item xs={4}>
              <DatePicker
                label="Data"
                value={activityDetails.date}
                onChange={(newValue) => {
                  setActivityDetails({ ...activityDetails, date: newValue });
                }}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 1 }}/>}
              />
            </Grid>
            <Grid item xs={4}>
              <TimePicker
                label="Godzina"
                value={activityDetails.time}
                onChange={(newValue) => {
                  setActivityDetails({ ...activityDetails, time: newValue });
                }}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 1 }}/>}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Miejsce"
                variant="outlined"
                value={activityDetails.place}
                onChange={(e) => handleChange(e, 'place')}
                fullWidth
                sx={{ mb: 1 }}
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
                  secondary={`Data: ${item.date ? item.date.toLocaleDateString() : ''}, Godzina: ${item.time ? item.time.toLocaleTimeString() : ''},Miejsce: ${item.place}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
