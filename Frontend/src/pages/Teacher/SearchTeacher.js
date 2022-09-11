import React from "react";
import { useState } from "react";
import { Button, Container, Box, Grid } from "@mui/material";
import { getStudents } from "../../services/UserService";
import SearchBox from "../../components/SearchBox";
import { getAllTeachers } from "../../services/UserService";
const teacherOptions = [];

const SearchTeacher = () => {
    const [username, setUsername] = useState("");

    React.useEffect(() => {
        getAllTeachers().then((response) => {
            if (response.status === 201) {
                console.log(response.data);
                if (response.data.length !== teacherOptions.length) {
                    for (let i = 0; i < response.data.length; i++) {
                        let tempObj = { label: String(response.data[i].username) };
                        let tempObj1 = { label: String(response.data[i].firstName) };

                        teacherOptions.push(tempObj)
                        teacherOptions.push(tempObj1)

                    }
                }
            } else if (response.status === 401) {
                alert("Teacher not found");
                console.log(response.data);
            }
        },);
    });

    const textChange = (value) => {
        setUsername(value);

    };

    return (
        <Box>
            <SearchBox onChange={textChange} inputValue={username} options={teacherOptions} label="Teacher Username" />
        </Box>
    );
};

export default SearchTeacher;
