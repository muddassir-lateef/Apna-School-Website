import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from "react-router-dom";
import { Typography } from '@mui/material';



export default function AddNewFees() {
  const navigate = useNavigate();
  const ClassFeeClicked = () => {
    let url = '/Fee/Add/NewFeeForClass';
    navigate(url);
}
  const StudentFeeClicked = () => {
    let url = '/Fee/Add/NewFeeForStudent';
    navigate(url);
  }

  return (
    <Grid justifyContent="center" display="flex" flex-direction="row">
    <Card sx={{ width: "90%", maxWidth: "900px" }}>
                  <Divider variant="middle" />
                  <Typography>
    Generate Fee Challans for Student(s)
    </Typography>
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
     <Button  fullWidth sx={{  mb: 3, flex: "100%", width: '100%' }} variant  = "outlined" onClick = {StudentFeeClicked}>
      Student
     </Button>
     </Box>
    <Divider></Divider>
    <Typography>
    Generate Fee Challans for Classes & Sections
    </Typography>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
     <Button  fullWidth sx={{  mb: 3, flex: "100%", width: '100%'}} variant = "outlined" onClick = {ClassFeeClicked}>
      Class
     </Button>
     </Box>
    <Divider></Divider>
    </Card>
    </Grid>
      
  );
}