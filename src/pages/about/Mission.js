import React from 'react'
import { Typography } from '@mui/material'
import { Container, Box } from '@mui/system'

const Mission = () => {
  return (
    <Container
        sx={{ background: "linear-gradient(70deg,#007880, #b5bdbe)", py: 12 }}
        maxWidth={false}
      >
        <Box
          sx={{
            maxWidth: "700px",
            mx: "auto",
            border: "2px solid purple",
            borderRadius: 2,
            py: 2,
          }}
        >
          <Typography variant="h4" align="center">
            Our mission
          </Typography>
          <Typography variant="body1" align="center">
            We believe in teams. Yours and ours. Our mission, culture, and
            commitment to fostering a diverse, inclusive workplace let us build
            a product people love and stay true to ourselves. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Corporis, aperiam
            reprehenderit incidunt illo nemo nesciunt et doloribus quo quisquam
            minus expedita natus saepe eos sequi fugit, voluptatibus quas
            consequuntur. Eos. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Iure culpa obcaecati quos dolores? Fugit quam ab
            quidem nam officia omnis commodi architecto qui, incidunt et
            quibusdam libero fugiat, expedita adipisci?
          </Typography>
        </Box>
      </Container>
  )
}

export default Mission