## JavaScript

- object oriented, functional, procedural 
- case-sensitive, loosely typed, dynamically typed, interpreted

- comments, printing to console
  - "//" single line
  - "/* comment */" multiline
  - print to console with console.log()
  
- variables, data types, and scope
  - scope - determines where something can be accessed
    - block scope - can be referenced in code block where declared as well as any inner code blocks
	- function scope - can be referenced anywhere inside function but not outside of the function
	- global scope - can be referenced anywhere inside the JS file
  - variables
  	- var - the default if no scope is given; has either global or function scope depending on where it's defined
    - let - similar to var, but has block scope
	- const - also has block scope; can not have value changed after assigment only properties of value
  - data types
    - string - Strings can be enclosed in either single or double quotes.
    - boolean - Booleans take true or false values.
    - number - Numbers can have decimals, but are not required to - in contrast to some other languages, JS has just one data type for all numbers. The number type also has three symbolic values: +Infinity, -Infinity, and NaN ("Not a Number").
    - undefined - Variables take an undefined value if they are not assigned a value when they are declared.
    - symbol - Once created, it's value is kept private and for internal use. All that remains after creation is the symbol reference. Every time one is created you will get a unique symbol, guaranteed to be different from all other symbols. You can pass a parameter to symbol() to provide a description. These are often used for object properties because each one is unique. You can see an example of this in the JavaScript Objects section of this module.
    - null - The null type is similar to undefined except that it is explicitly assigned.
	
- operators
  - ```=, +=, ect.``` assigment operators
  - ```+, *, /, ect.``` arithmetic operators
  - string operators - concatenation, template literals
  - ```==, !=, >, ect.``` - comparison operators
  - ```isSomething ? 'true' : 'false'``` - ternary operators
  - ```&&, ||, !``` - logical operators
  - ```typeof, instanceof``` - type operators
  
- functions 
  - blocks of code that we define and choose to run as we wish
  - arrow vs normal
  ```JavaScript
  //normal
  let normalFunction = function(x, y) {
    return x * y;
  }

  //arrow function

  //note you can only omit the return keyword and curly brackets if the function has a single statement
  const arrowFunction = (x, y) => x * y;
  ```
- objects 
  - a data type (but not primitive) in JavaScript
  - objects include collections (arrays or objects) and functions
  - An object literal contains properties and methods describing the state and actions of an object
  ```JavaScript
  // here is an example of the symbol primitive being used 
  const SYMBOLPROPERTY = Symbol('This is a symbol description!');

  let myObj = {
  myProperty: 4,
  myOtherProperty: 'We can store all kinds of data types',
  [SYMBOLPROPERTY]: 'This value is paired with a symbol key',
  myMethod: () => {
    console.log('This is a method called from an object literal!');
    }
  }

  // we can access our objects properties and method like so
  console.log(myObj.myProperty);
  console.log(myObj[SYMBOLPROPERTY]);
  myObj.myMethod();
  ```
  
  - objects include arrays as well
    ```JavaScript
	let h = [1, 3];
    console.log(typeof h); // will print 'object'
    console.log(h.length); // to get size of array
	```
- classes 
  - a class is a blueprint used to create an object
  ```JavaScript
  class Car {
    constructor(name, year, miles){
      this.name = name;
      this._year = year;
      this.miles = miles;
    }

    get age() {
      const n = new Date();
      return `The car is ${n.getFullYear() - this._year} year(s) old!`;
    }

    set year(year) {
      this._year = year;
    }

    odometerAdd(distance) {
      this.miles += distance;
    }
  }
  ```
  
- falsey values
  - false, 0 , empty string either ('' or ""), null, undefined, and NaN
  
- control flow
  - if, if-else, if-else if-else, ternary operator, switch
- loops 
  - for, while, do-while, for-of, for-in
  
- running javascript in html
  - inline
  - script tag; defer/async attribute
 
- modules
  - javascript code that can be imported into another javascript file
  
  index.js - index.js - Notice the import statement. We can take one or more imports at a time.
  ```JavaScript
  import {name, myFunc} from './moduleTest.js';
  console.log(name);
  myFunc();
  ```
  moduleTest.js - Notice the export statements. We can export primitives, functions, and objects. Classes are a special type of function, so we can export those as well.
  ```JavaScript
  export const name = "john";
  export function myFunc() {
    console.log('This is a function from my module!');
  }
  ```
  index.html - Notice the type="module" attribute. This is required to specify the file as a module. As only modules can use import/export statements. Also make note that modules are always deffered by default, so no need to specify the defer attribute or move the script element to the bottom of the body.
  ```HTML
  <!DOCTYPE html>
  <html>
    <head>
      <title>Module Example</title>
      <script type="module" src="index.js"></script>
    </head>
  </html>
  ```
  
- decorators
  - a function that changes the behavior of functions/methods, properties, and classes that is passed to it 
  by returning a new function
  - allows us to add features without modifying the orginal functionality
  
  writing a decorator: 
  ```JavaScript
  function readOnly(target, key, descriptor) {
    descriptor.writable = false;
    return descriptor;
  }
  ```
  our class:
  ```javascript
  class car = {
    @readOnly
    topMilesPerHour : 130,
    makeAndModel : 'Mitsubishi Lancer',
  };
  ```
  
- DOM
  - document object model
  - allows our JavaScript to manipulate our HTML and CSS
  - represented by an object tree, with a node for each element
  - can access by using getElementById, getElementsByClassName, getElementsByTagName, querySelector, querySelectorAll
  
- events
  - when DOM events occur we go through 3 phases
    - capturing phase - event travels down to the source element from the root of the DOM tree
	- target phase - occurs when event is at the source element
	- bubbling phase - event moves from the source element back up to root of DOM tree
  - the default here is bubbling. We can configure this when we create an event listener.
  - ```document.querySelector("elementToFind").addEventListener("event", functionToFireOnEvent);```
  - Same but with capturing: ```document.querySelector("elementToFind").addEventListener("event", functionToFireOnEvent, true);```
  - JavaScript has an event object that all other event objects inherit. This gives us some default properties and methods to all events.
    - stopPropagation() and stopImmediatePropagation() end an events journey through the DOM
	- cancelBubble() - stops the bubbling phase of an event
	- preventDefault() - only stops the automatic action associated with a HTML element, such as a redirect to a URL from an 'a' element.
	
- date functions
```JavaScript
const date = new Date();
console.log(date);
console.log('Year : ' + date.getFullYear());
console.log('Month (from 0-11) : ' + date.getMonth());
console.log('Date (from 1-31) : ' + date.getDate());
console.log('Day of week (from 0-6) : ' + date.getDay());
console.log('Hour (from 0-23) : ' + date.getHours());
console.log('Minutes (from 0-59) : ' + date.getMinutes());
console.log('Seconds (from 0-59) : ' + date.getSeconds());
console.log('Milliseconds (from 0-999) : ' + date.getMilliseconds());

// we also have UTC equivalents for universal time

console.log('UTC minutes : ' + date.getUTCMinutes());
```

- DOM manipulation
  - ```document.createElement("p");```
  - ```.appendChild(element);```
  - ```document.removeChild();```
  - ```document.replaceChild(newElement, oldElement);```
  
- string manipulation
```javascript
let text = 'This is my string!';
console.log(text.length);
// 18

// extracts part of a string and returns the extracted part in a new string
console.log(text.slice(5,7));
// 'is'

// if the parameters are negative, the position will start from the end of the string. Notice how you can omit the second parameter and it will simply include the rest of the string. 
console.log(text.slice(-7));
// 'string!'

// similar to slice but can not accept negative indexes
console.log(text.substring(5,7))
// 'is'

// Another example of replace
console.log(text.replace('string', 'super cool string'));
// 'This is my super cool string!'

//uppercase and lower case
console.log(text.toUpperCase());
// 'THIS IS MY STRING!'
console.log(text.toLowerCase());
// 'this is my string!'

//remove white space from both sides of a string
let str = '     whoa     ';
console.log(str);
// '     whoa     '
console.log(str.trim());
// 'whoa'
```

- async JavaScript
  - JavaScript is, by default, blocking or synchronous. Meaning that only one operation can be in progress at a given time.
  - Under the hood we have a few pieces working together to handle asynchronous requests and code.
    - call stack - connected to message queue by way of the event loop; has a first in, last out structure; holds the stack frames, machine instructions to be executed from our functions
    - event loop - checks if the call stack is empty, and if so, supply the call stack a function from the message queue
    - message queue - first in, first out structure; holds the functions to be executed as soon as they are read from JavaScript file
    - web/browser APIs - when asynchronous code is called, JavaScript sends our asnyc code to the browser APIs to handle the request so the javascript engine can continue execution. These browser APIs are then responsible for handling the async code and sending the results back to the message queue for processing.
  - callbacks - a function that can be passed as an argument to another function
  - promises - an improvement over callbacks; an action or task that is yet unfulfilled, can be either resolved or rejected
```JavaScript
// "Producing Code" (May take some time)
let myPromise = new Promise(function(myResolve, myReject) {

  myResolve(); // when successful
  myReject();  // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
  function(value) { /* code if successful */ } 
)
.catch(
  function(error) { /* code if some error */ }
);
```
another example:
```JavaScript
let myPromise = new Promise(function(myResolve, myReject) {
  setTimeout(function() { myResolve("HII !!"); }, 3000);
});

myPromise.then(function(value) {
  //do stuff here with value
});
```
  - async/await 
    - keywords that make promises easier to write by providing some syntactical sugar
	- async - makes a function return a promise
	- await - makes a function wait for a promise to resolve or reject
```JavaScript
async function myAsync() {
  let myPromise = new Promise(function(myResolve, myReject) {
    setTimeout(function() { myResolve("HII x2 !!"); }, 3000);
  });

  let message = await myPromise;
  console.log(message);
}

myAsync();
```

  - Fetch API
    - provides us with a way to interact with and retrieve resources from across the network and from external web services
	- promise based
```JavaScript
function getJoke(category) {
  fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
  .then(r => r.json())
  .then(res => console.log(res.value));
}
```