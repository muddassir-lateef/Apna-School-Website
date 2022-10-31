import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography, Avatar, Button, Divider } from "@mui/material";
import { Cloudinary } from "@cloudinary/url-gen";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { VALIDATOR_MINLENGTH, VALIDATOR_MIN, VALIDATOR_MAX } from "../../services/validators";
import { useForm } from '../../hooks/form-hook';
import Input from "../../components/Input";
import { getAllStudentsInClass, getExamById } from '../../services/UserService';
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

const UploadMarks = () => {
    const examId = useParams().examId;
    const [allStudents, setAllStudents] = useState([]);
    const [exam, setExam] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        getExamById(examId).then((res) => {
            if (res.status === 201) {
                setExam(res.data)
                if (res.data.classId.classYear !== null) {
                    getAllStudentsInClass(res.data.classId.classYear).then((res) => {
                        if (res.status === 404) {
                            console.log("Could not fetch students");
                        }
                        else {
                            console.log(res.data)
                            setAllStudents(res.data)
                        }
                    })
                }
            }
        });
    }, []);
    const handleGoBackClick = (e) => {
        e.preventDefault();
        let url = '/exams/search';
        navigate(url);
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
    const [formState, InputHandler] = useForm(
        {
            marks: [{
                student: "",
                value: "",
                isValid: false,
            }]
        },
        false
    );

    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Card>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    {allStudents.length > 0? `Upload Marks for ${exam.subject}, Class ${exam.classId.classYear}` : "No students registered"}
                </Typography>
            </Card>
        </Grid>

        {allStudents.map((value) => (
            <Grid item xs={12} key={value.username}>
                <Grid container spacing={2} >
                    <Grid item >
                        <Avatar alt={value.firstName} src={imgToUrl(value.image)} sx={{ bgcolor: stringToColor(value), width: 60, height: 60 }} />
                    </Grid>

                    <Grid item xs={9} sm={4} >
                        <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
                            <Typography width='100%'>{value.rollNumber}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center", textAlign: 'center' }}>
                            <Typography width='100%'>{value.firstName + " " + value.lastName}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={2} lg={3}>
                        <Input
                            sx={{flex: "100%" }}
                            id="marks"
                            label="Marks Obtained"
                            variant="standard"
                            onInput={InputHandler}
                            validators={[VALIDATOR_MINLENGTH(1), VALIDATOR_MIN(0), VALIDATOR_MAX(exam.totalMarks)]}
                            errorText={`Enter Marks in range 0 - ${exam.totalMarks}`}
                        />
                    </Grid>

                </Grid>
                <Divider sx={{ mt: 2 }} />
            </Grid>

        ))}
        <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} textAlign="right">
                <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBackClick}>Go Back</Button>
            </Grid>
        </Grid>
    </Grid>
    )
}

export default UploadMarks;