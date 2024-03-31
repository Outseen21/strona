import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, ThemeProvider, createTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

function App() {
  const [activity, setActivity] = useState('');
  const [activitiesList, setActivitiesList] = useState([]);

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
    if (event.key === 'Enter') {
      addActivity();
    }
  };

  const removeActivity = (index) => {
    const newActivitiesList = activitiesList.filter((_, idx) => idx !== index);
    setActivitiesList(newActivitiesList);
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
        >
          Dodaj
        </Button>
        <List>
          {activitiesList.map((activity, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeActivity(index)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={activity} />
            </ListItem>
          ))}
        </List>
      </>
    </ThemeProvider>
  );
}

export default App;
