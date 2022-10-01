import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { deepOrange, deepPurple, deepBlue } from '@mui/material/colors';
import { Button, Grid } from '@mui/material'
import Stack from '@mui/material/Stack';
import PaidIcon from '@mui/icons-material/Paid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useNavigate, useLocation } from "react-router-dom";
import { getAllFeeDetailsFromStudentFeeRecord } from "../../services/UserService";

const FeeRecordInfo = () => {
    const [rollNumber, setRollNumber] = useState(0)
    const [firstName,setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [feeList, setFeeList] = useState([]);
    const [displayFlag, setDisplayFlag] = useState(false)
    const location = useLocation();
    const rollNo = location.state.param1;
    const fname = location.state.param2;
    const lname = location.state.param3

    useEffect(() => {
        setRollNumber(rollNo)
        setFirstName(fname);
        setLastName(lname);
        console.log(firstName)
        getAllFeeDetailsFromStudentFeeRecord(rollNo).then((response) => {
            if (response.status === 201) {
                console.log(response.data);
                console.log("Sections Found")
                setFeeList(response.data);
                setDisplayFlag(true)
                if(response.data === null)
                {
                    setDisplayFlag(false)
                }
                
            }
            else if (response.status === -1) {
                alert("Sections not Found");
                console.log(response.data);
            }
        })
    }, []);
    const NameDisplay = () =>
    {
        return(
            <Paper variant = "outlined">
                <Typography variant="h6" gutterBottom>
                Name : {firstName + "  " + lastName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                Roll Number : {rollNumber}
                </Typography>
            </Paper>

        )
    }
    const FeeDisplay = () => {
        if(displayFlag === true)
          return (
            feeList.map((fee) => (
               
              <Paper variant="outlined">
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#0000' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#182747' }} >
                      <PaidIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                secondary={
                  
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Fee Generation Date: {Date(fee.createdAt)}
                    </Typography>
                 
                }
                />
                <Divider />
                 <ListItemText
                primary={
            
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Tuition Fee:   {fee.tuitionFee}
                    </Typography>
   
                }
              />
              <ListItemText
                primary={
            
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Security Fee:   {fee.securityFee}
                    </Typography>
   
                }
              />
              <ListItemText
                primary={
            
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Other Fee(s):   {fee.otherFee}
                    </Typography>
   
                }
              />
              <ListItemText
                primary={
            
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Paid Fee:   {fee.paidFee}
                    </Typography>
   
                }
              />
                <ListItemText
                secondary={
                  
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Total Fee: {fee.totalFee}
                    </Typography>
                 
                }
              />
                <Divider />
              <ListItemText
                primary={
            
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      remainingFee:   {fee.remainingFee}
                    </Typography>
   
                }
              />
              <Divider />
              <Divider />
              <ListItemText>
              <Stack direction="row" spacing={1}>
                <Button variant="outlined"> Mark Paid </Button>
                <Button variant="outlined"> Delete Fee </Button>
                <Button variant="outlined"> Pay Amount </Button>
                </Stack>
              </ListItemText>
                
              <Divider />
              <Divider />
              <Divider />
              </List>
              </Paper>
            ))
          );
    
      }

    return (
       <Grid>
        <NameDisplay/>
        <FeeDisplay/>
        </Grid>
        

    );
};

export default FeeRecordInfo;
