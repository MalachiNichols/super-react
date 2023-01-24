import React from "react";
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container";
import Box  from "@mui/system/Box";

const HowTo = () => {
  return (
    <Container class="middle section">
      <Typography variant="h6" align="center">
        How to use a Kanban Board?
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
          A Kanban board is a way to visualize work as it moves through stages.
          Typically, each board has a variety of columns like "To do," "Doing,"
          and "Done." Within each column, project tasks—called cards—capture
          individual to-dos. As work gets done, it moves through stages until it
          lands in the final column. Kanban boards are often used by engineering
          and development teams who use Agile project management, but any teams
          who want a visual collaboration tool can benefit from Kanban boards.
        </Typography>
      </Box>
    </Container>
  );
};

export default HowTo;
