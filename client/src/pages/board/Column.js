import { Card, CardContent, Button, Input, IconButton } from "@mui/material";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTask from "./CreateTask";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

const Column = ({ title, id, deleteColumn, placement, oldTasks }) => {
  if(oldTasks){
    oldTasks.map(task => {
      task.id = uuidv4()
    })
  }
  const [saveButton, setSaveButton] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState(oldTasks);
  // console.log(oldTasks)

  const titleChange = (e) => {
    setSaveButton(true);
  };

  const saveTitle = (e) => {
    setSaveButton(false);
  };

  const saveTask = async (e) => {
    setCreateTask(false);
    setTasks(
      tasks.concat({
        name: newTask.title,
        description: newTask.description,
        id: uuidv4(),
      })
    );
    await fetch("http://localhost:8080/api/tasks/create", {
      method: "POST",
      body: JSON.stringify({
        boardName: "Your 1st Board",
        task: {
          name: newTask.title,
          description: newTask.description,
          column: 1,
          placement: tasks.length + 1,
          column: placement
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
      <IconButton
        sx={{ mt: -2, float: "right" }}
        onClick={() => {
          deleteColumn(id);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <CardContent>
        <Input
          defaultValue={title}
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
        {console.log(JSON.stringify(tasks))}
        {tasks[0] &&
          tasks.map((task) => (
            <Task
              deleteTask={deleteTask}
              props={{
                title: task.name,
                description: task.description,
                id: task.id,
              }}
              key={task.id}
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
