import { Typography, Card, CardContent, CardMedia, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const About = () => {
  return (
    <Container sx={{ background: 'linear-gradient(70deg,#007880, #b5bdbe)' }} maxWidth={false}>
      <Typography variant="h3" sx={{ ml: 44 }}>ABOUT US</Typography>
      <Container>
        <div class="container">
          <div class="row">
            <div class="col-lg-6 mt-5" id="thriveHeader">
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
            </div>

            <div class="col-lg-5 offset-lg-1 my-5">
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
            </div>
          </div>
        </div>
      </Container>
      <Typography variant="h3" color="color: azure;">
        Meet the team
      </Typography>

    {/* Profiles start HERE!!!! */}
    {/* Jeanette  */}

      <Grid xs container columnSpacing={8} sx={{ mx: "auto", width: 1035 }}>
        <Grid item>
          <Card sx={{ width: 210 }}>
            <CardMedia
              sx={{ height: 200, width: 200, ml: '5px', mt: '5px' }}
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
                laboriosam aliquid, obcaecati reprehenderit a voluptate nostrum.
                Non adipisci laborum eligendi inventore blanditiis sunt!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Malachi  */}
      
        <Grid item class="card h-100">
        <Card sx={{ width: 210 }}>
            <CardMedia
              sx={{ height: 200, width: 200, ml: '5px', mt: '5px' }}
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
                laboriosam aliquid, obcaecati reprehenderit a voluptate nostrum.
                Non adipisci laborum eligendi inventore blanditiis sunt!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      {/* Ricky  */}

        <Grid item class="card h-100">
        <Card sx={{ width: 210 }}>
            <CardMedia
              sx={{ height: 200, width: 200, ml: '5px', mt: '5px' }}
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
                laboriosam aliquid, obcaecati reprehenderit a voluptate nostrum.
                Non adipisci laborum eligendi inventore blanditiis sunt!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      {/* Karl  */}

        <Grid item class="card h-100">
        <Card sx={{ width: 210 }}>
            <CardMedia
              sx={{ height: 200, width: 200, ml: '5px', mt: '5px' }}
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
                laboriosam aliquid, obcaecati reprehenderit a voluptate nostrum.
                Non adipisci laborum eligendi inventore blanditiis sunt!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid class="row">
            <Typography variant="h4">Our mission</Typography>
            <Typography variant="body1">
              We believe in teams. Yours and ours. Our mission, culture, and
              commitment to fostering a diverse, inclusive workplace let us
              build a product people love and stay true to ourselves. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Corporis,
              aperiam reprehenderit incidunt illo nemo nesciunt et doloribus quo
              quisquam minus expedita natus saepe eos sequi fugit, voluptatibus
              quas consequuntur. Eos. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Iure culpa obcaecati quos dolores? Fugit quam ab
              quidem nam officia omnis commodi architecto qui, incidunt et
              quibusdam libero fugiat, expedita adipisci?
            </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
