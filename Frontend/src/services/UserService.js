import axios from 'axios';
const url = process.env.API_URL;

export async function login(username, password){
    try {
        url += 'login/verify/';
        const response = await axios.get(url);
        return response;
      } catch (error) {
        console.error(error);
      }
}