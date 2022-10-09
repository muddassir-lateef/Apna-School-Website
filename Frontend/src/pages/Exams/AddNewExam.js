import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/form-hook";
import Alert from "@mui/material/Alert";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Typography, Card, Grid, Box, Avatar, Snackbar, TextField, Select, InputLabel, MenuItem, Button, FormControl } from "@mui/material";
import { VALIDATOR_MINLENGTH } from "../../services/validators";
import Input from "../../components/Input";
import { addNewExam, getAllClasses } from "../../services/UserService";
import SendIcon from "@mui/icons-material/Send";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const AddNewExam = () => {

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
                            temp_list.push("Class " + res.data[i].classYear + ", " + res.data[i]._id)
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
        console.log("Submit: ", formState.inputs, "Selected Class: ", selectedClass)
        console.log("Date: ", examDate.$d);
        console.log("JS Date: ", new Date(examDate.$d))

        const response = await addNewExam(formState.inputs.subject.value, formState.inputs.venue.value, formState.inputs.totalMarks.value, examDate.$d, selectedClass.split(",")[1])
        if (response.status === 201){
            setSubmitStatus(1);
            setSnackOpen(true);
            console.log(response.data)
        }
        else{
            console.log(response)
            setSubmitStatus(-1);
            setSnackOpen(true);
        }
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
                        <NoteAddIcon />
                    </Avatar>
                    <Typography variant="h4">New Exam</Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        alignItems: "center",

                        p: 1,
                    }}
                >
                    <Input
                        sx={{ pb: 3, flex: "100%" }}
                        id="subject"
                        label="Exam Title"
                        variant="standard"
                        onInput={InputHandler}
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        errorText="Exam title is required"
                    />
                    <Input
                        sx={{ pb: 3, flex: "100%" }}
                        id="venue"
                        label="Venue"
                        variant="standard"
                        onInput={InputHandler}
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        errorText="Venue is required"
                    />
                    <Input
                        sx={{ pb: 3, flex: "100%" }}
                        id="totalMarks"
                        label="Total marks"
                        variant="standard"
                        onInput={InputHandler}
                        validators={[VALIDATOR_MINLENGTH(1)]}
                        errorText="Total Marks are required"
                    />
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
                                <MenuItem key={item} value={item}>{item.split(",")[0]}</MenuItem>
                            ))
                            }
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Exam Date"
                            inputFormat="DD/MM/YYYY"
                            value={examDate}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField sx={{ pb: 3, flex: "100%" }} {...params} />}
                        />
                    </LocalizationProvider>

                    <Grid container display="flex" justifyContent="flex-end">
                        <Button
                            onClick={onSubmitHandler}
                            variant="contained"
                            endIcon={<SendIcon />}
                            sx={{ mt: 2 }}
                            disabled={!formState.isValid}
                        >
                            Submit
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

export default AddNewExam;