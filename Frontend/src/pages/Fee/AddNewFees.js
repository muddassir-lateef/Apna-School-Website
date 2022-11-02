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



export default function AddNewFees() {
  const navigate = useNavigate();
  const ClassFeeClicked = () => {
    let url = '/Fee/Add/NewFeeForClass';
    navigate(url);
}

  return (
    <Card  sx={{ width: "90%", maxWidth: "900px" }}>
        <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        alignItems: "center",

                        p: 1,
                    }}
                >
                  <Divider variant="middle" />
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Button  sx={{ pb: 2, flex: "100%" }} variant  = "outlined">
      Student
     </Button>
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Button  sx={{ pb: 2, flex: "100%" }} variant = "outlined" onClick = {ClassFeeClicked}>
      Class
     </Button>
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Button  sx={{ pb: 2, flex: "100%" }} variant = "outlined">
      Section
     </Button>
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Divider variant="middle" />
     <Button  sx={{ pb: 2, flex: "100%" }} variant = "outlined">
      All
     </Button>
      </Box>
      </Card>
  );
}