import * as React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box'
import { deepOrange } from '@mui/material/colors';
import Grid from '@mui/material/Grid'
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person';
import { theme } from '../../Themes/Default-theme';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import  {  useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardContent, TextField, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import { getAllFeeDetailsFromStudentFeeRecord, markFeePaid, deleteFeeDetails,payFee, getStudentFeeRecord } from "../../services/UserService";



export default function PrintFees() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const rollNo = location.state.param1;
  const fname = location.state.param2;
  const lname = location.state.param3
  const [feeList, setFeeList] = useState([]);
  const [feeRecord, setFeeRecord] = useState(0);

  const ClassFeeClicked = () => {
    let url = '/Fee/PrintFeeForClass';
    navigate(url);
}
  const StudentFeeClicked = () => {
    let url = '/Fee/PrintFeeForStudent';
    navigate(url);
  }
  
   React.useEffect (()=> {
    getAllFeeDetailsFromStudentFeeRecord(rollNo).then((response) => {
        if (response.status === 201) {

            setFeeList(response.data);
  
            
           

        }
        else if (response.status === -1) {
            console.log("Fee List not found")
        }

        getStudentFeeRecord(rollNo).then((response) => {
            if (response.status === 201) {

                setFeeRecord(response.data)
            }
            else if (response.status === -1) {
                console.log("Record not found")
            }
        })
    })
    //GETTING STUDENT FEE RECORD
   }, [])


   const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      color: theme.palette.common.white,
      
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.results.table.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

   const DisplayRecord = () => {
    function createData(name, Amount) {
        return { name, Amount};
      }
      console.log("Displayed Record then List")
      console.log(feeRecord)
      console.log(feeList)
      const tempAmount = feeRecord.tuitionFee
      const tempAmount1 = feeRecord.otherFee
      const tempAmount2 = feeRecord.scholarshipAmount;
      console.log(tempAmount2)
      console.log(tempAmount1)
      console.log(tempAmount)
      const date = new Date()
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      
      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${day}-${month}-${year}`;
      console.log(currentDate); // "17-6-2022"
      const rows = [
        createData('Mohtly Tuition Fee', tempAmount),
        createData('Monthly Other Fee(s) ', tempAmount1),
        createData('Monthly Scholarship Amount ', tempAmount2),
        createData('Monhtly Total Fee', feeRecord.totalFee),
      ];
    return (
        <Grid container spacing={3}>
        <Grid item xs={12} sx={{ display: "flex", pb: 1, width: '100%', overflowX: 'scroll' }} >

        <TableContainer component={Paper}   sx={{ minWidth: { xs: 350, sm: 800 }, maxWidth: { xs: 350, sm: 800 } }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <StyledTableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableCell>Roll Number</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Fee Record ID</TableCell>
              <TableCell align="right">Generation Date</TableCell>
              </StyledTableRow>
            <TableRow>
              <TableCell>{rollNo}</TableCell>
              <TableCell align="right">{fname}</TableCell>
              <TableCell align="right">{lname}</TableCell>
              <TableCell align="right">{feeRecord._id}</TableCell>
              <TableCell align="right">{currentDate}</TableCell>
            </TableRow>
            <StyledTableRow>
              <TableCell align="center" colSpan = {3} >Fee Type</TableCell>
              <TableCell align="center" colSpan={3} >Amount in PKR</TableCell>
              </StyledTableRow>
            
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center" colSpan={3}>
                  {row.name}
                </TableCell>
                <TableCell  align="center" colSpan={3}>{row.Amount}</TableCell>
              </TableRow>
            ))}
             <StyledTableRow>
              <TableCell  align="center" colSpan={3}>Total Amount To Be Paid</TableCell>
              <TableCell  align="center" colSpan={3} >{feeRecord.outStandingFees}</TableCell>
              </StyledTableRow>
          </TableBody>
        </Table>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          <StyledTableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableCell>Roll Number</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Fee Record ID</TableCell>
              <TableCell align="right">Generation Date</TableCell>
              </StyledTableRow>
            <TableRow>
              <TableCell>{rollNo}</TableCell>
              <TableCell align="right">{fname}</TableCell>
              <TableCell align="right">{lname}</TableCell>
              <TableCell align="right">{feeRecord._id}</TableCell>
              <TableCell align="right">{currentDate}</TableCell>
            </TableRow>
            <StyledTableRow>
              <TableCell align="center" colSpan = {3} >Fee Type</TableCell>
              <TableCell align="center" colSpan={3} >Amount in PKR</TableCell>
              </StyledTableRow>
            
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center" colSpan={3}>
                  {row.name}
                </TableCell>
                <TableCell  align="center" colSpan={3}>{row.Amount}</TableCell>
              </TableRow>
            ))}
             <StyledTableRow>
              <TableCell  align="center" colSpan={3}>Total Amount To Be Paid</TableCell>
              <TableCell  align="center" colSpan={3} >{feeRecord.outStandingFees}</TableCell>
              </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid item sx={12} >

            </Grid>

      </Grid>
    )
   }
  return (
   <DisplayRecord/>
  );
      
}