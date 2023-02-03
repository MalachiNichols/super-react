import React from "react";
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container";
import Box  from "@mui/system/Box";

const Define = () => {
  return (
    <Container class="section" style={{ background: "aliceblue" }}>
      <Typography
        variant="h4"
        align="center"
        id="header1"
        sx={{ mb: 20, mt: 10 }}
      >
        BUILD YOUR OWN KANBAN BOARD
      </Typography>
      <Typography variant="h6" align="center">
        What is a Kanban board and how does it work?
      </Typography>
      <Box
        sx={{
          mb: 2,
          mx: "auto",
          width: 600,
          backgroundColor: "purple",
          p: 5,
          borderRadius: 10,
        }}
      >
        <Typography variant="body1" align="center">
          Kanban board is a tool that provides a visual system for teams to
          manage project tasks, workflows and communication. Kanban boards can
          help streamline assignments and avoid overload since project managers
          can quickly reference exactly where each step in the process currently
          resides.
        </Typography>
      </Box>
    </Container>
  );
};

export default Define;
