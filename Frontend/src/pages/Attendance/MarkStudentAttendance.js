import React from "react";
import { useState, useEffect } from "react";
import { Button, FormLabel, Fab, FormControl, Grid, Card, FormControlLabel, Avatar, Typography, InputLabel, Select, MenuItem } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { getStudents } from "../../services/UserService";
import StudentSearchBox from "../../components/SearchBox";
import { setStudentAttendanceEnteries, getAllStudents, getAllClasses, getstudentAttendanceRegisteries, genstudentAttendanceRegisteries, getstudentAttendanceEnteries } from "../../services/UserService";
import { Image } from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";



const MarkStudentAttendance = () => {

    const [selectedClass, setClass] = React.useState('');

    const [selectedDate, setDate] = React.useState('');

    const [classList, setAllClasses] = useState([]);
    const [dateList, setDateList] = useState([]);

    let [studentList, setStudentList] = useState([])

    const handleSubmitBtn = () => {
        console.log(studentList)
        setStudentAttendanceEnteries(studentList).then((response) => {
            if (response.status === 201) {
                
                console.log("Enteries Added!")
            } else if (response.status === 401) {
                alert("Enteries not found");
                console.log(response.data);
            }
        });

    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
        var cs = selectedClass
        var arr = cs.split('-')
        var section = arr[1]
        var classYear = Number(arr[0])
        setStudentList([])
        getstudentAttendanceEnteries(section, classYear, event.target.value).then((response) => {
            if (response.status === 201) {
                let tempList = response.data
                setStudentList(tempList.enteries)
                console.log(tempList)
            } else if (response.status === 401) {
                alert("Enteries not found");
                console.log(response.data);
            }
        });

    };

    const handleClassChange = (event) => {
        setClass(event.target.value);
        console.log(event.target.value)
        var cs = event.target.value
        var arr = cs.split('-')
        var section = arr[1]
        var classYear = Number(arr[0])
        setDate('');
        setStudentList([])

        genstudentAttendanceRegisteries(section, classYear).then((response) => {
            if (response.status === 201) {
                console.log(response.data)
            } else if (response.status === 401) {
                alert("Registeries not generated");
                console.log(response.data);
            }
        });

        getstudentAttendanceRegisteries(section, classYear).then((response) => {
            if (response.status === 201) {
                let tempList = response.data

                setDateList(tempList.registry)
                console.log(tempList)
            } else if (response.status === 401) {
                alert("Registeries not found");
                console.log(response.data);
            }
        });
    };

    React.useEffect(() => {
        getAllClasses().then((response) => {
            if (response.status === 201) {
                let temp1List = response.data
                let temp2List = []

                for (let i = 0; i < temp1List.length; i++) {
                    if (temp1List[i].sectionList !== null) {
                        for (let j = 0; j < temp1List[i].sectionList.length; j++) {
                            const class_str = String(temp1List[i].classYear) + "-" + String(temp1List[i].sectionList[j].sectionName);
                            temp2List.push(class_str)
                        }
                    }
                }
                setAllClasses(temp2List)
                console.log(temp2List)
            } else if (response.status === 401) {
                alert("Sections not found");
                console.log(response.data);
            }
        });

    }, []);
    React.useEffect(() => {
        console.log("render")
        console.log(dateList)
    }, [dateList]);

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
    const handleAttendance = index => (event, newAttendance) => {

        studentList[index].status = newAttendance
        console.log(studentList[index])
        setStudentList([...studentList])

    };


    return (

        <Grid sx={{ flexGrow: 1 }} container spacing={1}>
            <Grid item xs={12} >

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Class-Section</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedClass}
                        label="Class"
                        onChange={handleClassChange}
                    >
                        {classList.length > 0 ? classList.map((item) => (
                            <MenuItem value={item}>{item}</MenuItem>
                        )) : <MenuItem color="error" value={""}>{"No sections found"}</MenuItem>}


                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label1">Date</InputLabel>
                    <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select1"
                        value={selectedDate}
                        label="Date"
                        onChange={handleDateChange}
                    >
                        {dateList.length > 0 ? dateList.map((item) => (
                            <MenuItem value={item[0]}>{item[1]}</MenuItem>
                        )) : <MenuItem color="error" value={""}>{"No Attendance found"}</MenuItem>}


                    </Select>
                </FormControl>
            </Grid>

            {studentList.map((value, index) => (
                <Grid item xs={12} key={value.rollNumber}>
                    <Grid container spacing={2} >
                        <Grid item xs={0}  >
                            <Avatar alt={value.name} src={imgToUrl(value.image)} sx={{ bgcolor: stringToColor(value), width: 60, height: 60 }} />
                        </Grid>

                        <Grid item xs={3} >
                            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center" }}>
                                <Typography>{value.rollNumber}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center" }}>
                                <Typography>{value.name}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={0} >
                            <Card sx={{ padding: 1, height: 45 }}>
                                <ToggleButtonGroup
                                    value={value.status}
                                    exclusive
                                    onChange={handleAttendance(index)}
                                    aria-label="attendance"
                                >
                                    <ToggleButton value="absent" aria-label="Absent" color="error">
                                        <CloseIcon fontSize="small" />

                                    </ToggleButton>
                                    <ToggleButton value="present" aria-label="Present" color="success">
                                        <DoneIcon fontSize="small" />

                                    </ToggleButton>
                                    <ToggleButton value="leave" aria-label="Leave" color="warning">
                                        <HistoryEduIcon fontSize="small" />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>

            ))}
            <Button variant="contained" sx={{ m: 15, mt: 5 }} onClick={handleSubmitBtn}>Submit</Button>

        </Grid >

    );
};

export default MarkStudentAttendance;
