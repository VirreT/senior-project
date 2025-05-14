document.addEventListener('DOMContentLoaded', () => {
    const openPosts = document.getElementById('openPosts');
    const loginSend = document.getElementById('loginSend');
    const signUpSend = document.getElementById('signupSend');

    if (openPosts) {
        openPosts.addEventListener('click', () => {
            window.location.href = '../html/posts.html';
        });
    }
});
