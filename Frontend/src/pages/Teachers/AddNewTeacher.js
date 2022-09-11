import React from "react";

import { Typography, Card, Grid, Box, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Input from "../../components/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "../../services/validators";
import { addNewTeacher } from "../../services/UserService";

const AddNewTeacher = () => {
    const [formState, InputHandler] = useForm({
        firstName:{
            value: '',
            isValid: false
        },
        lastName:{
            value: '',
            isValid: false
        },
        username:{
            value: '',
            isValid: false
        },
        age:{
            value: '',
            isValid: false
        }
    }, false);

    const onSubmitHandler = () => {
        addNewTeacher(
          formState.inputs.firstName.value,
          formState.inputs.lastName.value,
          formState.inputs.age.value,
          formState.inputs.username.value
        )
          .then((res) => {
            if (res.status === 201) console.log(res);
          })
          .catch((err) => console.log(err));
        console.log(formState.inputs);
    }

  return (
    <Grid justifyContent="center" display="flex">
      <Card sx={{ width: "90%" }}>
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
            <PersonAddAlt1Icon />
          </Avatar>
          <Typography variant="h5">Teacher Admission</Typography>
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
            sx={{pr: 2, pb:2, flex:'100%' }}
            id="firstName"
            label="First Name"
            variant="standard"
            onInput = {InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="First name is a required field"
          />
          <Input
            sx={{pr: 2, pb:2, flex:'100%' }}
            id="lastName"
            label="Last Name"
            variant="standard"
            onInput = {InputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Last name is a required field"
          />
          <Input
            sx={{pr: 2, pb:2, flex:'100%' }}
            id="age"
            label="Age"
            variant="standard"
            onInput = {InputHandler}
            validators={[VALIDATOR_MIN(18)]}
            errorText="Age must be over 18 years"
          />
          <Input
            sx={{pr: 2, pb:2, flex:'100%' }}
            id="username"
            label="Username"
            variant="standard"
            onInput = {InputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Username must be at least 5 characters"
          />

          <Grid container display="flex" justifyContent="flex-end">
            <Button onClick={onSubmitHandler} variant="contained" endIcon={<SendIcon />} sx={{ mt: 2 }} disabled={!formState.isValid}>
              Submit
            </Button>
          </Grid>
        </Box>
      </Card>
    </Grid>
    
  );
};

export default AddNewTeacher;
