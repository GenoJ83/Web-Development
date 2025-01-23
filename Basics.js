//let
let numberOne = 3;
 let numberTwo =5;
 //var
 var numberThree = 6;

 function addNumbers(){
    let numberFour=34;
    //console.log(numberFour)
 }
 console.log(numberTwo)

 /*
 *DataTypes
 */
let add = numberOne + numberTwo;
console.log(add);

let subtract= numberTwo-numberOne
console.log(subtract);

//Strings
let name = "Joshua";
let firstname= "Geno";
let greeting = "Hello, my name is " + name + " and my first name is "
 + firstname + ".";
 console.log(greeting);
 let welcome = `Welcome back ${firstname} ✌`;
 console.log(welcome);

 console.log(firstname.toUpperCase());
console.log(firstname.length);

//Booleans
let isStudent = true;
let isinHall = false;

//Logical Operators

console.log(isStudent && isinHall);
console.log(isStudent ||isinHall);      

//Arrays
 let fruits=["mangoes","oranges","grapes"]
 console.log(fruits)
 fruits.push("apples");
 fruits.push("pineapples");

 //removing values from the array
 fruits.pop()
 console.log(fruits);

 //Objects
 let credentials = {
    "email":"genojoshua83@gmail.com",
    "password": "password123"
 }
let signUp ={
    "email":"genojoshua83@gmail.com",
    "password": "password123",
    "Username":"GenoJ83"
}
console.log(credentials)
credentials["Username"]="J83"
credentials["confirmPassword"]="password123"
console.log(credentials);

//comparison operators
console.log(credentials.password == credentials.confirmPassword);
console.log(credentials.password === credentials.confirmPassword);