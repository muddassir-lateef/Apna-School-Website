import { Card, Grid, Typography, Divider, Button } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useParams, useNavigate} from "react-router-dom";
import { getExamById } from '../../services/UserService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ExamInfo = () => {
    const navigate = useNavigate();
    const examId = useParams().examId;
    const [exam, setExam] = useState({});
    const [examDate, setExamDate] = useState(""); 
    useEffect(()=>{
        getExamById(examId)
        .then((res)=>{
            if (res.status === 201){
                setExam(res.data)
                console.log("Exam: ", res.data)
                var d = new Date(res.data.date);
                //console.log("Created at: ", teacher.createdAt)
                var date = d.getDate();
                var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
                var year = d.getFullYear();
                var newDate = date + "/" + month + "/" + year;
                setExamDate(newDate);
            }
            else{
                console.log("Exam was not found")
            }
        })
    }, [examId])

    const handleGoBackClick = (e) => {
        e.preventDefault();
        let url = '/exams/search';
        navigate(url);
      }

    return(<>
        <Card sx={{p:1, mb:2}}>
            <Grid container spacing={3} textAlign='center'>
              <Grid item xs={12}>
                <Typography style={{ fontWeight: 600 }} variant='h5' >
                    Exam Info
                </Typography>
              </Grid>
            </Grid>
        </Card>

        <Card sx={{p:1}}>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Typography style={{ fontWeight: 600 }} variant='h5'>
                    Title:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant='h5'>
                    {exam.subject}
                </Typography>
            </Grid>

            <Grid item xs={12}><Divider/></Grid>
            
            <Grid item xs={4}>
                <Typography style={{ fontWeight: 600 }} variant='h5' >
                    Venue:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant='h5' >
                    {exam.venue}
                </Typography>
            </Grid>

            <Grid item xs={12}><Divider/></Grid>
            
            <Grid item xs={4}>
                <Typography style={{ fontWeight: 600 }} variant='h5' >
                    Date:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant='h5' >
                    {examDate}
                </Typography>
            </Grid>

            <Grid item xs={12}><Divider/></Grid>
            
            {exam.classId && exam.classId.classYear? <><Grid item xs={4}>
                <Typography style={{ fontWeight: 600 }} variant='h5' >
                    Class:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant='h5' >
                    {exam.classId.classYear}
                </Typography>
            </Grid></>: ''}

            <Grid item xs={12}><Divider/></Grid>
            
            <Grid item xs={4}>
                <Typography style={{ fontWeight: 600 }} variant='h5' >
                    Total Marks:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant='h5' >
                    {exam.totalMarks}
                </Typography>
            </Grid>
        </Grid>
        </Card>
        
        <Grid container spacing={2} sx={{mt:1}}>
            <Grid item xs={12} textAlign="right">
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBackClick}>Go Back</Button>
            </Grid>
        </Grid>       
        </>
    )
}

export default ExamInfo;