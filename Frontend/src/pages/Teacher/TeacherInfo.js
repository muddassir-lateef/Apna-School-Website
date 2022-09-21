import React from 'react';
import { useParams } from 'react-router-dom';

import { Grid } from '@mui/material';

const TeacherInfo = () => {
    let username = useParams().username;
    return(
        <Grid container spacing={3} sx={{p:2}}>
            <h2>This is one teacher's info for {username}</h2>
        </Grid>
    );
}

export default TeacherInfo;