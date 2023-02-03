import { Card, CardContent, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const Task = ({ props, deleteTask }) => {
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
        <Typography variant="h6">{props.title}</Typography>
        <Typography
          variant="body1"
          sx={{ wordWrap: "break-word", textAlign: "left" }}
        >
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Task;
