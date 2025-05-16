document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            window.location.href = '/html/index.html';
            return;
        }

        const response = await fetch('/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to load profile');
        }

        const user = await response.json();
        document.getElementById('profileUsername').textContent = `Welcome, ${user.username}`;
        document.getElementById('profileEmail').textContent = user.email;
        document.getElementById('profileCreation').textContent = `You have been a user since ${user.created_at}`;
    } catch (err) {
        console.error(err);
        window.location.href = '/html/index.html';
    }

    const logOutButton = document.getElementById('logoutButton');
    if (logOutButton) {
        logOutButton.addEventListener('click', async () => {
            try {
                alert('Log out successful!');
                localStorage.removeItem('accessToken');
                window.location.href = '/html/index.html';
            } catch (err) {
                console.error('Logout failed:', err);
                alert('Logout failed. Please try again.');
            }
        });
    }
});