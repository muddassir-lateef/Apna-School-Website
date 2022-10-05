import React, { useState } from "react";

import { Typography, Card, Grid, Box, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Input from "../../components/Input";
import TextField from '@mui/material/TextField';
import AlertTitle from '@mui/material/AlertTitle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useForm } from "../../hooks/form-hook";
import { useNavigate, useLocation } from "react-router-dom";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "../../services/validators";
import { addNewTeacherm, addClass } from "../../services/UserService";
import Alert from "@mui/material/Alert";


const AddNewTeacher = () => {
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [statusFlag, setStatusFlag] = useState(0)
  const navigate = useNavigate();
  const [formState, InputHandler] = useForm(
    {
      classYear: {
        value: 0,
        isValid: false,
      },
    },
    false
  );
    const backButtonHandler = () => {
      let url = '/class/searchClass';
      navigate(url);
    }
  const StatusAlert = () => {
    if(statusFlag == 0)
    {
        
    }
    if(statusFlag === 1)
    {
      return(<Alert severity="success">This is a success alert — check it out!</Alert>)
    }
    if(statusFlag === 2)
    {
      return(<Alert severity="error">Class of this Year already Exists!</Alert>)
    }
  }

  const Handler = () => {
    addClass(formState.inputs.classYear.value).then((res) => {
      if (res.status === 201) 
      {
        console.log("Success check")
        setStatusFlag(1)
      } 
      else if(res.status === 200)
      {
        console.log("Failure check")
        setStatusFlag(2)
      }
    })
    console.log("All checks failed")
    console.log(formState.inputs.classYear.value)
  };
  return (
    <Grid justifyContent="center" display="flex" flex-direction="row">
      <Card sx={{ width: "90%", maxWidth: "900px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 1,
            m: 1,
          }}
        >
          <Avatar sx={{ mr: 2 }}>
          <AssignmentIndIcon/>
          </Avatar>
          <Typography variant="h5">New Class</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            alignItems: "center",

            p: 1,
          }}
        >
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="classYear"
            label="Class Year"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Please enter the Class Year"
          />
           <Grid item xs={12} textAlign="right">
          <Button
                variant="contained"
                endIcon={<ArrowBackIcon/>}
                sx={{ mt: 2 }}
                onClick={backButtonHandler}
              >
                Back
              </Button>
              </Grid>
          <Grid item xs={12} textAlign="right">
          <Button
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: 2 }}
                onClick={Handler}
              >
                Submit
              </Button>
              </Grid>      
        </Box>
        <StatusAlert/>
      </Card>
      
    </Grid>
  );
};

export default AddNewTeacher;
