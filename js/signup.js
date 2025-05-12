document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('signupForm');

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
        e.preventDefault(); // Prevent the form from submitting immediately

        let firstName = document.getElementById('firstName').value.trim();
        let lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            showFloatingMessage("Please fill in all the fields.", 2500, 'error');
            return;
        }
        
        const nameRegex = /^[A-Za-z\u0590-\u05FF]+$/; // Allows English & Hebrew letters
        // Name validation
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            showFloatingMessage("Names can only contain letters.", 2500, 'error');
            return;
        }

        // Check if email contains '@'
        if (!email.includes('@')) {
            showFloatingMessage("Please enter a valid email address.", 2500, 'error');
            return;
        }

        // Check if password is at least 8 characters
        if (password.length < 8) {
            showFloatingMessage("Password must be at least 8 characters long.", 2500, 'error');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            showFloatingMessage("Passwords do not match.", 2500, 'error');
            return;
        }

        // Check if email already exists
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            showFloatingMessage("Email already registered!", 2500, 'error');
            return;
        }

        // Capitalize the first letter of the firstName and lastName
        firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

        // If all checks pass, create new user and save to localStorage
        const newUser = {
            firstName: firstName,
            lastName: lastName, // Save last name here
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // ✅ Save logged-in user info with firstName, lastName, and email
        localStorage.setItem('loggedInUser', JSON.stringify({
            firstName: newUser.firstName,
            lastName: newUser.lastName, // Save last name here
            email: newUser.email
        }));
        
        // Show success message and redirect
        showFloatingMessage("Sign up successful!");
        setTimeout(() => {
            window.location.href = 'gallery.html'; // Redirect to the gallery page
        }, 2000);
    });
});
