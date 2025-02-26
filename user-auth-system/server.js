const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const usersFile = "users.json";

app.use(cors());
app.use(bodyParser.json());

function loadUsers() {
    if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([]));
    return JSON.parse(fs.readFileSync(usersFile));
}

function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Register API
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    let users = loadUsers();

    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ name, email, password: hashedPassword });
    saveUsers(users);
    
    res.json({ message: "Registration successful!" });
});

// Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = loadUsers();
    const user = users.find(user => user.email === email);

    if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ message: "Login successful!", user: { name: user.name, email: user.email } });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
