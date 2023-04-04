
const baseUrl = 'http://localhost:1200/api/v1';

const loginFormSubmit = (event) => {
    event.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const alertBox = document.getElementById('notification');

    const newUser = {
        email: email.value,
        password: password.value
    }

    fetch(`${baseUrl}/users/login`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.token) {
            localStorage.setItem('access-token', data.token);
            localStorage.setItem('current-user', JSON.stringify(data.user));
            alertBox.innerHTML = `<div class="alert alert-success" role="alert">${data.message}</div>`;
      
            setTimeout(() => {
                window.location.href = '/user/purchase_after_login.html';
            }, 2000);
        } else {
            alertBox.innerHTML = `<div class="alert alert-danger " role="alert">${data.message}</div>`;
        }
    }).catch((error) => {
        console.log(error);
    })

}