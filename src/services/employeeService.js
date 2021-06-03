export const saveEmployee = (body) => {
    return fetch('http://localhost:8080/employee', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    });
};

export const deleteEmployee = (body) => {
    return fetch('http://localhost:8080/employee/delete', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    });
}

export const getEmployeeTableData = (id) => {
    return fetch(`http://localhost:8080/employee/table-data?id=${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        }
    });
}

export const getEmployee = (id) => {
    return fetch(`http://localhost:8080/employee?id=${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        }
    });
};
