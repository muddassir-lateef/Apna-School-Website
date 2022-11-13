import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import { deepOrange } from '@mui/material/colors';
import Grid from '@mui/material/Grid'
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from "react-router-dom";
import { CardContent, Typography } from '@mui/material';



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
    <Grid justifyContent="center" container spacing={2}>
     
    <Grid item>

    
    <Card sx={{ width: "90%", maxWidth: "300"  }} >
    <CardContent alignItems="center">
    <Button startIcon = {<PersonIcon/>} size="large" onClick = {StudentFeeClicked}>
      SINGLE STUDENT
    </Button>
    </CardContent>
    </Card>
    </Grid>
    <Grid item >
    <Card sx={{ width: "90%", maxWidth: "300"  }} >
    <CardContent alignItems="center">
    <Button startIcon={<GroupsIcon />} textAlign = "center" size="large" onClick = {ClassFeeClicked}>
      MULTIPLE STUDENTS
    </Button>
    </CardContent>
    </Card>
    </Grid>
    </Grid>
      
  );
}