import React from "react";
import { Container, Typography, Grid, Box } from '@mui/material'

const AboutUs = () => {
  return (
    <>
      <Container
        sx={{ background: '#222222' }}
        maxWidth={false}
      >
        <Typography variant="h3" color="#F3EFE0" align="center" sx={{ my: 2 }}>
          ABOUT US
        </Typography>
      </Container>
      <Container
        sx={{ background: '#222222' }}
        maxWidth={false}
      >
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
          <Grid item>
            <Box sx={{ width: 400 }}>
              <Typography variant="h5" color="#F3EFE0">
                We're in business to help you thrive
              </Typography>
              <Typography variant="body1" color="#F3EFE0" sx={{ mb: 2,
              mx: "auto",
              p: 5,
              borderRadius: 10,
              border: '2px solid #22A39F'}}>
                We believe great products start with great product management.
                That’s why we’ve built best practices right into our frameworks,
                processes, and tools, so your team becomes better at what they
                do while they do it. With Supernova, you only need one
                end-to-end product management platform to build great products
                with confidence.
              </Typography>
              {/* <Typography variant="body1" color="#F3EFE0">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestiae temporibus facere amet maxime obcaecati modi at fugiat
                sed cum nulla vitae velit ex, adipisci pariatur nihil repellat
                saepe quis itaque. Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Possimus aut ullam illum expedita omnis
                excepturi accusamus, modi provident inventore asperiores qui
                quasi aliquid quibusdam et sapiente quia odio porro autem.
              </Typography> */}
            </Box>
          </Grid>

          <Grid item>
            <img
              id="computerImg"
              src="assets/computer img.jpg"
              alt="computer"
              width="400"
              height="300"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AboutUs;
