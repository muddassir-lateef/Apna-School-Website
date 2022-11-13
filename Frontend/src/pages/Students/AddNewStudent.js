import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import { Typography, Card, Grid, Box, Button, CardContent, CardActions, TextField } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import Input from "../../components/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_MIN, VALIDATOR_MINLENGTH } from "../../services/validators";
import { addStudent } from "../../services/UserService";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddNewTeacher = () => {
  const [submitStatus, setSubmitStatus] = useState(0);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [pageFlag, setPageFlag] = useState(0)
  const [imageValue, setImageValue] = useState("")
  const [tuitionFee, setTuitionFee] = useState(0)
  const [otherFee, setOtherFee] = useState(0)
  const [scholarshipAmount, setScholarShipAmount] = useState(0)
  const navigate = useNavigate();
  // const [formStateFee, InputHandlerFee] = useForm(
  //   {
  //   tuitionFee: {
  //     type: Number,
  //     value: 0,
  //     isValid: false,
  //   },
  //   otherFee: {
  //     type: Number,
  //     value: 0,
  //     isValid: false
  //   },
  //   scholarshipAmount: {
  //     type: Number,
  //     value: 0,
  //     isValid: false,
  //   },
  // }
  // )

  const [formStateStudent, InputHandlerStudent] = useForm(
    {
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
      }
    },
    false
  );

    const diffHandler = () => {
      
    }
  const StudentSubmitHandler = () => {
    const image = previewSource || '';
    console.log(previewSource)
    addStudent(
      formStateStudent.inputs.age.value,
      formStateStudent.inputs.firstName.value,
      formStateStudent.inputs.lastName.value,
      formStateStudent.inputs.guardianFirstName.value,
      formStateStudent.inputs.guardianLastName.value,
      formStateStudent.inputs.cnic.value,
      formStateStudent.inputs.email.value,
      formStateStudent.inputs.phoneNumber.value,
      formStateStudent.inputs.houseAddress.value,
      image,
      tuitionFee,
      otherFee,
      scholarshipAmount
    )
      .then((res) => {
        if (res.status === 201) {
          let url = `/students/search`;
          navigate(url);

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
    console.log(formStateStudent.inputs)
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
  const goBackHandler = () => {
    setPageFlag(0);
  }
  const onSubmitHandler = () => {
    //setPageFlag(2)
    StudentSubmitHandler();
  };

  const onConfirmHandler = () => {
    setPageFlag(2)
  }
  const [snackOpen, setSnackOpen] = React.useState(false);

  const nextButtonHandler = () => {
    setPageFlag(1);
  }
  const onBackHandler = () => {
    setPageFlag(0);
  }

  const editHandler = () => {
    setPageFlag(0)
  }
  if (pageFlag === 0) {
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
              id="firstName"
              label="First Name"
              variant="standard"
              onInput={InputHandlerStudent}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="First name is a required field"
            />
            <Input
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="lastName"
              label="Last Name"
              variant="standard"
              onInput={InputHandlerStudent}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Last name is a required field"
            />
            <Input
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="age"
              label="Age"
              variant="standard"
              onInput={InputHandlerStudent}
              validators={[VALIDATOR_MIN(0)]}
              errorText="Age must be over 0"
            />
            <Input
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="guardianFirstName"
              label="Guardians First Name"
              variant="standard"
              onInput={InputHandlerStudent}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Guardian First name is a required field"
            />
            <Input
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="guardianLastName"
              label="Guardian Last Name"
              variant="standard"
              onInput={InputHandlerStudent}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Guardian Last name is a required field"
            />
            <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="cnic"
              label="NIC"
              variant="standard"
              onInput={InputHandlerStudent}
              validators={[VALIDATOR_MINLENGTH(13)]}
              errorText="CNIC must have 13 digits"
            />
            <Input
              sx={{ pr: 2, pb: 3, flex: "100%" }}
              id="email"
              label="Email Address"
              variant="standard"
              onInput={InputHandlerStudent}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Email address is must"
            />
            <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="phoneNumber"
              label="Phone Number"
              variant="standard"
              onInput={InputHandlerStudent}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="Phone number is must"
            />
            <Input
              sx={{ pr: 2, pb: 2, flex: "100%" }}
              id="houseAddress"
              label="House Address"
              variant="standard"
              onInput={InputHandlerStudent}
              validators={[VALIDATOR_MINLENGTH(1)]}
              errorText="House Address is must"
            />

            

            <Grid container display="flex" justifyContent="flex-end">
              <Button
                onClick={nextButtonHandler}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2 }}
                disabled={!formStateStudent.isValid}
              >
                Next
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
  }
  else if (pageFlag === 1) {
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
            <Typography variant="h5">Fee Details</Typography>
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
            <Box sx={{ width: '100%'}}>
            <TextField value = {tuitionFee} variant="standard" label="Tuition Fee" onChange = {(event) => {setTuitionFee(event.target.value.replace(/\D/g, ''))}}>
              
            </TextField >
            </Box>
            <Box sx={{ width: '100%'}}>
            <TextField variant="standard" label="Other Fees" value = {otherFee} onChange = {(event) => {setOtherFee(event.target.value.replace(/\D/g, ''))}} >
              Hey
            </TextField >
            </Box>

            <Box sx={{ width: '100%'}}>
            <TextField variant="standard" label="Scholarship Amount" value = {scholarshipAmount} onChange = {(event) => {setScholarShipAmount(event.target.value.replace(/\D/g, ''))}}>
              Hey
            </TextField>
            </Box>


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
            </Box>
            <Grid container display="flex" justifyContent="space-between" >
              <Button
                onClick={onBackHandler}
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2 }}

              >
                Back
              </Button>
              <Button
                onClick={onConfirmHandler}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 2 }}
              
              >
                Next
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

          </div>
        </Snackbar>
      </Grid>
    );
  }
  //FInal Verification Page
  else if (pageFlag === 2) {
    return (
      <Grid item sm={12} md={6} lg={4}>
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
          <Typography gutterBottom variant="h4" component="div">
              {'Student Personal Details'}
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'Name : ' + formStateStudent.inputs.guardianFirstName.value + " " + formStateStudent.inputs.guardianLastName.value}
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'Age : ' + formStateStudent.inputs.age.value}
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'CNIC : ' + formStateStudent.inputs.cnic.value}
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'Guardian Name : ' + formStateStudent.inputs.guardianFirstName.value + " " + formStateStudent.inputs.guardianLastName.value}
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'Phone Number : ' + formStateStudent.inputs.phoneNumber.value }
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'House Address : ' + formStateStudent.inputs.houseAddress.value }
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'Email Address : ' + formStateStudent.inputs.email.value }
            </Typography>
            <Typography gutterBottom variant="h4" component="div">
              {'Student Fee Details'}
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'Tuition Fee: ' + tuitionFee }
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'Other Fees Fee: ' + otherFee }
            </Typography>
            <Typography gutterBottom variant="div" component="div">
              {'Scholarship Amount : ' + scholarshipAmount }
            </Typography>
            <Grid container display="flex" justifyContent="space-between" >
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
            
            </Grid>
            <Grid container display="flex" justifyContent="space-between" >
            <Button
                onClick={editHandler}
                variant="contained"
                startIcon={<ArrowBackIcon />}
                sx={{ mt: 2 }}

              >
                Edit
              </Button>
              <Button
                onClick={onSubmitHandler}
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
              </Grid>
          </CardContent>
        </Card>
        <StatusAlert />
      </Grid>
    )

  }
};

export default AddNewTeacher;
