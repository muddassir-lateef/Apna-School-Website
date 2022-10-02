import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useParams,} from 'react-router-dom';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Image } from "cloudinary-react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemButton from '@mui/material/ListItemButton'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate,  useLocation } from "react-router-dom";
import { getAllStudentsInSection, deleteStudent, removeStudentFromSection } from "../../services/UserService";
import Paper from '@mui/material/Paper';
import { Button, Grid, Card, Modal,Fade, Box,
    Backdrop } from '@mui/material'
import Typography from '@mui/material/Typography';

export default function AlignItemsList() {
  const [tempSection, setTempSection] = useState()
  const [tempClass, setTempClass] = useState();
  const [sectionFlag, setSectionFlag] = useState(false)
  const [studentList, setStudentList] = useState([]);
  const [tempStudent, setTempStudent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const classYear = Number(location.state.param2);
  const sectionName = location.state.param1;
  const str = location.state.param3
  const navigate = useNavigate();
  const [refreshFlag, setRefreshFlag] = useState(false)
    
  useEffect(() => {
    getAllStudentsInSection(classYear, sectionName).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        console.log("Students Found Lol")
        setStudentList(response.data);
      }
      else if (response.status === -1) {
        alert("Sections not Found");
        console.log(response.data);
      }
    })
  }, [refreshFlag]);

  const StudentDisplay = () =>
  {
    return(
       
           studentList.map((value) => (
                <Grid item xs={12} key={value.rollNunber}>
                    <Grid container spacing={2} >
                        <Grid item >
                            <Avatar alt={value.firstName}  sx={{ width: 60, height: 60 }} />
                        </Grid>
    
                        <Grid item xs={9} sm={4} >
                            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
                                <Typography width='100%'>{value.firstName + ' ' + value.lastName }</Typography>
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
    let url = `/class/${classYear}`;
    navigate(url);

  }
  const handleDeleteStudent = (studentRollNumber) => {
   setTempStudent(studentRollNumber)
    console.log(studentRollNumber)
    setModalOpen(true);
  }

  const handleModalDeleteClick = () => {
    console.log("here")
    console.log(tempStudent);
    removeStudentFromSection(classYear, sectionName, tempStudent).then((response) => {
      if(response === 1) {
        setModalOpen(false);
        if(refreshFlag == true)
        {
          setRefreshFlag(false)
          setRefreshFlag(true)
        }
        else if(refreshFlag === false)
        {
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
  const BackButtonDisplay = () =>
  {
    return(
    <Grid container spacing={2} sx={{ mt: 1 }}>
    <Grid item xs={12} textAlign="right">
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick = {ViewSectionHandler} >Go Back</Button>
    </Grid>
    </Grid>
    )

  }



  const SectionDetailsDisplay = () => {
    return(
    <Paper variant = "outlined" xs={12}>
        <Grid > 
        <Grid item xs={8}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Class : {classYear + sectionName}
                </Typography>
        </Grid>
        <Grid item xs={8}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
                Strength : {str}
                </Typography>
        </Grid>
        
        <Grid item xs={8} textAlight = "center">
        <Button  component="label"
                  variant = "outlined" 
                  sx={{ mt: 2, width: '100%' }}
                 >
            Add Student To Section
        </Button>
        </Grid>
        </Grid>        
        </Paper>
        
        

    )
  }
  
    
    

  return(
   <Grid>
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
                Are you sure you want Remove student from Section?
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
                <Button  variant="outlined" color="error" onClick = {handleModalDeleteClick}>
                  DELETE
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Grid>
    <SectionDetailsDisplay/>
    <StudentDisplay/>
    <BackButtonDisplay/>
   </Grid>
  )
 
}
