import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/form-hook";
import Alert from "@mui/material/Alert";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Typography, Card, Grid, Box, Avatar, Snackbar, TextField, Select, Backdrop, InputLabel, MenuItem, Button, FormControl, Modal, Fade } from "@mui/material";
import { VALIDATOR_MINLENGTH } from "../../services/validators";
import Input from "../../components/Input";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addNewExam, getAllClasses, generateFeeForListOfStudents, getAllSectionsInClassByClassYear, addFeeDetailToStudentFeeRecord } from "../../services/UserService";
import SendIcon from "@mui/icons-material/Send";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate, useLocation } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchBox from "../../components/SearchBox";


const AddNewFeeForClass = () => {
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
    const [formattedSectionList, setFormattedSectionList] = useState([])
    const [tuFee, setTuFee] = useState("")
    const [fiFee, setFiFee] = useState("")
    const [otFee, setOtFee] = useState("")
    const [errCheck, setErrCheck] = useState(false)
    const [errCheck1, setErr1Check] = useState(false)
    const [errCheck2, setErr2Check] = useState(false)
    useEffect(() => {
        if (selectedClass === "") {
            getAllClasses()
                .then((res) => {
                    if (res !== -1) {
                        setAllClasses(res.data);
                        if (Array.isArray(res.data) && res.data.length > 0) {
                            const temp_list = [];
                            temp_list.push("All")
                            for (var i = 0; i < res.data.length; i++) {
                                temp_list.push(res.data[i].classYear)
                            }
                            //console.log("Prepared List: ", temp_list)
                            setFormattedClasses(temp_list);
                        }
                    }
                    //console.log("Getting Classes: ", res.data)
                })
                .catch(err => console.log(err))
        }


        //FOR SECTIONS
        getAllSectionsInClassByClassYear(selectedClass)
            .then((res) => {
                setSelectedSection("")
                if (res !== -1) {
                    setSectionList(res.data);
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        const temp_list = [];
                        temp_list.push("All")
                        for (var i = 0; i < res.data.length; i++) {
                            temp_list.push(res.data[i].sectionName)
                        }
                        //console.log("Prepared List: ", temp_list)
                        setFormattedSectionList(temp_list);
                    }
                }
                if (res === -1) {
                    // console.log("No sections found")
                    setSectionList([])
                    setFormattedSectionList([])
                }
                //console.log("Getting Classes: ", res.data)
            })
            .catch(err => console.log(err))


    }, [selectedClass])


    const handleDateChange = (newDate) => {
        setExamDate(newDate);
        //console.log("New Date: ", newDate)
        setDateCheck(false)
    }
    const StatusAlert = () => {
        console.log("Alert check")
        console.log(submitStatus)
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

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        setSelectedSection("")
        setClassCheck(true)
        console.log("In the class setter")
        if (event.target.value === "All") {
            setClassCheck(false)
        }
        console.log(event.target.value)
        console.log(selectedSection)

    };
    const handleSectionChange = (event) => {
        console.log("In section Change")
        console.log(event.target.value)
        console.log(selectedClass)
        setSelectedSection(event.target.value)
        setClassCheck(false)
    }

    const onSubmitHandler = async () => {

        console.log("Class " + selectedClass)
        console.log("JS Date: ", new Date(examDate.$d))
        console.log("The section is")
        console.log(selectedSection)
        generateFeeForListOfStudents(selectedClass, examDate.$d, selectedSection).then((res) => {
            console.log(res)
            if (res === 1) {
                setSnackOpen(true)
                console.log("Success x2")
                setSubmitStatus(1)
            }
            setSnackOpen(true)
        }
        )
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

    const ConfirmHandler = () => {
        console.log("In submission")
        console.log(tuFee)
        console.log(fiFee)
        console.log(otFee)
        if (otFee.trim().length === 0) {
            console.log("Empty Value lol")
            setErrCheck(true)
        }
        else {
            setErrCheck(false)
        }
        if (tuFee.trim().length === 0) {
            console.log("Empty Value lol")
            setErr1Check(true)
        }
        else {
            setErr1Check(false)
        }
        if (fiFee.trim().length === 0) {
            console.log("Empty Value lol")
            setErr2Check(true)
        }
        else {
            setErr2Check(false)
        }
        if (fiFee.trim().length !== 0 && tuFee.trim().length !== 0 && otFee.trim().length !== 0) {
            addFeeDetailToStudentFeeRecord(selectedClass, selectedSection, Number(tuFee), Number(fiFee), Number(otFee)).then
                ((res) => {
                    if (res == 1) {
                        setAddModalOpen((isOpen) => !isOpen)
                        setSnackOpen(true)
                        setSubmitStatus(1)
                    }
                    else {
                        console.log("error1")
                    }

                })
        }
        return
    }

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
                                Enter Fee Details for

                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >

                                Class : {selectedClass} || Section : {selectedSection}
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <TextField error={errCheck1} value={tuFee} label="Tuition Fee" onChange={(event) => { setTuFee(event.target.value.replace(/\D/g, '')) }}></TextField>
                                </Box>
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <TextField error={errCheck2} value={fiFee} label="Fine Fee" onChange={(event) => { setFiFee(event.target.value.replace(/\D/g, '')) }}>

                                    </TextField>
                                </Box>
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <TextField error={errCheck} value={otFee} label="Other Fee(s)" onChange={(event) => { setOtFee(event.target.value.replace(/\D/g, '')) }}>

                                    </TextField>
                                </Box>
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Typography>
                                        Total Fee : {Number(otFee) + Number(fiFee) + Number(tuFee)}
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
                                <Button variant="outlined" color="success" onClick={ConfirmHandler} >
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
                        <MonetizationOnIcon />

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
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Section</InputLabel>
                        <Select
                            sx={{ mb: 3, flex: "100%", width: '100%' }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedSection}
                            label="Class"
                            onChange={handleSectionChange}
                            defaultValue=""
                        >
                            {formattedSectionList.map((item) => (
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
                            disabled={classCheck}
                        >

                            Generate Normal Chalan
                        </Button>
                        <Button
                            onClick={NewChallanHandler}
                            variant="contained"
                            endIcon={<SendIcon />}
                            fullWidth sx={{ mb: 2 }}
                            disabled={classCheck}
                        >

                            Generate New Challan
                        </Button>
                        <Button startIcon={<ArrowBackIcon />} onClick={BackButtonClicked} fullWidth sx={{ mb: 2 }} variant="outlined">
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