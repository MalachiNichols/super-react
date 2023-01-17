import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const About = () => {
  return (
    <Stack spacing={0}>
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
        <Typography variant="h3" color="white" align="center" sx={{ my: 2 }}>
          Meet the team
        </Typography>

        {/* Profiles start HERE!!!! */}
        {/* Jeanette  */}

        <Grid
          xs
          container
          columnSpacing={0}
          sx={{
            minWidth: "100%",
            minHeight: 600,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: 'center'
          }}
        >
          <Grid
            item
            sx={{
              maxWidth: 600,
              minHeight: 600,
              display: "flex",
              alignItems: "center",
              mx: 2,
            }}
          >
            <Card sx={{ width: 210 }}>
              <CardMedia
                sx={{ height: 200, width: 200, ml: "5px", mt: "5px" }}
                image="assets/Jay.png"
                title="Jeanette's pic"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Jeanette
                </Typography>
                {/* <img src="assets/Jay.png" class="card-img-top" alt="jeanette" /> */}
                <Typography variant="h5" class="card-title">
                  Project Leader
                </Typography>
                <Typography variant="body1" class="card-text">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facere, exercitationem non enim neque sequi eveniet possimus
                  laboriosam aliquid, obcaecati reprehenderit a voluptate
                  nostrum. Non adipisci laborum eligendi inventore blanditiis
                  sunt!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Malachi  */}

          <Grid
            item
            sx={{
              maxWidth: 600,
              minHeight: 600,
              display: "flex",
              alignItems: "center",
              mx: 2,
            }}
          >
            <Card sx={{ width: 210 }}>
              <CardMedia
                sx={{ height: 200, width: 200, ml: "5px", mt: "5px" }}
                image="assets/mal.jpg"
                title="Jeanette's pic"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Malachi
                </Typography>
                {/* <img src="assets/Jay.png" class="card-img-top" alt="jeanette" /> */}
                <Typography variant="h5" class="card-title">
                  Software Engineer
                </Typography>
                <Typography variant="body1" class="card-text">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facere, exercitationem non enim neque sequi eveniet possimus
                  laboriosam aliquid, obcaecati reprehenderit a voluptate
                  nostrum. Non adipisci laborum eligendi inventore blanditiis
                  sunt!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Ricky  */}

          <Grid
            item
            sx={{
              maxWidth: 600,
              minHeight: 600,
              display: "flex",
              alignItems: "center",
              mx: 2,
            }}
          >
            <Card sx={{ width: 210 }}>
              <CardMedia
                sx={{ height: 200, width: 200, ml: "5px", mt: "5px" }}
                image="assets/ric.png"
                title="Jeanette's pic"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Enrique
                </Typography>
                {/* <img src="assets/Jay.png" class="card-img-top" alt="jeanette" /> */}
                <Typography variant="h5" class="card-title">
                  Software Developer
                </Typography>
                <Typography variant="body1" class="card-text">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facere, exercitationem non enim neque sequi eveniet possimus
                  laboriosam aliquid, obcaecati reprehenderit a voluptate
                  nostrum. Non adipisci laborum eligendi inventore blanditiis
                  sunt!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Karl  */}

          <Grid
            item
            sx={{
              maxWidth: 600,
              minHeight: 600,
              display: "flex",
              alignItems: "center",
              mx: 2,
            }}
          >
            <Card sx={{ width: 210 }}>
              <CardMedia
                sx={{ height: 200, width: 200, ml: "5px", mt: "5px" }}
                image="assets/kar.png"
                title="Jeanette's pic"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Karl
                </Typography>
                {/* <img src="assets/Jay.png" class="card-img-top" alt="jeanette" /> */}
                <Typography variant="h5" class="card-title">
                  Project Leader
                </Typography>
                <Typography variant="body1" class="card-text">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facere, exercitationem non enim neque sequi eveniet possimus
                  laboriosam aliquid, obcaecati reprehenderit a voluptate
                  nostrum. Non adipisci laborum eligendi inventore blanditiis
                  sunt!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{ background: "linear-gradient(70deg,#007880, #b5bdbe)", py: 12 }}
        maxWidth={false}
      >
        <Box sx={{ maxWidth: "700px", mx: "auto", border: '2px solid purple', borderRadius: 2, py: 2 }}>
          <Typography variant="h4" align='center'>
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
    </Stack>
  );
};

export default About;
