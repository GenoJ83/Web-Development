const backendUrl = "http://localhost:3000"; // Change this if needed

// Register Function
async function register() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const res = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    document.getElementById("registerMessage").textContent = data.message;

    if (res.ok) {
        window.location.href = "index.html"; // Redirect to login
    }
}

// Login Function
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    document.getElementById("loginMessage").textContent = data.message;

    if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "dashboard.html"; // Redirect to dashboard
    }
}
