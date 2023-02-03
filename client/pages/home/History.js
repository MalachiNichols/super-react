import React from "react";
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container";
import Box  from "@mui/system/Box";

const History = () => {
  return (
    <Container class="section" style={{ background: "aliceblue" }}>
      <Typography variant="h6" align="center">
        History of the Kanban Board
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
          In Japanese, “kanban” means “visual sign” or “visual card,” and the
          concept was originated by Toyota in the 1940s. The purpose of the
          design was to help improve manufacturing efficiency and create a
          transparent work process. Kanban boards have evolved since then, and
          are now useful tools for teams of all sizes in a variety of
          industries. Many current models utilize completely digital board
          platforms designed for quick collaboration, while others prefer a
          whiteboard with shared, handwritten notes. No matter what method is
          used to create a Kanban board, they all contain the same key
          components. Each is designed to provide a visual workflow that keeps
          the project timeline on track and follows the same core methodology.
        </Typography>
      </Box>
    </Container>
  );
};

export default History;
