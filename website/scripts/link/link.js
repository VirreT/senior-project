document.addEventListener('DOMContentLoaded', () => {
    const openPosts = document.getElementById('openPosts');
    const loginSend = document.getElementById('loginSend');

    if (openPosts) {
        openPosts.addEventListener('click', () => {
            window.location.href = '../html/posts.html';
        });
    }

    if (loginSend) {
        loginSend.addEventListener('click', () => {
            window.location.href = '../html/login.html';
        });
    }
});