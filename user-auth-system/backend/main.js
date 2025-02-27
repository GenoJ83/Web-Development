const fs = require('fs');
const bcrypt = require('bcrypt');
const readlineSync = require('readline-sync');

const usersFile = 'users.json';

// Load existing users
function loadUsers() {
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(usersFile));
}

// Save users to file
function saveUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Register a new user
function register() {
    const name = readlineSync.question("Enter your full name: ");
    const email = readlineSync.question("Enter your email: ");
    const password = readlineSync.question("Enter a password: ", { hideEchoBack: true });

    let users = loadUsers();
    if (users.some(user => user.email === email)) {
        console.log("Email already exists. Try logging in.");
        return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users.push({ name, email, password: hashedPassword });
    saveUsers(users);
    console.log("Registration successful!");
}

// Login a user
function login() {
    const email = readlineSync.question("Enter your email: ");
    const password = readlineSync.question("Enter your password: ", { hideEchoBack: true });

    const users = loadUsers();
    const user = users.find(u => u.email === email);

    if (user && bcrypt.compareSync(password, user.password)) {
        console.log(`Login successful! Welcome, ${user.name}`);
        userMenu(user);
    } else {
        console.log("Invalid email or password.");
    }
}

// User menu after login
function userMenu(user) {
    while (true) {
        console.log("\nUser Menu:");
        console.log("1. View Profile");
        console.log("2. Logout");
        
        const choice = readlineSync.question("Enter your choice: ");
        
        if (choice === "1") {
            console.log(`\nName: ${user.name}\nEmail: ${user.email}`);
        } else if (choice === "2") {
            console.log("Logged out successfully.");
            break;
        } else {
            console.log("Invalid choice. Try again.");
        }
    }
}

// Main function
function main() {
    console.log("Simple User Authentication System");
    while (true) {
        console.log("\n1. Register");
        console.log("2. Login");
        console.log("3. Exit");

        const choice = readlineSync.question("Enter your choice: ");

        if (choice === "1") {
            register();
        } else if (choice === "2") {
            login();
        } else if (choice === "3") {
            console.log("Goodbye!");
            break;
        } else {
            console.log("Invalid choice. Try again.");
        }
    }
}

main();
