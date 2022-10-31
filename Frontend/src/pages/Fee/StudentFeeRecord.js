import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { deepOrange, deepPurple, deepBlue } from '@mui/material/colors';
import { Button, Input } from '@mui/material'
import Stack from '@mui/material/Stack';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import PaidIcon from '@mui/icons-material/Paid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import { getAllFeeDetailsFromStudentFeeRecord, getStudentFeeRecord } from "../../services/UserService";

const StudentFeeRecord = () => {
    const [rollNumber, setRollNumber] = useState(0)
    const [feeRecord, setFeeRecord] = useState(0);
    const [firstName,setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const location = useLocation();
    const [edit, setEdit] = useState(true)
    const [tuFee, setTuFee] = useState()
    const [secFee, setSecFee] = useState()
    const [otFee, setOtFee] = useState()
    const [scFee, setScFee] = useState()
    
    const rollNo = location.state.param1;
    const fname = location.state.param2;
    const lname = location.state.param3;
    const navigate = useNavigate();
    useEffect(() => {
        setRollNumber(rollNo)
        setFirstName(fname);
        setLastName(lname);
        console.log(firstName)
        getStudentFeeRecord(rollNo).then((response) => {
            if (response.status === 201) {
                console.log(response.data);
                console.log("Sections Found")
                setFeeRecord(response.data);
                setTuFee(feeRecord.tuitionFee)
                setOtFee(feeRecord.otherFee)
                setSecFee(feeRecord.securityFee)
                console.log(feeRecord.tuitionFee)
                setScFee(feeRecord.scholarshipAmount)
                console.log("Attempt ")
                console.log(scFee)
                
            }
            else if (response.status === -1) {
                alert("Sections not Found");
                console.log(response.data);
            }
        })
    }, []);

    const handleGoBackClick = () => {
      let url = `/Fee/ViewFees`;
      navigate(url);
    }

    const viewAllFeeClick = () => {
      navigate("/Fee/FeeList", {
        state: { param1: rollNumber, param2 : firstName, param3 : lastName},
      })

    }

    const handleAmountChange = event => {
      const result = event.target.value.replace(/\D/g, '');
      //setTuFee(result)
      console.log(tuFee)
        console.log(result)
      };
    const FeeRecordDisplay = () => {
      
          return ( 
            <Paper variant="outlined" square>
              <List sx={{ width: '100%', maxWidth: 500, bgcolor: '#0000' }}>
                <ListItem>
                  <AppBar>
                  <Typography>
                    Fee Record
                  </Typography>
                  Hello
                  </AppBar>
                </ListItem>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Name : 
                  <Input disabled = {true} value = {"  " + firstName + ' ' + lastName}/>      
                </Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Roll Number : 
                <Input   disabled = {true} label="Roll Number" value = { rollNumber}/>
                </Typography>
                 
                </ListItem>
                <Divider/>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Tuition Fee : 
                  <Input  disabled = {false} placeholder = {feeRecord.tuitionFee} label="Multiline" onChange = {handleAmountChange} />
                </Typography>
                </ListItem>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Security Fee : 
                  <Input disabled = {edit} placeholder = { feeRecord.securityFee}/>      
                </Typography>
                </ListItem>
                </List>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Other Fee(s) : 
                  <Input disabled = {edit} placeholder = { feeRecord.otherFee}/>      
                </Typography>
                </ListItem>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Monthly Total Fee : 
                  <Input  disabled = {edit} placeholder = { feeRecord.totalFee}/>      
                </Typography>
                </ListItem>
                <Divider/>
                <Divider/>
                <Divider/>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Scholarship Amount : 
                  <Input disabled = {edit} placeholder = { feeRecord.scholarshipAmount}/>      
                </Typography>
                </ListItem>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                Total Outstanding Fee : {feeRecord.outStandingFees}
                </Typography>
                </ListItem>
                <ListItem>

                  
                  <Button variant = "outlined" onClick = {viewAllFeeClick}>
                    View All Fees
                  </Button>
                  <Button variant = "outlined" align = "right">
                    Edit Fee Record
                  </Button>
                    <Button variant = "outlined" > Edit </Button>
                    
                  <Button variant = "outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBackClick}>
                    Back
                  </Button> 
                </ListItem>
                </Paper>
              

          )
    
      }

    return (
        <FeeRecordDisplay/>

    );
};

export default StudentFeeRecord;
