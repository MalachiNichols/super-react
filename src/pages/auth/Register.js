import React from "react";
import {
  Card,
  TextField,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";

const Register = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        background: "linear-gradient(70deg,#007880, #b5bdbe)",
        height: "81vh",
        pt: 10,
      }}
    >
      <Card align="center" sx={{ maxWidth: 400, pt: 2, mx: "auto" }}>
        <CardMedia
          sx={{ height: 140, width: 140 }}
          image="assets/supernova.jpg"
          title="Supernova logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Register Here!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete this form to Register!
          </Typography>
          <TextField
            sx={{ mt: 1 }}
            id="outlined-username-input"
            label="Username"
            type="text"
          />
          <TextField
            sx={{ mt: 1 }}
            id="outlined-email-input"
            label="Email"
            type="text"
          />
          <TextField
            sx={{ mt: 1 }}
            id="outlined-password-input"
            label="Password"
            type="password"
          />
          <TextField
            sx={{ mt: 1 }}
            id="outlined-repeat-input"
            label="Repeat Password"
            type="password"
          />
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            sx={{
              color: "white",
              maxWidth: 100,
              mx: "auto",
              background: "linear-gradient(70deg,#007880, #b5bdbe)",
            }}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Register;
