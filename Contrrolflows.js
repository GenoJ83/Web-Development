const readline = require('readline');

// Creating an interface for input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Asking the user for input using switch case
rl.question("Enter a day of the week (1 for Monday, 7 for Sunday): ", (Day) => {
    Day = parseInt(Day); // Convert input to an integer

    switch (Day) {
        case 1:
            console.log("Monday");
            break;
        case 2:
            console.log("Tuesday");
            break;
        case 3:
            console.log("Wednesday");
            break;
        case 4:
            console.log("Thursday");
            break;
        case 5:
            console.log("Friday");
            break;
        case 6:
            console.log("Saturday");
            break;
        case 7:
            console.log("Sunday");
            break;
        default:
            console.log("Invalid input. Please enter a number between 1 and 7.");
            break;
    }

    rl.close(); // Close the interface
});
