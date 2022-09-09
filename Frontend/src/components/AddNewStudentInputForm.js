import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
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


    const StudentAdded = () => {
        console.log(rollNo)
       let res = add(rollNo,Age,firstName,lastName,guardianFirstName,guardianLastName,cnic,emailAddress,phoneNumber,houseAddress)
   
    };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Roll Number"
          onChange = {(event) => {
            setrollNo(event.target.value)
          }}
        />
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        
        <div>
        <TextField
          required
          id="outlined-required"
          label="House Address"
          onChange = {(event) => {
            setHouseAddress(event.target.value)
          }}
        />
      </div>
      <Grid  justifyContent="center" display="flex">
        <Button  variant="contained"  sx={{mt:3, width:'100%'}} onClick = {StudentAdded}>
            Add Student
        </Button>
        </Grid>
    </Box>
  );
}
