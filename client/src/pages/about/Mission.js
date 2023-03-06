import React from 'react'
import { Typography } from '@mui/material'
import { Container, Box } from '@mui/system'

const Mission = () => {
  return (
    <Container
        sx={{ background: '#222222', py: 12 }}
        maxWidth={false}
      >
        <Typography variant="h4" align="center" color="#F3EFE0">
            Our mission
          </Typography>
        <Box
          sx={{
            maxWidth: "700px",
            mx: "auto",
            border: "2px solid #22A39F",
            borderRadius: 2,
            py: 2,
          }}
        >
          
          <Typography variant="body1" align="center" color="#F3EFE0">
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