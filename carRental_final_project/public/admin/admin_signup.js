
const baseUrl = 'http://localhost:1200/api/v1';

const signupForm = (event) => {
    event.preventDefault();

    const admin_id = document.getElementById('admin_id');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');
    const confirmPassword = document.getElementById('confirmPassword');
    const alertBox = document.getElementById('notification');

    // check if passwords match
    if (password.value !== confirmPassword.value) {
        alertBox.innerHTML = `<div class="alert alert-danger" role="alert">Passwords do not match</div>`;
        admin_id.value = "";
        name.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
        return;
    }

    const newAdmin = {
        admin_id: admin_id.value,
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    }

    fetch(`${baseUrl}/admins`, {
        method: "POST",
        body: JSON.stringify(newAdmin),
        headers: {
            'Content-Type': "application/json"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.name) {
            alertBox.innerHTML = `<div class="alert alert-success" role="alert">${data.message}</div>`;

            setTimeout(() => {
                window.location.href = '/admin/admin_login.html';
            }, 2000);
        } else {
            alertBox.innerHTML = `<div class="alert alert-danger" role="alert">${data.message}</div>`;
            admin_id.value = "";
            name.value = "";
            email.value = "";
            password.value = "";
            confirmPassword.value = "";
        }



    }).catch((error) => {
        console.log(error);
    })

}