let index = 0;
let intervalId;
let carouselIndex = 0; // New index for carousel

// Slider functions
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

// Carousel function
function moveCarousel() {
    let items = document.querySelectorAll(".carousel-item");
    let container = document.querySelector(".carousel-container");
    let totalItems = items.length;
    let visibleImages = 4;

    carouselIndex++;

    if (carouselIndex > totalItems - visibleImages) {
        carouselIndex = 0;
    }

    container.style.transform = `translateX(-${carouselIndex * (100 / visibleImages)}%)`;
}

// Initialize slider and carousel when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider
    createBullets();
    updateSlider();
    intervalId = setInterval(moveSlide, 5000);

    // Initialize carousel
    setInterval(moveCarousel, 5000);
});