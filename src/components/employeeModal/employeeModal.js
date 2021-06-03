import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast"
import React, {useEffect, useState} from "react";
import {createDependant} from "../../services/dependantService";
import {saveEmployee} from "../../services/employeeService";

const EmployeeModal = (props) => {
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [salary, setSalary] = useState();
    const [dependants, setDependants] = useState([]);
    const [dependantFirst, setDependantFirst] = useState();
    const [dependantLast, setDependantLast] = useState();

    useEffect(() => {
        if (props.employee) {
            setDependants(props.employee.dependants);
            setFirstName(props.employee.firstName);
            setLastName(props.employee.lastName);
            setSalary(props.employee.salary);
        }

    }, [props.employee]);

    const addDependant = (e) => {
        const dependant = {
            firstName: dependantFirst,
            lastName: dependantLast,
            employeeId: props.employee.id
        };
        createDependant(dependant).then(response => {
            if (response.ok) {
                setDependants(dependants.concat(dependant));
                setDependantFirst('');
                setDependantLast('');
                props.employeeupdate('dependant');
            } else {
                setShowErrorToast(true);
            }
        })
    };

    const updateEmployee = () => {
        console.log(firstName);
        console.log(lastName);
        const employee = {
            id: props.employee.id,
            firstName: firstName,
            lastName: lastName,
            salary: salary,
            employerId: props.employee.employerId
        }

        saveEmployee(employee).then(response => {
            if (!response.ok) {
                setShowErrorToast(true);
            } else {
                props.employeeupdate('save');
            }
        })
    }

    const closeError = () => {
        setShowErrorToast(false);
    }

    const dependantRows = dependants ? dependants.map((val, index) => {
        return (
            <li key={index}>{val.firstName} {val.lastName}</li>
        )
    }) : [];
    return (
        <div>
            <Modal {...props}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.employee.id && `Edit Employee: ${props.employee.firstName} ${props.employee.lastName}`}
                        {!props.employee.id && `Create New Employee`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                            {props.employee.id &&
                            <div>
                                <Form.Label>Salary</Form.Label>
                                <Form.Control type="text" value={salary} onChange={e => setSalary(e.target.value)}/>
                            </div>
                            }
                        </Form.Group>
                        <Form.Group>
                            <Button onClick={updateEmployee}>
                                {props.employee.id && `Update Employee`}
                                {!props.employee.id && `Create Employee`}
                            </Button>
                        </Form.Group>
                    </Form>
                    {props.employee.id && <Form>
                        <h4>Dependants:</h4>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" onChange={e => setDependantFirst(e.target.value)}/>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" onChange={e => setDependantLast(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Button onClick={addDependant}>Add Dependant</Button>
                        </Form.Group>
                    </Form>}
                    <ul>
                        {dependantRows}
                    </ul>
                </Modal.Body>
            </Modal>
            <Toast show={showErrorToast} onclose={closeError}>
                <Toast.Header>
                    <strong className="me-auto">There was an error saving</strong>
                </Toast.Header>
                <Toast.Body>Unfortunately, there was an error saving your employee. Please try again.</Toast.Body>
            </Toast>
        </div>
    )
}

export default EmployeeModal;
