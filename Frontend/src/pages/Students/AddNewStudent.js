import React, { useState } from "react";

import { Typography, Card, Grid, Box, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Input from "../../components/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "../../services/validators";
import { addStudent } from "../../services/UserService";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";

const AddNewTeacher = () => {
  const [submitStatus, setSubmitStatus] = useState(0);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [formState, InputHandler] = useForm(
    {
      rollNumber: {
        value :0,
        isValid :false,
      },
      age: {
        value: 0,
        isValid: false,
      },
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
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
      email: {
        value: "",
        isValid: false,
      },
      phoneNumber: {
        value: "",
        isValid: false,
      },
      houseAddress: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = () => {
    StudentSubmitHandler();
  };
  const [snackOpen, setSnackOpen] = React.useState(false);

  const StudentSubmitHandler = () => {
    const image = previewSource || '';
    console.log(previewSource)
    addStudent(
      formState.inputs.rollNumber.value,
      formState.inputs.age.value,
      formState.inputs.firstName.value,
      formState.inputs.lastName.value,
      formState.inputs.guardianFirstName.value,
      formState.inputs.guardianLastName.value,
      formState.inputs.cnic.value,
      formState.inputs.email.value,
      formState.inputs.phoneNumber.value,
      formState.inputs.houseAddress.value,
      image
    )
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          setSubmitStatus(1);
          setSnackOpen(true);
        } else {
          setSubmitStatus(-1);
          setSnackOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitStatus(-1);
        setSnackOpen(true);
      });
    console.log(formState.inputs);
  };

  const StatusAlert = () => {
    if (submitStatus === -1)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Student was not added!
        </Alert>
      );
    if (submitStatus === 1)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Student Added Successfully!
        </Alert>
      );
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
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
            <PersonAddAlt1Icon />
          </Avatar>
          <Typography variant="h5">Student Admission</Typography>
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
            id="rollNumber"
            label="Roll Number"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Roll Number is a required field"
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="firstName"
            label="First Name"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="First name is a required field"
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="lastName"
            label="Last Name"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Last name is a required field"
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="age"
            label="Age"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MIN(18)]}
            errorText="Age must be over 18 years"
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="guardianFirstName"
            label="Guardians First Name"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Guardian First name is a required field"
          />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="guardianLastName"
            label="Guardian Last Name"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Guardian Last name is a required field"
          />
          <Input
            sx={{ pr: 2, pb: 2, flex: "100%" }}
            id="cnic"
            label="NIC"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(13)]}
            errorText="CNIC must have 13 digits"
            />
          <Input
            sx={{ pr: 2, pb: 3, flex: "100%" }}
            id="email"
            label="Email Address"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Email address is must"
          />
          <Input
            sx={{ pr: 2, pb: 2, flex: "100%" }}
            id="phoneNumber"
            label="Phone Nmmber"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Phone number is must"
          />
          <Input
            sx={{ pr: 2, pb: 2, flex: "100%" }}
            id="houseAddress"
            label="House Address"
            variant="standard"
            onInput={InputHandler}
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="House Address is must"
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
              Students Picture
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

export default AddNewTeacher;
