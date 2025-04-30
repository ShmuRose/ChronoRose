document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#userTable tbody");

    // Load users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // If no users, show a message
    if (users.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 4;
        cell.textContent = "No registered users found.";
        cell.style.textAlign = "center";
        row.appendChild(cell);
        tableBody.appendChild(row);
    } else {
        users.forEach(user => {
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
            passwordCell.textContent = user.password; // ⚠️ You may want to hide or mask this
            row.appendChild(passwordCell);

            tableBody.appendChild(row);
        });
    }
});
