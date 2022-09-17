import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import SearchBox from "../../components/SearchBox";
import { getAllTeachers } from "../../services/UserService";
import { Image } from "cloudinary-react";
const teacherOptions = [];

const SearchTeacher = () => {
  const [username, setUsername] = useState("");
  const [teachersList, setTeachersList] = useState([]);
  const [teachersMasterList, setTeachersMasterList] = useState([]);

  useEffect(() => {
    getAllTeachers().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        setTeachersList(response.data);
        setTeachersMasterList(response.data);
        if (response.data.length !== teacherOptions.length) {
          for (let i = 0; i < response.data.length; i++) {
            let tempObj = { label: String(response.data[i].username) };
            if (
              teacherOptions.find(
                (teacher) => teacher.label === tempObj.label
              ) === undefined
            )
              teacherOptions.push(tempObj);
          }
        }
      } else if (response.status === 401) {
        alert("Teacher not found");
        console.log(response.data);
      }
    });
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
    //console.log(teacherId);
    
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

      {teachersList.map((item) => (
        <Grid item sm={12} md={6} lg={4} key={item.username} sx={{display: 'flex', justifyContent:'center'}}>
          <Card sx={{ maxWidth: 340 }}>
            <Image
              cloudName="dqxdmayga"
              publicId={item.image}
              width={340}
              height={250}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.firstName + " " + item.lastName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
              <Button size="small" onClick={()=>handleTeacherDelete(item._id)}>Delete</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SearchTeacher;
