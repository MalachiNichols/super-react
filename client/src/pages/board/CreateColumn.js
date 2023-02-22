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
      <TextField size="small" label="Column Name" onChange={handleTextChange} />
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
