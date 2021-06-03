export const createDependant = (body) => {
    return fetch('http://localhost:8080/dependant', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(body)
    });
}
