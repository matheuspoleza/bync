/* eslint-disable no-template-curly-in-string */
import type { TCodeData, TCodeEditorData } from '../../types';

// Fixture 1: An array with some code strings
export const javascriptLanguageFeatures = [
  `// Variables
var num = 42;
let str = "Hello, World!";
const bool = true;
var n = null;
var undef;

// Functions
function add(a, b) {
  return a + b;
}

// Objects
var person = {
  name: "John",
  age: 30,
  sayHello: function () {
    console.log("Hello!");
  },
};

// Arrays
var colors = ["red", "green", "blue"];

// Classes
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + " makes a sound.");
  }
}

const dog = new Animal("Dog");
dog.speak();

// Promises and Async/Await
const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// Generators
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generatorFunction();
console.log(gen.next().value);

// Events
const button = document.getElementById("myButton");
button.addEventListener("click", function () {
  console.log("Button clicked!");
});

// Error Handling
try {
  throw new Error("This is an error.");
} catch (error) {
  console.error(error);
}

// ES6 Features
const [x, y, z] = [1, 2, 3];
const map = new Map();
map.set("a", 1).set("b", 2);
`,
];

export const longCodeString: TCodeEditorData = [`const howdy = 'folks';\nconst test = 1;`];

export const codeFunctionFixture: TCodeData = [
  'function runStep(context, assistant) {\n  console.log("Howdy, World!");\n}',
];
// Fixture 2: An array with code strings and variable code
export const codeWithVariables: TCodeData = ['if(', { variableID: 'id8' }, ' > 10) {\n  console.log()\n}'];

export const codeWithMultipleVariablesOnSingleLine: TCodeEditorData = [
  'if(',
  { id: '23432', name: 'variableName', kind: 'variable', color: 'blue', variant: 'variable' },
  ' > 10 || ',
  { id: '23432', name: 'otherCoolName', kind: 'variable', color: 'blue', variant: 'variable' },
  ' < 20) {\nconsole.log()\n}',
];

// Fixture 3: An array with code strings, variable code, and entity code
export const codeWithEntities: TCodeEditorData = [
  'class Person {',
  '  constructor(name) {',
  '    this.name = name;',
  '  }',
  '  sayHello() {',
  '    console.log(`Hello, my name is ${this.name}`);',
  '  }',
  '}',
  { id: '23432', name: 'entityName', kind: 'entity', color: 'blue', variant: 'entity' },

  'const person = new Person("Alice");',
  { id: '122342', name: 'otherEntity', kind: 'entity', color: 'green', variant: 'entity' },
  'person.sayHello();',
];

// Fixture 4: An empty code editor
export const emptyCodeEditor: TCodeEditorData = [];

export const functionsExample = [
  `export default async function main({ inputVars })
  // Your Javascript code here
  
}`,
];

// You can use these fixtures for testing your code editor functionality.
