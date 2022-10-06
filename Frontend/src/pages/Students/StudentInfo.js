import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";

import { Grid, Card, Box, Typography, Paper, Button } from "@mui/material";
import { getStudents } from "../../services/UserService";
import { Image } from "cloudinary-react";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StudentInfo = () => {
  let rollNumber = useParams().rollNumber;
  let [student, setStudent] = useState({});
  const navigate = useNavigate();
  //run on page load
  useEffect(() => {
    let URL = "student/" + rollNumber;
    getStudents(URL)
      .then((response) => {
        if (response.status === 201) {
          setStudent(response.data);
        } else console.log("Student was not Found");
      })
      .catch((err) => console.log(err));
  }, [rollNumber]);
  var d = new Date(student.createdAt);

  var date = d.getDate();
  var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  var year = d.getFullYear();
  var newDate = date + "/" + month + "/" + year;

  const handleGoBackClick = (e) => {
    e.preventDefault();
    let url = '/students/search';
    navigate(url);
  }

  const handleViewFeeRecord = (e, Name, Name2) => {
    console.log(e)
    console.log(Name)
    console.log(Name2)
    navigate("/student/FeeRecord", {
        state: { param1: e, param2 : Name, param3 : Name2},
      })
    
  }
  return (
    <>
      <Card>
        <Grid container xs={12} style={{ padding: "0px", display: "flex" }}>
        <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { lg: "none", sm: "block" } }}
          >
            <Image
              cloudName="dqxdmayga"
              publicId={student.image}
              width={340}
              height={350}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ display: { lg: "block", sm: "none", xs: "none" } }}
          >
            <Image
              cloudName="dqxdmayga"
              publicId={student.image}
              width={530}
              height={500}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ m: 1 }}>
              <Paper elevation={0}>
                  <Divider />
                <Divider />
                <Divider />
              <Grid container>     
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      Roll Number:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {student.rollNumber}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider/>
                <Grid container>     
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      Student Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {student.firstName +' '+ student.lastName}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>     
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      Guardian Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {student.guardianFirstName + ' ' + student.guardianLastName}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      Age:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {student.Age}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      Class:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {student.classYear + ' - ' + student.sectionName}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      Phone Number:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {student.phoneNumber}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      Email Address:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {student.emailAddress}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      House Address:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {student.houseAddress}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      CNIC:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {student.cnic}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h7">
                      Admission Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h7">
                      {newDate}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Divider />
                <Divider />
                <Grid container>
                  <Grid item xs={0} variant = 'contained'>
                    <Button 
                    variant = "contained"
                    onClick={() => handleViewFeeRecord(student.rollNumber, student.firstName, student.lastName)}
                    > 
                      View Fee Record:
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={2} sx={{mt:1}}>
        <Grid item xs={12} textAlign="right">
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBackClick}>Go Back</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default StudentInfo;
