import { Input, TextField, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";

const CreateBoard = ({ handleNewBoard, setCreateBoard}) => {
  const [textValue, setTextValue] = useState("");

  return (
    <>
      <TextField
        size="small"
        label="Board Name"
        onChange={(e) => {
          setTextValue(e.target.value);
        }}
      >
        CreateBoard
      </TextField>
      <Button
        startIcon={<SaveIcon />}
        onClick={() => {
          handleNewBoard(textValue);
          setCreateBoard(false);
        }}
      >
        SAVE BOARD
      </Button>
    </>
  );
};

export default CreateBoard;
