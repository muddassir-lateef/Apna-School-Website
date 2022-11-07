import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { deepOrange, deepPurple, deepBlue } from '@mui/material/colors';
import { Button, Input, Grid } from '@mui/material'
import Stack from '@mui/material/Stack';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import PaidIcon from '@mui/icons-material/Paid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import { getAllFeeDetailsFromStudentFeeRecord, getStudentFeeRecord, editFeeRecord } from "../../services/UserService";

const StudentFeeRecord = () => {
    const [rollNumber, setRollNumber] = useState(0)
    const [feeRecord, setFeeRecord] = useState(0);
    const [firstName,setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const location = useLocation();
    const [edit, setEdit] = useState(true)
    const [tuFee, setTuFee] = useState("")
    const [secFee, setSecFee] = useState("")
    const [otFee, setOtFee] = useState("")
    const [scFee, setScFee] = useState("")
    const [undo, setUndo] = useState(true)
    const [tempFeeId, setTempFeeId] = useState("");
    const [flag, setFlag] = useState(true)
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
                console.log(feeRecord.tuitionFee)
                console.log("Attempt ")
                console.log(scFee)
                setTempFeeId(feeRecord._id)
                setFeeRecord(response.data)
                setTuFee(response.data.tuitionFee)
                setSecFee(response.data.securityFee)
                setScFee(response.data.scholarshipAmount)
                setOtFee(response.data.otherFee)
            }
            else if (response.status === -1) {
                alert("Sections not Found");
                console.log(response.data);
            }
        })
    }, [flag]);

    const handleGoBackClick = () => {
      let url = `/Fee/ViewFees`;
      navigate(url);
    }

    const viewAllFeeClick = () => {
      navigate("/Fee/FeeList", {
        state: { param1: rollNumber, param2 : firstName, param3 : lastName},
      })

    }

    const onSaveClicked = () => {
      console.log("The Fees")
      console.log(tuFee + " " + scFee + " " + otFee + " " + secFee + " " + tempFeeId)
      setEdit(true)
      setFlag((isOpen) => !isOpen)
      editFeeRecord(tuFee, secFee, scFee, otFee, feeRecord._id).then((response) => {
        if(response == 1)
        {
          setFlag((isOpen) => !isOpen)
        }
        else {
          setFlag((isOpen) => !isOpen)
        }
      })
      
    }
    const OnEditClicked = (value) => {
      if(value.type === false)
      {
        setUndo(false)
        return (
          <Button variant = "contained" onClick = {onSaveClicked}>
            Save
          </Button>
        )
      }
      if(value.type === true)
      {
        setUndo(true)
        return (
          <Button variant = "outlined" onClick = {() => setEdit(false)}>
            Edit
          </Button>
        )
      }
    }

    const undoClicked = () => {
      setFlag((isOpen) => !isOpen)
    }
      
          return ( 
            <Paper variant="outlined" square>
              <List sx={{ width: '100%', maxWidth: 500, bgcolor: '#0000' }} justifyContent="space-between">
                <ListItem textAlign = "right">
                  <Typography variant = "h6" gutterBottom>
                    Fee Record
                  </Typography>
                </ListItem>
                <Grid container display="flex" justifyContent="space-between">
                <OnEditClicked type = {edit}/> 
                    <Button disabled = {undo} variant = "outlined" onClick = {undoClicked}>
                      UNDO
                    </Button>                 
                 </Grid>      
                <Divider/>
                <Divider>
                </Divider>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Name : {"  " + firstName + ' ' + lastName}   
                </Typography>
                </ListItem>
                <Divider/>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Roll Number : {rollNumber}
                </Typography>   
                </ListItem>
                <Divider/>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Tuition Fee : 
                  <Input  disabled = {edit} value = {tuFee} placeholder = {String(feeRecord.tuitionFee)} label="Multiline" onChange = {(event) => setTuFee(event.target.value.replace(/\D/g, ''))} />
                </Typography>
                </ListItem>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Security Fee : 
                  <Input disabled = {edit} value = {secFee} placeholder = {String(feeRecord.securityFee)} onChange = {(event) => setSecFee(event.target.value.replace(/\D/g, ''))}/>      
                </Typography>
                </ListItem>
                </List>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Other Fee(s) : 
                  <Input disabled = {edit} value = {otFee} placeholder = {String(feeRecord.otherFee)} onChange = {(event) => setOtFee(event.target.value.replace(/\D/g, ''))}/>      
                </Typography>
                </ListItem>
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Scholarship Amount : 
                  <Input disabled = {edit} value = {scFee} placeholder = {String(feeRecord.scholarshipAmount)} onChange = {(event) => setScFee(event.target.value.replace(/\D/g, ''))}/>      
                </Typography>
                </ListItem>
                <Divider/>
                <Divider/>
                <Divider/>
               
                <ListItem>
                <Typography variant="h6" gutterBottom>
                  Monthly Total Fee : {feeRecord.totalFee}
                </Typography>
                </ListItem>
                <Divider/>
                <Divider/>
                <Divider/>
               
                <ListItem>
                <Typography variant="h6" gutterBottom>
                Total Outstanding Fee : {feeRecord.outStandingFees}
                </Typography>
                </ListItem>
                <Grid container display="flex" justifyContent="space-between">
                <Button variant = "outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBackClick}>
                    Back
                  </Button>
                <Button variant = "outlined" onClick = {viewAllFeeClick}>
                    View All Fees
                  </Button>
                   
                 </Grid>
                </Paper>
              

          )

};

export default StudentFeeRecord;
