import {
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  Input,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";

const Task = ({ props, deleteTask, currBoard }) => {
  const [saveButton, setSaveButton] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [newDesc, setNewDesc] = useState(props.description);

  const titleChange = (e) => {
    setSaveButton(true);
    setNewTitle(e.target.value);
  };

  const descChange = (e) => {
    setSaveButton(true);
    setNewDesc(e.target.value);
  };

  const saveTask = async () => {
    setSaveButton(false);
    await fetch("http://localhost:8080/api/tasks/update", {
      method: "PATCH",
      body: JSON.stringify({
        boardName: currBoard,
        task: {
          placement: props.placement,
          column: props.column,
        },
        changedTask: {
          name: newTitle,
          description: newDesc,
          placement: props.placement,
          column: props.column,
          color: "",
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
    <Card sx={{ mt: 1, backgroundColor: '#222222' }}>
      <CardContent>
        <IconButton
          sx={{ mt: -2, float: "right", color: "#F3EFE0" }}
          onClick={() => {
            deleteTask(props.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
        <Input
          defaultValue={props.title}
          inputProps={{ style: { textAlign: "center" }, spellCheck: "false" }}
          onChange={titleChange}
          sx={{color: "#F3EFE0"}}
        />
        <TextField
          defaultValue={props.description}
          multiline
          inputProps={{ spellCheck: "false" }}
          maxRows={4}
          onChange={descChange}
          sx={{color: "#222222", backgroundColor: '#F3EFE0'}}
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
      </CardContent>
    </Card>
  );
};

export default Task;
