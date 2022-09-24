import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import { useParams } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton'
import { Button, Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import { getAllSectionsInClass } from "../../services/UserService";
export default function AlignItemsList() {
  const [section, setSection] = useState("")
  const [sectionFlag, setSectionFlag] = useState(false)

  let classYear = useParams().classYear;
  console.log(classYear);


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
    if(sectionFlag === true)
    return (
      section.map((secs) => (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'skyblue' }}>
        <ListItemButton alignItems="flex-start">

          <ListItemAvatar>
            <Avatar alt="Remy Sharp" >
            {secs.sectionName}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary= "Section Head"
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
        <Divider variant="inset" component="li" />
      </List>
      ))
  );
  }

  return(
    <Box>
    <SectionDisplay/>
    </Box>
  )
 
}
