import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect } from "react";
import Column from "./Column";
import { Box } from "@mui/system";
import CreateColumn from "./CreateColumn";
import { v4 as uuidv4 } from "uuid";

const Board = ({ id }) => {
  const [createColumn, setCreateColumn] = useState(false);
  const [columns, setColumns] = useState([]);
  const [oldTasks, setOldTasks] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  // const map = new Map([]);
  console.log(oldTasks[1] + "hey dummy");

  const checkCredentials = async () => {
    await fetch("http://localhost:8080/api/boards/get", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        boardName: "Your 1st Board",
      }),
    })
      .then((res) => {
        if (res.status == 401) {
          alert("Please sign in!");
        } else if (res.status == 400) {
          alert("Board does not exist");
        } else {
          res.json().then((data) => {
            let temp = [];
            for (let i = 0; i < data.columns.length; i++) {
              temp.push({ title: data.columns[i].name, id: uuidv4() });
            }
            data.tasks.map((task) => {
              setOldTasks( prevState => {
                const copy = prevState.slice()
                copy[task.placement - 1].push(task)
                return copy
              });
              console.log("oldTasks " + JSON.stringify(oldTasks[0]));
            });
            setColumns(temp);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkCredentials();
  }, []);

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
          {columns[0] &&
            columns.map((column, i) => {
              console.log("yoooo " + oldTasks[i] + i);
              return (
                <Column
                  title={column.title}
                  id={column.id}
                  key={column.id}
                  deleteColumn={deleteColumn}
                  oldTasks={oldTasks[i]}
                  placement={i + 1}
                />
              );
            })}
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
