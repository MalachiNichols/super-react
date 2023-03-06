import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Box from "@mui/system/Box";

const HowTo = () => {
  return (
    <Container
      sx={{ background: '#F3EFE0'}}
      maxWidth={false}
    >
      <Grid
        container
        align="center"
        columnSpacing={20}
        sx={{
          minWidth: "100%",
          minHeight: 600,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item>
          <img
            id="kanbanBoard"
            src="assets/collab.jpg"
            alt="computer"
            width="600"
            height="400"
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" align="center" color="#222222">
            How to use a Kanban Board?
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
            <Typography variant="body1" align="center" color="#222222">
              A Kanban board is a way to visualize work as it moves through
              stages. Typically, each board has a variety of columns like "To
              do," "Doing," and "Done." Within each column, project tasks—called
              cards—capture individual to-dos. As work gets done, it moves
              through stages until it lands in the final column. Kanban boards
              are often used by engineering and development teams who use Agile
              project management, but any teams who want a visual collaboration
              tool can benefit from Kanban boards.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowTo;
