import { Card, TextField, CardContent, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React from "react";

const CreateTask = ({ newTask, setNewTask, saveTask }) => {
  const setTaskTitle = (e) => {
    setNewTask({ ...newTask, title: e.target.value });
  };

  const setTaskDesc = (e) => {
    setNewTask({ ...newTask, description: e.target.value });
  };

  return (
    <Card sx={{ mt: 1, maxWidth: 200, backgroundColor: '#222222' }}>
      <CardContent>
        <TextField label="Title" sx={{backgroundColor: "#F3EFE0"}} onChange={setTaskTitle}></TextField>
        <TextField
          label="Description"
          multiline
          rows={2}
          maxRows={2}
          sx={{backgroundColor: "#F3EFE0", mt: 1}}
          onChange={setTaskDesc}
        ></TextField>
        <Button
          variant="outlined"
          endIcon={<SaveIcon />}
          sx={{ mt: 1, maxWidth: '90%' }}
          onClick={() => {
            saveTask();
          }}
        >
          SAVE TASK
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateTask;
