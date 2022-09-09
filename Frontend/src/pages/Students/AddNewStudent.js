import { Typography, Card, Grid, Box, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Avatar from "@mui/material/Avatar";
import React from "react";
import FormPropsTextFields from "../../components/AddNewStudentInputForm";

import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

const AddNewStudent = () => {
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
          <TextField id="firstName" label="First Name" variant="standard" />
          <TextField id="lastName" label="Last Name" variant="standard" />
          <TextField id="age" label="Age" variant="standard" />
          <TextField
            id="guardianName"
            label="Guradian Name"
            variant="standard"
          />
          <TextField id="cnic" label="Cnic" variant="standard" />
          <TextField id="rollNumber" label="Roll Number" variant="standard" />

          <TextField id="address" label="Address" variant="standard" />
          <TextField id="email" label="Email" variant="standard" />
          <TextField
            id="phoneNumber"
            label="Contact Number"
            variant="standard"
          />

          <Grid container display="flex" justifyContent="flex-end">
            <Button variant="contained" endIcon={<SendIcon />} sx={{ mt: 2 }}>
              Submit
            </Button>
          </Grid>
        </Box>
      </Card>
    </Grid>

  );
};

export default AddNewStudent;
