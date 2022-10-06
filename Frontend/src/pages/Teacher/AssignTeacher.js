import React from "react";
import { useState, useEffect } from "react";
import { Grid, Card, Typography, Avatar, IconButton,  Button, Divider, Modal, Backdrop, Fade, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { getAllTeachers, getAllSections, assignTeacher, getTeacher, getSectionById, unAssignTeacher } from "../../services/UserService";
import { Cloudinary } from "@cloudinary/url-gen";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 250,
    bgcolor: "background.paper",
    borderRadius: '2%',
    boxShadow: 24,
    p: 4,
};
const getClassAndSections = (classList) => {
    const retList = []
    for (let i = 0; i < classList.length; i++) {
        if (classList[i].sectionList !== null) {
            for (let j = 0; j < classList[i].sectionList.length; j++) {
                const class_str = String(classList[i].classYear) + " " + String(classList[i].sectionList[j].sectionName);
                retList.push(class_str)
            }
        }
        else {
            retList.push(String(classList[i].classYear))
        }
    }
    return retList;
}




const AssignTeacher = () => {
    let [teacherList, setTeacherList] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [teacherSections, setTeacherSections] = useState([]);
    // eslint-disable-next-line
    const [allSections, setAllSections] = useState([]);
    const [teacherSectionOptions, setTeacherSectionOptions] = useState([]);
    const [formattedSections, setFormattedSections] = useState([]);
    const [selectedClassDrop, setSelectedClassDrop] = useState("");
    const navigate = useNavigate();
    const openModal = (username) => {
        setSelectedTeacher(username);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal2 = async(username) => {
        setSelectedTeacher(username);
        const teacher = await getTeacher(username);
        console.log(teacher.data.sections)

        if (Array.isArray(teacher.data.sections) && teacher.data.sections.length > 0){
            const temp_sections = [];
            for (let i=0; i< teacher.data.sections.length; i++){
               // console.log("HELLo")
                const temp_sec = await getSectionById(teacher.data.sections[i]);
                console.log("HERE:", temp_sec.data)
                temp_sections.push(temp_sec.data)
            }
            setTeacherSections(temp_sections);
        }
        setModal2Open(true);
    };
    const closeModal2 = () => {
        setModal2Open(false);
        setTeacherSectionOptions([]);
    };

    useEffect(()=>{
        const temp_options = [];
        if(Array.isArray(teacherSections) && teacherSections.length > 0 && teacherSections !== null){
            for (let i=0; i<teacherSections.length; i++){
                console.log("Hello: ", teacherSections[i])
                const temp_str = teacherSections[i].classYear + " " + teacherSections[i].sectionName;
                temp_options.push(temp_str)
                
            }
        }
        setTeacherSectionOptions(temp_options);
        console.log("Teacher Section Options: ", temp_options)

    }, [teacherSections])

    useEffect(() => {
        getAllTeachers().then((response) => {
            if (response.status === 201) {
                let tempList = response.data
                setTeacherList(tempList)
                console.log(tempList)
            } else if (response.status === 401) {
                alert("Teachers not found");
                console.log(response.data);
            }
        });
        getAllSections()
            .then((res) => {
                setAllSections(res.data);
                console.log("Unformatted", res.data)
                setFormattedSections(getClassAndSections(res.data).sort());
                
                //setFormattedSections(formattedSections.sort());
            })
            .catch(err => console.log(err))

    }, []);

    useEffect(() => {
        getAllSections()
            .then((res) => {
                setAllSections(res);
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [])

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
    const handleGoBackClick = (e) => {
        e.preventDefault();
        let url = '/teacher/search';
        navigate(url);
    }

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
        console.log(event.target.value)
      };

    const handleUnAssignClassChange = (event) => {
        setSelectedClassDrop(event.target.value);
        console.log(event.target.value)
      };

    const AssignClassHandler = () => {
        console.log("Assign", selectedClass, " to ", selectedTeacher)
        const username = selectedTeacher;
        const tokens = selectedClass.split(" ");
        const classYear = tokens[0];
        const section = tokens[1];
        assignTeacher(username, classYear, section).then(res=>console.log(res.data))
        setModalOpen(false);
    }
// comment for dummy commit
    const UnAssignClassHandler = () => {
        setModal2Open(false);
        console.log("Un Assign", selectedClassDrop, " to ", selectedTeacher)
        const tokens = selectedClassDrop.split(" ");
        const classYear = tokens[0];
        const section = tokens[1];
        //console.log("Drop class", classYear, " section: ", section)
        const response = unAssignTeacher(selectedTeacher, classYear, section);
        if (response.status === 201){
            console.log("Teacher un-assigned successfully")
        }
        else{
            console.log("Teacher was NOT un-assigned successfully")
        }

    }


    return (

        <Grid container spacing={3}>
            <Grid item xs={12}><Card><Typography variant='h4' sx={{ textAlign: 'center' }}>Select a Teacher</Typography></Card></Grid>
            <Grid item xs={11}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={modalOpen}
                    onClose={closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modalOpen}>
                        <Box sx={style}>
                            <Grid container>
                                <Grid item>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                Select a Class and Section
                            </Typography>
                            </Grid>

                            <Grid item xs={12}><FormControl fullWidth sx={{mb:2}}>
                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedClass}
                                        label="Class"
                                        onChange={handleClassChange}
                                        defaultValue=""
                                    >
                                        {formattedSections.map((item)=>(
                                            <MenuItem value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                </Grid>

                            <Grid item xs={12}>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                                
                            >
                                
                                <Button
                                    onClick={closeModal}
                                    variant="contained"
                                    component="label"
                                    sx={{ mr: 3 }}
                                >
                                    Go Back
                                </Button>
                                <Button
                                    onClick={AssignClassHandler}
                                    variant="outlined"
                                    color="success"
                                >
                                    ASSIGN
                                </Button>
                                
                            </Box>
                            </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={modal2Open}
                    onClose={closeModal2}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modal2Open}>
                        <Box sx={style}>
                            <Grid container>
                                <Grid item>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                Select Class to Un-Assign
                            </Typography>
                            </Grid>

                            <Grid item xs={12}><FormControl fullWidth sx={{mb:2}}>
                                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedClassDrop}
                                        label="Class"
                                        onChange={handleUnAssignClassChange}
                                        defaultValue=""
                                    >
                                        {teacherSectionOptions.length>0 ? teacherSectionOptions.map((item)=>(
                                            <MenuItem value={item}>{item}</MenuItem>
                                        )): <MenuItem color="error" value={""}>{"No sections found"}</MenuItem>}
                                    </Select>
                                </FormControl>
                                </Grid>

                            <Grid item xs={12}>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                                
                            >
                                
                                <Button
                                    onClick={closeModal2}
                                    variant="contained"
                                    component="label"
                                    sx={{ mr: 3 }}
                                >
                                    Go Back
                                </Button>
                                <Button
                                    onClick={UnAssignClassHandler}
                                    variant="outlined"
                                    color="error"
                                    disabled = {teacherSectionOptions.length===0}
                                >
                                    UN ASSIGN
                                </Button>
                                
                            </Box>
                            </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>

            </Grid>
            {teacherList.map((value) => (
                <Grid item xs={12} key={value.username}>
                    <Grid container spacing={2} >
                        <Grid item >
                            <Avatar alt={value.firstName} src={imgToUrl(value.image)} sx={{ bgcolor: stringToColor(value), width: 60, height: 60 }} />
                        </Grid>

                        <Grid item xs={9} sm={4} >
                            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
                                <Typography width='100%'>{value.username}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
                                <Typography width='100%'>{value.firstName + " " + value.lastName}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={2} lg={3}>
                            <IconButton onClick={() => { openModal(value.username) }} sx={{ height: '100%', width: '50%' }} aria-label="delete" size="small">
                                <GroupAddIcon fontSize="small" />
                            </IconButton>
                            <IconButton onClick={() => { openModal2(value.username) }} sx={{ height: '100%', width: '50%' }} aria-label="delete" size="small">
                                <GroupRemoveIcon fontSize="small"/>
                            </IconButton>
                        </Grid>

                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                </Grid>

            ))}
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} textAlign="right">
                    <Button variant= "outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBackClick}>Go Back</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AssignTeacher;
