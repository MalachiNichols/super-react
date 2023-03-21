import '../../App.css'
import { Card, CardContent, Button, Input, IconButton } from "@mui/material";
import { Scrollbars } from "react-scrollbars-custom";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateTask from "./CreateTask";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

const Column = ({
  title,
  id,
  deleteColumn,
  placement,
  oldTasks,
  currBoard,
}) => {
  if (oldTasks) {
    oldTasks.map((task) => {
      task.id = uuidv4();
    });
  }
  const [saveButton, setSaveButton] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState(oldTasks);
  const [newTitle, setNewTitle] = useState("");

  const titleChange = (e) => {
    setSaveButton(true);
    setNewTitle(e.target.value);
  };

  const saveTitle = async () => {
    setSaveButton(false);
    await fetch(`http://${process.env.REACT_APP_LOCALIP}:8080/api/columns/update`, {
      method: "PATCH",
      body: JSON.stringify({
        boardName: currBoard,
        column: {
          placement: placement,
        },
        newColumn: {
          name: newTitle,
          placement: placement,
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

  const saveTask = async (e) => {
    setCreateTask(false);
    setTasks(
      tasks.concat({
        name: newTask.title,
        description: newTask.description,
        column: placement,
        placement: tasks.length + 1,
        id: uuidv4(),
      })
    );
    await fetch(`http://${process.env.REACT_APP_LOCALIP}:8080/api/tasks/create`, {
      method: "POST",
      body: JSON.stringify({
        boardName: currBoard,
        task: {
          name: newTask.title,
          description: newTask.description,
          placement: tasks.length + 1,
          column: placement,
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

  const deleteTask = async (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    let deleteTask;
    tasks.map((x) => {
      if (x.id == id) {
        deleteTask = x;
      }
    });
    await fetch(`http://${process.env.REACT_APP_LOCALIP}:8080/api/tasks/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        boardName: currBoard,
        task: {
          placement: deleteTask.placement,
          column: placement,
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

  return (
    // <Scrollbars removeTrackXWhenNotUsed={true} style={{ minWidth: 250, minHeight: 500, scrollbarColor: 'red' }}>
      <Card
        align="center"
        sx={{
          minWidth: '13.vw',
          // maxWidth: 250,
          // height: 480,
          pt: 2,
          border: "1px solid #222222",
          overflowY: "auto",
          flex: 1,
          backgroundColor: "#F3EFE0",
        }}
        className='columnCard'
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
          {tasks[0] &&
            tasks.map((task) => (
              <Task
                deleteTask={deleteTask}
                props={{
                  title: task.name,
                  description: task.description,
                  id: task.id,
                  placement: task.placement,
                  column: placement,
                }}
                key={task.id}
                currBoard={currBoard}
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
    // </Scrollbars>
  );
};

export default Column;
