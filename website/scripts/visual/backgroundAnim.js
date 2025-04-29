document.addEventListener("DOMContentLoaded", function() {
    const mainSection = document.querySelector("img");
    const images = 8;
    function changeBackground() {
        setTimeout(() => {
            currentIndex = Math.floor(Math.random() * images + 1);
            mainSection.src = `../assets/backgroundImages/background${[currentIndex]}.png`;
        }, 1000); 
    }

    setInterval(changeBackground, 2000);
});
