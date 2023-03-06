import React, { useState } from "react";
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
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    repeat: "",
  });

  const submitCredentials = async () => {
    console.log(credentials);
    await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          res.json().then((data) => {
            console.log(data);
            localStorage.setItem("user", data.username);
            localStorage.setItem("accessToken", data.accessToken);
            alert("Signed up succesfully!");
            window.location.href = "/signin";
          });
        } else {
          res.json().then((data) => alert(data.message));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        background: "#222222",
        height: "81vh",
        pt: 10,
      }}
    >
      <Card
        align="center"
        sx={{
          border: "4px solid #22A39F",
          maxWidth: 400,
          pt: 2,
          mx: "auto",
          backgroundColor: "#F3EFE0",
        }}
      >
        <CardMedia
          sx={{ height: 140, width: 140, borderRadius: 18 }}
          image="assets/supernova.jpg"
          title="Supernova logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="#222222">
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
            onChange={(e) => {
              setCredentials({ ...credentials, username: e.target.value });
            }}
          />
          <TextField
            sx={{ mt: 1 }}
            id="outlined-email-input"
            label="Email"
            type="text"
            onChange={(e) => {
              setCredentials({ ...credentials, email: e.target.value });
            }}
          />
          <TextField
            sx={{ mt: 1 }}
            id="outlined-password-input"
            label="Password"
            type="password"
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
          />
          <TextField
            sx={{ mt: 1 }}
            id="outlined-repeat-input"
            label="Repeat Password"
            type="password"
            onChange={(e) => {
              setCredentials({ ...credentials, repeat: e.target.value });
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            size="medium"
            sx={{
              color: "#222222",
              maxWidth: 100,
              mx: "auto",
              background: "#22A39F",
            }}
            onClick={submitCredentials}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Register;
