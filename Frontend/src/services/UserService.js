import axios from "axios";
let URL = "http://localhost:5000/";

export async function login(username, password) {
  let tempURL = URL + "login/verify/";
  console.log(tempURL);
  let loginDetails = { username, password };

  const response = await axios.post(tempURL, loginDetails);
  if (response.status === 201) {
    return response;
  } else if (response.status === 401) {
    return -1;
  }
}
export async function addStudent(
  rollNumber,
  Age,
  firstName,
  lastName,
  guardianFirstName,
  guardianLastName,
  cnic,
  emailAddress,
  phoneNumber,
  houseAddress,
  image
) {
  let tempURL = URL + "student/addStudent";
  const response = await axios.post(tempURL, {
    rollNumber,
    Age,
    firstName,
    lastName,
    guardianFirstName,
    guardianLastName,
    cnic,
    emailAddress,
    phoneNumber,
    houseAddress,
    image
  });
  if (response.status === 201) {
    return response;
  } else if (response.status === 401) {
    return -1;
  }
}

export async function getStudents(rollNo) {
  let tempURL = URL + rollNo; // 'student/6969'
  console.log(tempURL);
  const response = await axios.get(tempURL);
  if (response.status === 201) {
    return response;
  } else if (response.status === 401) {
    return -1;
  }
}

export async function getAllStudents() {
  let tempURL = URL + "student"; // 'http://localhost:5000/student'
  console.log(tempURL);
  const response = await axios.get(tempURL);
  if (response.status === 201) {
    return response;
  } else if (response.status === 401) {
    return -1;
  }
}


export async function addNewTeacher(firstName, lastName, age, username, image) {
  let tempURL = URL + "teacher/addNew";
  const response = await axios.post(tempURL, {
    firstName, lastName, age, username, image
  });
  if (response.status === 201) {
    return response;
  } else if (response.status === 401) {
    return -1;
  }

}
export async function getAllTeachers() {
  let tempURL = URL + 'teacher' // 'http://localhost:5000/student'
  console.log(tempURL);
  const response = await axios.get(tempURL);
  if(response.status === 201) {
    return response;
  }
  else if(response.status === 401)
  {
    return -1
  }
}

export async function getAllClasses() {
  let tempURL = URL +'class/getAllClasses'
  console.log(tempURL)
  const response = await axios.get(tempURL);
  if(response.status == 201) {
    return response;
  }
  else if(response.status == 401) {
    return -1;
  }
}

export async function getClassByClassYear(tempClassYear) {
  let tempURL = URL + 'class/getClass/' + tempClassYear
  console.log(tempURL)
  const response = await axios.get(tempURL);
  if(response.status == 201)
  {
    return response;
  }
  else if(response.status == 401)
  {
    return -1;
  }
}

export async function deleteTeacher(username){
  let tempURL = URL + `teacher/${username}`;
  const response = await axios.delete(tempURL);
  return response;
}