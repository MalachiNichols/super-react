import { Card, CardContent, Button, Input } from "@mui/material";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CreateTask from "./CreateTask";
import Task from "./Task";

const Column = ({ props }) => {
  const [saveButton, setSaveButton] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);

  const titleChange = (e) => {
    setSaveButton(true);
  };

  const saveTitle = (e) => {
    setSaveButton(false);
  };

  const saveTask = (e) => {
    setCreateTask(false);
    setTasks(
      tasks.concat({
        title: newTask.title,
        description: newTask.description,
        id: tasks.length,
      })
    );
    console.log(tasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    console.log(tasks, id);
  };

  return (
    <Card
      align="center"
      sx={{
        minWidth: 250,
        pt: 2,
        border: "1px solid black",
        overflowY: "auto",
        flex: 1,
      }}
    >
      <CardContent>
        <Input
          defaultValue={props.colName}
          inputProps={{ style: { textAlign: "center" } }}
          onChange={titleChange}
        />
        {saveButton && (
          <Button
            variant="outlined"
            endIcon={<SaveIcon />}
            sx={{ mt: 1 }}
            onClick={saveTitle}
          >
            SAVE TITLE
          </Button>
        )}
        {tasks[0] &&
          tasks.map((task) => (
            <Task
              deleteTask={deleteTask}
              props={{
                title: task.title,
                description: task.description,
                id: task.id,
              }}
            />
          ))}
        {createTask && (
          <CreateTask
            newTask={newTask}
            setNewTask={setNewTask}
            saveTask={saveTask}
          />
        )}
      </CardContent>
      <Button
        startIcon={<AddIcon />}
        onClick={() => {
          setCreateTask(true);
        }}
      >
        Task
      </Button>
    </Card>
  );
};

export default Column;
