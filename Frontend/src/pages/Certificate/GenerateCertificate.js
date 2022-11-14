import React from "react";
import { useState, useEffect } from "react";
import { Button, Grid,  } from "@mui/material";



const GenCert = () => {


    const handleGenBtn = () => {
        
    };

    return (

        <Grid sx={{ flexGrow: 1 }} container spacing={1}>
            
            <Button variant="contained" sx={{ m: 15, mt: 5 }} onClick={handleGenBtn}>Generate</Button>

        </Grid >

    );
};

export default GenCert;
