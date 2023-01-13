import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container";
import Box  from "@mui/system/Box";


const Home = () => {
  return (
    <Stack spacing={3}>
      <Container class="section" style={{ background: 'aliceblue' }}>
        <Typography variant='h4'  align='center' id="header1" sx={{mb: 20, mt: 10}}>BUILD YOUR OWN KANBAN BOARD</Typography>
        <Typography variant='h6' align='center'>
          What is a Kanban board and how does it work?
        </Typography>
        <Box sx={{ mb: 2, mx: 'auto', width: 600, backgroundColor: 'purple', p: 5, borderRadius: 10}}>
          <Typography variant='body1' align='center' >
            Kanban board is a tool that provides a visual system for teams
            to manage project tasks, workflows and communication. Kanban
            boards can help streamline assignments and avoid overload since
            project managers can quickly reference exactly where each step
            in the process currently resides.
          </Typography>
        </Box>
        
      </Container>
      <hr />
      <Container class="middle section">
        <Typography variant='h6' align='center'>How to use a Kanban Board?</Typography>
        <Box sx={{ mb: 2, mx: 'auto', width: 600, backgroundColor: 'purple', p: 5, borderRadius: 10}}>
          <Typography variant='body1' align='center'>
            A Kanban board is a way to visualize work as it moves through
            stages. Typically, each board has a variety of columns like "To
            do," "Doing," and "Done." Within each column, project
            tasks—called cards—capture individual to-dos. As work gets done,
            it moves through stages until it lands in the final column.
            Kanban boards are often used by engineering and development
            teams who use Agile project management, but any teams who want a
            visual collaboration tool can benefit from Kanban boards.
          </Typography>
        </Box>
      </Container>
      <hr />
      <Container class="section" style={{background: 'aliceblue'}}>
        <Typography variant='h6' align='center'>History of the Kanban Board</Typography>
        <Box sx={{ mb: 2, mx: 'auto', width: 600, backgroundColor: 'purple', p: 5, borderRadius: 10}}>
          <Typography variant='body1' align='center'>
            In Japanese, “kanban” means “visual sign” or “visual card,” and
            the concept was originated by Toyota in the 1940s. The purpose
            of the design was to help improve manufacturing efficiency and
            create a transparent work process. Kanban boards have evolved
            since then, and are now useful tools for teams of all sizes in a
            variety of industries. Many current models utilize completely
            digital board platforms designed for quick collaboration, while
            others prefer a whiteboard with shared, handwritten notes. No
            matter what method is used to create a Kanban board, they all
            contain the same key components. Each is designed to provide a
            visual workflow that keeps the project timeline on track and
            follows the same core methodology.
          </Typography>
          </Box>
      </Container>
    </Stack>
  );
};

export default Home;
