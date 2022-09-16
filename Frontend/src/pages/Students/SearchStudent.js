import React from "react";
import { useState, useEffect } from "react";
import { Button, Box, Grid, Card, CardContent, CardActions, Typography } from "@mui/material";
import { getStudents } from "../../services/UserService";
import StudentSearchBox from "../../components/SearchBox";
import { getAllStudents } from "../../services/UserService";
import { Image } from "cloudinary-react";
const studentOptions = [];

const SearchStudent = () => {
  const [rollNo, setrollNo] = useState("");
  const [student, setStudent] = useState([]);
  const [studentFlag, setStudentFlag] = useState();

  React.useEffect(() => {
    getAllStudents().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        if (response.data.length !== studentOptions.length) {
          for (let i = 0; i < response.data.length; i++) {
            let tempObj = { label: String(response.data[i].rollNumber) };
            if (studentOptions.find(stu => stu.label === tempObj.label) === undefined)
              studentOptions.push(tempObj)
          }
        }
      } else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
      }
    },);
  });

  const textChange = (value) => {
    setrollNo(value);
    console.log(rollNo);
    setStudentFlag(-1)

  };

  const buttonClick = (event) => {
    event.preventDefault();
    let URL = "student/" + rollNo;

    getStudents(URL).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setStudent(response.data);
        setStudentFlag(1);
      }
      else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
        setStudentFlag(-1);
      }
    });
  };

  useEffect(() => {
    let URL = "student/" + rollNo;

    getStudents(URL).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setStudent(response.data);
        setStudentFlag(1);
      }
      else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
        setStudentFlag(-1);
      }
    })
  }, []);




  const StudentDisplay = () => {
    if (studentFlag == 1 && rollNo == 0)
      return (

          student.map((stu) => (
            <Grid item sm={12} md={6} lg={4} key={stu.rollNumber}>
              <Card sx={{ maxWidth: 340 }}>
                <Image
                  cloudName="dqxdmayga"
                  publicId={stu.image}
                  width={340}
                  height={250}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {stu.rollNumber}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {stu.firstName + " " + stu.lastName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Edit</Button>
                  <Button size="small">Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
      );

    if (studentFlag == 1 && rollNo > 0)
      return (

        <Grid item sm={12} md={6} lg={4} key={student.rollNumber}>
          <Card sx={{ maxWidth: 340 }}>
            <CardContent>
              <Image
                cloudName="dqxdmayga"
                publicId={student.image}
                width={340}
                height={250}
              />
              <Typography gutterBottom variant="h5" component="div">
                {student.rollNumber}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {student.firstName + " " + student.lastName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
              <Button size="small">Delete</Button>
            </CardActions>
          </Card>
        </Grid>
      );


  }

  return (

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StudentSearchBox onChange={textChange} inputValue={rollNo} options={studentOptions} />
      </Grid>



      <Grid item sm={12}>
        <Button variant="contained" onClick={buttonClick} sx={{ mt: 2, width: '100%' }}>
          Search
        </Button>
      </Grid>

      <StudentDisplay></StudentDisplay>

    </Grid>



  );
};

export default SearchStudent;
