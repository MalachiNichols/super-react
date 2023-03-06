import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";



export default function Navbar() {
  let navigate = useNavigate()
  let theme = useTheme()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ height: 60 }}></Box> {/* This Box is for proper spacing as the navbar is removed from the flow with position fixed */}
      <AppBar position="fixed"  sx={{backgroundColor: '#22A39F'}}>
        <Toolbar>
          <div role="presentation" style={{ flex: 1 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="#F3EFE0">
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  color="#F3EFE0"
                  style={{ margin: "1" }}
                />
                Supernova
              </Typography>
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/about">
                About
              </Link>
              {/* <Link underline="hover" color="inherit" href="/contact">
                Contact
              </Link> */}
              <Link underline="hover" color="inherit" href="/board">
                Board
              </Link>
            </Breadcrumbs>
          </div>
          <Button color="inherit" onClick={() => {navigate("/register")}}>Register</Button>
          <Button color="inherit" onClick={() => {navigate("/signin")}}>Sign In</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
