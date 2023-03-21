import { Button, Input, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import { Box } from "@mui/system";

const CreateColumn = ({ handleNewColumn, setCreateColumn }) => {
  const [textValue, setTextValue] = useState("");

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <Box sx={{ float: "right", mt: 1 }}>
      <TextField
        size="small"
        label="Column Name"
        sx={{
          border: "2px solid #22A39F",
          backgroundColor: "#F3EFE0",
          color: "#222222",
        }}
        onChange={handleTextChange}
      />
      <Button
        startIcon={<SaveIcon />}
        onClick={() => {
          handleNewColumn(textValue);
          setCreateColumn(false);
        }}
      >
        SAVE COLUMN
      </Button>
    </Box>
  );
};

export default CreateColumn;
