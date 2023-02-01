import { Grid } from "@mui/material";
import React from "react";
import Column from "./Column";

const board = ({ id }) => {
  return (
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
      <Grid
        container
        wrap="nowrap"
        sx={{ mx: "auto", width: '100%' }}
      >
        {/* <Workspace /> */}
        <Column props={{ colName: "1" }} />
        <Column props={{ colName: "2" }} />
        <Column props={{ colName: "3" }} />
        <Column props={{ colName: "4" }} />
        <Column props={{ colName: "5" }} />
        {/* <Column props={{ colName: "7" }} /> */}
      </Grid>
    </Grid>
  );
};

export default board;
