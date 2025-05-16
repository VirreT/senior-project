document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('access_token');
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
        const createdDate = new Date(user.created_at).toISOString().split('T')[0];
        document.getElementById('profileCreation').textContent = `You have been a user since ${createdDate}`;
    } catch (err) {
        console.error(err);
        alert('Failed to load profile. Please log in again.');
        localStorage.removeItem('access_token');
        }

    const logOutButton = document.getElementById('logOutButton');
    if (logOutButton) {
        logOutButton.addEventListener('click', async () => {
            try {
                await fetch('/api/accounts/logout', { method: 'POST', credentials: 'include' });
                alert('Log out successful!');
                localStorage.removeItem('access_token');
                window.location.href = '/html/index.html';
            } catch (err) {
                console.error('Logout failed:', err);
                alert('Logout failed. Please try again.');
            }
        });
    }

    const deleteProfileButton = document.getElementById('deleteProfileButton');
    if (deleteProfileButton) {
        deleteProfileButton.addEventListener('click', async () => {
            if (!confirm('Are you sure you want to delete your profile? This action cannot be undone.')) return;
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch('/api/profile', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Failed to delete profile');
                localStorage.removeItem('access_token');
                alert('Your profile has been deleted.');
                window.location.href = '/html/index.html';
            } catch (err) {
                console.error('Profile deletion failed:', err);
                alert('Failed to delete profile. Please try again.');
            }
        });
    }
});