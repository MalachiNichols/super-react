import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='error'>
        <Toolbar>
          <div role="presentation" style={{ flex: 1 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="text.primary">
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  color="white"
                  style={{ margin: "1" }}
                />
                Supernova
              </Typography>
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/">
                About
              </Link>
              <Link underline="hover" color="inherit" href="/">
                Contact
              </Link>
            </Breadcrumbs>
          </div>
          <Button color="inherit">Register</Button>
          <Button color="inherit">Sign In</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
