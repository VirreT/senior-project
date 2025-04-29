document.addEventListener('DOMContentLoaded', () => {
    
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const loginWindow = document.getElementById('loginWindow');
    const signupWindow = document.getElementById('signupWindow'); 
    const loginLink = document.getElementById('loginLink'); 
    const signupLink = document.getElementById('signupLink'); 
    const main = document.getElementsByTagName('main')[0];
    const body = document.body;

    //hide login or signup
    body.addEventListener('click', (event) => {
        if (event.target !== loginButton && event.target !== loginWindow && !loginWindow.contains(event.target) &&
            event.target !== signupButton && event.target !== signupWindow && !signupWindow.contains(event.target)) {
            loginWindow.style.display = 'none';
            signupWindow.style.display = 'none';
            main.style.filter = 'blur(0px)';                
        }
    });

    //login window visibility 
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

    //toggleable signup window
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
});

//change between login and signup
loginWindow.addEventListener('click', (event) => {
    if (event.target == signupLink) {
        loginWindow.style.display = 'none';
        signupWindow.style.display = 'flex';                
    }
});

signupWindow.addEventListener('click', (event) => {
    if (event.target == loginLink) {
        signupWindow.style.display = 'none';
        loginWindow.style.display = 'flex';                
    }
});