import React from "react";
import Stack from "@mui/material/Stack";
import Define from "./Define";
import HowTo from "./HowTo";
import History from "./History";

const Home = () => {
  return (
    <Stack spacing={-1}>
      <Define />
      <HowTo />
      <History />
    </Stack>
  );
};

export default Home;
