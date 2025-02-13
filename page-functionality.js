// First, add the preloader functions
function showPreloader() {
    document.body.classList.add('loading');
    document.getElementById('preloader').style.display = 'flex';
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('fade-out');
    document.body.classList.remove('loading');

    // Remove preloader from DOM after fade out
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
}

async function loadComponent(component, elementId) {
    try {
        const response = await fetch(component);
        const data = await response.text();
        document.getElementById(elementId).innerHTML = data;
        return true;
    } catch (error) {
        console.error(`Error loading ${component}:`, error);
        return false;
    }
}

// Function to set up reservation functionality
function setupReservation() {
    const reservationBtns = document.querySelectorAll("#res-btn");
    const popup = document.getElementById("reservation-popup");
    const closeBtn = document.getElementById("close-btn");

    if (reservationBtns && popup && closeBtn) {
        reservationBtns.forEach((btn) => {
            btn.onclick = function () {
                popup.style.display = "block";
            };
        });

        closeBtn.onclick = function () {
            popup.style.display = "none";
        };
    }
}

function setupHeaderScroll() {
    let lastScrollY = window.scrollY;
    const header = document.getElementById("main-header");

    if (header) {
        window.addEventListener("scroll", function () {
            let currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                header.classList.add("sticky-header");
            } else {
                header.classList.remove("sticky-header");
            }

            lastScrollY = currentScrollY;
        });
    }
}

function setupScrollToTop() {
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.padding = '10px 15px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.backgroundColor = 'gold';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.fontSize = '20px';

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("active");
    document.querySelector(".res-btn-nav").classList.toggle("active");
}

// Modified initialize function to include preloader
async function initialize() {
    showPreloader();  // Show preloader before loading components

    try {
        // Load all components
        await Promise.all([
            loadComponent("header.html", "main-header"),
            loadComponent("footer.html", "main-footer"),
            loadComponent("reservation-popup.html", "reservation-popup")
        ]);

        // Set up all functionality
        setupReservation();
        setupHeaderScroll();
        setupScrollToTop();

        // Add a small delay to ensure everything is loaded
        setTimeout(hidePreloader, 500);
    } catch (error) {
        console.error('Error during initialization:', error);
        hidePreloader();  // Hide preloader even if there's an error
    }
}

// Wait for both DOM and resources to load
window.addEventListener('load', initialize);
