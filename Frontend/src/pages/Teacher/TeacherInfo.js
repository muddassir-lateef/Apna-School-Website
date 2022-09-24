import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";

import { Grid, Card, Box, Typography, Paper, Button } from "@mui/material";
import { getTeacher } from "../../services/UserService";
import { Image } from "cloudinary-react";
import Divider from "@mui/material/Divider";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TeacherInfo = () => {
  let username = useParams().username;
  let [teacher, setTeacher] = useState({});
  const navigate = useNavigate();
  //run on page load
  useEffect(() => {
    getTeacher(username)
      .then((response) => {
        if (response.status === 201) {
          setTeacher(response.data);
        } else console.log("Teacher was not found");
      })
      .catch((err) => console.log(err));
  }, [username]);
  var d = new Date(teacher.createdAt);

  var date = d.getDate();
  var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  var year = d.getFullYear();
  var newDate = date + "/" + month + "/" + year;

  const handleGoBackClick = (e) => {
    e.preventDefault();
    let url = '/teacher/search';
    navigate(url);
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
              publicId={teacher.image}
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
              publicId={teacher.image}
              width={530}
              height={500}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ m: 1 }}>
              <Paper elevation={0}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">
                      First Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {teacher.firstName}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">
                      Last Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {teacher.lastName}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">
                      Age:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {teacher.age}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 600 }} variant="h6">
                      Username:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {teacher.username}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider />
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 700 }} variant="h6">
                      Joined:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ fontWeight: 500 }} variant="h5">
                      {newDate}
                    </Typography>
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

export default TeacherInfo;
