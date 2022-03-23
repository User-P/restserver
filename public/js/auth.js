const url = 'http://localhost:8080/api/auth/'

const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = {}
    for (const element of form.elements) {
        if (element.name.length > 0) {
            formData[element.name] = element.value;
        }
    }

    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(({ msg, token }) => {
            if (msg) return console.warn(msg);
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch(error => console.error(error));


})

function handleCredentialResponse(response) {

    const body = { id_token: response.credential };

    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(({ token }) => {
            localStorage.setItem('token', token);
            console.log(token);
            window.location = 'chat.html';
        })
        .catch(console.warn);
}

const button = document.getElementById('signOut');

button.onclick = () => {
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
};
