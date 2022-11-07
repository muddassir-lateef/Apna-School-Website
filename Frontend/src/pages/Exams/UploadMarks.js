import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Typography, Avatar, Button, Divider } from "@mui/material";
import { Cloudinary } from "@cloudinary/url-gen";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import { VALIDATOR_MINLENGTH, VALIDATOR_MIN, VALIDATOR_MAX, validate } from "../../services/validators";
import { useForm } from '../../hooks/form-hook';
import Input from "../../components/Input";
import { getAllStudentsInClass, getExamById } from '../../services/UserService';
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { addMarks } from '../../services/UserService';


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
    const [allMarks, setAllMarks] = useState([])
    const [snackOpen, setSnackOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(0);
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
    const StatusAlert = () => {
        if (submitStatus === -1)
          return (
            <Alert
              onClose={() => setSnackOpen(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              Marks were NOT uploaded successfully!
            </Alert>
          );
        if (submitStatus === 1)
          return (
            <Alert
              onClose={() => setSnackOpen(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Marks were uploaded successfully!
            </Alert>
          );
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


    const handleMarksChange = (stuId, validators) => (e) => {
        //console.log("Marks changed, ", e.target.value, "for Student: ", stuId)
        var flag = false;
        for (var i=0; i<allMarks.length; i++){
            if (allMarks[i].studentId === stuId){
                flag = true;
                allMarks[i].obtainedMarks = e.target.value;
                allMarks[i].validity = validate(e.target.value, validators)
            }
        } 
        if (flag === false){
            const newObj = {
                studentId: stuId,
                obtainedMarks: e.target.value,
                validity : validate(e.target.value, validators)
            }
            setAllMarks(allMarks.concat(newObj))
        }
    }
    const handleSubmit = () => {
        console.log(allMarks)
        for (let i=0; i< allMarks.length; i++){
            if (allMarks[i].validity === false){
                setSubmitStatus(-1);
                setSnackOpen(true);
                return;
            }
        }
        //if the entire form is valid 
        addMarks(allMarks, exam._id)
        .then((res)=>{
            console.log(res)
            if (res.status === 201){
                setSubmitStatus(1);
                setSnackOpen(true);
            }
            else{
                setSubmitStatus(-1);
                setSnackOpen(true);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    const traverseValidity = (stuId) => {
        for (var i=0; i<allMarks.length; i++){
            if (allMarks[i].studentId === stuId){
              //  console.log("VALIDITY: ", allMarks[i].validity)
                //allMarks[i].validity = allMarks[i].validity;
                return allMarks[i].validity;                
            }
        } 
        return true;
    }

    return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Card>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    {allStudents.length > 0? `Upload Marks for ${exam.subject}, Class ${exam.classId.classYear}` : "No students registered"}
                </Typography>
            </Card>
        </Grid>

        {allStudents.map((value, idx) => (
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
                        <TextField
                            sx={{flex: "100%" }}
                            id="marks"
                            label="Marks Obtained"
                            variant="standard"
                            onChange={handleMarksChange(value._id, [VALIDATOR_MINLENGTH(1), VALIDATOR_MIN(0), VALIDATOR_MAX(exam.totalMarks)])}
                            error = {!traverseValidity(value._id)}
                            helperText = {!traverseValidity(value._id) && `Enter marks in range 0 - ${exam.totalMarks}`}
                        />
                    </Grid>

                </Grid>
                <Divider sx={{ mt: 2 }} />
            </Grid>

        ))}
        <Grid container spacing={2} sx={{ mt: 1, mx:2 }}>
            <Grid item xs={12}  display={'flex'} justifyContent='space-between'>
                <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBackClick}>Go Back</Button>
                <Button variant="contained" startIcon={<DoneIcon />} onClick={handleSubmit}>Submit</Button>
            </Grid>
        </Grid>
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
    )
}

export default UploadMarks;