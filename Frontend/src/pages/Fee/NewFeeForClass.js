import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/form-hook";
import Alert from "@mui/material/Alert";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Typography, Card, Grid, Box, Avatar, Snackbar, TextField, Select, InputLabel, MenuItem, Button, FormControl } from "@mui/material";
import { VALIDATOR_MINLENGTH } from "../../services/validators";
import Input from "../../components/Input";
import { addNewExam, getAllClasses, generateFeeForListOfStudents } from "../../services/UserService";
import SendIcon from "@mui/icons-material/Send";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate, useLocation } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const AddNewFeeForClass= () => {
    const navigate = useNavigate();
    const [allClasses, setAllClasses] = useState([]);
    const [formattedClasses, setFormattedClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(0);
    const [examDate, setExamDate] = useState(new Date);
    const [formState, InputHandler] = useForm(
        {
            subject: {
                value: "",
                isValid: false,
            },
            totalMarks: {
                value: 0,
                isValid: false,
            },
            venue: {
                value: "",
                isValid: false,
            },


        },
        false
    );

    useEffect(() => {
        getAllClasses()
            .then((res) => {
                if (res !== -1) {
                    setAllClasses(res.data);
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        const temp_list = [];
                        for (var i = 0; i < res.data.length; i++) {
                            temp_list.push(res.data[i].classYear)
                        }
                        console.log("Prepared List: ", temp_list)
                        setFormattedClasses(temp_list);
                    }
                }
                //console.log("Getting Classes: ", res.data)
            })
            .catch(err => console.log(err))
    }, [])


    const handleDateChange = (newDate) => {
        setExamDate(newDate);
        console.log("New Date: ", newDate)
    }
    const StatusAlert = () => {
        if (submitStatus === -1)
            return (
                <Alert
                    onClose={() => setSnackOpen(false)}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    Exam was not added!
                </Alert>
            );
        if (submitStatus === 1)
            return (
                <Alert
                    onClose={() => setSnackOpen(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    Exam Added Successfully!
                </Alert>
            );
    };

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        console.log(event.target.value)
    };

    const onSubmitHandler = async () => {

        console.log("Submit: " +  selectedClass)
        console.log("JS Date: ", new Date(examDate.$d))
        console.log(examDate.$d)
        generateFeeForListOfStudents(selectedClass, examDate.$d).then((res) =>{
            console.log(res)
        }
        )
    }
    const BackButtonClicked = () => {
        let url = '/Fee/AddNewFees';
        navigate(url);
    }


    return (
        <Grid justifyContent="center" display="flex" flex-direction="row">
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
                    label="Exam Date"
                    inputFormat="DD/MM/YYYY"
                    value={examDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField sx={{ pb: 3, flex: "100%" }} {...params} />}
                />
            </LocalizationProvider>
               
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                        <Select
                            sx={{ mb: 3, flex: "100%", width: '100%' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedClass}
                            label="Class"
                            onChange={handleClassChange}
                            defaultValue=""
                        >
                            {formattedClasses.map((item) => (
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            ))
                            }
                        </Select>
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
                            onClick={onSubmitHandler}
                            variant="contained"
                            endIcon={<SendIcon />}
                            fullWidth sx={{ mb: 2 }}
                            
                        >
                            
                            Generate New Challan
                        </Button>
                        <Button  onClick = {BackButtonClicked}  fullWidth sx={{ mb: 2 }} variant = "outlined">
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

export default AddNewFeeForClass;