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

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submitCredentials = async () => {
    await fetch(
      `https://${process.env.REACT_APP_LOCALIP}/api/auth/signin`,
      {
        method: "POST",
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          res.json().then((data) => {
            localStorage.setItem("user", data.username);
            localStorage.setItem("accessToken", data.accessToken);
            window.location.href = "/board";
          });
        } else {
          res.json().then((data) => alert(data.message));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card
      align="center"
      sx={{
        border: "4px solid #22A39F",
        minWidth: 300,
        maxWidth: "20.8vw",
        pt: 2,
        mt: 3,
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
          defaultValue=""
          type="password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </CardContent>
      <CardActions sx={{ mb: 2 }}>
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
  );
};

export default SignIn;
