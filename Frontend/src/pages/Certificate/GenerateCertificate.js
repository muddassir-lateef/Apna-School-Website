import React from "react";
import { useState, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { getCert } from "../../services/PDFService";


const GenCert = () => {
    const [studentName, setStudentName] = useState("");

    const handleGenBtn = () => {


        getCert(studentName)
    }
    return (
        <div>
            <TextField
                id="outlined-basic"
                label="Student Name"
                variant="outlined"
                onChange={(newValue) => setStudentName(newValue.target.value)}
            />

            <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                <Button variant="contained" sx={{ m: 15, mt: 5 }} onClick={handleGenBtn}>Generate</Button>

            </Grid >
        </div>
    );
};

export default GenCert;
