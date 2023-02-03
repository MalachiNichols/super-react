import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Container } from '@mui/system'
import TeamMember from './TeamMember'

const Team = () => {
  return (
    <Container
        sx={{ background: "linear-gradient(70deg,#007880, #b5bdbe)" }}
        maxWidth={false}
      >
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
            alignItems: "center",
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
            <TeamMember
              props={{
                img: "assets/Jay.png",
                title: "Jeanette's pic",
                name: "Jeanette",
                jobTitle: "Project Leader",
              }}
            />
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
            <TeamMember
              props={{
                img: "assets/mal.jpg",
                title: "Malachi's pic",
                name: "Malachi",
                jobTitle: "Software Engineer",
              }}
            />
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
            <TeamMember
              props={{
                img: "assets/ric.png",
                title: "Ricky's pic",
                name: "Enrique",
                jobTitle: "Software Developer",
              }}
            />
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
            <TeamMember
              props={{
                img: "assets/kar.png",
                title: "Karl's pic",
                name: "Karl",
                jobTitle: "Software Engineer",
              }}
            />
          </Grid>
        </Grid>
      </Container>
  )
}

export default Team