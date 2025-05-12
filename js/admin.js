document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#userTable tbody");

    // Load users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // If no users, show a message
    if (users.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5;
        cell.textContent = "No registered users found.";
        cell.style.textAlign = "center";
        row.appendChild(cell);
        tableBody.appendChild(row);
    }
    else {
        users.forEach((user, index) => {
            const row = document.createElement("tr");

            const firstNameCell = document.createElement("td");
            firstNameCell.textContent = user.firstName;
            row.appendChild(firstNameCell);

            const lastNameCell = document.createElement("td");
            lastNameCell.textContent = user.lastName;
            row.appendChild(lastNameCell);

            const emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            row.appendChild(emailCell);

            const passwordCell = document.createElement("td");
            passwordCell.textContent = "********" // Mask the password initially
            passwordCell.classList.add("password-cell");
            row.appendChild(passwordCell);

            // Action column with Trash and Eye icons
            const actionCell = document.createElement("td");
            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fas", "fa-trash", "trash-icon");
            trashIcon.addEventListener("click", () => removeUser(index));

            const eyeIcon = document.createElement("i");
            eyeIcon.classList.add("fas", "fa-eye", "eye-icon");
            eyeIcon.addEventListener("click", () => togglePasswordVisibility(row, user.password));

            actionCell.appendChild(trashIcon);
            actionCell.appendChild(eyeIcon);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });
    }

    // Function to toggle password visibility
    function togglePasswordVisibility(row, password) {
        const passwordCell = row.querySelector(".password-cell");
        if (passwordCell.textContent === "********") {
            passwordCell.textContent = password; // Show the actual password
        } else {
            passwordCell.textContent = "********"; // Mask the password again
        }
    }

    // Function to remove user
    function removeUser(index) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.splice(index, 1); // Remove the user from the array
        localStorage.setItem("users", JSON.stringify(users)); // Update localStorage
        window.location.reload(); // Reload the page to reflect changes
    }
});
