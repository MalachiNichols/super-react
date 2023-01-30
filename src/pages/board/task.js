import { Card, CardContent, Button, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'


const Task = ({ props }) => {
  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <Typography variant='h6'>{props.title}</Typography>
        <Typography variant='body1' sx={{ wordWrap: "break-word", textAlign: 'left' }}>{props.description}</Typography>
        <Button
          variant="outlined"
          endIcon={<DeleteIcon />}
          sx={{ mt: 1 }}
        >
          DELETE TASK
        </Button>
      </CardContent>
    </Card>
  )
}

export default Task