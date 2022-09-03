import axios from 'axios';
let url = process.env.API_URL;

export async function login(username, password){
    try {
        url += 'login/verify/';
        let tempURL = 'http://localhost:5000/login/verify/';
        const response = await axios.post(tempURL, {
            username,
            password
          }).catch((error)=>{return error});
        if (response.status === 201)
            return response;
      } catch (error) {
        console.error(error);
      }

}