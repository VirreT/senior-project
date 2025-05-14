document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const loginWindow = document.getElementById('loginWindow');
    const signupWindow = document.getElementById('signupWindow'); 
    const loginLink = document.getElementById('loginLink'); 
    const signupLink = document.getElementById('signupLink'); 
    const main = document.getElementsByTagName('main')[0];
    const body = document.body;

    // hide windows when clicking outside
    body.addEventListener('click', (event) => {
        if (
            event.target !== loginButton && event.target !== loginWindow && !loginWindow.contains(event.target) &&
            event.target !== signupButton && event.target !== signupWindow && !signupWindow.contains(event.target)
        ) {
            loginWindow.style.display = 'none';
            signupWindow.style.display = 'none';
            main.style.filter = 'blur(0px)';
        }
    });

    // login window toggle
    loginButton.addEventListener('click', (event) => {
        event.stopPropagation();
        if (loginWindow.style.display === 'none' || loginWindow.style.display === '') {
            loginWindow.style.display = 'flex';
            main.style.filter = 'blur(3px)';
        } else {
            loginWindow.style.display = 'none';
            main.style.filter = 'blur(0px)';
        }
    });

    //signup window toggle
    if (signupButton) {
        signupButton.addEventListener('click', (event) => {
            event.stopPropagation();
            if (signupWindow.style.display === 'none' || signupWindow.style.display === '') {
                signupWindow.style.display = 'flex';
                main.style.filter = 'blur(3px)';
            } else {
                signupWindow.style.display = 'none';
                main.style.filter = 'blur(0px)';
            }
        });
    }

    // Function to check if the user is logged in using token in cookies/localStorage
    const checkUserLoginStatus = () => {
        const accessToken = localStorage.getItem('access_token') || document.cookie.split('; ').find(row => row.startsWith('access_token=')).split('=')[1];
        return accessToken ? true : false;
    };

    // Modify UI based on login status
    if (checkUserLoginStatus()) {
        // User is logged in
        loginButton.textContent = "Go to Profile";
        profileIcon.style.display = 'block';
        loginButton.onclick = () => {
            window.location.href = './profile.html';
        };
    } else {
        // User is not logged in
        loginButton.textContent = "Log in";
        profileIcon.style.display = 'none';
        loginButton.onclick = () => {
            const loginWindow = document.getElementById('loginWindow');
            const main = document.getElementsByTagName('main')[0];
            if (loginWindow.style.display === 'none' || loginWindow.style.display === '') {
                loginWindow.style.display = 'flex';
                main.style.filter = 'blur(3px)';
            } else {
                loginWindow.style.display = 'none';
                main.style.filter = 'blur(0px)';
            }
        };
    }

    // LOGIN API CONNECTION
    document.getElementById('loginSend').addEventListener('click', async (event) => {
        event.preventDefault();
        const username = document.querySelector('#login input[name="username"]').value;
        const password = document.querySelector('#login input[name="password"]').value;
        try {
            const response = await fetch('/api/accounts/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (response.ok) {
                alert('Login successful!');
                window.location.reload();
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            alert('Login failed: ' + err.message);
        }
    });

    // SIGNUP API CONNECTION
document.getElementById('signupSend').addEventListener('click', async (event) => {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const emailConfirm = document.getElementById('signupEmailConfirm').value;
    const password = document.getElementById('signupPassword').value;
    try {
        const response = await fetch('/api/accounts/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, emailConfirm, password })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Registration successful!');
            window.location.href = './profile.html';
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (err) {
        alert('Registration failed: ' + err.message);
    }
});


    loginWindow.addEventListener('click', (event) => {
        if (event.target === signupLink) {
            loginWindow.style.display = 'none';
            signupWindow.style.display = 'flex';
        }
    });

    signupWindow.addEventListener('click', (event) => {
        if (event.target === loginLink) {
            signupWindow.style.display = 'none';
            loginWindow.style.display = 'flex';
        }
    });
});