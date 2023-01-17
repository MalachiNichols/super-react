import React from "react";
import { Container, Typography, Grid, Box } from '@mui/material'

const AboutUs = () => {
  return (
    <>
      <Container
        sx={{ background: "linear-gradient(70deg,#007880, #b5bdbe)" }}
        maxWidth={false}
      >
        <Typography variant="h3" color="white" align="center" sx={{ my: 2 }}>
          ABOUT US
        </Typography>
      </Container>
      <Container
        sx={{ background: "linear-gradient(70deg,#007880, #b5bdbe)" }}
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
              <Typography variant="h4">
                We're in business to help you thrive
              </Typography>
              <Typography variant="body1">
                We believe great products start with great product management.
                That’s why we’ve built best practices right into our frameworks,
                processes, and tools, so your team becomes better at what they
                do while they do it. With Supernova, you only need one
                end-to-end product management platform to build great products
                with confidence.
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestiae temporibus facere amet maxime obcaecati modi at fugiat
                sed cum nulla vitae velit ex, adipisci pariatur nihil repellat
                saepe quis itaque. Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Possimus aut ullam illum expedita omnis
                excepturi accusamus, modi provident inventore asperiores qui
                quasi aliquid quibusdam et sapiente quia odio porro autem.
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Typography variant="h5" id="developerHeader">
              We are developers
            </Typography>
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
