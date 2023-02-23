import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useState } from "react";

const Workspace = ({ checkCredentials, boards }) => {

  return (
    <Box
      width={250}
      height={495}
      border="2px solid black"
      sx={{ position: "absolute", left: "2%" }}
    >
      {/* <Typography>workspaces</Typography>
        Workspace */}
      <List>{boards.map(board => (
        <ListItem button>
            <ListItemText primary={board} onClick={e => {
                checkCredentials(e)}}/>
        </ListItem>
      ))}</List>
    </Box>
  );
};

export default Workspace;
