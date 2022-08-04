import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_GENDER } from '../../shared/util/validators';
import './NewStudent'
import Card from '../../shared/components/UIElements/Card';

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

const UpdateStudent = () => {
    const navigate = useNavigate();
    const studentId = useParams().studentId;
    const [isLoading, setIsLoading] = useState(true);

    const [formState, InputHandler, setFormData] = useForm({
      name:{
        value: '',
        isValid: false
      },
      age:{
          value: '',
          isValid: false
      },
      address:{
          value: '',
          isValid: false
      },
      guardianName:{
          value: '',
          isValid: false
      },
      gender:{
          value: '',
          isValid: false
      },
      email:{
          value: '',
          isValid: false
      },
      admissionDate: {
          value: '',
          isValid: true
      }
    }, false);

    const identifiedtudent = STUDENTS.find(s => s.id === studentId);
    
    useEffect(()=>{
      if (identifiedtudent)
      setFormData({
        name:{
          value: identifiedtudent.name ,
          isValid: true
      },
      age:{
          value: identifiedtudent.age,
          isValid: true
      },
      address:{
          value: identifiedtudent.address,
          isValid: true
      },
      guardianName:{
          value: identifiedtudent.guardianName,
          isValid: true
      },
      gender:{
          value: identifiedtudent.gender,
          isValid: true
      },
      email:{
          value: identifiedtudent.email,
          isValid: true
      },
      admissionDate: {
          value: identifiedtudent.admissionDate,
          isValid: true
      }
      }, true);
      setIsLoading(false);

    }, [setFormData, identifiedtudent]);
    

    const studentUpdateSubmitHandler = event => {
      event.preventDefault();
      console.log(formState.inputs);
      navigate(`/student/${studentId}`, { replace: true });
    }

    if (!identifiedtudent){
        return(<div className='center'>
          <Card>
            <h2>No student Found</h2>
            </Card>
        </div>);
    }

    if (isLoading){
      return(
        <div className='center'>
          <h2>Loading...</h2>
        </div>
      );
    }
    return (
      <form className='student-form' onSubmit={studentUpdateSubmitHandler}>
        <Input
          id = "name"
          label="Student Name"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
          onInput = {InputHandler}
          initialValue={formState.inputs.name.value}
          initialValid={formState.inputs.name.isValid}
        />
        <Input
            id = "age"
            label = "Age"
            element = "input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid age"
            onInput = {InputHandler}
            initialValue={formState.inputs.age.value}
            initialValid={formState.inputs.age.isValid}
        />
        <Input
            id = "gender"
            label = "Gender"
            element = "input"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_GENDER()]}
            errorText="Please enter a valid gender (M/F)."
            onInput = {InputHandler}
            initialValue={formState.inputs.gender.value}
            initialValid={formState.inputs.gender.isValid}
        />
        <Input
            id = "email"
            label = "Email"
            element = "input"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput = {InputHandler}
            initialValue={formState.inputs.email.value}
            initialValid={formState.inputs.email.isValid}
        />
        <Input
            id = "guardianName"
            label="Guardian Name"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid guardian name"
            onInput = {InputHandler}
            initialValue={formState.inputs.guardianName.value}
            initialValid={formState.inputs.guardianName.isValid}
        />
        <Input
            id = "address"
            label="Address"
            element="textarea"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address"
            onInput = {InputHandler}
            initialValue={formState.inputs.address.value}
            initialValid={formState.inputs.address.isValid}
        />
        <Input
            id = "admissionDate"
            label = "Date of admission"
            element = "input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid date"
            onInput = {InputHandler}
            readOnly = {true} 
            initialValue={formState.inputs.admissionDate.value}
            initialValid={formState.inputs.admissionDate.isValid}
          />

        <Button type='submit' disabled={!formState.isValid}>Update Student</Button>

      </form>
    );

}

export default UpdateStudent;