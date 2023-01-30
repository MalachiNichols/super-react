import {
    Card,
    TextField,
    CardActions,
    CardContent,
    Typography,
    Button,
  } from "@mui/material";
import React from 'react'

const Column = ({ props }) => {
  return (
    <Card align="center" sx={{ minWidth: 250, pt: 2, border: '1px solid black'}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            title {props.colName}
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
  )
}

export default Column