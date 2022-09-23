import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Grid, Card, Box, Typography, Paper } from "@mui/material";
import { getTeacher } from "../../services/UserService";
import { Image } from "cloudinary-react";
import Divider from "@mui/material/Divider";

const TeacherInfo = () => {
  let username = useParams().username;
  let [teacher, setTeacher] = useState({});
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
  return (
    <Card>
      <Grid container xs={12} style={{ padding: "0px" , display: 'flex'}}>
        <Grid item xs={12} md={6} sx= {{ display: {lg: 'none', sm:'block'} }}>
          <Image
            cloudName="dqxdmayga"
            publicId={teacher.image}
            width={340}
            height={350}
          />
        </Grid>
        <Grid item xs={12} md={6} sx= {{ display: {lg: 'block', sm:'none', xs:'none'} }}>
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
            <Grid container >
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
  );
};

export default TeacherInfo;
