import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useParams,} from 'react-router-dom';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate,  useLocation } from "react-router-dom";
import { getAllStudentsInSection } from "../../services/UserService";

import Typography from '@mui/material/Typography';

export default function AlignItemsList() {
  const [tempSection, setTempSection] = useState()
  const [tempClass, setTempClass] = useState();
  const [sectionFlag, setSectionFlag] = useState(false)
  const [studentList, setStudentList] = useState([]);
  const location = useLocation();
  const classYear = Number(location.state.param2);
  const sectionName = location.state.param1;
  const navigate = useNavigate();
    
  useEffect(() => {
    getAllStudentsInSection(classYear, sectionName).then((response) => {
      if (response.status === 201) {
        console.log(response.data);
        console.log("Students Found")
        setStudentList(response.data);
      }
      else if (response.status === -1) {
        alert("Sections not Found");
        console.log(response.data);
      }
    })
  }, []);


  
    
    

  return(
    studentList.map((stu) => (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#0000' }}>
        <ListItemButton alignItems="flex-start"
        size="small" 
        >

          <ListItemAvatar>
            <Avatar sx={{ bgcolor: '#182747' }} >
            {sectionName}
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
                  Strength : {classYear}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItemButton>
        <Divider />
      </List>
  )))
 
}
