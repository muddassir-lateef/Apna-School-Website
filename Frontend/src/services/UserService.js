import { ClassNames } from '@emotion/react';
import axios from 'axios';
let URL = 'http://localhost:5000/';

export async function login(username, password){

  let tempURL = URL + 'login/verify/';
  console.log(tempURL);
  let loginDetails = {username, password};

  const response = await axios.post(tempURL, loginDetails);
  if (response.status === 201){
    return response;
  }
  else if (response.status === 401){
    return -1;
  }
}

export async function getStudents(rollNo) {
  let tempURL = URL + rollNo // 'student/6969'
  console.log(tempURL);
  const response = await axios.get(tempURL);
  if(response.status == 201) {
    return response;
  }
  else if(response.status == 401)
  {
    return -1
  }
}