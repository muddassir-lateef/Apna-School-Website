import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Modal,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  Fade,
  Backdrop,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import { deepOrange, deepPurple, blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import SearchBox from "../../components/SearchBox";
import Paper from '@mui/material/Paper';
import { getAllTeachers, deleteTeacher, getAllClasses} from "../../services/UserService";
import { Image } from "cloudinary-react";
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

const SearchTeacher = () => {
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [username, setUsername] = useState('');
  const [teachersList, setTeachersList] = useState([]);
  const [teachersMasterList, setTeachersMasterList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [userFlag , setUserFlag] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [delClass, setDelClass] = useState(0);
  const [delFlag, setDelFlag] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getAllClasses().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setTeachersList(response.data);
        setTeachersMasterList(response.data);
        if (response.data.length !== teacherOptions.length) {
          var temp_list = [];
          for (let i = 0; i < response.data.length; i++) {
            let tempObj = { label: String(response.data[i].classYear) };
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
        alert("Class not found");
        console.log(response.data);
      }
    });// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const textChange = (value) => {
    setUserFlag(true)
    setUsername(value);
    //console.log("here: " + value);
    if (typeof value === 'string') {
      console.log("here")
      const filteredArray = teachersMasterList.filter((teacher) => {
        console.log(teacher.classYear)
        console.log("iter")
        return teacher.classYear.includes(value);
      });
      console.log("here")
      setTeachersList(filteredArray);
    }
    if (value.length === 0) setTeachersList(teachersMasterList);
  };

  const handleTeacherDelete = (teacherId) => {
    setDelClass(teacherId)
    setSelectedTeacher(teacherId)
    setModalOpen(true);
  };

  
  const handleModalClose = () => {
    setModalOpen((isOpen) => !isOpen);
  };

  const onViewClick = (classYear) => {
    let url  = `/class/${classYear}`
    navigate(url);
  }

  const onDeleteClass = () => {
    console.log(delClass)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>

        <Typography variant = "h3">
            All Classes
          </Typography>
          </Paper>
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
                sx={{mb:2}}
              >
                Are you sure you want to delete this class and all of its sections?
              </Typography>
              <Box sx={{ width:'100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={() => setModalOpen((prevState) => !prevState)}
                  variant="contained"
                  component="label"
                  sx={{mr:3}}
                >
                  Go Back
                </Button>
                <Button  variant="outlined" color="error" onClick = {onDeleteClass}>
                  DELETE
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Grid>

      {teachersList.map((item) => (
        <Grid item xs={12} key={item.classYear}>
        <Grid container spacing={2} >
          <Grid item >
            <Avatar
              sx={{ bgcolor: '#182747' }}
            >
              {item.classYear} </Avatar>

          </Grid>

          <Grid item xs={9} sm={4} >
            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
              <Typography width='100%'> Sections : {item.noOfSections}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={2} lg={3}>
            <Button  variant='outlined' sx={{ height: '100%', width: '100%' }} onClick={() => handleTeacherDelete(item.classYear)}>Remove</Button>
          </Grid>
          <Grid item xs={12} sm={2} lg={3}>
            <Button  variant='outlined' sx={{ height: '100%', width: '100%' }}  onClick={() => onViewClick(item.classYear)}>View</Button>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 2 }} />
      </Grid>
      ))}
                <Grid item xs={12} textAlign="right">
                    <Button variant="outlined" startIcon={<ArrowBackIcon />}> Go Back </Button>
                </Grid>
    </Grid>
    
  );
};

export default SearchTeacher;

