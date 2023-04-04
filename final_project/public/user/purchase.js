const baseUrl = 'http://localhost:1200/api/v1';
const alertBox = document.getElementById('notification');

function showVehicles(baseUrl, tableId) {
    fetch(`${baseUrl}/vehicles`)
        .then(response => response.json())
        .then(data => {
            const vehicles = data.data; // the array of vehicle objects returned by the server
            const vehicleTable = document.getElementById(tableId);

            // loop through the vehicles array and create a table row for each vehicle
            for (let i = 0; i < vehicles.length; i++) {
                const tr = document.createElement('tr');

                // create table data for vehicle
                const td1 = document.createElement('td');
                const vehicle = vehicles[i];
                td1.innerHTML = `<img src="${vehicle.img}" alt="${vehicle.make} ${vehicle.model}">
                    <table>
                        <tr><td>ID:</td><td>${vehicle._id}</td></tr>
                        <tr><td>Make/Model:</td><td>${vehicle.make} ${vehicle.model}</td></tr>
                        <tr><td>Type/Color/Year:</td><td>${vehicle.type} / ${vehicle.color} / ${vehicle.year}</td></tr>
                        <tr><td>Description:</td><td>${vehicle.description}</td></tr>
                        <tr><td>Price:</td><td>${vehicle.price}</td></tr>
                    </table>`;
                tr.appendChild(td1);

                // create table data for buy button
                const td2 = document.createElement('td');
                const buyBtn = document.createElement('button');
                buyBtn.innerText = 'Buy';
                buyBtn.classList.add('btn', 'btn-success');
                buyBtn.addEventListener('click', () => {

                    alertBox.innerHTML = `<div class="alert alert-danger" role="alert">Please Log in to make an order!</div>`;
                    // Remove alert after 2 seconds
                    setTimeout(() => {
                        alertBox.innerHTML = '';
                    }, 2000);

                });
                td2.appendChild(buyBtn);
                tr.appendChild(td2);

                // add the table row to the vehicle table
                vehicleTable.appendChild(tr);
            }

        })
        .catch(error => console.error('Error fetching vehicles:', error));
}

showVehicles(baseUrl, 'vehicleTable');