import './employeeTable.css';

import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";

import React, {useEffect, useState} from "react";
import {getEmployee, getEmployeeTableData} from "../../services/employeeService";
import EmployeeModal from "../employeeModal/employeeModal";
import Toast from "react-bootstrap/Toast";

const EmployeeTable = (props) => {
    const [tableData, setTableData] = useState([]);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [employee, setEmployee] = useState({});


    const employeeUpdate = (type) => {
        getEmployeeTableData(props.employer.id).then(response => {
            return response.json()
        }).then(data => {
            setTableData(data);
            if(type !== 'dependant') setShowEmployeeModal(false);
        })
    }

    const modalProps = {employee : employee, employeeupdate: employeeUpdate};

    useEffect(() => {
        getEmployeeTableData(props.employer.id).then(response => {
            if(response.ok) {
                return response.json()
            } else {
                setShowErrorToast(true);
            }
        }).then(data => {
            setTableData(data);
        })
    }, [props.employer.id]);

    const editEmployee = (e) => {
        getEmployee(e).then(response => {
            if(response.ok) {
                return response.json()
            } else {
                setShowErrorToast(true);
            }
        })
            .then(data => {
                setEmployee(data);
                setShowEmployeeModal(true);
            })
    };

    const addEmployee = () => {
        setEmployee({employerId: props.employer.id});
        setShowEmployeeModal(true);
    };

    const closeError = () => {
        setShowErrorToast(false);
    };

    const tableRows = tableData ? tableData.map((employee) => {
        return(
            <tr className="employeeRow" key={employee.id} onClick={() => editEmployee(employee.id)}>
                <td>{employee.name}</td>
                <td>{employee.dependants}</td>
                <td>${employee.salary.toFixed(2)}</td>
                <td>${employee.netSalary.toFixed(2)}</td>
                <td>${(employee.salary - employee.netSalary).toFixed(2)}</td>
            </tr>
        )
    }) : [];

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th># of Dependants</th>
                        <th>Salary (Bi-Weekly)</th>
                        <th>Net Salary (Bi-Weekly)</th>
                        <th>Total Deductions(Bi-Weekly)</th>
                    </tr>
                </thead>
                <tbody>
                {tableRows}
                <tr>
                    <Button onClick={addEmployee}>Add Employee</Button>
                </tr>
                </tbody>
            </Table>
            <EmployeeModal show={showEmployeeModal} {...modalProps} onHide={() => setShowEmployeeModal(false) }/>
            <Toast show={showErrorToast} onclose={closeError}>
                <Toast.Header>
                    <strong className="me-auto">There was an error</strong>
                </Toast.Header>
                <Toast.Body>Unfortunately, there was an error getting employee data. Please try again.</Toast.Body>
            </Toast>
        </div>
    )
}

export default EmployeeTable;
