let index = 0;

function moveSlide() {
    let items = document.querySelectorAll(".carousel-item");
    let container = document.querySelector(".carousel-container");
    let totalItems = items.length;
    let visibleImages = 4;

    index++;

    if (index > totalItems - visibleImages) {
        index = 0;
    }

    container.style.transform = `translateX(-${index * (100 / visibleImages)}%)`;
}

setInterval(moveSlide, 5000);
