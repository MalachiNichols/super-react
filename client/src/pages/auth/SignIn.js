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

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submitCredentials = async () => {
    console.log(credentials);
    await fetch("http://localhost:8080/api/auth/signin", {
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
            window.location.href = '/board'
          });
        } else {
          res.json().then(data => 
          alert(data.message))
        }
      })
      .catch((err) => console.log(err));
  };

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
            Sign In Here!
          </Typography>
          <TextField
            sx={{ mt: 1 }}
            id="outlined-username-input"
            label="Username"
            type="text"
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <TextField
            sx={{ mt: 1 }}
            id="outlined-email-input"
            label="Email"
            type="text"
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <TextField
            sx={{ mt: 1 }}
            id="outlined-password-input"
            label="Password"
            defaultValue=''
            type="password"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
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
            onClick={submitCredentials}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default SignIn;
