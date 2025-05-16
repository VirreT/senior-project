const logOutButton = document.getElementById('logoutButton');

logOutButton.addEventListener('click', async () => {
    try {
        alert('Log out successful!');
        localStorage.removeItem('accessToken');
        window.location.href = '/html/index.html';
    }
    catch (err) {
        console.error('Logout failed:', err);
        alert('Logout failed. Please try again.');
    }
});
