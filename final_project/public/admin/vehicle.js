const baseUrl = 'http://localhost:1200/api/v1';
const admin = document.getElementById('admin');
const alertBox = document.getElementById('notification');

function getadminInfo() {
    const adminInfo = JSON.parse(localStorage.getItem('current-admin'));

    if (!adminInfo) {
        alert("You need to login to access this page!");
        window.location.href = "/admin/admin_login.html";
    }
    admin.innerHTML = `Welcome, ${adminInfo.name}`;
}
getadminInfo();

function signOut() {
    // Remove all data from local storage
    localStorage.clear();
    // Redirect the user to the login page
    window.location.href = "/admin/admin_login.html";
}

function addVehicle(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form data
    const make = document.getElementById('make');
    const model = document.getElementById('model');
    const year = document.getElementById('year');
    const color = document.getElementById('color');
    const price = document.getElementById('price');
    const img = document.getElementById('img');
    const type = document.getElementById('type');
    const description = document.getElementById('description');

    // Create a new vehicle object
    const newVehicle = {
        make: make.value,
        model: model.value,
        year: year.value,
        color: color.value,
        price: price.value,
        img: img.value,
        type: type.value,
        description: description.value
    };

    // Send a POST request to the server to add the new vehicle
    fetch(`${baseUrl}/vehicles`, {
        method: 'POST',
        body: JSON.stringify(newVehicle),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                alertBox.innerHTML = `<div class="alert alert-success" role="alert">${data.message}</div>`;
                make.value = "";
                model.value = "";
                year.value = "";
                color.value = "";
                price.value = "";
                img.value = "";
                type.value = "";
                description.value = "";
                showVehicles(baseUrl, 'vehicleTable');

                // Remove alert after 2 seconds
                setTimeout(() => {
                    alertBox.innerHTML = '';
                }, 2000);
            } else {
                alertBox.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
                make.value = "";
                model.value = "";
                year.value = "";
                color.value = "";
                price.value = "";
                img.value = "";
                type.value = "";
                description.value = "";

                // Remove alert after 2 seconds
                setTimeout(() => {
                    alertBox.innerHTML = '';
                }, 2000);
            }
        })
        .catch(error => {
            console.error(error);
        });


}

function showVehicles(baseUrl, tableId) {
    fetch(`${baseUrl}/vehicles`)
        .then(response => response.json())
        .then(data => {
            const vehicles = data.data; // the array of vehicle objects returned by the server
            const vehicleTable = document.getElementById(tableId);

            // loop through the vehicles array and create a table row for each vehicle
            for (let i = 0; i < vehicles.length; i++) {
                const tr = document.createElement('tr');

                // create delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.innerText = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.addEventListener('click', () => {
                    deleteVehicle(baseUrl, vehicleTable, vehicles, tr, i);
                });

                // create table data for delete button
                const deleteTd = document.createElement('td');
                deleteTd.appendChild(deleteBtn);
                tr.appendChild(deleteTd);

                // create table data for vehicle
                const td = document.createElement('td');
                const vehicle = vehicles[i];
                td.innerHTML = `<img src="${vehicle.img}" alt="${vehicle.make} ${vehicle.model}">
            <table>
                <tr><td>ID:</td><td>${vehicle._id}</td></tr>
                <tr><td>Make/Model:</td><td>${vehicle.make} ${vehicle.model}</td></tr>
                <tr><td>Type/Color/Year:</td><td>${vehicle.type} / ${vehicle.color} / ${vehicle.year}</td></tr>
                <tr><td>Description:</td><td>${vehicle.description}</td></tr>
                <tr><td>Price:</td><td>${vehicle.price}</td></tr>
            </table>`;
                tr.appendChild(td);

                // add the table row to the vehicle table
                vehicleTable.appendChild(tr);
            }
        })
        .catch(error => console.error('Error fetching vehicles:', error));
}

function searchByKeyword() {
    const keyword = document.getElementById('searchKeyword').value;
    let url = `${baseUrl}/vehicles`;
    if (keyword) {
        url = `${baseUrl}/vehicles/search?keyword=${keyword}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayVehicles(data);
            document.getElementById('searchKeyword').value = '';
        })
        .catch(error => {
            console.error(error);
        });
}


function displayVehicles(data) {
    const vehicles = data.data; // the array of vehicle objects returned by the server
    console.log(vehicles);
    const vehicleTable = document.getElementById('vehicleTable');
    vehicleTable.innerHTML = ''; // clear the existing table rows

    // loop through the vehicles array and create a table row for each vehicle
    for (let i = 0; i < vehicles.length; i++) {
        const tr = document.createElement('tr');

        // create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteVehicle(baseUrl, vehicleTable, vehicles, tr, i);
        });

        // create table data for delete button
        const deleteTd = document.createElement('td');
        deleteTd.appendChild(deleteBtn);
        tr.appendChild(deleteTd);

        // create table data for vehicle
        const td = document.createElement('td');
        const vehicle = vehicles[i];
        td.innerHTML = `<img src="${vehicle.img}" alt="${vehicle.make} ${vehicle.model}">
    <table>
        <tr><td>ID:</td><td>${vehicle._id}</td></tr>
        <tr><td>Make/Model:</td><td>${vehicle.make} ${vehicle.model}</td></tr>
        <tr><td>Type/Color/Year:</td><td>${vehicle.type} / ${vehicle.color} / ${vehicle.year}</td></tr>
        <tr><td>Description:</td><td>${vehicle.description}</td></tr>
        <tr><td>Price:</td><td>${vehicle.price}</td></tr>
    </table>`;
        tr.appendChild(td);

        // add the table row to the vehicle table
        vehicleTable.appendChild(tr);
    }
}

function deleteVehicle(baseUrl, vehicleTable, vehicles, tr, i) {
    const vehicle = vehicles[i];
    const confirmed = confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`);
    if (confirmed) {
        // send DELETE request to server to delete vehicle
        fetch(`${baseUrl}/vehicles/${vehicle._id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Vehicle deleted:', data);
                // remove vehicle from array
                vehicles.splice(i, 1);
                // remove vehicle row from table
                tr.parentNode.removeChild(tr);
                showVehicles(baseUrl, 'vehicleTable');
            })
            .catch(error => console.error('Error deleting vehicle:', error));
    }
}

showVehicles(baseUrl, 'vehicleTable');











