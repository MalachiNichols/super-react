import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateBoard from "./CreateBoard";
import React, { useState } from "react";

const Workspace = ({ checkCredentials, boards, setBoards }) => {
  const [createBoard, setCreateBoard] = useState(false);

  const handleNewBoard = async (title) => {
    setBoards([...boards, title]);
    await fetch("http://localhost:8080/api/boards/save", {
      method: "POST",
      body: JSON.stringify({
        boardName: title,
        columns: [
          {
            name: "BackLog",
            placement: 1,
          },
          {
            name: "In Progress",
            placement: 2,
          },
          {
            name: "Peer Review",
            placement: 3,
          },
          {
            name: "In Test",
            placement: 4,
          },
          {
            name: "Done",
            placement: 5,
          },
        ],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  };

  return (
    <Box
      width={250}
      height={495}
      border="2px solid black"
      sx={{ position: "absolute", left: "2%" }}
    >
      {/* <Typography>workspaces</Typography>
        Workspace */}
      <List>
        {boards.map((board) => (
          <ListItem button>
            <ListItemText
              primary={board}
              onClick={(e) => {
                checkCredentials(e);
              }}
            />
          </ListItem>
        ))}
      </List>
      {createBoard && <CreateBoard handleNewBoard={handleNewBoard} setCreateBoard={setCreateBoard}/>}
      <Button
        sx={{ width: 100, ml: "75px" }}
        startIcon={<AddIcon />}
        onClick={() => {
          setCreateBoard(true);
        }}
      >
        Board
      </Button>
    </Box>
  );
};

export default Workspace;
