import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import SendIcon from "@mui/icons-material/Send";
import Alert from '@mui/material/Alert'
import  Typography from '@mui/material/Typography';
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useState } from 'react';
import { addStudent as add} from '../services/UserService';



export default function FormPropsTextFields() {
    //Prolly bad coding practice here, but it works I guess
    const [rollNo, setrollNo] = useState(0);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [Age, setAge] = useState(0);
    const [cnic, setCnic] = useState("");
    const [guardianFirstName, setguardianFirstName] = useState("");
    const [guardianLastName, setguardianLastName] = useState("");
    const [emailAddress, setemailAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [houseAddress, setHouseAddress] = useState();
    const [status,setStatus] = useState(0);
    const StatusAlert = () => {
      if(status == -1) 
      return (
        <Alert severity="error">Invalid Student Credentials!</Alert>
      )
      if(status == 1)
      return (
        <Alert severity="success">Student Added Succesfully!</Alert>
      )
      if(status == 20)
      return (
        <Alert severity="info">Enter the Student Credentials!</Alert>
      )
    }
   
    
    const StudentAdded = () => {
        console.log(rollNo)
          add(rollNo,Age,firstName,lastName,guardianFirstName,guardianLastName,cnic,emailAddress,phoneNumber,houseAddress)
       .then((res) => {
        if(res.status == 201) {
           //("Student added")
            setStatus(1)
        }
       })
       .catch((err) => {
          setStatus(-1)
       });
    };
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
          <Avatar sx={{ mr: 1 }}>
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
   
        <TextField
          required
          id="outlined-required"
          label="Roll Number"
          onChange = {(event) => {
            setrollNo(event.target.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="First Name"
          onChange = {(event) => {
            setfirstName(event.target.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          onChange = {(event) => {
            setlastName(event.target.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Age"
          onChange = {(event) => {
            setAge(event.target.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="NIC number"
          onChange = {(event) => {
            setCnic(event.target.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Guardian First Name"
          onChange = {(event) => {
            setguardianFirstName(event.target.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Guardian Last Name"
          onChange = {(event) => {
            setguardianLastName(event.target.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Email Address"
          onChange = {(event) => {
            setemailAddress(event.target.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Phone Number"
          onChange = {(event) => {
            setPhoneNumber(event.target.value)
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="House Address"
          onChange = {(event) => {
            setHouseAddress(event.target.value)
          }}
        />
        <Grid container display="flex" justifyContent="flex-end">
            <Button variant="contained" endIcon={<SendIcon />} sx={{ mt: 2 }} onClick = {StudentAdded}>
              Submit
           </Button>
         
         </Grid>
         <Grid>
         <StatusAlert>Hey </StatusAlert>
         </Grid>
        </Box>
      </Card>
      
    </Grid>
      
  );
}
