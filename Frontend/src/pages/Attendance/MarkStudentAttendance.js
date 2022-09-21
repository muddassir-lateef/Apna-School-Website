import React from "react";
import { useState, useEffect } from "react";
import { FormLabel, FormControl, Grid, Card, FormControlLabel, Avatar, Typography } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { getStudents } from "../../services/UserService";
import StudentSearchBox from "../../components/SearchBox";
import { getAllStudents } from "../../services/UserService";
import { Image } from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";
const MarkStudentAttendance = () => {
    let [studentList, setStudentList] = useState([])
    React.useEffect(() => {
        getAllStudents().then((response) => {
            if (response.status === 201) {
                let tempList=response.data
                tempList.map(obj =>
                    obj.attendance = "unmarked"
                )

                setStudentList(tempList)
                console.log(tempList)
            } else if (response.status === 401) {
                alert("Student not found");
                console.log(response.data);
            }
        });
    }, []);
    React.useEffect(() => {
        debugger
    }, [studentList]);

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
    const handleAttendance =index => (event,newAttendance) => {

        studentList[index].attendance = newAttendance
        console.log(studentList[index])
        setStudentList([...studentList])
    };


    return (

        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            {studentList.map((value, index) => (
                <Grid item xs={12} key={value.rollNumber}>
                    <Grid container spacing={2} >
                        <Grid item xs={0}  >
                            <Avatar alt={value.firstName} src={imgToUrl(value.image)} sx={{ bgcolor: stringToColor(value), width: 60, height: 60 }} />
                        </Grid>

                        <Grid item xs={3.5} >
                            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center" }}>
                                <Typography>{value.rollNumber}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center" }}>
                                <Typography>{value.firstName + " " + value.lastName}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={0} >
                            <Card sx={{ padding: 1, height: 45 }}>
                                <ToggleButtonGroup
                                    value={value.attendance}
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

        </Grid>
    );
};

export default MarkStudentAttendance;
