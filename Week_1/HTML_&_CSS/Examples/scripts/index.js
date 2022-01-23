// This is a single line comment

/* 
    This is a 
    multi line
    comment!
*/

console.log('We can print stuff with this!');

/*
    Running JavaScript in HTML
    We have three ways to make use of our JavaScript in HTML: inline, internally, 
    or externally. We write inline code by adding it to the appropriate event 
    attribute of the opening tag of an HTML element. Although it is common for the 
    values of these attributes to be function calls, we can define all of the 
    desired functionality in the tag (our code is not enclosed within a function if 
    we do this). See the following button with an output statement tied to the 
    onclick attribute:

    <button type="button" onclick="console.log('button clicked');">Hey, I'm a button!</button>
    
    Internal and external JavaScript both make use of the <script> tag 
    (a non-self-closing tag). With internal code, we define our functions in 
    between the opening and closing <script> tags and later add function calls to 
    our event attributes in our elements. Take the following example HTML file:

    <!DOCTYPE html>
    <html>
        <head>
            <script>
                function buttonClicked(){
                    console.log('button clicked');
                }
            </script>
        </head>
        <body>
            <button type="button" onclick="buttonClicked()">Hey, I'm a button!
            </button>
        </body>
    </html> 

    External JS makes use of the same <script> tag, only this time with the src 
    attribute of the tag set to the relative path to the JS file. For example, a 
    file named buttonHandlers located in the same folder as our HTML page would be 
    accessed through the tags <script src="./buttonHandlers.js"></script> (all JS 
    files end with the .js extension). It is advisible to keep our code external 
    to our markup if we use the same logic in many different webpages, or if we 
    simply want to keep our markup file as short and readable as possible.

    We can use as many <script> tags, for either internal or external logic, as we 
    would like to throughout our HTML file in the file's head, body, or both. 
    However, because our HTML pages load sequentially, we may want to include all 
    JS scripts at the end of our pages so that our visible elements can load first 
    and the page does not appear slow to the user.

    We could alternatively use the 'defer' attribute, like in our example below. 
    This will ensure that the script is only run after the page has finished 
    parsing and will function the same as placing our scripts at the end of the 
    body. We also have the 'async' option. This will download the script in 
    parallel to parsing the page, and then execute as soon as it's available. Your 
    use case will determine the method you use.

    <head>
        <title>My Title</title>
        <meta charset="utf-8">
        <meta name="description" content="Place the meta description text here.">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="path/to/css/file">
        <script src="demo_defer.js" defer></script>
    </head>
*/

/* 
    Variables are containers for different use cases in our JS. 
    We could store one number, or lots of numbers. We have 3 keywords 
    that are used to declare something as a variable. 

    var - older, shouldn't use much anymore. Has global or function scope 
        depending on where it is defined.
    let - newer, will probably use this one the most. Block level scope.
    const - this tells us that the variable is a constant. 
            Unchanging. Once it is set we cannot change it. 
            The convention is to give it a name that is in 
            all caps. Block level scope.

    Global scope - can be referenced anywhere
    function scope - can only be referenced in a function
    block scope - can be referenced in code block where it was declared or 
                any inner code blocks.
*/

var myVariable;
let myLet;
const MYCONST = 1; 

/*
    We don't have to declare a value to a var or let right away, 
    although we could. Const requires us to initialize it with a 
    value.

    We have 6 primitive data types in JS: 
    string - ex = 'looks like this'; These are simply text
    boolean - true or false
    number - numbers between -(2^53 − 1) and 2^53 − 1). In 
            addition to representing floating-point numbers, 
            the number type has three symbolic values: 
            +Infinity, -Infinity, and NaN ("Not a Number").
    undefined - A variable that has not been assigned a value 
                has the value undefined
    symbol - Once created its value is kept private and for 
            internal use. All that remains after creation 
            is the symbol reference. Every time one is created 
            you will get a unique symbol, guaranteed to be 
            different from all other symbols. You can pass a 
            parameter to symbol() to provide a description. These 
            are often used for object properties because each one 
            is unique. You can see an example of this in the 
            JavaScript Objects section of this module.
    null - similar to undefined except we explicity set it ourselves
*/

// we can use typeof to check the data type
console.log(typeof myVariable);
console.log(typeof MYCONST);

/*
    JavaScript Operators

    Operators are the symbols we use to assign a value to 
    a variable, do arithmetic, or evaluate expressions. 

    We have already used one assignment operator earlier. 
    let x = 3;

    Our arithmetic operators:
    + addition
    - subtraction
    * multiplication
    ** exponentiation
    / division
    % modulus (division remainder)
    ++ increment (increase value by 1)
    --decrement (decrese value by 1)

    The other assigment operators: 
    +=  example: x+=y same as x = x + y
    -=  and so on 
    *= 
    /= 
    %= 
    **= 

    String Operators (this is called concatenation)
    let text1 = "John";
    let text2 = "Doe";
    let text3 = text1 + " " + text2;

    With the newer versions of JavaScript we can use template 
    literals to avoid heavy string concatenation. Notice the 
    use of backticks instead of quotes, as well as the ${} 
    syntax to place a variable inside. Ex:

    let name = 'John';
    let str = `His name is ${name}`;
    console.log(str);

    JavaScript Comparison Operators
    == equal to
    === equal to and equal data type
    != not equal
    !== not equal value or not equal type
    > greater than 
    < less than
    >= greater than or equal to
    <= less than or equal to
    ? ternary operator

    example for ternary operator:
    function getFee(isMember) {
        return (isMember ? '$2.00' : '$10.00');
    }

    console.log(getFee(true));
    // expected output: "$2.00"

    console.log(getFee(false));
    // expected output: "$10.00"

    JavaScript Logical Operators
    && and
    || or
    ! not

    JavaScript Type Operators
    typeof - returns data type
    instanceof - Returns true if an object is an instance of an object type
*/

/*
    JavaScript functions

    JavaScript functions are blocks of code that we can define and 
    choose to run when we wish. Take a look at the examples below.
*/

function myFunc() {
    console.log('This is my function!');
}

// We can call it and have it run like this
myFunc();

// We can pass values into our functions to be used as we see fit

function multiply(a, b) {
    //functions can call other funtions
    //myFunc();

    //notice we can output results of our function with the return keyword
    return a * b;
}

// in this case 5 is 'a' and 5 is 'b'. 15 will display in the console.
console.log(multiply(5, 3));

/*
    JavaScript Objects

    JavaScript objects are a data type, but not a primitive. This 
    means that they can be broken down into further pieces. The JS object type 
    includes collections, which are either arrays or objects, (yes objects are part 
    of, but not the entirety of, the object data type Our first 
    type of object we will discuss is called an object literal. An 
    object is made up of properties (similar to variables but don't 
    confuse the two) and methods (similar to functions, also don't 
    confuse). The terminology is important when we begin to delve into 
    Object Oriented principles. Let's take a look at a object literal 
    below.
*/

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

/*
    As we said objects also include arrays as well. These are zero indexed lists 
    of elements that can contain comma-separated values of different primitive or 
    object data types. JS arrays have dynamic size. Arrays can be initialized with 
    or without values and with square brackets or the Array constructor (although 
    the latter is not considered a best practice).


    let h = [1, 3];
    console.log(typeof h); <-- will print 'object'
    console.log(h.length); <-- to get size of array
*/

/*
    Falsy Values

    Falsy (or falsey) values are those that evaluate to false 
    in an expression. There are six falsy values in 
    JS: false (pretty unexpected, right?), 0, empty string 
    (either '' or "" because the language accepts either single 
    or double quotes), null, undefined, and NaN (which 
    paradoxically is a number). Every other value in JS is 
    truthy - 1, -2, "a", true, etc.
*/

/*
    JavaScript Control Flow

    Since we've just talked about values in conditional expressions, it's a great 
    time to talk about control flow in JS. Control flow allows us to skip certain 
    lines of code/only execute certain code or repeat code.

    An if statement evaluates the code wrapped in parentheses to either true or 
    false. If true, the code block is executed. If false, nothing is executed.

    if(conditionToTestIfTrue) {
            //code to be executed here
        }
    You will often see an if statement used in combination with an else clause. An 
    else clause is a fallback to an if statement and will only get executed if the 
    previous if statement is false.

    if(conditionToTestIfTrue) {
            //code to be executed here
        } else {
            //code to execute if condition was false
        }
    If statements can also be combined with an else if clause. This is like an else 
    statement, but with its own condition. It will only run if its condition is 
    true, and the previous statement's condition was false.

    if(conditionToTestIfTrue) {
            //code to be executed here
        } else if(conditionToTestIfTrue) {
            //code to execute if first condition was false
        } else {
            //code to execute if both were false
        }
    The ternary operator is used as a shortcut for the if-else statement. This 
    operator tests a condition; if the condition is true, it returns a certain 
    value, otherwise it returns a different value:

	conditionToTest ? valueToBeReturnedIfTrue : valueToBeReturnedIfFalse
    
    The switch statement begins with the switch keyword, followed by the tested 
    expression in parentheses and the opening and closing curly braces. Within the 
    curly braces, each value is preceded by the case keyword and succeeded by a 
    colon and an inner code block. If the inner code block does not end in a break 
    statement, the code will continue execution until it reaches a break statement. 
    The default keyword will run its code block of no other case matches. See the 
    code below for an example:

    var orderNumber = 1;
    switch(orderNumber){
        
        case 1:
            console.log('Ordered a hot dog.');
            break;
        case 2:
            console.log('Ordered fries.');
            break;
        case 3:
            console.log('Ordered a hamburger.');
            break;
        default:
            console.log('Unknown order.');
    }
*/

/*
    Loops
    Example of a 'for' loop. We define a variable to be used to increment, the 
    evaulation, and then define our increment itself.

    var myArray = [];
    for(let i=0; i < myArray.length; i++){
        // iteration code
    }
    Example of a 'while' loop. Notice we have to increment inside the loop or we 
    could potentially create an infinite loop.

    var a = 0;
    while(a < 5){
        // iteration code
        a++;
    }
    Example of a 'do-while' loop. Notice how we alsways run the loop once no matter 
    what in our 'do' block. Then we evaluate if we should continue with 'while'.

    var b = false;
    do{
        // iteration code
        } while(b);
    Example of a 'for-of' loop. This will iterate over iterable objects.

    const array1 = ['a', 'b', 'c'];

	for (const element of array1) {
	  console.log(element);
	}

	// expected output: "a"
	// expected output: "b"
	// expected output: "c"
    Example of a 'for-in' loop. This iterates over all enumerable properties of an 
    object.

	const object = { a: 1, b: 2, c: 3 };

	for (const property in object) {
	  console.log(property + ': ' + object[property]);
	}

	// expected output:
	// "a: 1"
	// "b: 2"
	// "c: 3"
*/

/* 
    Below here is some examples of DOM and string manipulation that will render 
    on the javascript.html page. As well as events in general. 
*/
let addElemBtn = document.querySelector("#addElemBtn");
addElemBtn.addEventListener("click", addElem);

function addElem() {
    let myDiv = document.querySelector("#addElem");
    let elem = document.createElement("p");
    elem.textContent = "This is my new element!";
    myDiv.appendChild(elem);
}


let textAreaBtn = document.querySelector("#textAreaBtn");
textAreaBtn.addEventListener("click", createWordSalad);

function createWordSalad() {
    let wordSalad = document.querySelector("#wordSalad");
    let textInput = document.querySelector("#textInput");
    let str = textInput.value;
    str = str.replace("the", "Did you ever hear the tragedy of Darth Plagueis The Wise?");
    str += str.replace("The", "My dog ate my homework.");
    str += str.replace("or", "Are we there yet?");
    str += str.replace("and", "That rug really tied the room together.");
    wordSalad.innerHTML = str;
}