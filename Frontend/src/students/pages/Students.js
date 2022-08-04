import React from 'react';
import StudentsList from '../components/StudentsList';

const Students = () =>{
    const STUDENTS = [
      {
        id: "u1",
        name: "Shayan Amir",
        age: 22,
        Gender: "M",
        Email: "shayanamir98@gmail.com",
        GuardianName: "Amir Zuberi",
        Address: "Street 22 F6, Islamabad",
        AdmissionDate: "Thu Aug 04 2022",
        class: "i190749",
        image:
          "https://media-exp1.licdn.com/dms/image/C4D03AQHWwj7VdWcCYg/profile-displayphoto-shrink_200_200/0/1604845920186?e=1664409600&v=beta&t=sDX30DWbrx62C6vsTyXheMpPBRa2O-My2c1lj_uaZM0",
      },
      {
        id: "u2",
        name: "Mudassir Lateef",
        age: 22,
        Gender: "M",
        Email: "mudassir@gmail.com",
        GuardianName: "Mr. Lateef",
        Address: "wah Cantt",
        AdmissionDate: "Wed Aug 03 2022",
        class: "i190505",
        image:
          "https://media-exp1.licdn.com/dms/image/C4D03AQGg1yblMgkiXQ/profile-displayphoto-shrink_200_200/0/1614095000191?e=1664409600&v=beta&t=CwUMnFXSIzSoyWQZd_hVbRbMBfulxVToaBuvyH70LZA",
      },
      {
        id: "u3",
        name: "Salaar Abbas",
        age: 22,
        Gender: "M",
        Email: "salaar24@gmail.com",
        GuardianName: "Mr. Abbas",
        Address: "Street 20 F10, Islamabad",
        AdmissionDate: "Thu Aug 04 2022",
        class: "i190490",
        image:
          "https://media-exp1.licdn.com/dms/image/C4D03AQHNgjYSefA5Kw/profile-displayphoto-shrink_200_200/0/1654606979389?e=1664409600&v=beta&t=HrQHrllH69Wb2SMwcGcrwu1wpwdZo5AkRLpnzpvyK2M",
      },
      {
        id: "u4",
        name: "Ali Musa",
        age: 22,
        Gender: "M",
        Email: "alimusa@gmail.com",
        GuardianName: "Mr. unidenntified",
        Address: "Zaraj palace, Islamabad",
        AdmissionDate: "Tue Aug 02 2022",
        class: "i191234",
        image:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80",
      },
    ];
    return(
        <StudentsList items={STUDENTS}/>
    );

   
};


export default Students;