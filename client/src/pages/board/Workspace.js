import {
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import CreateBoard from "./CreateBoard";
import React, { useState } from "react";

const Workspace = ({ checkCredentials, boards, setBoards, setCurrBoard }) => {
  const [createBoard, setCreateBoard] = useState(false);

  const handleNewBoard = async (title) => {

    if(boards.includes(title)) {
      let i = 1
      while(boards.includes(title + i)) {
        i++
      }
      title = title + i
    }

    setBoards([...boards, title]);
    await fetch(`https://${process.env.REACT_APP_LOCALIP}/api/boards/save`, {
      method: "POST",
      body: JSON.stringify({
        boardName: title,
        columns: [
          {
            name: "Backlog",
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const deleteBoard = async (title) => {
    await fetch(`https://${process.env.REACT_APP_LOCALIP}/api/boards/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        boardName: title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res);
        setBoards(boards.filter((board) => board != title));
        boards[0] == title ? checkCredentials(boards[1]) : checkCredentials(boards[0])
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container
      width='13.14vw'
      height='53.8vh'
      sx={{
        position: "absolute",
        left: "2%",
        backgroundColor: "#F3EFE0",
        border: "2px solid #22A39F",
        width: '13.14vw',
        height: '53.8vh',
        overflow: "scroll",
      }}
    >
      <List>
        {boards.map((board) => (
          <Container sx={{ width: '10.42vw'}} key={uuidv4()}>
          <ListItem button 
          sx={{ml: -4}}
          onClick={(e) => {
            let data = e.currentTarget.firstChild.innerText;
            console.dir(e.currentTarget) 
            console.log('data is ' + data)
            checkCredentials(data);
          }}>
            <ListItemText
              primary={board}
              // onClick={(e) => {
              //   let data = e.target.innerHTML;
              //   console.log('e is ' + e + 'target is ' + e.target + 'data is ' + data)
              //   checkCredentials(data);
              // }}
            />
            
          </ListItem>
          <div
              onClick={(e) => {
                deleteBoard(
                  e.currentTarget.previousElementSibling.firstChild.innerText
                );
              }}
            >
              <IconButton sx={{ mt: -5.5, float: "right" }}>
                <DeleteIcon />
              </IconButton>
            </div>
          </Container>
        ))}
      </List>
      {createBoard && (
        <CreateBoard
          handleNewBoard={handleNewBoard}
          setCreateBoard={setCreateBoard}
        />
      )}
      <Button
        sx={{ width: '3.85vw', ml: "3.84vw" }}
        startIcon={<AddIcon />}
        onClick={() => {
          setCreateBoard(true);
        }}
      >
        Board
      </Button>
    </Container>
  );
};

export default Workspace;
