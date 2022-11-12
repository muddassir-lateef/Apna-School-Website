import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import { deepOrange } from '@mui/material/colors';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
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
    <Grid justifyContent="center" display="flex" flex-direction="row">
     

    <Card sx={{ width: "90%", maxWidth: "300"  }}>
    <CardContent alignItems="center" onClick = {() =>  navigate('/Fee/Add/NewFeeForStudent')}>
    <Stack direction="row" spacing={2}>
     <Box   alignItems="center" sx={{  width: 300,  height: 100, backgroundColor: 'primary.dark', '&:hover': {  backgroundColor: 'primary.main', opacity: [0.9, 0.8, 0.7],}, }}>
     
     <Avatar
        sx={{ bgcolor: deepOrange[500]  }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      >
        B
      </Avatar>
    
    </Box>
     <Typography>
      Hello
    </Typography>
    <Typography>
      Np
    </Typography>
    </Stack>
    </CardContent>
    <CardContent alignItems="center" onClick = {() =>  navigate('/Fee/Add/NewFeeForClass')}>
    <Stack direction="row" spacing={2}>
     <Box   alignItems="center" sx={{  width: 300,  height: 100, backgroundColor: 'primary.dark', '&:hover': {  backgroundColor: 'primary.main', opacity: [0.9, 0.8, 0.7],}, }}>
     
     <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt="Remy Sharp"
        src="/broken-image.jpg"
      >
        B
      </Avatar>
    
    </Box>
     <Typography>
      Hello
    </Typography>
    <Typography>
      Np
    </Typography>
    </Stack>
    </CardContent>
    </Card>
    
    </Grid>
      
  );
}