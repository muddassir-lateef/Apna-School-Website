import React from 'react';
import { useState } from 'react';
import { TextField,Button } from '@mui/material';
import { getStudents } from '../../services/UserService';
import axios from 'axios';

const AllStudents = () => {


  const [message, setMessage] = useState('');
  const [student, setStudent] = useState([]);

  const textChange = event => {
    setMessage(event.target.value);
  };

  const buttonClick = event => {
    axios.get('http://localhost:5000/student/6969').then((response) => {
      console.log(response.data)
      setStudent(response.data)
    })
    // const res = getStudents()
    //   .then((response) => {
    //     if (response.status === 201) {
    //       setStudent(response.data)
    //     }
    //   })
    //   .catch((err) => {
    //     alert("Not Found")
    //   });
    
  }
  
  return (
    <>
      <h3>All Students are being printed here </h3>
      <TextField id="outlined-name" label="Name" onChange={textChange} />
      <Button variant="contained" onClick={buttonClick}>Contained</Button>
      student : {student}
    </>
  )
};

export default AllStudents;