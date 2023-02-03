import React from "react";
import Box from "@mui/system/Box";
import { Container } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: theme.palette.secondary.light, position: 'absolute', bottom: 0, height: '7rem' }}
    >
      <Box sx={{ mx: "auto", width: 500, my: 2 }}>
        <Grid container columns={12}>
          <Grid item xs align="center">
            <Link variant="body1" color="black" underline="hover" href="">
              Home
            </Link>
          </Grid>
          <Grid item xs align="center">
            <Link variant="body1" color="black" underline="hover" href="">
              About
            </Link>
          </Grid>
          <Grid item xs align="center">
            <Link variant="body1" color="black" underline="hover" href="">
              Terms
            </Link>
          </Grid>
          <Grid item xs align="center">
            <Link variant="body1" color="black" underline="hover" href="">
              Contact
            </Link>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          mx: "auto",
          width: 220,
          alignItems: "center",
          pb: 2,
        }}
      >
        <Box
          component="img"
          sx={{ borderRadius: 10, backgroundColor: "black" }}
          alt="Supernova icon"
          src="assets/supernova.jpg"
          width="40px"
        ></Box>
        <Link variant="h6" underline="hover" href="" sx={{color: 'white'}}>
          Supernova © 2023
        </Link>
      </Box>
    </Container>
  );
};

export default Footer;
