const baseUrl = 'http://localhost:1200/api/v1';
const userInfo = JSON.parse(localStorage.getItem('current-user'));
const vehicleInfo = JSON.parse(localStorage.getItem('vehicle'));
const alertBox = document.getElementById('notification');

function createOrder(event) {
    event.preventDefault();

    // Get form data
    const first_name = document.getElementById('first_name');
    const last_name = document.getElementById('last_name');
    const contact = document.getElementById('contact');
    const email = document.getElementById('email');
    const address = document.getElementById('address');

    // Get vehicle and user IDs from localStorage
    const vehicle_id = vehicleInfo._id;
    const user_id = userInfo._id;

    const newOrder={
        first_name: first_name.value,
        last_name: last_name.value,
        contact: contact.value,
        email: email.value,
        address: address.value,
        vehicle_id: vehicle_id,
        user_id: user_id
    }

    // Send POST request to server
    fetch(`${baseUrl}/orders`, {
        method: 'POST',
        body: JSON.stringify(newOrder),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.data) {
            alertBox.innerHTML = `<div class="alert alert-success" role="alert">${data.message}</div>`;
            
            // Remove the vehicle from the database
            fetch(`${baseUrl}/vehicles/${vehicle_id}`, {
              method: 'DELETE'
            })
            .then(response => {
              // Check if the vehicle was successfully removed
              if (response.status === 200) {
                console.log('Vehicle successfully removed from database');
              } else {
                console.error('Failed to remove vehicle from database');
              }
            })
            .catch(error => console.error(error));
          
            setTimeout(() => {
              window.location.href = '/user/purchase_after_login.html';
            }, 2000);
          }
          else {
            alertBox.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
        }
    })
    .catch(error => console.error(error));
}