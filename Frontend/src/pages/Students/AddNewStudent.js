import { Typography, Card, Grid, Box, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import React from "react";
import FormPropsTextFields from "../../components/AddNewStudentInputForm";
import { useState } from 'react';
import { addStudent } from '../../services/UserService';
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

const AddNewStudent = () => {
  
  //All the hooks for the inputted values
  // const [rollNumber, setRollNumber] = useState(0);
  // const [firstName, setfirstName] = useState(0);
  // const [lastName, setlastName] = useState(0);
  // const [Age, setAge] = useState(0);
  // const [guardianFirstName, setguardianf] = useState(0);
  // const [guardianLastName, setguardianl] = useState(0);
  // const [cnic, setcnic] = useState(0);
  // const [emailAddress, setEmail] = useState(0);
  // const [houseAddress, sethouse] = useState(0);
  // const [phoneNumber, setphone] = useState(0);

  // const studentAdd = () => {
  //   let res = addStudent(rollNumber, firstName, lastName, Age, guardianFirstName, guardianLastName, cnic, emailAddress, houseAddress, phoneNumber)
  //   console.log("We here")
  // }

   return (
    <FormPropsTextFields/>
  //   <Grid justifyContent="center" display="flex">
  //     <Card sx={{ width: "90%" }}>
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           p: 1,
  //           m: 1,
  //         }}
  //       >
  //         <Avatar sx={{ mr: 1 }}>
  //           <PersonAddAlt1Icon />
  //         </Avatar>
  //         <Typography variant="h5">Student Admission</Typography>
  //       </Box>

  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "space-evenly",
  //           flexWrap: "wrap",
  //           alignItems: "center",
  //           p: 1,
  //         }}
  //       >
  //         <TextField id="firstName" label="First Name" variant="standard" onChange = {setfirstName}/>
  //         <TextField id="lastName" label="Last Name" variant="standard" onChange = {setlastName} />
  //         <TextField id="age" label="Age" variant="standard"  onChange = {setAge}/>
  //         <TextField id="guardianfirstName"label="Guradian First Name"variant="standard"  onChange = {setguardianf}/>
  //         <TextField id="guardianlastName"label="Guradian Last Name"variant="standard"  onChange = {setguardianl}/>
  //         <TextField id="cnic" label="Cnic" variant="standard"  onChange = {setcnic} /> 
  //         <TextField id="rollNumber" label="Roll Number" variant="standard"  onChange = {setRollNumber} />
  //         <TextField id="address" label="Address" variant="standard"  onChange = {sethouse} />
  //         <TextField id="email" label="Email" variant="standard"  onChange = {setEmail} />
  //         <TextField id="phoneNumber" label="Contact Number" variant="standard"  onChange = {setphone} />

  //         <Grid container display="flex" justifyContent="flex-end">
  //           <Button variant="contained" endIcon={<SendIcon />} sx={{ mt: 2 }} onClick = {studentAdd}>
  //             Submit
  //           </Button>
  //         </Grid>
  //       </Box>
  //     </Card>
  //   </Grid>

  );
};

export default AddNewStudent;
