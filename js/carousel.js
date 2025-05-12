document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Time in milliseconds (e.g., 5 seconds)

    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');

        // Move to the next slide index
        currentSlide = (currentSlide + 1) % slides.length; // Loop back to 0

        // Add active class to the new current slide
        slides[currentSlide].classList.add('active');
    }

    // Initially show the first slide (it already has .active from HTML)
    // If not set in HTML, uncomment the next line:
    // slides[0].classList.add('active');

    // Start the automatic rotation
    setInterval(nextSlide, slideInterval);
});