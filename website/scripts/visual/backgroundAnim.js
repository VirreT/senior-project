document.addEventListener("DOMContentLoaded", function() {
    const mainSection = document.querySelector("img");
    mainSection.classList.add("fade");
    const images = 8;
    let currentIndex = Math.floor(Math.random() * images + 1);
    mainSection.src = `../assets/backgroundImages/background${currentIndex}.png`;
    
    function changeBackground() {
        mainSection.style.opacity = 0;
        setTimeout(() => {
            currentIndex = Math.floor(Math.random() * images + 1);
            mainSection.src = `../assets/backgroundImages/background${currentIndex}.png`;
        }, 1000);
    }

    mainSection.addEventListener('load', function() {
        mainSection.style.opacity = 1;
    });

    setInterval(changeBackground, 3000);
});