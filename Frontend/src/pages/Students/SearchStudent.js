import React from "react";
import { useState, useEffect } from "react";
import { 
  Button, Box, Grid, Card, CardContent, CardActions, Typography,Fade,
  Backdrop, Modal, Alert
       } from "@mui/material";
import { getStudents, getAllStudents, deleteStudent } from "../../services/UserService";
import { Image } from "cloudinary-react";

import StudentSearchBox from "../../components/SearchBox";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from "@mui/material/Snackbar";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const studentOptions = [];

const SearchStudent = () => {
  const [rollNo, setrollNo] = useState("");
  const [student, setStudent] = useState([]);
  const [studentFlag, setStudentFlag] = useState();
  const [tempStudent, setTempStudent] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false); 
  const [snackOpen, setSnackOpen] = React.useState(false);


  React.useEffect(() => {
    getAllStudents().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        if (response.data.length !== studentOptions.length) {
          for (let i = 0; i < response.data.length; i++) {
            let tempObj = { label: String(response.data[i].rollNumber) };
            if (studentOptions.find(stu => stu.label === tempObj.label) === undefined)
              studentOptions.push(tempObj)
          }
        }
      } else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
      }
    },);
  });

  const textChange = (value) => {
    setrollNo(value);
    console.log(rollNo);
    setStudentFlag(-1)

  };

  const handleModalClose = () => {
    setModalOpen((isOpen) => !isOpen);
  };

  const buttonClick = (event) => {
    event.preventDefault();
    let URL = "student/" + rollNo;

    getStudents(URL).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setStudent(response.data);
        setStudentFlag(1);
      }
      else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
        setStudentFlag(-1);
      }
    });
  };

  const handleDeleteStudent = (studentRollNumber) => {
    setTempStudent(studentRollNumber);
    console.log(studentRollNumber)
    setModalOpen(true);
  }

  const StatusAlert = () => {
    if (refreshFlag === true)
      return (
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Student deleted Successfully!
        </Alert>
      );
  };

  const DeleteStudent = () => {
    console.log(tempStudent);
    deleteStudent(tempStudent).then((response) => {
      if(response.status === 201) {
        setModalOpen(false);
        if(refreshFlag == true)
        {
          setRefreshFlag(false)
          setRefreshFlag(true)
        }
        else if(refreshFlag == false)
        {
          setRefreshFlag(true)
        }
      }
      else {
        setRefreshFlag(false);
      }
    })
  }

  useEffect(() => {
    let URL = "student/" + rollNo;

    getStudents(URL).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setStudent(response.data);
        setStudentFlag(1);
      }
      else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
        setStudentFlag(-1);
      }
    })
  }, [refreshFlag]);




  const StudentDisplay = () => {
    if (studentFlag == 1 && rollNo == 0)
      return (
          student.map((stu) => (
            <Grid item sm={12} md={6} lg={4} key={stu.rollNumber}>
              <Card sx={{ maxWidth: 320 }}>
                <Image
                  cloudName="dqxdmayga"
                  publicId={stu.image}
                  width={320}
                  height={250}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {stu.rollNumber}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {stu.firstName + " " + stu.lastName}
                  </Typography>
                </CardContent>
                <CardActions>
                <Box sx={{ width:'100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button sx={{width:'40%'}} variant="contained" component="label" startIcon={<EditIcon/>}>Edit</Button>
                <Button
              sx={{width:'40%'}}
                variant="outlined" color="error"
                onClick={() => handleDeleteStudent(stu.rollNumber)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              </Box>
                </CardActions>
              </Card>
            </Grid>
          ))
      );

    if (studentFlag == 1 && rollNo > 0)
      return (

        <Grid item sm={12} md={6} lg={4} key={student.rollNumber}>
          <Card sx={{ maxWidth: 320 }}>
            <CardContent>
              <Image
                cloudName="dqxdmayga"
                publicId={student.image}
                width={320}
                height={250}
              />
              <Typography gutterBottom variant="h5" component="div">
                {student.rollNumber}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {student.firstName + " " + student.lastName}
              </Typography>
            </CardContent>
            <CardActions>
            <Box sx={{ width:'100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button sx={{width:'40%'}} variant="contained" component="label" startIcon={<EditIcon/>}>Edit</Button>
            <Button
              sx={{width:'40%'}}
                variant="outlined" color="error"
                onClick={() => handleDeleteStudent(student.rollNumber)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              </Box>
            </CardActions>
          </Card>
        </Grid>
      );


  }

  return (

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StudentSearchBox onChange={textChange} inputValue={rollNo} options={studentOptions} />
      </Grid>

      <Grid item sm={12}>
        <Button variant="contained" onClick={buttonClick} sx={{ mt: 2, width: '100%' }}>
          Search
        </Button>
      </Grid>

      <Grid item xs={11}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalOpen}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: 2 }}
              >
                Are you sure you want to delete this Student?
              </Typography>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => setModalOpen((prevState) => !prevState)}
                  variant="contained"
                  component="label"
                  sx={{ mr: 3 }}
                >
                  Go Back
                </Button>
                <Button onClick={DeleteStudent} variant="outlined" color="error">
                  DELETE
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Grid>


      <StudentDisplay></StudentDisplay>
      <StatusAlert/>

    </Grid>



  );
};

export default SearchStudent;
