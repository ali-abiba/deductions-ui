import './login.css'

import {createEmployer} from '../../services/employer.service'

import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = (props) => {
    const [employerName, setEmployerName] = useState('');
    const handleChange = (e) => {
        setEmployerName(e.target.value);
    };

    const getEmployer = (e) => {
        e.preventDefault();

        createEmployer({employerName: employerName}).then(response => {
            if(response.ok) {
                return response.json();
            }
        }).then(data => {
            props.loginCallback(data);
        });
    }
    return (
        <div className="login">
            <Form onSubmit={getEmployer} className="login-form">
                <Form.Group>
                    <Form.Label><h3>Please enter your Employer name</h3></Form.Label>
                    <Form.Control type="text" placeholder="LexCorp" onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login;
