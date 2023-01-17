import React from "react";
import { Card, CardContent, Typography, CardMedia } from '@mui/material'

const TeamMember = ({ props }) => {
  return (
    <Card sx={{ width: 210 }}>
      <CardMedia
        sx={{ height: 200, width: 200, ml: "5px", mt: "5px" }}
        image={props.img} //assets/Jay.png
        title={props.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="h5" class="card-title">
          {props.jobTitle}
        </Typography>
        <Typography variant="body1" class="card-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
          exercitationem non enim neque sequi eveniet possimus laboriosam
          aliquid, obcaecati reprehenderit a voluptate nostrum. Non adipisci
          laborum eligendi inventore blanditiis sunt!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeamMember;
