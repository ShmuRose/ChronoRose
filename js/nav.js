document.addEventListener("DOMContentLoaded", function () {
    const greetingElement = document.getElementById('userGreeting');    // Get the element where the greeting message will be shown
    const logoutBtn = document.getElementById('logoutBtn');     // Get the logout button element
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));     // Try to retrieve the currently logged-in user from localStorage

    // Check if the current page is the admin page (by checking URL path)
    const isAdminPage = window.location.pathname.includes('admin.html');

    if (isAdminPage) {
        // If on the admin page, always show "Hello, Admin"
        if (greetingElement) { // Check if the greeting element exists
            greetingElement.innerHTML = `Hello, <span id="firstName">Admin</span>`;
        }
        // Show the logout button if it exists (admin should be able to log out)
        if (logoutBtn) {
            logoutBtn.style.display = 'inline-block';
        }
    } else if (loggedInUser) {
        // Not on the admin page, but a regular user is logged in
        const firstName = loggedInUser.firstName; // Extract user's first name
        const lastName = loggedInUser.lastName;   // Extract user's last name

        if (greetingElement) { // Check if the greeting element exists
            // Show personalized greeting with user's name
            greetingElement.innerHTML = `Hello, <span id="firstName">${firstName}</span> <span id="lastName">${lastName}</span>`;
        }
        // Show the logout button if it exists
        if (logoutBtn) {
            logoutBtn.style.display = 'inline-block';
        }
    } else {
        // Not on the admin page and no user is logged in
        if (greetingElement) {
            // greetingElement.innerHTML = ""; // Or some default like "Welcome!"
        }
        // Hide the logout button since there's no one to log out
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
    }

    // Attach a click event to the logout button to handle user logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            // Remove the logged-in user from localStorage.
            // This will clear the regular user's session.
            // If admin access has a different session mechanism, this might need adjustment,
            localStorage.removeItem('loggedInUser');

            // Redirect to the homepage (or login page)
            window.location.href = 'index.html';
        });
    }
});