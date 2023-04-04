
const baseUrl = 'http://localhost:1200/api/v1';

const loginFormSubmit = (event) => {
    event.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const alertBox = document.getElementById('notification');

    const newAdmin = {
        email: email.value,
        password: password.value
    }

    fetch(`${baseUrl}/admins/login`, {
        method: "POST",
        body: JSON.stringify(newAdmin),
        headers: {
            'Content-Type': "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.token) {
            localStorage.setItem('access-token', data.token);
            localStorage.setItem('current-admin', JSON.stringify(data.admin));
            alertBox.innerHTML = `<div class="alert alert-success" role="alert">${data.message}</div>`;
      
            setTimeout(() => {
                window.location.href = '/admin/vehicle.html';
            }, 2000);
        } else {
            alertBox.innerHTML = `<div class="alert alert-danger " role="alert">${data.message}</div>`;
        }
    }).catch((error) => {
        console.log(error);
    })

}