import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import SearchBox from "../../components/SearchBox";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemText from '@mui/material/ListItemText';
import { deepOrange, deepPurple, deepBlue } from '@mui/material/colors';
import { Button, Grid, Backdrop, Modal, Fade, Box, getInitColorSchemeScript, TextField, Card, Input } from '@mui/material'
import Stack from '@mui/material/Stack';
import PaidIcon from '@mui/icons-material/Paid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { useNavigate, useLocation } from "react-router-dom";
import { getAllFeeDetailsFromStudentFeeRecord, markFeePaid, deleteFeeDetails,payFee } from "../../services/UserService";

const FeeRecordInfo = () => {
    const [rollNumber, setRollNumber] = useState(0)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [feeList, setFeeList] = useState([]);
    const [displayFlag, setDisplayFlag] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [delModalOpen, setDelModalOpen] = useState(false);
    const [payModalOpen, setPayModalOpen] = useState(false)
    const rollNo = location.state.param1;
    const fname = location.state.param2;
    const lname = location.state.param3
    const [tempFeeId, setTempFeeId] = useState(0)
    const [amount, setAmount] = useState(0)
    const [tempFeeAmount, setTempFeeAmount] = useState(0)

    

    useEffect(() => {
        setRollNumber(rollNo)
        setFirstName(fname);
        setLastName(lname);
        console.log(firstName)
        getAllFeeDetailsFromStudentFeeRecord(rollNo).then((response) => {
            if (response.status === 201) {
                console.log(response.data);
                console.log("Sections Found")
                setFeeList(response.data);
                setDisplayFlag(true)
                if (response.data === null) {
                    setDisplayFlag(false)
                }

            }
            else if (response.status === -1) {
                alert("Sections not Found");
                console.log(response.data);
            }
        })
        feeList.sort(function (a, b) { return b.remainingFee - a.remainingFee })
    }, [addModalOpen, delModalOpen, payModalOpen]);
    const NameDisplay = () => {
        return (
            <Paper variant="contained">
                <Typography variant="h6" gutterBottom>
                    Name : {firstName + "  " + lastName}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Roll Number : {rollNumber}
                </Typography>
            </Paper>

        )
    }

    const ColorPicker = (value) => {
        let colorT = "";
        let Text = ""
        if (value.Type === 0) {
            colorT = "success"
            Text = "PAID"
        }
        else {
            colorT = "error"
            Text = "UNPAID"
        }
        return (
            <Button variant="contained" color={colorT} onClick={() => console.log("Hello")}>
                {Text}
            </Button>
        )
    }

    const handleModalClose = () => {
        setModalOpen((isOpen) => !isOpen);
    };
    const handleAddModalClose = () => {
        setAddModalOpen((isOpen) => !isOpen);

    };



    const FeeDisplay = () => {
        if (displayFlag === true)
            return (
                feeList.map((fee) => (

                    <Paper variant="outlined">
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#0000' }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: '#182747' }} >
                                    <PaidIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                secondary={

                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Fee Generation Date: {fee.createdAt}
                                    </Typography>

                                }
                            />
                            <ListItemText
                                secondary={

                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Fee ID: {fee._id}
                                    </Typography>

                                }
                            />
                            <Divider />
                            <ListItemText
                                primary={

                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Tuition Fee:   {fee.tuitionFee}
                                    </Typography>

                                }
                            />
                            <ListItemText
                                primary={

                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Security Fee:   {fee.securityFee}
                                    </Typography>

                                }
                            />

                            <ListItemText
                                primary={

                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Other Fee(s):   {fee.otherFee}
                                    </Typography>

                                }
                            />
                            <ListItemText
                                primary={

                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Paid Fee:   {fee.paidFee}
                                    </Typography>

                                }
                            />
                            <ListItemText
                                secondary={

                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Total Fee: {fee.totalFee}
                                    </Typography>

                                }
                            />
                            <Divider />
                            <ListItemText
                                primary={

                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        remainingFee:   {fee.remainingFee}
                                    </Typography>

                                }
                            />
                            <Divider />
                            <Divider />
                            <ListItemText>
                                <Stack direction="row" spacing={1}>
                                    <Button variant="outlined" onClick={() => handleMarkPaidClick(fee._id)} > Mark Paid </Button>
                                    <Button variant="outlined" onClick={() => deleteFeeClick(fee._id)}> Delete Fee </Button>
                                    <Button variant="outlined" onClick={() => payAmountClicked(fee._id, fee.remainingFee)}> Pay Amount </Button>
                                    <ColorPicker Type={fee.remainingFee} />
                                </Stack>
                            </ListItemText>

                            <Divider />
                            <Divider />
                            <Divider />
                        </List>
                    </Paper>
                ))
            );

    }
    const payAmountClicked = (id, rem) => {
        //console.log(id)
        setTempFeeAmount(rem)
        console.log(tempFeeAmount)
        setTempFeeId(id)
        console.log(tempFeeId)
        setPayModalOpen((isOpen) => !isOpen);
    }
    const deleteFeeClick = (id) => {
        console.log("here")
        //console.log(id)
        setDelModalOpen((isOpen) => !isOpen);
        setTempFeeId(id)
        //const check = deleteFeeDetails(rollNumber, id)
    }
    const handleMarkPaidClick = (id) => {
        setTempFeeId(id)
        setAddModalOpen((isOpen) => !isOpen);
        //
    }
    const modalDeleteClick = () => {
        console.log("Delete")
        console.log(tempFeeId)
        console.log(rollNo)
        deleteFeeDetails(rollNumber, tempFeeId).then((response) => {
            if (response.status === 201) {
                setDelModalOpen((isOpen) => !isOpen);
            }
            else {
                setDelModalOpen((isOpen) => !isOpen);
            }
        })
    }
    const modalPaidClick = () => {
        console.log("Paid")
        console.log(tempFeeId)
        console.log(rollNo)

        markFeePaid(rollNumber, tempFeeId).then((response) => {
            if (response.status === 201) {
                setAddModalOpen((isOpen) => !isOpen);
            }
            else {
                setAddModalOpen((isOpen) => !isOpen);
            }
        })

    }

    const modalPayAmountClick = () => {
        console.log(tempFeeId)
        console.log(rollNo)
        console.log(amount)
        payFee(rollNo,tempFeeId,amount).then((response) => {
            if(response.status === 201){
                setPayModalOpen((isOpen) => !isOpen);
            }
            else {
                setPayModalOpen((isOpen) => !isOpen);
            }
         
    })
}

    const BackNavigationHandler = () => {
        navigate("/Fee/FeeRecord", {
            state: { param1: rollNumber, param2: firstName, param3: lastName },
        })
    }
    const BackButton = () => {
        return (
            <Button variant="outlined" position="absolute" startIcon={<ArrowBackIcon />} onClick={BackNavigationHandler}>
                Back
            </Button>
        )
    }
    const handleAmountChange = event => {
        setAmount(event.target.value);
    
        console.log('value is:', event.target.value);
      };
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
    return (
        <Grid>
            <Grid item xs={11}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={addModalOpen}
                    onClose={handleAddModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={addModalOpen}>
                        <Box sx={style}>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            </Box>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                Are you sure you want to mark the Fee as paid?
                            </Typography>

                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    onClick={() => setAddModalOpen((prevState) => !prevState)}
                                    variant="contained"
                                    component="label"
                                    sx={{ mr: 3 }}
                                >
                                    Go Back
                                </Button>
                                <Button variant="outlined" color="success" onClick={modalPaidClick} >
                                    Confirm
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
            <Grid item xs={11}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={delModalOpen}
                    onClose={setDelModalOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={delModalOpen}>
                        <Box sx={style}>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            </Box>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                Are you sure you want to Delete this Fee?
                            </Typography>

                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    onClick={() => setDelModalOpen((prevState) => !prevState)}
                                    variant="contained"
                                    component="label"
                                    sx={{ mr: 3 }}
                                >
                                    Go Back
                                </Button>
                                <Button variant="outlined" color="error" onClick={modalDeleteClick} >
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
            <Grid item xs={11}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={payModalOpen}
                    onClose={setPayModalOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={payModalOpen}>
                        <Box sx={style}>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                            </Box>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                Enter Amount to pay
                            </Typography>
                            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                                remainingFee Amount : {tempFeeAmount}
                            </Typography>
                            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                            <Input
                                 variant = "outlined"
                                 placeholder = "Amount"
                                 onChange={handleAmountChange}
                                >
                                Hey
                                </Input>

                            </Typography>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    onClick={() => setPayModalOpen((prevState) => !prevState)}
                                    variant="contained"
                                    component="label"
                                    sx={{ mr: 3 }}
                                >
                                    Go Back
                                </Button>
                                <Button variant="outlined" color="success" onClick={modalPayAmountClick} >
                                    Pay
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
            <Grid item>
                <NameDisplay />
            </Grid>
            <Grid item xs={12} textAlign="right">
                <BackButton />
            </Grid>
            <Grid item>
                <FeeDisplay />
            </Grid>
            <Grid item xs={12} textAlign="right">
                <BackButton />
            </Grid>
        </Grid>
    );
};

export default FeeRecordInfo;