import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllStudents } from "../services/UserService";

const studentOptions = [];

export default function StudentSearchBox() {
  //this function will run only when the component is loaded
  React.useEffect(() => {
    getAllStudents().then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        if (response.data.length !== studentOptions.length){
        for (let i = 0; i < response.data.length; i++) { 
            let tempObj = {label: String(response.data[i].rollNumber)};
            studentOptions.push(tempObj) 
        }}
      } else if (response.status === 401) {
        alert("Student not found");
        console.log(response.data);
      }
    });
  });

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={studentOptions}
      sx={{ width: "100%" }}
      renderInput={(params) => (
        <TextField {...params} label="Student Roll Number" />
      )}
    />
  );
}