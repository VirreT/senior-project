const logOutButton = document.getElementById('logOutButton');

logOutButton.addEventListener('click', async () => {
    try {
        // Call backend to clear refresh_token cookie
        await fetch('/api/accounts/logout', { method: 'POST', credentials: 'include' });
        alert('Log out successful!');
        localStorage.removeItem('access_token');
        window.location.href = '/html/index.html';
    }
    catch (err) {
        console.error('Logout failed:', err);
        alert('Logout failed. Please try again.');
    }
});
