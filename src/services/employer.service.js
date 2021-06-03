export const createEmployer = (body) => {
    return fetch('http://localhost:8080/employer', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    });
};

export const getEmployer = (id) => {
    return fetch(`http://localhost:8080/employer?id=${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        }
    });
}
