document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    const logoutButton = document.getElementById("logout");

    // Function to validate email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Function to validate password strength
    function isValidPassword(password) {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
    }

    // Handle login
    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            if (!isValidEmail(email)) {
                alert("Please enter a valid email.");
                return;
            }

            if (!isValidPassword(password)) {
                alert("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.");
                return;
            }

            try {
                const res = await fetch("http://localhost:3000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                const data = await res.json();

                if (data.success) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    window.location.href = "dashboard.html";
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert("Login failed. Please check your connection and try again.");
            }
        });
    }

    // Handle registration
    if (registerForm) {
        registerForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value.trim();

            if (!name || !email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            if (!isValidEmail(email)) {
                alert("Please enter a valid email.");
                return;
            }

            if (!isValidPassword(password)) {
                alert("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.");
                return;
            }

            try {
                const res = await fetch("http://localhost:3000/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                });
                const data = await res.json();

                if (data.success) {
                    alert("Registration successful! Please log in.");
                    // Clear the form inputs after successful submission
                    registerForm.reset();
                    window.location.href = "index.html";
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert("Registration failed. Please check your connection and try again.");
            }
        });
    }

    // Handle forgot password
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const email = document.getElementById("forgotEmail").value.trim();

            if (!email) {
                alert("Please enter your email.");
                return;
            }

            if (!isValidEmail(email)) {
                alert("Please enter a valid email.");
                return;
            }

            try {
                const res = await fetch("http://localhost:3000/forgot-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });
                const data = await res.json();
                alert(data.message);
            } catch (error) {
                alert("Error sending reset request. Please check your connection.");
            }
        });
    }

    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("user");
            window.location.href = "index.html";
        });
    }

    // Load user data on dashboard
    if (document.getElementById("userName")) {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            document.getElementById("userName").textContent = user.name;
        } else {
            window.location.href = "index.html";
        }
    }
});
