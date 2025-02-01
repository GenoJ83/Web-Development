// Importing modules
const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');

// File to store user data
const USER_DATA_FILE = 'users.json';

// Initializing readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper functions
function encryptPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function saveUserData(userData) {
  fs.writeFileSync(USER_DATA_FILE, JSON.stringify(userData, null, 2));
}

function loadUserData() {
  if (!fs.existsSync(USER_DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(USER_DATA_FILE));
}

// User registration function
function registerUser() {
  rl.question('Enter your name: ', (name) => {
    rl.question('Enter your email: ', (email) => {
      rl.question('Enter your password: ', (password) => {
        const encryptedPassword = encryptPassword(password);

        const users = loadUserData();
        if (users.some(user => user.email === email)) {
          console.log('Error: Email already registered.');
          mainMenu();
          return;
        }

        users.push({ name, email, password: encryptedPassword });
        saveUserData(users);
        console.log('Registration successful!');
        mainMenu();
      });
    });
  });
}

// User login function
function loginUser() {
  rl.question('Enter your email: ', (email) => {
    rl.question('Enter your password: ', (password) => {
      const encryptedPassword = encryptPassword(password);
      const users = loadUserData();

      const user = users.find(user => user.email === email && user.password === encryptedPassword);
      if (user) {
        console.log(`Login successful! Welcome, ${user.name}.`);
        userMenu(user);
      } else {
        console.log('Invalid email or password.');
        mainMenu();
      }
    });
  });
}

// User menu after login
function userMenu(user) {
  console.log('\nUser Menu');
  console.log('1. View Profile');
  console.log('2. Logout');
  console.log('3. Exit');
  rl.question('Choose an option: ', (choice) => {
    switch (choice) {
      case '1':
        console.log(`\nProfile Info:\nName: ${user.name}\nEmail: ${user.email}`);
        userMenu(user);
        break;
      case '2':
        console.log('Logging out...');
        mainMenu();
        break;
      case '3':
        console.log('Exiting program. Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        userMenu(user);
    }
  });
}

// Main menu function
function mainMenu() {
  console.log('\nMain Menu');
  console.log('1. Register');
  console.log('2. Login');
  console.log('3. Exit');
  rl.question('Choose an option: ', (choice) => {
    switch (choice) {
      case '1':
        registerUser();
        break;
      case '2':
        loginUser();
        break;
      case '3':
        console.log('Exiting program. Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        mainMenu();
    }
  });
}

// Start the program
mainMenu();
