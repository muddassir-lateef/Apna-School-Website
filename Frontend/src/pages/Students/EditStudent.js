import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getTeacher, updateTeacher, getStudents, updateStudent  } from "../../services/UserService";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "../../services/validators";
import { Typography, Card, Grid, Box, Button, TextField } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Input from "../../components/Input";
import { useForm } from "../../hooks/form-hook";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditStudent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const rollNumber = location.state.param1;
  const [teacher, setTeacher] = useState("");
  const navigate = useNavigate();
  //run on page load
  useEffect(() => {
    console.log(rollNumber)
    let URL = "student/" + rollNumber
    getStudents(URL)
      .then((response) => {
        if (response.status === 201) {
          setTeacher(response.data);
          console.log(response.data);
        } else console.log("Teacher was not found");
      })
      .catch((err) => console.log(err));
  }, [rollNumber]);

  const [submitStatus, setSubmitStatus] = useState(0);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [disable, setDisable] = useState(false)
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
      Age: {
        value: "",
        isValid: false,
      },
      guardianFirstName: {
        value: "",
        isValid: false,
      },
      guardianLastName: {
        value: "",
        isValid: false,
      },
      cnic: {
        value: "",
        isValid: false,
      },
      phoneNumber: {
        value: "",
        isValid: false,
      },
      emailAddress: {
        value: "",
        isValid: false,
      },
      houseAddress: {
        value: "",
        isValid: false,
      }
    },
    false
  );

  useEffect(() => {
    console.log("useEffect hit: ", teacher);
    setFormData(
      {
        rollNumber : {
            value: teacher.rollNumber,
            isValid: true, 
        },
        firstName: {
          value: teacher.firstName,
          isValid: true,
        },
        lastName: {
          value: teacher.lastName,
          isValid: true,
        },
        Age: {
          value: teacher.Age,
          isValid: true,
        },
        guardianFirstName: {
            value: teacher.guardianFirstName,
            isValid: true,
          },
          guardianLastName: {
            value: teacher.guardianLastName,
            isValid: true,
          },
          cnic: {
            value: teacher.cnic,
            isValid: true,
          },
        emailAddress : {
            value : teacher.emailAddress,
            isValid : true,
        },
        houseAddress : {
            value : teacher.houseAddress,
            isValid : true,
        },
        phoneNumber : {
            value : teacher.phoneNumber,
            isValid : true
        }
      },
      true
    );
    setIsLoading(false);
    //console.log("FormState: ", formState.inputs)
  }, [setFormData, teacher]);

  const onSubmitHandler = () => {
    console.log(formState.inputs);
    teacherSubmitHandler();
  };
  const [snackOpen, setSnackOpen] = useState(false);

  const teacherSubmitHandler = () => {
    const image = previewSource || "";
    //console.log(previewSource)
    updateStudent(
      formState.inputs.rollNumber.value,
      formState.inputs.firstName.value,
      formState.inputs.lastName.value,
      formState.inputs.Age.value,
      formState.inputs.cnic.value,
      formState.inputs.guardianFirstName.value,
      formState.inputs.guardianLastName.value,
      formState.inputs.houseAddress.value,
      formState.inputs.phoneNumber.value,
      formState.inputs.emailAddress.value,
      image
    )
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          console.log("were heree");
          setSubmitStatus(1);
          setSnackOpen(true);
        } else {
          setSubmitStatus(-1);
          console.log("Error");
          setSnackOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Error");
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
          Student was not updated!
        </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Student Updated Successfully!
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

  const handleGoBackClick = (e) => {
    e.preventDefault();
    let url = "/students/search";
    navigate(url);
  };

  if (isLoading) {
    return <Typography variant="h2">Loading...</Typography>;
  }

  if (typeof teacher === "object")
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
            <Typography variant="h5">Update Student</Typography>
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
             <TextField
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="rollNumber"
              disabled={!disable}
              label = "Roll Number"
              variant="standard"
              value={teacher.rollNumber}
            />
            <Input
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="firstName"
              label="First Name"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="First name cannot be empty"
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
              errorText="Last name cannot be empty"
              initialValue={teacher.lastName}
              initialValid={formState.inputs.lastName.isValid}
            />
            <Input
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="Age"
              label="Age"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MIN(6)]}
              errorText="Age must be over 6 years"
              initialValue={teacher.Age}
              initialValid={formState.inputs.Age.isValid}
            />
            <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="guardianFirstName"
              label="Guardian First Name"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Guardian First Name cannot be empty"
              initialValue={teacher.guardianFirstName}
              initialValid={formState.inputs.guardianFirstName.isValid}
            />
             <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="guardianLastName"
              label="Guardian Last Name"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Guardian Last Name cannot be empty"
              initialValue={teacher.guardianLastName}
              initialValid={formState.inputs.guardianLastName.isValid}
            />
            <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="cnic"
              label="CNIC"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MINLENGTH(13)]}
              errorText="CNIC must have 13 characters"
              initialValue={teacher.cnic}
              initialValid={formState.inputs.cnic.isValid}
            />
            <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="phoneNumber"
              label="Phone Number"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Phone number cannot be empty"
              initialValue={teacher.phoneNumber}
              initialValid={formState.inputs.phoneNumber.isValid}
            />
            <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="houseAddress"
              label="House Address"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Address cannot be empty"
              initialValue={teacher.houseAddress}
              initialValid={formState.inputs.houseAddress.isValid}
            />
            <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="emailAddress"
              label="Email Address"
              variant="standard"
              onInput={InputHandler}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Email Address cannot be empty"
              initialValue={teacher.emailAddress}
              initialValid={formState.inputs.emailAddress.isValid}
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
                style={{
                  height: "300px",
                  class: "center",
                  borderRadius: "50%",
                }}
              />
            )}

            <Grid container display="flex" justifyContent="space-between">
              <Button
                variant="text"
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBackClick}
              >
                Go Back
              </Button>

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

export default EditStudent;
