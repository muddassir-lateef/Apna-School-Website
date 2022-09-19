import React from "react";
import { useState, useEffect } from "react";
import { Button, Box, Grid, Card, CardContent, CardActions, Typography } from "@mui/material";
import { getStudents } from "../../services/UserService";
import StudentSearchBox from "../../components/SearchBox";
import { getAllStudents, getAllClasses, getClassByClassYear } from "../../services/UserService";
import { Image } from "cloudinary-react";
const classOptions = [];

const SearchStudent = () => {
  const [classYear, setClassYear] = useState("");
  const [classList, setClassList] = useState([]);
  const [classFlag, setClassFlag] = useState();

  React.useEffect(() => {
    getAllClasses().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        if (response.data.length !== classOptions.length) {
          for (let i = 0; i < response.data.length; i++) {
            let tempObj = { label: String(response.data[i].classYear) };
            if (classOptions.find(stu => stu.label === tempObj.label) === undefined)
              classOptions.push(tempObj)
          }
        }
      } else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
      }
    },);
  });

  const textChange = (value) => {
    setClassYear(value);
    console.log(classYear);
    setClassFlag(-1)

  };

  const buttonClick = (event) => {
    event.preventDefault();
    let URL = classYear;
    console.log("THE URL")
    console.log(URL)

    getClassByClassYear(URL).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setClassList(response.data);
        setClassFlag(1);
      }
      else if (response.status === 401) {
        alert("Class not found");
        console.log(response.data);
        setClassFlag(-1);
      }
    });
  };

  useEffect(() => {
    let URL = "class/" + classYear;

    getAllClasses().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setClassList(response.data);
        setClassFlag(1);
      }
      else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
        setClassFlag(-1);
      }
    })
  }, []);




  const StudentDisplay = () => {
    if (classFlag == 1 && classYear == 0)
      return (

          classList.map((tempClasses) => (
            <Grid item sm={12} md={6} lg={4} key={classList.rollNumber}>
              <Card sx={{ maxWidth: 340 }}>
                <Image
                  cloudName="dqxdmayga"
                  publicId={tempClasses.image}
                  width={340}
                  height={250}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {"Year : " + " " + tempClasses.classYear}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {"Strength" + " " + tempClasses.classStrength}
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

    if (classFlag == 1 && classYear > 0)
      return (

        <Grid item sm={12} md={6} lg={4} key={classList.rollNumber}>
          <Card sx={{ maxWidth: 340 }}>
            <CardContent>
              <Image
                cloudName="dqxdmayga"
                publicId={classList.image}
                width={340}
                height={250}
              />
        
              <Typography gutterBottom variant="h5" component="div">
                {"Year : " + " " + classList.classYear}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {"Strength" + " " + classList.classStrength}
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
        <StudentSearchBox onChange={textChange} inputValue={classYear} options={classOptions} />
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
