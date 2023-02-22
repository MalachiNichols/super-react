import { Button, Card, CardContent, IconButton, Typography, Input, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";

const Task = ({ props, deleteTask }) => {

  const [saveButton, setSaveButton] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title)
  const [newDesc, setNewDesc] = useState(props.description)

  const titleChange = (e) => {
    setSaveButton(true)
    setNewTitle(e.target.value)
  }

  const descChange = (e) => {
    setSaveButton(true)
    setNewDesc(e.target.value)
  }

  const saveTask = async () => {
    setSaveButton(false)
    await fetch('http://localhost:8080/api/tasks/update', {
      method: 'PATCH',
      body: JSON.stringify({
        boardName: "Your 1st Board",
        task: {
          placement: props.placement,
          column: props.placement
        },
        changedTask: {
          name: newTitle,
          description: newDesc,
          placement: props.placement,
          column: props.column,
          color: ''
        }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then(res => {
      console.log(res)
    })
    .catch((err) => console.log(err));
  }

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <IconButton
          sx={{ mt: -2, float: "right" }}
          onClick={() => {
            deleteTask(props.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
        <Input
          defaultValue={props.title}
          inputProps={{ style: { textAlign: "center" } }}
          onChange={titleChange}
        />
        <TextField
          defaultValue={props.description}
          multiline
          maxRows={4}
          onChange={descChange}
        />
        {saveButton && (
          <Button
            variant="outlined"
            endIcon={<SaveIcon />}
            sx={{ mt: 1 }}
            onClick={saveTask}
          >
            SAVE TASK
          </Button>
        )}
        {/* <Typography variant="h6">{props.title}</Typography>
        <Typography
          variant="body1"
          sx={{ wordWrap: "break-word", textAlign: "left" }}
        >
          {props.description}
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default Task;
