const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { authenticateToken, secretKey } = require("./middleware");

const router = express.Router();
const usersFile = "users.json";

// Read users from JSON file
function readUsers() {
    if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "[]");
    return JSON.parse(fs.readFileSync(usersFile));
}

// Write users to JSON file
function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// **1. User Registration**
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let users = readUsers();
    if (users.some((user) => user.email === email)) {
        return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ name, email, password: hashedPassword });
    writeUsers(users);

    res.status(201).json({ success: true, message: "Registration successful" });
});

// **2. User Login**
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let users = readUsers();
    
    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ name: user.name, email: user.email }, secretKey, { expiresIn: "1h" });
    res.json({ success: true, user: { name: user.name, email: user.email }, token });
});

// **3. Forgot Password (Mock Reset)**
router.post("/forgot-password", (req, res) => {
    const { email } = req.body;
    let users = readUsers();
    
    if (!users.find((u) => u.email === email)) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Password reset link sent to email (mocked)" });
});

// **4. Dashboard Access (Protected Route)**
router.get("/dashboard", authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}`, user: req.user });
});

module.exports = router;
