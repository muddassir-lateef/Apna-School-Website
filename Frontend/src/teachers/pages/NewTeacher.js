import React  from "react";
import { VALIDATOR_EMAIL, VALIDATOR_GENDER, VALIDATOR_REQUIRE } from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import './NewTeacher.css';
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

const NewTeacher = () => {

    const [formState, InputHandler] = useForm({
        name:{
            value: '',
            isValid: false
        },
        age:{
            value: '',
            isValisd: false
        },
        email:{
            value: '',
            isValid: false
        },
        gender:{
            value: '',
            isValid: false
        }

    }, false);

    const teacherSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return(
        <form className="teacher-form" onSubmit={teacherSubmitHandler}>
            <h2>Please enter the required details</h2>
            <Input
                id = "name"
                label="Teacher Name"
                element="input"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name"
                onInput = {InputHandler}
            />
            <Input
                id = "age"
                label = "Age"
                element = "input"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid age"
                onInput = {InputHandler}
            />
            <Input
                id = "gender"
                label = "Gender"
                element = "input"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_GENDER()]}
                errorText="Please enter a valid gender (M/F)."
                onInput = {InputHandler}
            />
            <Input
                id = "email"
                label = "Email"
                element = "input"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address"
                onInput = {InputHandler}
            />
            <div className="submit-btn">
            <Button type='submit' disabled={!formState.isValid}>ADD TEACHER</Button>
            </div>
        </form>
    );
};

export default NewTeacher;