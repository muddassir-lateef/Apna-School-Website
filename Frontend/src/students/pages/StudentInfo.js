import React, { useState } from 'react';
import {useParams} from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import './StudentInfo.css';

const STUDENTS = [
    {
      id: "u1",
      name: "Shayan Amir",
      age: 22,
      gender: "M",
      email: "shayanamir98@gmail.com",
      guardianName: "Amir Zuberi",
      address: "Street 22 F6, Islamabad",
      admissionDate: "Thu Aug 04 2022",
      class: "i190749",
      image:
        "https://media-exp1.licdn.com/dms/image/C4D03AQHWwj7VdWcCYg/profile-displayphoto-shrink_200_200/0/1604845920186?e=1664409600&v=beta&t=sDX30DWbrx62C6vsTyXheMpPBRa2O-My2c1lj_uaZM0",
    },
    {
      id: "u2",
      name: "Mudassir Lateef",
      age: 22,
      gender: "M",
      email: "mudassir@gmail.com",
      guardianName: "Mr. Lateef",
      address: "wah Cantt",
      admissionDate: "Wed Aug 03 2022",
      class: "i190505",
      image:
        "https://media-exp1.licdn.com/dms/image/C4D03AQGg1yblMgkiXQ/profile-displayphoto-shrink_200_200/0/1614095000191?e=1664409600&v=beta&t=CwUMnFXSIzSoyWQZd_hVbRbMBfulxVToaBuvyH70LZA",
    },
    {
      id: "u3",
      name: "Salaar Abbas",
      age: 22,
      gender: "M",
      email: "salaar24@gmail.com",
      guardianName: "Mr. Abbas",
      address: "Street 20 F10, Islamabad",
      admissionDate: "Thu Aug 04 2022",
      class: "i190490",
      image:
        "https://media-exp1.licdn.com/dms/image/C4D03AQHNgjYSefA5Kw/profile-displayphoto-shrink_200_200/0/1654606979389?e=1664409600&v=beta&t=HrQHrllH69Wb2SMwcGcrwu1wpwdZo5AkRLpnzpvyK2M",
    },
    {
      id: "u4",
      name: "Ali Musa",
      age: 22,
      gender: "M",
      email: "alimusa@gmail.com",
      guardianName: "Mr. unidenntified",
      address: "Zaraj palace, Islamabad",
      admissionDate: "Tue Aug 02 2022",
      class: "i191234",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80",
    },
  ];

const StudentInfo = () => {

    const userId = useParams().studentId;
    const props = STUDENTS.find((stu)=>stu.id === userId);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteWarningHandler = () => {
    console.log("Deleting Place");
    setShowConfirmModal(false);
  };
  return (
    <React.Fragment>
        <div className='student-container' >
      <Modal
        show = {showConfirmModal}
        onCancel = {cancelDeleteWarningHandler}
        header="Are you sure"
        footerClass="place-item__modal-actions"
        footer={<>
          <Button inverse onClick={cancelDeleteWarningHandler}>CANCEL</Button>
          <Button danger onClick={confirmDeleteWarningHandler}>DELETE</Button>
        </>}
      >
        <p>Are you sure to delete this student?</p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.name}</h2>
            <h3>{props.class}</h3>
            <h4>Age: {props.age}</h4>
            <h4>Gender: {props.gender}</h4>
            <h4>Email: {props.email}</h4>
            <h4>Guardian: {props.guardianName}</h4>
            <h4>Admission Date: {props.admissionDate}</h4>
            <h4>Address: {props.address}</h4>
          </div>
          <div className="place-item__actions">
            <Button to={`/updateStudent/${props.id}`}>EDIT</Button>
            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
          </div>
        </Card>
      </li> 
      </div>
    </React.Fragment>
  );
};

export default StudentInfo;
