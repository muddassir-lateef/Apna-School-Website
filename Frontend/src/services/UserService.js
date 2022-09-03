import axios from 'axios';
let url = process.env.API_URL;

export async function login(username, password){

  let tempURL = 'http://localhost:5000/login/verify/';
  let loginDetails = {username, password};

  const response = await axios.post(tempURL, loginDetails);
  if (response.status === 201){
    return response;
  }
  else if (response.status === 401){
    console.log("HELLOOO2");
    return -1;
  }
}