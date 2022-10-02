import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import { useParams } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ListItemText from '@mui/material/ListItemText';
import { deepOrange, deepPurple, deepBlue } from '@mui/material/colors';
import { useNavigate, useLocation } from "react-router-dom";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton'
import { Button, Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import { getAllSectionsInClass, addClass } from "../../services/UserService";
export default function AlignItemsList() {
  const [section, setSection] = useState("")
  const [sectionFlag, setSectionFlag] = useState(false)
  const navigate = useNavigate();
  let classYear = useParams().classYear;
  const [sectionYear, setSectionYear] = useState();


  const ViewSectionHandler = (event, index, strength) => {
    navigate("/class/section", {
      state: { param1: index, param2: classYear , param3 : strength},
    });

  }
  const handleGoBackClick = () => {
    let url = '/class/searchClass';
    navigate(url);
  }


  useEffect(() => {
    setSectionYear(classYear)
  }, [sectionYear]);

  useEffect(() => {
    getAllSectionsInClass(classYear).then((response) => {
      if (response.status === 1) {
        console.log(response.data);
        console.log("Sections Found")
        setSection(response.data);
      }
      else if (response.status === -1) {
        alert("Sections not Found");
        console.log(response.data);
      }
      setSection(response.data)
      setSectionFlag(true)
      console.log(response)
    })
  }, []);
  const SectionDisplay = () => {
    if (sectionFlag === true)
      return (
        section.map((secs) => (
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#0000' }}>
            <ListItemButton alignItems="flex-start"
              value={classYear}
              size="small"
              onClick={(event) => ViewSectionHandler(event, secs.sectionName, secs.strength)}
            >

              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#182747' }} >
                  {secs.sectionName}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Section Head"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Strength : {secs.strength}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
            <Divider />
          </List>
        ))
      );

  }

  return (
    <Box>
      <SectionDisplay />
      <Button variant = "outlined" startIcon={<ArrowBackIcon />} onClick={handleGoBackClick}>
                    Back
                  </Button>
    </Box>
  )

}
