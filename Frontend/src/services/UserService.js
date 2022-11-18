import axios from "axios";
let URL = "https://orca-app-5kw65.ondigitalocean.app/";
//let URL = "http://localhost:5000/";

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
  otherFee,
  scholarshipAmount
) {



  const outStandingFees = 0;
  let totalFee = tuitionFee + otherFee;
  const feeList = null;
  console.log("hit")
  let tempURL = URL + "student/addStudent";
  const response = await axios.post(tempURL, {
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

export async function getAllStudentsInClass(classYear) {
  let tempURL = URL + "class/getAllStudentsInClass/"; // 'http://localhost:5000/class/getAllStudentsInClass/:classYear'
  tempURL = tempURL + classYear;
  console.log(tempURL);
  const response = await axios.get(tempURL);
  return response;
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

export async function generateStudentFee(rollNumber, date)
{
  console.log("in generation user serivce")
  console.log(rollNumber)
  console.log(date)
  let tempURL = URL + 'feeRecord/generateStudentFee'
  const response = await axios.patch(tempURL, {rollNumber, date})
  if(response.status === 201)
  {
    return 1
  }
  else
  {
    return -1
  }
}
export async function generateNewStudentFee(rollNumber, date, tuitionFee, fineFee, otherFee)
{
  console.log("in generation user serivce")
  console.log(rollNumber)
  console.log(date)
  console.log(tuitionFee)
  console.log(fineFee)
  console.log(otherFee)
  const totalFee = tuitionFee + otherFee + fineFee
  console.log(totalFee)
  let tempURL = URL + 'feeRecord/generateNewStudentFee'
  const response = await axios.patch(tempURL, {rollNumber, date, totalFee, tuitionFee, otherFee, fineFee})
  if(response.status === 201)
  {
    return 1
  }
  else
  {
    return -1
  }
}


export async function updateStudent(rollNumber, firstName, lastName, Age1, cnic, guardianFirstName, guardianLastName, houseAddress, phoneNumber, emailAddress, image) {
  let tempURL = URL + 'student/update';
  console.log("In service")
  let Age = Number(Age1)
  console.log(Age)
  const response = await axios.patch(tempURL, {
    rollNumber, firstName, lastName, Age, cnic, guardianFirstName, guardianLastName, houseAddress, phoneNumber, emailAddress, image
  });
  return response;
}
export async function getAllTeachers() {
  let tempURL = URL + 'teacher' // 'http://localhost:5000/student'
  console.log(tempURL);
  const response = await axios.get(tempURL);
  if (response.status === 201) {
    console.log(response)
    return response;
  }
  else if (response.status === 401) {
    return -1
  }
}

export async function getAllSectionsInClass(classYear) {
  console.log("Getting all")
  console.log(classYear)
  let tempURL = URL + `class/getAllSectionsInClass/${classYear}`
  console.log(tempURL)
  const response = await axios.get(tempURL);


  if (response !== null)
    console.log("we good")
  return response;
}

export async function addClass(classYear1) {
  let tempURL = URL + 'class/addClass'
  console.log("here")
  let classYear = Number(classYear1)
  console.log("there")
  console.log(classYear)
  const response = await axios.post(tempURL, {
    classYear
  })

  console.log("hitafter")
  console.log(response)
  if (response.status === 201) {
    console.log("here")
    return response
  }
  else if (response.data === 1) {
    console.log("not working")
    return response
  }
}

export async function getAllClasses() {
  let tempURL = URL + 'class/getAllClasses'
  console.log(tempURL)
  const response = await axios.get(tempURL);
  if (response.status === 201) {
    return response;
  }
  else if (response.status === 401) {
    return -1;
  }
}
export async function deleteStudent(rollNumber) {
  let tempURL = URL + 'student/deleteStudent/' + rollNumber;

  console.log(tempURL)
  const response = await axios.delete(tempURL)
  if (response.status === 201) {
    return response;
  }
  else if (response.status === 401) {
    return -1;
  }

}

export async function getClassByClassYear(tempClassYear) {
  let tempURL = URL + 'class/getClass/' + tempClassYear
  console.log(tempURL)
  const response = await axios.get(tempURL);
  if (response.status === 201) {
    return response;
  }
  else {
    console.log("not good")
    return -1;
  }
}

export async function deleteTeacher(username) {
  let tempURL = URL + `teacher/${username}`;
  const response = await axios.delete(tempURL);
  return response;
}

export async function getTeacher(username) {
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
  const response = await axios.patch(tempURL, {
    classYear,
    sectionName
  }
  );

  if (response.status === 201) {
    console.log("success")
    console.log(response.data)
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
  if (response.status === 201) {
    console.log("Success")
    return response;
  }
  else {
    console.log(response.data)
    console.log("Failed")
    return -1
  }
}

export async function getStudentFeeRecord(rollNumber) {
  console.log("In get Fee Record User Service")
  let tempURL = URL + 'feeRecord/getStudentFeeRecord/' + rollNumber;
  const response = await axios.get(tempURL);
  if (response.status === 201) {
    return response;
  }
  else {
    return -1;
  }
}

export async function getAllSections() {
  let tempURL = URL + 'class/getAllClasses';
  const response = await axios.get(tempURL);
  return response;
}
export async function getSections() {
  let tempURL = URL + 'section/';
  const response = await axios.get(tempURL);
  return response;
}

export async function getSectionById(id) {
  let tempURL = URL + `section/${id}`
  const response = await axios.get(tempURL);
  return response;
}

export async function assignTeacher(username, classYear, section) {
  let tempURL = URL + 'class/assignTeacher';
  const response = await axios.patch(tempURL, {
    username, classYear, section
  });
  return response;
}

export async function unAssignTeacher(username, classYear, section) {
  let tempURL = URL + `teacher/unassign/${username}`;
  const response = await axios.patch(tempURL, {
    classYear, section
  });
  return response;
}

export async function removeStudentFromSection(classYear, sectionName, rollNumber) {
  let tempURL = URL + 'section/removeStudentFromSection';
  console.log("Values")
  console.log(rollNumber)
  console.log(sectionName)
  const response = await axios.patch(tempURL, { rollNumber, classYear, sectionName })
  if (response.status === 201) {
    return 1
  }
  else
    return -1;
}

export async function changeStudentSection(classYear, sectionName, rollNumber) {
  let tempURL = URL + 'section/changeStudentSection';
  console.log("In the service")
  console.log(rollNumber)
  console.log(classYear)
  console.log(sectionName)
  const response = await axios.patch(tempURL, { classYear, sectionName, rollNumber })
  if (response.status === 201) {
    return response;
  }
  else {
    return response
  }


}

export async function deleteClass(classYear) {
  let tempURL = URL + 'class/deleteClass';
  console.log("route")
  console.log(classYear)
  const response = await axios.patch(tempURL, { classYear })
  if (response.status === 201) {
    return response
  }
  else {
    return 1;
  }
}

export async function addNewSectionToClass(classYear1, sectionName1) {
  let tempURL = URL + 'class/addNewSectionToClass'
  console.log("here are the details")
  let classYear = Number(classYear1)
  console.log(classYear)

  let sectionName = sectionName1.toUpperCase();
  const response = await axios.post(tempURL, { classYear, sectionName })
  console.log("After req")
  if (response.data === 1) {
    console.log("not working")
    return response;
  }
  else if (response.status === 201) {
    return response;
  }

}

export async function deleteSection(classYear1, sectionName) {
  let tempURL = URL + 'class/deleteSection'
  const classYear = Number(classYear1)
  console.log(classYear)
  console.log(sectionName)
  const response = await axios.patch(tempURL, { classYear, sectionName })
  if (response.status === 201) {
    console.log("success")
    return 1
  }
  else {
    console.log("fail")
    return -1
  }

}

export async function addNewExam(subject, venue, totalMarks, date, classId) {
  let tempURL = URL + "exam/addNew";
  const response = await axios.post(tempURL, {
    subject, venue, totalMarks, date, classId
  });
  return response;
}

export async function getAllExams () {
  let tempURL = URL + 'exam' 
  const response = await axios.get(tempURL);
  return response;
}

export async function deleteExam (examId) {
  let tempURL = URL + `exam/${examId}`;
  const response = await axios.delete(tempURL);
  return response;
}
export async function getExamById(id){
  let tempURL = URL + `exam/${id}`
  const response = await axios.get(tempURL);
  return response;
}
export async function getstudentAttendanceRegisteries(section,classYear) {

  
  let tempURL = URL + 'studentAttendance/getAttendanceRegisteries';
  const response2 = await axios.patch(tempURL,{section,classYear});

  return response2;

}
export async function genstudentAttendanceRegisteries(section,classYear) {

  
  let tempURL = URL + 'studentAttendance/genClassAttendance';
  const response1 = await axios.post(tempURL,{section,classYear});
  return response1;

}

export async function getstudentAttendanceEnteries(section,classYear,date) {


  let tempURL = URL + 'studentAttendance/getAttendanceEnteries';
  const response2 = await axios.patch(tempURL,{section,classYear,date});

  return response2;
}


export async function setStudentAttendanceEnteries(attendance) {

console.log("in")
  let tempURL = URL + 'studentAttendance/setAttendanceEnteries';
  const response2 = await axios.patch(tempURL,{attendance});

  return response2;
}

export async function markFeePaid(rollNumber, id) {
  console.log("In user service function")
  console.log(id)
  let tempURL = URL + 'feeRecord/markFeePaid';
  const response = await axios.patch(tempURL, {rollNumber,id})
  if(response.status === 201 )
  {
      return 1
  }
  else {
    return -1
  }
 
}
export async function payFee(rollNumber, id, amount) {
  console.log("In the service")
  console.log(id + " " + rollNumber+ " " + amount)
  console.log(typeof amount)
  console.log(typeof id)
  console.log(typeof "hey")
  let tempURL = URL + 'feeRecord/payFee'
  const response = await axios.patch(tempURL, {rollNumber, id, amount})
  if(response.status === 201)
  {
    return 1
  }
  else 
  {
    return -1
  }
}
export async function deleteFeeDetails(rollNumber, id) {
  console.log("In the delete service")
  console.log(rollNumber)
  console.log(id)
  let tempURL = URL + 'feeRecord/deleteFeeDetails'
  const response = await axios.patch(tempURL, {rollNumber, id})
  if (response.status === 201)
  {
    return 1
  }
  else {
    return -1
  }
}

export async function editFeeRecord(tuitionFee, securityFee, scholarshipAmount, otherFee, id) {
  let tempURL = URL + 'feeRecord/updateStudentFeeRecord'
  const response = await axios.patch(tempURL, {tuitionFee, securityFee, otherFee, scholarshipAmount, id})
  if(response.status === 201)
  {
    return 1
  }
  else {
    return -1
  }
}

export async function generateFeeForListOfStudents(classYear, date, sectionName) {
  let tempURL = URL + 'feeRecord/generateFeeForListOfStudents';
  //console.log("In the service")
 // console.log(classYear)
 // console.log(date)
 // console.log(sectionName)
 console.log("FINAL")
  const response = await axios.post(tempURL, {classYear, date, sectionName})
  if(response.status === 201)
  {
    //console.log("Success")
    return 1
  }
  else {
    return -1
  }
}

export async function getAllSectionsInClassByClassYear(classYear) {
  let tempURL = URL + 'class/getAllSectionsInClassByClassYear/' + classYear
  //console.log("In the Service")
  //console.log(classYear)
  if(classYear === "")
  {
    return -1
  }
  if(classYear === "All")
  {
    return -1
  }
  const response = await axios.get(tempURL, {classYear})
  if(response.status == 201)
  {
    return response
  }
  else {
    return -1
  }
}

export async function getStudentsForFee(classYear, sectionName) {
  console.log("In the student search box service")
  console.log("Class Year" + classYear + "Section" + sectionName)
  let tempURL = URL + 'student/getStudentsForFee'
  const response = await axios.patch(tempURL, {classYear, sectionName})
  console.log(response.data)
  if(response.status === 201)
  {
    return 1
  }
  if(response.status === 401)
  {
    return -1
  }
}

export async function addFeeDetailToStudentFeeRecord(classYear, sectionName, tuitionFee, otherFee, fineFee) {
  let tempURL = URL + 'feeRecord/addFeeDetailToStudentFeeRecord'
  console.log("classYear " + classYear)
  console.log("Section " + sectionName)
  console.log("Tuition Fee " + tuitionFee)
  console.log("Other Fee " + otherFee)
  console.log("Fine Fee " + fineFee)
  const response = await axios.patch(tempURL, {classYear, sectionName, tuitionFee, otherFee, fineFee})
  if(response.status === 201)
  {
    return 1
  }
  else {
    return -1
  }
}

export async function addMarks(marksList, examId) {
  //http://localhost:5000/exam/addMarks/63689cac7bb3db22973189b7
  let tempURL = URL + `exam/addMarks/${examId}`;
  const response = await axios.patch(tempURL, {
    marksList
  });
  return response;
}

export async function getMarks(examId) {
  //http://localhost:5000/exam/getMarks/63689cac7bb3db22973189b7
  let tempURL = URL + `exam/getMarks/${examId}`;
  const response = await axios.get(tempURL);
  return response;
}

export async function getAllMarks() {
  //http://localhost:5000/marks
  let tempURL = URL + `marks`;
  const response = await axios.get(tempURL);
  return response;
}