import {
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import AboutUs from "./AboutUs";
import Team from "./Team";
import Mission from "./Mission";

const About = () => {
  return (
    <Stack spacing={0}>
      <AboutUs />
      <Team />
      <Mission />
    </Stack>
  );
};

export default About;
