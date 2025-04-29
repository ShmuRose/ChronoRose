// Popup contact form
function openContactForm() {
    // Get the product name dynamically
    const productName = document.querySelector('.product-details h1').textContent;

    // Set the pre-written message with the product name
    const messageField = document.getElementById("message");
    messageField.value = `Hello, I'm interested in the ${productName}. Please send me more information.`;

    // Open the modal
    document.getElementById("contactModal").style.display = "block";
}

function closeContactForm() {
    document.getElementById("contactModal").style.display = "none";
}

// If click outside the modal box, close it
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("contactModal");

    // Click event listener on the window
    window.addEventListener("click", function(event) {
        // Check if the click is on the modal's background overlay (not the content box)
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
