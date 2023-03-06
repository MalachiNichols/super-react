import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Box from "@mui/system/Box";

const Define = () => {
  return (
    <Container
      sx={{ background: '#222222'}}
      maxWidth={false}
    >
      <Typography
        variant="h4"
        align="center"
        id="header1"
        color="#F3EFE0"
        sx={{ mb: 5, mt: 10 }}
      >
        BUILD YOUR OWN KANBAN BOARD
      </Typography>

      <Grid
        container
        align="center"
        columnSpacing={10}
        sx={{
          minWidth: "100%",
          minHeight: 600,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item >
          <Typography variant="h6" align="center" color="#F3EFE0">
            What is a Kanban board and how does it work?
          </Typography>
          <Box
            sx={{
              mb: 2,
              mx: "auto",
              width: 400,
              p: 5,
              borderRadius: 10,
              border: '2px solid #22A39F'
            }}
          >
            <Typography variant="body1" align="center" color="#F3EFE0">
              Kanban board is a tool that provides a visual system for teams to
              manage project tasks, workflows and communication. Kanban boards
              can help streamline assignments and avoid overload since project
              managers can quickly reference exactly where each step in the
              process a task currently resides.
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <img
            id="kanbanBoard"
            src="assets/kanban-ex.png"
            alt="computer"
            width="900"
            height="400"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Define;
