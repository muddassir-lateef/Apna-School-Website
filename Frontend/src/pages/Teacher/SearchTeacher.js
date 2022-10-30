import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Modal,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  Fade,
  Backdrop
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchBox from "../../components/SearchBox";
import { getAllTeachers, deleteTeacher } from "../../services/UserService";
import { Image } from "cloudinary-react";
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

const SearchTeacher = () => {
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [username, setUsername] = useState("");
  const [teachersList, setTeachersList] = useState([]);
  const [teachersMasterList, setTeachersMasterList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getAllTeachers().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setTeachersList(response.data);
        setTeachersMasterList(response.data);
        if (response.data.length !== teacherOptions.length) {
          var temp_list = [];
          for (let i = 0; i < response.data.length; i++) {
            let tempObj = { label: String(response.data[i].username) };
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
  }, []);

  

  const textChange = (value) => {
    setUsername(value);
    //console.log("here: " + value);
    if (typeof value === "string") {
      const filteredArray = teachersMasterList.filter((teacher) => {
        return teacher.username.toLowerCase().includes(value.toLowerCase());
      });
      setTeachersList(filteredArray);
    }
    if (value.length === 0) setTeachersList(teachersMasterList);
  };

  const handleTeacherDelete = (teacherId) => {
    setSelectedTeacher(teacherId)
    console.log(teacherId);
    setModalOpen(true);
  };

  const handleDeleteTeacher = () => {
    const teacherId = selectedTeacher;
    setModalOpen(false);
    const temp_teachers = teachersList.filter(
      (teacher) => teacher.username !== teacherId
    );
    setTeachersList(temp_teachers);
    setTeacherOptions(
      teacherOptions.filter((option) => option.label !== teacherId)
    );
    let res = deleteTeacher(teacherId);
    if (res.status === 202) console.log("Teacher was deleted successfully");
    else console.log(res);
  };

  const handleModalClose = () => {
    setModalOpen((isOpen) => !isOpen);
  };

  const handleTeacherCardClick = (username) => {
    let url = `/teacher/${username}`;
    navigate(url);
  }

  const handleTeacherUpdateClick = (username) => {
    let url = `/teacher/edit/${username}`;
    navigate(url);

  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SearchBox
          onChange={textChange}
          inputValue={username}
          options={teacherOptions}
          label="Teacher Username"
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
                Are you sure you want to delete this teacher?
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
                  onClick={handleDeleteTeacher}
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

      {teachersList.map((item) => (
        <Grid
          item
          sm={12}
          md={6}
          lg={4}
          key={item.username}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card sx={{ maxWidth: 320 }}>
            <Button
              onClick={() => handleTeacherCardClick(item.username)}
              style={{ padding: "0px" }}
            >
              <Image
                cloudName="dqxdmayga"
                publicId={item.image}
                width={320}
                height={250}
              />
            </Button>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.firstName + " " + item.lastName}
              </Typography>
            </CardContent>

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
                  onClick={() => handleTeacherUpdateClick(item.username)}
                >
                  Edit
                </Button>
                <Button
                  sx={{ width: "40%" }}
                  variant="outlined"
                  color="error"
                  onClick={() => handleTeacherDelete(item.username)}
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
  );
};

export default SearchTeacher;

