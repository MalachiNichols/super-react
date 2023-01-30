import { Card, CardContent, Button, Input } from "@mui/material";
import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import CreateTask from "./CreateTask";
import Task from "./Task";

const Column = ({ props }) => {
  const [saveButton, setSaveButton] = useState(false);
  const [createTask, setCreateTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "hey", description: "" });
  const [taskList, setTaskList] = useState([]);

  const titleChange = (e) => {
    setSaveButton(true);
  };

  const saveTitle = (e) => {
    setSaveButton(false);
  };

  const saveTask = (e) => {
    setCreateTask(false);
    console.log(newTask)
    setTaskList(
      taskList.concat(
        <Task
          props={{ title: newTask.title, description: newTask.description }}
        />
      )
    );
  };

  return (
    <Card
      align="center"
      sx={{ minWidth: 250, pt: 2, border: "1px solid black", overflowY: 'auto' }}
    >
      <CardContent>
        <Input
          defaultValue={props.colName}
          inputProps={{ style: { textAlign: "center" } }}
          onChange={titleChange}
        />
        {saveButton && (
          <Button
            variant="outlined"
            endIcon={<SaveIcon />}
            sx={{ mt: 1 }}
            onClick={saveTitle}
          >
            SAVE TITLE
          </Button>
        )}
        {taskList}
        {createTask && (
          <CreateTask
            newTask={newTask}
            setNewTask={setNewTask}
            saveTask={saveTask}
          />
        )}
      </CardContent>
      <Button
        startIcon={<AddIcon />}
        onClick={() => {
          setCreateTask(true);
        }}
      >
        Task
      </Button>
    </Card>
  );
};

export default Column;

// {
//   /* <CardActions>
//         <Button
//           size="medium"
//           sx={{
//             color: "white",
//             maxWidth: 100,
//             mx: "auto",
//             background: "linear-gradient(70deg,#007880, #b5bdbe)",
//           }}
//         >
//           Submit
//         </Button>
//       </CardActions> */
// }
