import React, {useState, useEffect} from 'react';
import { useParams} from "react-router-dom";

import { getAllStudents } from '../../services/UserService';


const UploadMarks = () => {
    const examId = useParams().examId;
    const [allStudents, setAllStudents] = useState([]);
    useEffect(() => {
        getAllStudents().then((res)=>{
            if (res === -1){
                console.log("Could not fetch students");
            }
            else{
                console.log(res.data)
            }
        })
    }, []);

    return (<h1>Upload Marks for {examId}</h1>)
}

export default UploadMarks;