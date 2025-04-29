document.getElementById('signupSend').addEventListener('click', async (event) => {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const emailConfirm = document.getElementById('signupEmailConfirm').value.trim();
    const password = document.getElementById('signupPassword').value;

    if (!username || !email || !emailConfirm || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (email !== emailConfirm) {
      alert('Emails do not match.');
      return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/accounts/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Account created successfully! You can now log in.');
        } else {
          alert(data.error || 'Something went wrong.');
        }
    } catch (error) {
        console.error('Signup failed:', error);
        alert('An error occurred during signup.');
    }
});
