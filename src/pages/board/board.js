import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import Column from "./Column";
import { Box } from "@mui/system";
import CreateColumn from "./CreateColumn";

const Board = ({ id }) => {
  const [createColumn, setCreateColumn] = useState(false);
  // const [newColumn, setNewColumn] = useState({});
  const [columns, setColumns] = useState([{title: 1, id: 0}, {title: 2, id: 1}, {title: 3, id: 2}, {title: 4, id: 3}, {title: 5, id: 4} ])

  const handleNewColumn = (title) => {
    setColumns(
      columns.concat({title: title, id: columns.length})
    )
  }

  const deleteColumn = (id) => {
    console.log(id + ' yo')
    setColumns(columns.filter((column) => column.id !== id));
    console.log(columns)
  }

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
