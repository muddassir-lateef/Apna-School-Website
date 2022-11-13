import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useParams, } from 'react-router-dom';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Image } from "cloudinary-react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemButton from '@mui/material/ListItemButton'
import SearchBox from "../../components/SearchBox";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from "react-router-dom";
import { getAllStudentsInSection, deleteStudent, removeStudentFromSection, getAllStudents, changeStudentSection,  } from "../../services/UserService";
import Paper from '@mui/material/Paper';
import {
  Button, Grid, Card, Modal, Fade, Box,
  Backdrop
} from '@mui/material'
import Typography from '@mui/material/Typography';
import { Cloudinary } from "@cloudinary/url-gen";

export default function AlignItemsList() {
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [username, setUsername] = useState(0);
  const [tempSection, setTempSection] = useState()
  const [tempClass, setTempClass] = useState();
  const [sectionFlag, setSectionFlag] = useState(false)
  const [studentList, setStudentList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [teachersMasterList, setTeachersMasterList] = useState([]);
  const [tempStudent, setTempStudent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [studentViewList, setStudentViewList] = useState([])
  const [studentMasterList, setStudentMasterList] = useState([])
  const [addStudentRollNumber, setAddStudentRollNumber] = useState([])
  const [refreshFlag, setRefreshFlag] = useState(false)
  const location = useLocation();
  const [count, setCount] = useState(0);
  const classYear = Number(location.state.param2);
  const sectionName = location.state.param1;

  const navigate = useNavigate();
  
  useEffect(() => {
    getAllStudentsInSection(classYear, sectionName).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        console.log("Students Found")
        setStudentList(response.data);
        console.log("after setting")
      }
      else if (response.status === -1) {
        alert("Students not Found");
        console.log(response.data);
      }
    })
  }, [addModalOpen, modalOpen]);

  useEffect(() => {
    console.log("Assigning roll Number on text Change")

    setAddStudentRollNumber(username)
    console.log(username)
    //console.log(addStudentRollNumber)
  }, [username])

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
  const StudentDisplay = () => {
    return (

      studentList && studentList.map((value) => (
        <Grid item xs={12} key={value.rollNunber}>
          <Grid container spacing={2} >
          <Grid item >
                            <Avatar alt={value.firstName} src={imgToUrl(value.image)} sx={{ bgcolor: stringToColor(value), width: 60, height: 60 }} />
                        </Grid>

            <Grid item xs={9} sm={4} >
              <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
                <Typography width='100%'>{value.firstName + ' ' + value.lastName}</Typography>
              </Card>
            </Grid>
            <Grid item xs={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
                <Typography width='100%'>{value.rollNumber}</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={2} lg={3}>
              <Button onClick={() => handleDeleteStudent(value.rollNumber)} variant='outlined' sx={{ height: '100%', width: '100%' }}>Remove</Button>
            </Grid>
          </Grid>
          <Divider sx={{ mt: 2 }} />
        </Grid>


      )))
  }

  const ViewSectionHandler = () => {
    let url  = `/class/${classYear}`
    navigate(url);

  }

  const handleDeleteStudent = (studentRollNumber) => {
    setTempStudent(studentRollNumber)
    //console.log(studentRollNumber)
    setModalOpen(true);
  }
  const handleAddStudent = () => {

    changeStudentSection(classYear, sectionName, Number(addStudentRollNumber)).then((response) => {
      if (response.status === 201) {
        console.log("hit")
        setAddModalOpen((isOpen) => !isOpen);
        if (refreshFlag == true) {
          setRefreshFlag(false)
          setRefreshFlag(true)
        }
        else if (refreshFlag === false) {
          setRefreshFlag(true)
        }
      else {
        setRefreshFlag(false);
      }
    }
      else if (response.status === -1) {
        console.log("Noe")
      }
    })
  }
  const cld = new Cloudinary({
    cloud: {
        cloudName: 'dqxdmayga'
    }
});
  const imgToUrl = (publicId) => {
    const myImage = cld.image(publicId);
    const myUrl = myImage.toURL();
    return myUrl
}

  const textChange = (value) => {
    setUsername(value);
    //console.log(Number(username));
    //console.log("here: " + value);
    if (typeof value === Number) {
      const filteredArray = teachersMasterList.filter((teacher) => {
        return teacher.username.includes(value);
      });
      setTeachersList(filteredArray);
    }

  };

  const handleModalDeleteClick = () => {
    console.log("here")
    console.log(tempStudent);
    removeStudentFromSection(classYear, sectionName, tempStudent).then((response) => {
      if (response === 1) {
        setModalOpen(false);
        if (refreshFlag == true) {
          setRefreshFlag(false)
          setRefreshFlag(true)
        }
        else if (refreshFlag === false) {
          setRefreshFlag(true)
        }
      }
      else {
        setRefreshFlag(false);
      }
    })
  }


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
  const handleModalClose = () => {
    setModalOpen((isOpen) => !isOpen);
  };
  const handleAddModalClose = () => {
    setAddModalOpen((isOpen) => !isOpen);

  };

  useEffect(() => {
    getAllStudents().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setTeachersList(response.data);
        setTeachersMasterList(response.data);
        if (response.data.length !== teacherOptions.length) {
          var temp_list = [];
          for (let i = 0; i < response.data.length; i++) {
            let tempObj = { label: String(response.data[i].rollNumber) };
            if (
              teacherOptions.find(
                (teacher) => teacher.label === tempObj.label
              ) === undefined
            )
              temp_list.push(tempObj);
          }
          setTeacherOptions(temp_list);
        }
      } else if (response.status === 401) {
        alert("Teacher not found");
        console.log(response.data);
      }
    });// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addModalOpen]);
  const BackButtonDisplay = () => {
    return (
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} textAlign="right">
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={ViewSectionHandler} >Back</Button>
        </Grid>
      </Grid>
    )

  }




  const SectionDetailsDisplay = () => {
    return (
      <Paper variant="outlined" xs={12}>
        <Grid >
          <Grid item xs={8}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              Class : {classYear + sectionName}
            </Typography>
            <Typography variant = "h4"  sx={{ textAlign: 'center' }}>
            Section Head : {}
          </Typography>
          </Grid>
          <Grid item xs={8}>

          </Grid>

          <Grid item xs={8} textAlight="center">
            <Button component="label"
              variant="contained"

              sx={{ my: 3, width: '100%' }}
              onClick={handleAddModalClose}
            >
              Add Student To Section
            </Button>
          </Grid>
        </Grid>
      </Paper>



    )
  }




  return (
    <Grid>
      <Grid item xs={11}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={addModalOpen}
          onClose={handleAddModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={addModalOpen}>
            <Box sx={style}>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <SearchBox
                  onChange={textChange} // filtering the new array
                  inputValue={username} //rollNumber
                  options={teacherOptions} //options
                  label="Student RollNumber"
                />
              </Box>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ mb: 2 }}
              >
                Select Student you want to add?
              </Typography>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => setAddModalOpen((prevState) => !prevState)}
                  variant="contained"
                  component="label"
                  sx={{ mr: 3 }}
                >
                  Go Back
                </Button>
                <Button variant="outlined" color="success" onClick={handleAddStudent}>
                  Add
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
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
                Are you sure you want to remove the student?
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
                <Button variant="outlined" color="error" onClick={handleModalDeleteClick}>
                  DELETE
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Grid>
      <SectionDetailsDisplay />
      <StudentDisplay />
      <BackButtonDisplay />
    </Grid>
  )

}
