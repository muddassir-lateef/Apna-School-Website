import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/form-hook";
import Alert from "@mui/material/Alert";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Typography, Card, Grid, Box, Avatar, Snackbar, TextField, Select, Backdrop, InputLabel, MenuItem, Button, FormControl, Modal, Fade } from "@mui/material";
import { VALIDATOR_MINLENGTH } from "../../services/validators";
import Input from "../../components/Input";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addNewExam, getAllClasses, generateFeeForListOfStudents, getAllSectionsInClassByClassYear, addFeeDetailToStudentFeeRecord, getAllStudents, generateStudentFee, generateNewStudentFee } from "../../services/UserService";
import SendIcon from "@mui/icons-material/Send";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate, useLocation } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchBox from "../../components/SearchBox";


const AddNewFeeForStudent= () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [allClasses, setAllClasses] = useState([]);
    const [formattedClasses, setFormattedClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(0);
    const [examDate, setExamDate] = useState(new Date);
    const [dateCheck, setDateCheck] = useState(true)
    const [classCheck, setClassCheck] = useState(true)
    const [sectionList, setSectionList] = useState([])
    const [selectedSection, setSelectedSection] = useState("")
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [username, setUsername] = useState(0);
    const [formattedSectionList, setFormattedSectionList] = useState([])
    const [tuFee, setTuFee] = useState("")
    const [adFee, setAdFee] = useState("")
    const [exFee, setExFee] = useState("")
    const [spFee, setSpFee] = useState("")
    const [otFee, setOtFee] = useState("")
    const [errCheck, setErrCheck] = useState(false)
    const [errCheck1, setErr1Check] = useState(false)
    const [errCheck2, setErr2Check] = useState(false)
    const [errCheck3, setErr3Check] = useState(false)
    const [errCheck4, setErr4Check] = useState(false)
    const [teachersList, setTeachersList] = useState([]);
  const [teachersMasterList, setTeachersMasterList] = useState([]);
    
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

    const handleDateChange = (newDate) => {
        setExamDate(newDate);
        //console.log("New Date: ", newDate)
        setDateCheck(false)
    }
    const StatusAlert = () => {
        if (submitStatus === -1)
            return (
                <Alert
                    onClose={() => setSnackOpen(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    Fee was not Generated!
                </Alert>
            );
        if (submitStatus === 1)
            return (
                <Alert
                    onClose={() => setSnackOpen(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Fee Generated Successfully!
                </Alert>
            );
    };



    const onSubmitHandler = async () => {

        console.log("Generating Normal Fee Challan for student")
        console.log("JS Date: ", new Date(examDate.$d))
        console.log("The Student is")
        console.log(username)
        if(username === "")
        {
            setSubmitStatus(-1)
            setSnackOpen(true)
            console.log("No student")
        }
        else {
            generateStudentFee(Number(username), examDate.$d ).then((res) =>{
                console.log(res)       
                    console.log("Success x2")
                    setSubmitStatus(1)
                setSnackOpen(true)
            }
            )
        }
      
    }
    const BackButtonClicked = () => {
        let url = '/Fee/AddNewFees';
        navigate(url);
    }
    const handleAddModalClose = () => {
        setAddModalOpen((isOpen) => !isOpen);

    };
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

    const NewChallanHandler = () => {
        setAddModalOpen((isOpen) => !isOpen);
    }

    const ConfirmHandler = () =>
    {
        console.log("Confirmed hanler")

        if(otFee.trim().length === 0)
        {

            setErrCheck(true)
        }
        else {
            setErrCheck(false)
        }
        if(tuFee.trim().length === 0)
        {
  
            setErr1Check(true)
        }
        else {
            setErr1Check(false)
        }
        if(adFee.trim().length === 0)
        {
        
            setErr2Check(true)
        }
        else {
            setErr2Check(false)
        }
        if(exFee.trim().length === 0)
        {
        
            setErr4Check(true)
        }
        else {
            setErr4Check(false)
        }
        if(spFee.trim().length === 0)
        {
        
            setErr3Check(true)
        }
        else {
            setErr3Check(false)
        }
        console.log("Before handler")
        if(adFee.trim().length !== 0 && spFee.trim().length !== 0 && exFee.trim().length !== 0 && tuFee.trim().length !== 0 && otFee.trim().length !== 0 && username !== "")
        {
          
            console.log("Here")
            generateNewStudentFee(Number(username), examDate.$d, Number(tuFee), Number(adFee), Number(spFee), Number(exFee), Number(otFee)).then((res) => {
                console.log(res)
                if(res === 1)
                {
                    setSubmitStatus(1)
                    setSnackOpen(true)
                    setAddModalOpen((isOpen) => !isOpen);
                }
                else {
                    setSubmitStatus(-1)
                    setSnackOpen(true)
                    
                }
            })
        }
        return
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

    return (
        <Grid justifyContent="center" display="flex" flex-direction="row">
            <Grid item>
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
                            </Box>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                Enter Fee Details
                                
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                
                               Roll Number : {Number(username)}
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                            <Box sx={{ width: '100%'}}>
                            <TextField  error = {errCheck1} value = {tuFee} label="Tuition Fee" onChange = {(event) => {setTuFee(event.target.value.replace(/\D/g, ''))}}></TextField>
                            </Box>
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                            <Box sx={{ width: '100%'}}>
                            <TextField  error = {errCheck2} value = {adFee} label="Admission Fee" onChange = {(event) => {setAdFee(event.target.value.replace(/\D/g, ''))}}>

                            </TextField>
                            </Box>
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                            <Box sx={{ width: '100%'}}>
                            <TextField  error = {errCheck3} value = {spFee} label="Sports Fee" onChange = {(event) => {setSpFee(event.target.value.replace(/\D/g, ''))}}>

                            </TextField>
                            </Box>
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                            <Box sx={{ width: '100%'}}>
                            <TextField error = {errCheck} value = {otFee} label="Other Fee(s)" onChange = {(event) => {setOtFee(event.target.value.replace(/\D/g, ''))}}>

                            </TextField>
                            </Box>
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                            <Box sx={{ width: '100%'}}>
                            <TextField  error = {errCheck4} value = {exFee} label="Exam Fee" onChange = {(event) => {setExFee(event.target.value.replace(/\D/g, ''))}}>

                            </TextField>
                            </Box>
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                            <Box sx={{ width: '100%'}}>
                            <Typography>
                                Total Fee : {Number(otFee) + Number(exFee) + Number(adFee) + Number(spFee) + Number(tuFee)}
                            </Typography>
                            </Box>
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
                                <Button variant="outlined" color="success" onClick = {ConfirmHandler} >
                                    Confirm
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
            <Card sx={{ width: "90%", maxWidth: "900px" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 1,
                        m: 1,
                    }}
                >
                    <Avatar sx={{ mr: 2 }}>
                    <MonetizationOnIcon/>

                    </Avatar>
                    <Typography variant="h4">New Fee Challan</Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        alignItems: "center",

                        p: 1,
                    }}
                >  <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Due Date"
                    inputFormat="DD/MM/YYYY"
                    value={examDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField sx={{ pb: 3, flex: "100%" }} {...params} />}
                />
            </LocalizationProvider>
               
                    <FormControl fullWidth sx={{ mb: 2 }}>
                    <SearchBox
                  onChange={textChange} // filtering the new array
                  inputValue={username} //rollNumber
                  options={teacherOptions} //options
                  label="Student RollNumber"
                />
                    </FormControl>                

                    <Grid container display="flex" justifyContent="flex">

                        <Button
                            onClick={onSubmitHandler}
                            variant="contained"
                            endIcon={<SendIcon />}
                            fullWidth sx={{ mb: 2 }}
                            
                        >
                            
                            Generate Normal Chalan
                        </Button>
                        <Button
                            onClick={NewChallanHandler}
                            variant="contained"
                            endIcon={<SendIcon />}
                            fullWidth sx={{ mb: 2 }}
                            
                        >
                            
                            Generate New Challan
                        </Button>
                        <Button  startIcon={<ArrowBackIcon />} onClick = {BackButtonClicked}  fullWidth sx={{ mb: 2 }} variant = "outlined">
                            Back
                        </Button>
                    </Grid>

                </Box>
            </Card>
            <Snackbar
                open={snackOpen}
                autoHideDuration={6000}
                onClose={() => setSnackOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <div>
                    <StatusAlert />
                </div>
            </Snackbar>
        </Grid>

    );
}

export default AddNewFeeForStudent;