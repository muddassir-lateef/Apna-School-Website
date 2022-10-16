import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Grid,
    Card,
    Typography,
} from "@mui/material";

import SearchBox from "../../components/SearchBox";
import { Cloudinary } from "@cloudinary/url-gen";
import Divider from '@mui/material/Divider';

import { getAllStudents } from "../../services/UserService";
import { Image } from "cloudinary-react";
import Avatar from '@mui/material/Avatar';
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

const SearchStudent = () => {
    const [teacherOptions, setTeacherOptions] = useState([]);
    const [username, setUsername] = useState(0);
    const [teachersList, setTeachersList] = useState([]);
    const [teachersMasterList, setTeachersMasterList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        getAllStudents().then((response) => {
            console.log("in")
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
    }, [modalOpen]);

    const textChange = (value) => {
        console.log(value)

        let value1 = Number(value)
        console.log("in text change")
        setUsername(value);
        console.log(value1)
        //console.log(Number(username));
        //console.log("here: " + value);
        if (value1 !== 0) {
            const filteredArray = teachersMasterList.filter((teacher) => {
                let tempRoll = String(teacher.rollNumber)
                return tempRoll.includes(value1);
            });
            setTeachersList(filteredArray);
        }
        else if (value1 === 0) {
            setTeachersList(teachersMasterList)
        }
    };

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

    const ViewFeeButton = (studentRollNumber, fname, lname) => {
        console.log(studentRollNumber)
        navigate("/Fee/FeeRecord", {
            state: { param1: studentRollNumber, param2 : fname, param3: lname},
          })
    }

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

    const DisplayStudent = () => {
        return (
            teachersList.map((value) => (
                <Grid item xs={12}>

                    <Grid item xs={12} key={value.rollNunber}>
                        <Grid container spacing={2} >
                            <Grid item >
                                <Avatar alt={value.firstName} src={imgToUrl(value.image)} sx={{ bgcolor: stringToColor(value), width: 60, height: 60 }} />
                            </Grid>

                            <Grid item xs={9} sm={4} >
                                <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
                                    <Typography width='100%'>{value.firstName + ' ' + value.lastName}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
                                    <Typography width='100%'>{value.rollNumber}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={2} lg={3}>
                                <Button variant='outlined' sx={{ height: '100%', width: '100%' }} onClick={() => ViewFeeButton(value.rollNumber, value.firstName, value.lastName)}>View Fee Record</Button>
                            </Grid>
                        </Grid>
                        <Divider sx={{ mt: 2 }} />
                    </Grid>
                </Grid>
            ))
        )
    }
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <SearchBox
                    onChange={textChange}
                    inputValue={username}
                    options={teacherOptions}
                    label="Student Roll Number"
                />
            </Grid>
            <Grid item xs={12}>
                <DisplayStudent />
            </Grid>
        </Grid>
    );
};

export default SearchStudent;

