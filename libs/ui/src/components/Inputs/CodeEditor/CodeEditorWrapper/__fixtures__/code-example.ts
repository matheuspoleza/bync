export const codeExample = `
// Variables and data types
let name = "John";
const age = 25;
var isStudent = true;

// Functions
function greet(person) {
  console.log("Hello, " + person + "!");
}

greet(name);

// Objects and arrays
let person = {
  name: "Alice",
  age: 30,
  isStudent: false,
};

let fruits = ["apple", "orange", "banana"];

// Conditional statements
if (age >= 18) {
  console.log(name + " is an adult.");
} else {
  console.log(name + " is a minor.");
}

// Loops
for (let i = 0; i < fruits.length; i++) {
  console.log("Fruit: " + fruits[i]);
}

// Arrow functions
const add = (a, b) => a + b;
console.log("Sum:", add(5, 3));

// Destructuring assignment
const { age: personAge, isStudent: studentStatus } = person;
console.log("Person's age:", personAge);
console.log("Is a student?", studentStatus);

// Spread operator
let moreFruits = ["grape", "kiwi", ...fruits];
console.log("More fruits:", moreFruits);

// Promises and asynchronous programming
function asyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Async operation completed.");
    }, 2000);
  });
}

asyncFunction().then((result) => {
  console.log(result);
});

// Classes and inheritance
class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    console.log("Some generic sound");
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof! Woof!");
  }
}

let myDog = new Dog("Buddy");
myDog.makeSound();

`;
