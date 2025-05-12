// Wait until the entire page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    // Show/hide password toggle
    togglePassword.addEventListener('change', function () {
        passwordInput.type = this.checked ? 'text' : 'password';
    });

    // Floating message function
    function showFloatingMessage(message, duration = 2000, type = 'success') {
        const msg = document.createElement('div');
        msg.className = `floating-message ${type}`;
        msg.textContent = message;
        document.body.appendChild(msg);

        setTimeout(() => {
            msg.classList.add('fade-out');
            msg.addEventListener('transitionend', () => msg.remove());
        }, duration);
    }

    // On form submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Admin credentials check
        if (email === "admin@chronorose.com" && password === "admin1234") {
            localStorage.setItem('isAdmin', 'true'); // ✅ Set admin flag here
            showFloatingMessage("Admin login successful!");
            setTimeout(() => {
                window.location.href = "admin.html";
            }, 2000);
            return;
        }
        
        //check email not empty
        if (!email || !password) {
            showFloatingMessage("Please fill in all the fields.", 2500, 'error');
            return;
        }

        // Basic validation
        if (!email.includes('@')) {
            showFloatingMessage("Please enter a valid email address.", 2500, 'error');
            return;
        }

        if (password.length < 8) {
            showFloatingMessage("Password must be at least 8 characters.", 2500, 'error');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(user => user.email === email);

        if (!foundUser) {
            showFloatingMessage("User does not exist.", 2500, 'error');
            return;
        }

        // Unsuccessful login
        if (foundUser.password !== password) {
            showFloatingMessage("Incorrect password.", 2500, 'error');
            return;
        }

        localStorage.setItem('loggedInUser', JSON.stringify({
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email
        }));
        
        // Successful login
        showFloatingMessage("Login successful!");
        setTimeout(() => {
            window.location.href = 'gallery.html';
        }, 2000);

    });
});
