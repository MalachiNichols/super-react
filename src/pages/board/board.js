import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useId } from "react";
import Column from "./Column";
import { Box } from "@mui/system";
import CreateColumn from "./CreateColumn";
import { v4 as uuidv4 } from "uuid";

const Board = ({ id }) => {
  const [createColumn, setCreateColumn] = useState(false);
  const [columns, setColumns] = useState([
    { title: 1, id: uuidv4() },
    { title: 2, id: uuidv4() },
    { title: 3, id: uuidv4() },
    { title: 4, id: uuidv4() },
    { title: 5, id: uuidv4() },
  ]);

  const handleNewColumn = (title) => {
    setColumns(columns.concat({ title: title, id: uuidv4() }));
  };

  const deleteColumn = (id) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  return (
    <Box sx={{ width: 1262, mx: "auto" }}>
      <Grid
        container
        justifyContent="center"
        wrap="nowrap"
        sx={{
          border: "1px solid black",
          width: 1262,
          mx: "auto",
          mt: 5,
          overflowX: "auto",
          overflowY: "hidden",
          height: 500,
        }}
      >
        <Grid container wrap="nowrap" sx={{ mx: "auto", width: "100%" }}>
          {/* <Workspace /> */}
          {columns[0] &&
            columns.map((column) => (
              <Column
                title={column.title}
                id={column.id}
                key={column.id}
                deleteColumn={deleteColumn}
              />
            ))}
        </Grid>
      </Grid>
      {!createColumn && (
        <Button
          startIcon={<AddIcon />}
          sx={{ float: "right", mt: 1 }}
          onClick={() => {
            setCreateColumn(true);
          }}
        >
          COLUMN
        </Button>
      )}
      {createColumn && (
        <CreateColumn
          handleNewColumn={handleNewColumn}
          setCreateColumn={setCreateColumn}
        />
      )}
    </Box>
  );
};

export default Board;
