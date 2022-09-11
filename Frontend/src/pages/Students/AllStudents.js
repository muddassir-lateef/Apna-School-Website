import React from "react";
import { useState } from "react";
import { Button, Toolbar, Container, Box, Grid, Card } from "@mui/material";
import { getStudents } from "../../services/UserService";
import StudentSearchBox from "../../components/SearchBox";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { getAllStudents } from "../../services/UserService";
import Alert from "@mui/material/Alert"
const studentOptions = [];

const AllStudents = () => {
  const [rollNo, setrollNo] = useState("");
  const [student, setStudent] = useState([]);
  const [studentFlag, setStudentFlag] = useState();

  React.useEffect(() => {
    getAllStudents().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        if (response.data.length !== studentOptions.length){
        for (let i = 0; i < response.data.length; i++) { 
            let tempObj = {label: String(response.data[i].rollNumber)};
            studentOptions.push(tempObj) 
        }}
      } else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
      }
    }, );
  });

  const textChange = (value) => {
    setrollNo(value);
    console.log(rollNo);
  
  };

  const buttonClick = (event) => {
    event.preventDefault();
    let URL = "student/" + rollNo;

    getStudents(URL).then((response) => {
      if (response.status === 201) 
      {
        console.log(response.data);
        setStudent(response.data);
        setStudentFlag(1);
      } 
      else if (response.status === 401) 
      {
        alert("Student not found");
        console.log(response.data);
        setStudentFlag(-1);
      }
    });
  };

  const StudentDisplay = () => {
      if(studentFlag == 1 && rollNo == 0)
      return(
          student.map((stu) =>
          {
            return(
              
        <Grid justifyContent="center" display="flex">
        <Card  sx={{
            display: "flex",
            width : "50%",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            alignItems: "center",
            p: 1,
          }}>
          
        <List   component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary = {stu.firstName} />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary= {stu.rollNumber} />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary= {stu.Age} />
      </ListItem>
      </List>
          </Card>
          <Toolbar></Toolbar>
          </Grid>
          
            );
            
          })
      );
      if(studentFlag == 1 && rollNo > 0)
      return (
        <Container>
        <h1>Roll Number : {student.rollNumber}</h1>
        <h1>
          Student Name : {student.firstName} {student.lastName}
        </h1>
        <h1>Age : {student.Age}</h1>
      </Container>
      )
      }

  return (
    <Box>
      <StudentSearchBox onChange={textChange} inputValue={rollNo} options={studentOptions}/>
      <Grid  justifyContent="center" display="flex">
        <Button  variant="contained" onClick={buttonClick} sx={{mt:2, width:'100%'}}>
          Search
        </Button>
      </Grid>
      <Grid>
    <StudentDisplay></StudentDisplay>
      </Grid>
    </Box>
  );
};

export default AllStudents;
