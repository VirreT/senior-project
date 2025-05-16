document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const main = document.getElementsByTagName('main')[0];
    const loginWindow = document.getElementById('loginWindow');

    function isLoggedIn() {
        return !!localStorage.getItem('access_token');
    }
    // render login/profile button UI
    function updateLoginButtonUI() {
        if (isLoggedIn()) {
            //replace login button with profile icon if logged in
            loginButton.innerHTML = '<span id="profileIcon" style="font-size:1.7em;">👤</span>';
            loginButton.onclick = () => window.location.href = '/html/profile.html';
            loginButton.title = 'Profile';
        } else {
            // else disply login button
            loginButton.innerHTML = '<strong>Log in</strong>';
            loginButton.onclick = (event) => {
                event.stopPropagation();
                if (loginWindow.style.display === 'none' || loginWindow.style.display === '') {
                    loginWindow.style.display = 'flex';
                    main.style.filter = 'blur(3px)';
                } else {
                    loginWindow.style.display = 'none';
                    main.style.filter = 'blur(0px)';
                }
            };
            loginButton.title = 'Log in';
        }
    }
    // Listen for login/logout events (optional: for SPA)
    window.addEventListener('storage', updateLoginButtonUI);
    updateLoginButtonUI();
});
