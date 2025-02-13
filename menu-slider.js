let index = 0;
let intervalId;

function createBullets() {
    const container = document.querySelector(".slider-bullets");
    const slides = document.querySelectorAll(".slider-item");

    slides.forEach((_, i) => {
        const bullet = document.createElement("div");
        bullet.className = "bullet";
        if (i === 0) bullet.classList.add("active");

        bullet.addEventListener("click", () => {
            index = i;
            updateSlider();
            resetInterval();
        });

        container.appendChild(bullet);
    });
}

function updateBullets() {
    const bullets = document.querySelectorAll(".bullet");
    bullets.forEach((bullet, i) => {
        bullet.classList.toggle("active", i === index);
    });
}

function updateSlider() {
    const container = document.querySelector(".menu-slider");
    container.style.transform = `translateX(-${index * 100}%)`;
    updateBullets();
}

function moveSlide() {
    const items = document.querySelectorAll(".slider-item");
    index = (index + 1) % items.length;
    updateSlider();
}

function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(moveSlide, 5000);
}

// Initialize slider when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createBullets();
    updateSlider();
    intervalId = setInterval(moveSlide, 5000);
});