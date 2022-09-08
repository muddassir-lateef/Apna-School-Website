import React from 'react';
import { useState } from 'react';
import { TextField,Button,Box, Container } from '@mui/material';
import { getStudents } from '../../services/UserService';

const AllStudents = () => {


  const [rollNo, setrollNo] = useState('');
  const [student, setStudent] = useState([]);
  const [studentFlag, setStudentFlag] = useState();
  const [errormessage, setErrorMessage] = useState('');

  const textChange = event => {
    setrollNo(event.target.value);
    console.log(rollNo)
  };

  const buttonClick = event => {
    let URL = 'student/' + rollNo
    getStudents(URL).then((response) => {
      if(response.status == 201)
      {
        console.log(response.data)
        setStudent(response.data)
        setStudentFlag(1);
      }
      else if(response.status == 401)
      {
        alert("Student not found")
        console.log(response.data)
        setStudentFlag(-1)
      }
      
    })
  }
  
  return (
    <>
      <h3>Enter the Roll Number of the student </h3>
      <h1>
      <TextField id="outlined-name" label="Roll Number" onChange={textChange} />
      </h1>
      <h1>
      <Button variant="contained" onClick={buttonClick}>Search</Button>
      </h1>
      {studentFlag
        ? 
        <Container>
        <h1>
        Roll Number : {student.rollNumber}
        </h1>
        <h1>
        Student Name  : {student.firstName } {student.lastName}
        </h1>
        <h1>
        Age : {student.Age}
        </h1>
      </Container>
      : <h1>Student Not Found</h1>
}   
    </>
  )
};

export default AllStudents;