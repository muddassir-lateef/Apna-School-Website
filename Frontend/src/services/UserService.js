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
  image,
  tuitionFee,
  securityFee,
  otherFee,
  scholarshipAmount
) {
   
  

        const outStandingFees = 0;
        let totalFee = tuitionFee + otherFee + securityFee;
        const feeList =  null;
  console.log("hit")
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
    image,
    securityFee,
    outStandingFees,
    totalFee,
    tuitionFee,
    feeList,
    scholarshipAmount,
    otherFee
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

export async function updateTeacher(oldUsername, firstName, lastName, age, username, image) {
  let tempURL = URL + `teacher/${oldUsername}`;
  const response = await axios.patch(tempURL, {
    firstName, lastName, age, username, image
  });
  return response;

}
export async function getAllTeachers() {
  let tempURL = URL + 'teacher' // 'http://localhost:5000/student'
  console.log(tempURL);
  const response = await axios.get(tempURL);
  if(response.status === 201) {
    console.log(response)
    return response;
  }
  else if(response.status === 401)
  {
    return -1
  }
}

export async function getAllSectionsInClass(classYear) {
let tempURL = URL + `class/getAllSectionsInClass/${classYear}`
console.log(tempURL)
const response = await axios.get(tempURL);
console.log("lol")

if(response !== null)
console.log("we good")
return response;
}

export async function addClass(classYear) {
  let tempURL = URL + 'class/addClass'
  const response = await axios.post(tempURL, {
    classYear
  })
  if(response.status === 201)
  {
    return response
  }
  else if (response.status === 401)
  {
    return response
  }
}

export async function getAllClasses() {
  let tempURL = URL +'class/getAllClasses'
  console.log(tempURL)
  const response = await axios.get(tempURL);
  if(response.status === 201) {
    return response;
  }
  else if(response.status === 401) {
    return -1;
  }
}
export async function deleteStudent(rollNumber) {
  let tempURL = URL +'student/deleteStudent/' + rollNumber;
  
  console.log(tempURL)
  const response = await axios.delete(tempURL)
  if(response.status === 201) {
    return response;
  }
  else if(response.status === 401){
    return -1;
  }

}

export async function getClassByClassYear(tempClassYear) {
  let tempURL = URL + 'class/getClass/' + tempClassYear
  console.log(tempURL)
  const response = await axios.get(tempURL);
  if(response.status === 201)
  {
    console.log("we good")
    return response;
  }
  else 
  {
    console.log("not good")
    return -1;
  }
}

export async function deleteTeacher(username){
  let tempURL = URL + `teacher/${username}`;
  const response = await axios.delete(tempURL);
  return response;
}

export async function getTeacher(username){
  let tempURL = URL + `teacher/${username}`;
  const response = await axios.get(tempURL);
  return response;

}

export async function getAllStudentsInSection(classYear, sectionName) {
  console.log("Year")
  console.log(classYear)
  console.log("Section")
  console.log(sectionName)


  let tempURL = URL + 'section/getAllStudentsInSection'
  console.log(tempURL)
  const response = await axios.patch(tempURL,{classYear,
  sectionName}
  );

  if(response.status === 201)
  {
    return response;
  }
  else {
    console.log("Failed")
    return -1
  }
}

export async function getAllFeeDetailsFromStudentFeeRecord(rollNumber) {
  console.log("here")
  console.log(rollNumber)
  let tempURL = URL + 'feeRecord/getAllFeeDetailsFromStudentFeeRecord/' + rollNumber
  console.log(tempURL);
  const response = await axios.get(tempURL);
  console.log(response)
  if(response.status === 201)
  {
    console.log("Success")
    return response;
  }
  else 
  {
    console.log(response.data)
    console.log("Failed")
    return -1
  }
}

export async function getStudentFeeRecord(rollNumber) {
  console.log("In get Fee Record User Service")
  let tempURL = URL +'feeRecord/getStudentFeeRecord/' + rollNumber;
  const response = await axios.get(tempURL);
  if(response.status === 201)
  {
    return response;
  }
  else
  {
    return -1;
  }
}

export async function getAllSections() {
  let tempURL = URL + 'class/getAllClasses';
  const response = await axios.get(tempURL);
  return response;
}

export async function assignTeacher(username, classYear, section){
  let tempURL = URL + 'class/assignTeacher';
  const response = await axios.patch(tempURL, {
    username, classYear, section
  });
  return response;
}

export async function removeStudentFromSection(classYear, sectionName, rollNumber) {
  let tempURL = URL + 'section/removeStudentFromSection';
  console.log("Values")
  console.log(rollNumber)
  console.log(sectionName)
  const response = await axios.patch(tempURL,{ rollNumber, classYear,  sectionName})
  if(response.status === 201)
  {
    return 1
  }
  else
  return -1;
}