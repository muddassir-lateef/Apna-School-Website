import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import './Auth.css';

const Auth = () => {
    let navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm({
        email:{ 
            value: '', 
            isValid:'false'
        },
        password:{ 
            value: '', 
            isValid:'false'
        }
    }, false);

    const submitHandler =(event) =>{
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
        navigate("/students", { replace: true });
    } 

    const switchModeHandler = () => {
        if(!isLoginMode){ 
            setFormData( {
                ...formState.inputs,
                name: undefined
            }, 
            formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else{
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                } 
            },false);
        }
        setIsLoginMode(prevMode => !prevMode);
    };
    return (
      <Card className="authentication">
         <h2>{`${isLoginMode? 'Login': 'Signup'} Required`}</h2>
        <form onSubmit={submitHandler}>
          {!isLoginMode && <Input
            element = 'input'
            id='name'
            type='text'
            label='Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText = 'Please enter a valid name'
            onInput = {inputHandler}
          />}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email"
            onInput = {inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password (min length: 5)."
            onInput = {inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode? 'LOGIN': 'SIGNUP'}
          </Button>
        </form>

        <Button inverse onClick={switchModeHandler}>SWITCH TO {isLoginMode? 'SIGNUP': 'LOGIN'}</Button>
      </Card>
    );
}

export default Auth;