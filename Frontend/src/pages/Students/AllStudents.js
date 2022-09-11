import React from "react";
import { useState } from "react";
import { Button, Container, Box, Grid } from "@mui/material";
import { getStudents } from "../../services/UserService";
import StudentSearchBox from "../../components/StudentSeacrhBox";
import { getAllStudents } from "../../services/UserService";
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
    console.log('ROLL NUMBER: ' + rollNo);
    let URL = "student/" + rollNo;
    if(rollNo > 0)
    {
    getStudents(URL).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setStudent(response.data);
        setStudentFlag(1);
      } else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
        setStudentFlag(-1);
      }
      if(rollNo === -1)
      {
        setStudent(-1)
      }
    });
  }
  };

  return (
    <Box>
      <StudentSearchBox onChange={textChange} inputValue={rollNo} options={studentOptions}/>
      <Grid  justifyContent="center" display="flex">
        <Button  variant="contained" onClick={buttonClick} sx={{mt:2, width:'100%'}}>
          Search
        </Button>
      </Grid>
      {studentFlag === 1 ? (
        <Container>
          <h1>Roll Number : {student.rollNumber}</h1>
          <h1>
            Student Name : {student.firstName} {student.lastName}
          </h1>
          <h1>Age : {student.Age}</h1>
        </Container>
      ) : (
        <h1>Student Not Found</h1>
      )}
    </Box>
  );
};

export default AllStudents;
