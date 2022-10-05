import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import { deepOrange, deepPurple, blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import SearchBox from "../../components/SearchBox";
import Paper from '@mui/material/Paper';
import { getAllTeachers, addNewSectionToClass, getAllClasses, deleteClass, getAllSectionsInClass, deleteSection} from "../../services/UserService";
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

  const [teachersList, setTeachersList] = useState([]);
  const classYear = useParams().classYear
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [delClass, setDelClass] = useState(0);
  const [delFlag, setDelFlag] = useState(false);
  const [delSection, setDelSection] = useState("")
  const [addSectionName, setAddSectionName] = useState("")
  const [refreshflag, setRefreshFlag] = useState(false)
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState("")
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Displaying all the Sections Again")
    console.log(classYear)
    getAllSectionsInClass(classYear).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setTeachersList(response.data);
      } else if (response.status === 401) {
        alert("Class not found");
        console.log(response.data);
      }
    });// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshflag]);



  const handleTeacherDelete = (sectionName1) => {
    setDelSection(sectionName1)
    console.log(sectionName1)
    setModalOpen(true);
  };

  
  const handleModalClose = () => {
    setModalOpen((isOpen) => !isOpen);
  };

  const onViewClick = (sectionName) => {
    navigate("/class/section", {
      state: { param1: sectionName,  param2 : classYear  },
    })
  }

  const onDeleteClass = () => {
    const response = deleteSection(classYear, delSection);
    setRefreshFlag((isOpen) => !isOpen);
    setModalOpen(false)

}

  const onBackDisplay = () => {
    console.log("url")
    let url = "/class/searchClass";
    navigate(url);
  }
  const onTextField = (event) => {
    console.log("here")
    setAddSectionName(event.target.value)
    console.log(event.target.value)
    setError(false)
    setHelperText("")
  }

  const addSectionHandler = () => {
    console.log("Adding section")
    console.log(addSectionName)
    if(addSectionName === "")
    {
      return
    }
    addNewSectionToClass(classYear, addSectionName).then((response) => {
     
      if(response.data === 1)
      {
        setError(true)
        setHelperText("Invalid Section Name")
        setRefreshFlag(true)
        console.log("Section not added")
      }
      if(response.status === 201)
      {
        
        setRefreshFlag(true)
        console.log("Section added succesfully")
      }
      setRefreshFlag(false)
  })
  
  setRefreshFlag((isOpen) => !isOpen);
}

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Paper>

        <Typography variant = "h3">
            All Sections in Class {classYear}
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
                Are you sure you want to delete this Section and all the students in it?
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
         
          <Grid item xs={12} sm={2} lg={3}>
          <Paper>
          <TextField  error = {error === true}
          id="filled-error-helper-text"
           helperText= {helperText}  sx={{ height: '100%', width: '100%' }} variant="outlined" label = "Section Name" 
           value={addSectionName}
           onChange = {onTextField}
          > 
         
          </TextField>

          </Paper>
          </Grid>
          <Grid item xs={12} sm={4} lg={3}>
            
          <Button  sx={{ height: '100%', width: '100%' }} variant="outlined"
          onClick = {addSectionHandler}
          >
            Add Section
          </Button>
          </Grid>
          <Paper>
          <Divider sx={{ mt: 2 }} />
          </Paper>
          
          

      {teachersList.map((item) => (
        <Grid item xs={12} >
        <Grid container spacing={2} >
          <Grid item >
            <Avatar
              sx={{ bgcolor: '#182747' }}
            >
              {item.sectionName} </Avatar>

          </Grid>

          <Grid item xs={9} sm={4} >
            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
              <Typography width='100%'> Strength : {item.strength}</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={2} lg={3}>
            <Button  variant='outlined' sx={{ height: '100%', width: '100%' }} onClick={() => handleTeacherDelete(item.sectionName)}>Remove</Button>
          </Grid>
          <Grid item xs={12} sm={2} lg={3}>
            <Button  variant='outlined' sx={{ height: '100%', width: '100%' }}  onClick={() => onViewClick(item.sectionName)}>View</Button>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 2 }} />
      </Grid>
      ))}
      <Grid item xs={12} textAlign="right">
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick = {onBackDisplay}  >Go Back</Button>
      </Grid>
    </Grid>
    
  );
};

export default SearchTeacher;

