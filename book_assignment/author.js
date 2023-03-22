const baseURL = "http://localhost:2500/api/v1";
const authorTable = document.querySelector('#authorTableBody');

let newAuthor = {};

const submitForm = (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const contact = document.getElementById('contact');
    newAuthor.name = name.value;
    newAuthor.email = email.value;
    newAuthor.contact = contact.value;

    fetch(`${baseURL}/author`, {
        method: "POST",
        body: JSON.stringify(newAuthor),
        headers: {
            'Content-Type': "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        alert(data.message);
    }).catch((error) => {
        console.log(error);
    })
}

const updateAuthorUI = (data) => {
    bookTable.innerHTML = "";
    console.log(data, "INCOMING VALUE");

    for (let i = 0 ; i < data.length; i++) {
        authorTable.innerHTML += `
            <tr>
                <td>${data[i]._id}</td>
                <td>${data[i].name}</td>
                <td>${data[i].email}</td>
                <td>${data[i].contact}</td>
            </tr>
        `
    }
}
 
const getAllAuthors = () => {
    fetch(`${baseURL}/author`).then((response) => {
       return response.json();
   }).then((res) => {
       updateAuthorUI(res.data);
   }).catch((error) => {
       console.log(error);
   })
}

getAllAuthors();