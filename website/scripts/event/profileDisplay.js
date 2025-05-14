document.addEventListener('DOMContentLoaded', async () => {
    const loginButton = document.getElementById('loginButton');
    const profileUsername = document.getElementById('profileUsername');
    const profileEmail = document.getElementById('profileEmail');
    const profileContainer = document.getElementById('profileContainer');

    
    try {
        const response = await fetch('/api/token/autoLogin', {
            method: 'POST',
            credentials: 'include'  
        });

        if (response.ok) {
            const data = await response.json();
            
            const { username } = jwt.decode(data.access_token);  
            profileUsername.textContent = `Welcome, ${username}`;
            profileEmail.textContent = `${username}@mail.com`; 
            profileContainer.style.display = 'block'; 
            loginButton.style.display = 'none'; 
        } else {
            
            loginButton.style.display = 'block';
            profileContainer.style.display = 'none'; 
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        loginButton.style.display = 'block'; 
        profileContainer.style.display = 'none'; 
    }
});