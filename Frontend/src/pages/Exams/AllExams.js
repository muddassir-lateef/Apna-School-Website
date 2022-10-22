import React, {useState, useEffect} from 'react';
import { getAllExams, deleteExam } from '../../services/UserService';
import { Grid, Card, CardContent, CardActions, Typography, Box, Button, Divider, Modal, Backdrop, Fade } from "@mui/material";
import SearchBox from "../../components/SearchBox";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
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
const AllExams = () => {
    const navigate = useNavigate();
    const [examsMasterList, setExamsMasterList] = useState([]);
    const [examsList, setExamsList] = useState([]);
    const [searchTitle, setSearchTitle] = useState("")
    const [examOptions, setExamOptions] = useState(["No option"]);
    const [modalOpen, setModalOpen] = useState(false);
    const [examToDelete, setExamToDelete] = useState("");

    const textChange = (value) => {
        setSearchTitle(value);
        if (typeof value === "string") {
            const filteredArray = examsMasterList.filter((exam) => {
              return exam.subject.toLowerCase().includes(value.toLowerCase());
            });
            setExamsList(filteredArray);
          }
        if (value.length === 0) setExamsList(examsMasterList);
    }
    useEffect(()=>{
        getAllExams()
        .then((res)=>{
            setExamsMasterList(res.data)
            setExamsList(res.data)
            if (Array.isArray(res.data) && res.data.length !== examOptions.length) {
                var temp_list = [];
                for (let i = 0; i < res.data.length; i++) {
                    let tempObj = { label: String(res.data[i].subject) };
                    if (
                        examOptions.find(
                            (exam) => exam.label === tempObj.label
                        ) === undefined
                    )
                        temp_list.push(tempObj);
                }
                setExamOptions(temp_list);
            }
            console.log(res.data)
        })// eslint-disable-next-line
    }, []);

    const handleModalClose = () => {
        setModalOpen((isOpen) => !isOpen);
    };

    const handleExamDelete = (examId) => {
        setExamToDelete(examId);
        console.log("Id: ", examId);
        setModalOpen(true);
    }
    const deleteExamForSure = async() => {
        const res = await deleteExam(examToDelete);
        if (res.status === 202){
            console.log("Exam deleted Successfully")
        }
        else{
            console.log("Exam was NOT deleted")
        }
        setModalOpen(false);
        const temp_exams = examsList.filter(
        (exam) => exam._id !== examToDelete
        );
        setExamsList(temp_exams);
        setExamOptions(
        examOptions.filter((option) => option.label !== searchTitle)
        );
    }

    return (
        <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item xs={12}>
                <SearchBox
                    onChange={textChange}
                    inputValue={searchTitle}
                    options={examOptions}
                    label="Exam Subject"
                />
            </Grid>
            <Grid item xs={11}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={modalOpen}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modalOpen}>
                        <Box sx={style}>
                            <Typography
                                id="transition-modal-title"
                                variant="h6"
                                component="h2"
                                sx={{ mb: 2 }}
                            >
                                Are you sure you want to delete this Exam?
                            </Typography>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Button
                                    onClick={() => setModalOpen((prevState) => !prevState)}
                                    variant="contained"
                                    component="label"
                                    sx={{ mr: 3 }}
                                >
                                    Go Back
                                </Button>
                                <Button
                                    onClick={deleteExamForSure}
                                    variant="outlined"
                                    color="error"
                                >
                                    DELETE
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
            {examsList.map((item) => (
            <Grid
                item
                sm={12}
                md={6}
                lg={4}
                key={item._id}
                sx={{ display: "flex", justifyContent: "center" 
            }}
            >
                <Card sx={{ minWidth: 320, maxWidth:320}}>
                    <CardContent height='100%' onClick={()=>{navigate(`/exams/${item._id}`)}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.subject}
                        </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Box
                            sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            }}
                        >
                            <Button
                            sx={{ width: "40%" }}
                            variant="contained"
                            component="label"
                            startIcon={<EditIcon />}
                            onClick={() => console.log("Edit Clicked")}
                            >
                            Mark
                            </Button>
                            <Button
                            sx={{ width: "40%" }}
                            variant="outlined"
                            color="error"
                            onClick={() => handleExamDelete(item._id)}
                            startIcon={<DeleteIcon />}
                            >
                            Delete
                            </Button>
                        </Box>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>
    )
}

export default AllExams;