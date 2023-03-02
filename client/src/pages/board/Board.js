import { Button, Grid, TextField, Input, Typography, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState, useEffect } from "react";
import Column from "./Column";
import { Box } from "@mui/system";
import CreateColumn from "./CreateColumn";
import { v4 as uuidv4 } from "uuid";
import Workspace from "./Workspace";

const initState = [
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
];

const Board = ({ id }) => {
  const [createColumn, setCreateColumn] = useState(false);
  const [columns, setColumns] = useState([]);
  const [boards, setBoards] = useState([]);
  const [currBoard, setCurrBoard] = useState("");
  const [oldTasks, setOldTasks] = useState(initState);
  const [saveButton, setSaveButton] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const checkCredentials = async (e) => {
    await fetch("http://localhost:8080/api/boards/get", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        boardName: e,
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
              temp.push({
                title: data.columns[i].name,
                placement: data.columns[i].placement,
                id: uuidv4(),
              });
            }
            setColumns(temp);
            temp = JSON.parse(JSON.stringify(initState));
            data.tasks.map((task) => {
              temp[task.column - 1].push(task);
            });
            setOldTasks(temp);
            setCurrBoard(e);
            setNewTitle(e);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const findBoards = async () => {
    await fetch("http://localhost:8080/api/boards/getmultiple", {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          setBoards(data);
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    findBoards();
    // checkCredentials();
  }, []);

  const titleChange = (e) => {
    console.log(e.target.value);
    setSaveButton(true);
    setNewTitle(e.target.value);
  };

  const updateBoard = async () => {
    setSaveButton(false);
    await fetch("http://localhost:8080/api/boards/update", {
      method: "PATCH",
      body: JSON.stringify({
        boardName: currBoard,
        newBoardName: newTitle,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res);
        boards.map((board, i) => {
          if (board == currBoard) {
            let temp = boards.slice();
            temp[i] = newTitle;
            setBoards(temp);
            console.log("hey " + boards + i + " " + temp);
          }
        });
        setCurrBoard(newTitle);
      })
      .catch((err) => console.log(err));
  };

  const handleNewColumn = async (title) => {
    setColumns(columns.concat({ title: title, id: uuidv4() }));
    await fetch("http://localhost:8080/api/columns/add", {
      method: "POST",
      body: JSON.stringify({
        boardName: currBoard,
        column: {
          name: title,
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

  const deleteColumn = async (id) => {
    let deleteCol;
    columns.map((x) => {
      if (x.id == id) {
        deleteCol = x;
      }
    });
    console.log(deleteCol);
    setColumns(columns.filter((column) => column.id !== id));
    await fetch("http://localhost:8080/api/columns/delete", {
      method: "DELETE",
      body: JSON.stringify({
        boardName: currBoard,
        column: {
          placement: deleteCol.placement,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          flexDirection: "column",
          width: '600px',
          mx: 'auto'
        }}
      >
        {currBoard && (
          <Input
            defaultValue={newTitle}
            placeholder="Board Title"
            inputProps={{ style: { textAlign: "center", fontSize: "40px", color: '#F3EFE0' } }}
            onChange={titleChange}
            key={currBoard}
          />
        )}
        {saveButton && (
          <Button
            variant="outlined"
            endIcon={<SaveIcon />}
            sx={{ mt: 1, width: '150px', mx: 'auto' }}
            onClick={updateBoard}
            
          >
            SAVE BOARD
          </Button>
        )}
      </Box>
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
          <Workspace
            checkCredentials={checkCredentials}
            boards={boards}
            setBoards={setBoards}
            setCurrboard={setCurrBoard}
          />

          <Grid container wrap="nowrap" sx={{ mx: "auto", width: "100%" }}>
            {columns[0] &&
              columns.map((column, i) => {
                return (
                  <Column
                    title={column.title}
                    id={column.id}
                    key={column.id}
                    deleteColumn={deleteColumn}
                    oldTasks={oldTasks[i]}
                    placement={i + 1}
                    currBoard={currBoard}
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
    </>
  );
};

export default Board;
