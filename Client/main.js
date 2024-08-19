// General
const serverPath = 'http://localhost:5000';



function getData(){
    return fetch(`${serverPath}/api/data`, {
        headers: {
            "Content-Type":"application/json"
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}