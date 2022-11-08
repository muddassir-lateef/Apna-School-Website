import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Card, Typography } from "@mui/material";
import { getAllStudentsInClass, getExamById, getMarks } from '../../services/UserService';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, rollNumber, section, obtainedMarks, percentage) {
    return { name, rollNumber, section, obtainedMarks, percentage };
}
//const rows = [
  //  createData('Shayan Amir', 'i190749', 'C', 88, 95),
   // createData('Salar Abbas', 'i190490', 'C', 90, 97)
//]


const ViewExamMarks = () => {
    const examId = useParams().examId;
    const [exam, setExam] = useState({classId: {classYear: ''}});
    const [marks, setMarks] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getExamById(examId).then((res) => {
            if (res.status === 201) {
                console.log(res.data)
                setExam(res.data)
                getMarks(examId).then((response)=>{
                    if (response.status === 200){
                        console.log(response.data)
                        setMarks(response.data)
                        const tempRowData = []
                        if (Array.isArray(response.data) && response.data.length > 0){
                            for (var i=0; i< response.data.length; i++){
                                tempRowData.push(
                                    createData(
                                        response.data[i].studentId.firstName + " " + response.data[i].studentId.lastName,
                                        response.data[i].studentId.rollNumber,
                                        response.data[i].studentId.sectionName,
                                        response.data[i].obtainedMarks,
                                        ((parseFloat(response.data[i].obtainedMarks) / parseFloat(res.data.totalMarks)) * 100).toFixed(1)
                                    )
                                )
                                setRows(tempRowData)
                            }
                        }
                    }
                })
            }
        });
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>
                        Exam Marks, Class {exam.classId.classYear}
                    </Typography>
                </Card>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", pb:1, width: '100%'}} >
                <TableContainer sx={{overflowX: 'scroll'}} component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Roll No</StyledTableCell>
                                <StyledTableCell align="right">Section</StyledTableCell>
                                <StyledTableCell align="right">Obtained Marks</StyledTableCell>
                                <StyledTableCell align="right">Percentage</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.rollNumber}</StyledTableCell>
                                    <StyledTableCell align="right">{row.section}</StyledTableCell>
                                    <StyledTableCell align="right">{row.obtainedMarks}</StyledTableCell>
                                    <StyledTableCell align="right">{row.percentage}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default ViewExamMarks;