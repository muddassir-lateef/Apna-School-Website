import React, { useState, useEffect } from 'react';
import { getAllStudents, getAllMarks } from "../../services/UserService";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar
} from "@mui/material";
import SearchBox from "../../components/SearchBox";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Cloudinary } from "@cloudinary/url-gen";


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

function createData(subject, totalMarks, obtainedMarks, percentage) {
    return { subject, totalMarks, obtainedMarks, percentage };
}
//const rows = [
  //  createData('Shayan Amir', 7, 'C', 88, 95),
 //   createData('Salar Abbas', 7, 'C', 90, 97)
//]
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

const Results = () => {
    const [studentOptions, setStudentOptions] = useState([]);
    const [username, setUsername] = useState(0);
    const [studentList, setStudentList] = useState([]);
    const [studentMasterList, setStudentMasterList] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [allMarks, setAllMarks] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllStudents().then((response) => {
            if (response.status === 201) {
                console.log(response.data);
                setStudentList(response.data);
                setStudentMasterList(response.data);
                if (response.data.length !== studentOptions.length) {
                    var temp_list = [];
                    for (let i = 0; i < response.data.length; i++) {
                        let tempObj = { label: String(response.data[i].rollNumber) };
                        if (
                            studentOptions.find(
                                (teacher) => teacher.label === tempObj.label
                            ) === undefined
                        )
                            temp_list.push(tempObj);
                    }
                    setStudentOptions(temp_list);
                }
            } else if (response.status === 401) {
                alert("Student not found");
                console.log(response.data);
            }
        });// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=>{
        getAllMarks().then((res)=>{
            if (res.status === 201 && Array.isArray(res.data)){
                console.log("All Marks: ", res.data)
                setAllMarks(res.data)
            }
        })

    }, [])

    //whenever we change the student
    useEffect(()=>{
        if (username === ""){
            setRows([])
            return;
        }
        const tempMarks = allMarks.filter(item=>item.studentId.rollNumber == username)
        console.log("TEMP MARKS: ", tempMarks)
        if (Array.isArray(tempMarks) && tempMarks.length > 0){
            const tempRows = [];
            for (let i=0; i<tempMarks.length; i++){
                //'Shayan Amir', 7, 'C', 88, 95
                tempRows.push(createData(tempMarks[i].examId.subject, 
                    tempMarks[i].examId.totalMarks, 
                    tempMarks[i].obtainedMarks, 
                    ((parseFloat(tempMarks[i].obtainedMarks) / parseFloat(tempMarks[i].examId.totalMarks) * 100).toFixed(2))
                ))
            }
            setRows(tempRows)
        }
        else{
            setRows([])
            return;

        }
    }, [username])

    const textChange = (value) => {
        console.log(value)

        let value1 = Number(value)
        console.log("in text change")
        setUsername(value);
        console.log(value1)
        if (value1 !== 0) {
            const filteredArray = studentMasterList.filter((teacher) => {
                let tempRoll = String(teacher.rollNumber)
                return tempRoll.includes(value1);
            });
            setStudentList(filteredArray);
        }
        else if (value1 === 0) {
            setStudentList(studentMasterList)
        }
    };


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <Typography variant='h4' sx={{ textAlign: 'center' }}>
                       Select a Student
                    </Typography>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <SearchBox
                    onChange={textChange}
                    inputValue={username}
                    options={studentOptions}
                    label="Student Roll Number"
                />
            </Grid>
            {studentList.map((value, index) => (
                <Grid item xs={12} key={value.rollNumber}>
                    <Grid container spacing={2} >
                        <Grid item xs={0}  >
                            <Avatar alt={value.name} src={imgToUrl(value.image)} sx={{ bgcolor: stringToColor(value), width: 60, height: 60 }} />
                        </Grid>

                        <Grid item xs={5} >
                            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center" }}>
                                <Typography>{value.rollNumber}</Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={6} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Card sx={{ padding: 1, height: 45, display: "flex", alignItems: "center" }}>
                                <Typography>{value.firstName + " " + value.lastName}</Typography>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>

            ))}
            <Grid item xs={12} sx={{ display: "flex", pb:1, width: '100%'}} >
                <TableContainer sx={{overflowX: 'scroll'}} component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Exam</StyledTableCell>
                                <StyledTableCell align="right">Total Marks</StyledTableCell>
                                <StyledTableCell align="right">Obtained Marks</StyledTableCell>
                                <StyledTableCell align="right">Percentage</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.subject}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.totalMarks}</StyledTableCell>
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

export default Results;