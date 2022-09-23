import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTeacher, updateTeacher } from "../../services/UserService";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "../../services/validators";
import { Typography, Card, Grid, Box, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Input from "../../components/Input";
import { useForm } from "../../hooks/form-hook";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";

const EditTeacher = () => {
  const [isLoading, setIsLoading] = useState(true);
  const prev_username = useParams().username;
  const [teacher, setTeacher] = useState('');
  //run on page load
  useEffect(() => {
    getTeacher(prev_username)
      .then((response) => {
        if (response.status === 201) {
          setTeacher(response.data);
          console.log(response.data);
        } else console.log("Teacher was not found");
      })
      .catch((err) => console.log(err));
  }, [prev_username]);

  const [submitStatus, setSubmitStatus] = useState(0);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [formState, InputHandler, setFormData] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      age: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  useEffect(()=>{
    console.log('useEffect hit: ', teacher)
    setFormData({
      firstName: {
        value: teacher.firstName,
        isValid: true
      }, 
      lastName: {
        value: teacher.lastName,
        isValid: true
      }, 
      age: {
        value: teacher.age,
        isValid: true
      }, 
      username: {
        value: teacher.username,
        isValid: true
      }
    }, true);
    setIsLoading(false);
    //console.log("FormState: ", formState.inputs)

  }, [setFormData, teacher]);

  const onSubmitHandler = () => {
    console.log(formState.inputs)
    teacherSubmitHandler();
  };
  const [snackOpen, setSnackOpen] = useState(false);

  const teacherSubmitHandler = () => {
    const image = previewSource || "";
    //console.log(previewSource)
    updateTeacher(
      prev_username,
      formState.inputs.firstName.value,
      formState.inputs.lastName.value,
      formState.inputs.age.value,
      formState.inputs.username.value,
      image
    )
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          console.log("were heree")
          setSubmitStatus(1);
          setSnackOpen(true);
        } else {
          setSubmitStatus(-1);
          console.log("we dont want to be heree")
          setSnackOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("we dont want to be heree part 2")
        setSubmitStatus(-1);
        setSnackOpen(true);
      });
  };

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Teacher was not updated!
        </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Teacher Updated Successfully!
        </Alert>
      );
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    console.log(selectedFile);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  if (isLoading){
    return(<Typography variant="h2">Loading...</Typography>);
  }

  if (typeof teacher === 'object')
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
            <PersonAddAlt1Icon />
          </Avatar>
          <Typography variant="h5">Update Teacher</Typography>
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
            id="firstName"
            label="First Name"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="First name is a required field"
            initialValue={teacher.firstName}
            initialValid={formState.inputs.firstName.isValid}
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="lastName"
            label="Last Name"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Last name is a required field"
            initialValue={teacher.lastName}
            initialValid={formState.inputs.lastName.isValid}
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="age"
            label="Age"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MIN(18)]}
            errorText="Age must be over 18 years"
            initialValue={teacher.age}
            initialValid={formState.inputs.age.isValid}
          />
          <Input
            sx={{ pr: 2, pb: 2, flex: "100%" }}
            id="username"
            label="Username"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Username must be at least 5 characters"
            initialValue={teacher.username}
            initialValid={formState.inputs.username.isValid}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              alignItems: "center",
              width: "100%",
              p: 1,
            }}
          >
            <InputLabel sx={{ p: "-1px", w: "100%" }}>
              Teacher Profile Picture
            </InputLabel>
            <input
              style={{
                display: "inline-block",
                padding: "6px 12px",
                cursor: "pointer",
              }}
              id="imagefile"
              type="file"
              onChange={handleFileInputChange}
              value={fileInputState}
            />
          </Box>
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen"
              style={{ height: "300px", class: "center", borderRadius: "50%" }}
            />
          )}

          <Grid container display="flex" justifyContent="flex-end">
            <Button
              onClick={onSubmitHandler}
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ mt: 2 }}
              disabled={!formState.isValid}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Card>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <div>
          <StatusAlert />
        </div>
      </Snackbar>
    </Grid>
  );
};

export default EditTeacher;
