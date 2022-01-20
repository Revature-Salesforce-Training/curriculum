//console.log("yay");

/* 

THIS
IS 
ALL 
COMMENTED
OUT

*/

let a = "THIS IS A STRING";
let bool = true;
const c = 3;
let d;
let e = null;
console.log(typeof d);
console.log(typeof e);
console.log(typeof a);

var arr = [];
var arr2 = [1, 2, 3];
console.log(typeof arr);
console.log(arr2.length);

var obj = {key: 1, key2: 2};

console.log(obj.key2);

function myFunc() {
    var b;
}

/*
    *falsey values*
    false
    0
    ''
    null
    undefined
    NaN


    *truthy values*
    -1
    "a"
    true

*/

//control flow statements
let expressionToEvaluate = 0;

if(expressionToEvaluate) {
    console.log("I RAN! I RAN SO FAR AWAAAYYYY");
} 

if(expressionToEvaluate) {
    console.log("I RAN! I RAN SO FAR AWAAAYYYY");
} else {
    console.log("wooooooooooooooooooo!");
}

/*
if(expressionToEvaluate) {
    console.log("I RAN! I RAN SO FAR AWAAAYYYY");
} else if(checkExpression){
    console.log("wooooooooooooooooooo!");
}
*/

var orderNumber = 1;
switch(orderNumber){
    /* the switch expression has been evaluated (it's only evaluated once) and the 
    value 1 has replaced the expression orderNumber for equality checks */
    
    case 1:
        console.log('Ordered a hot dog.');
    case 2:
        /* perhaps we are running a promotion where every hot dog comes with a 
        free side of fries, in which case we would not want to have the first case
        end in a break statement */
        console.log('Ordered fries.');
        break;
    case 3:
        /* the break statement after the second case ensures that any number 1 or
        2 orders will not continue execution into this case */
        console.log('Ordered a hamburger.');
        break;
    default:
        console.log('Unknown order.');
}


let btn = document.querySelector(".classBtn");
btn.addEventListener("click", () => {
    console.log("BUTTON CLICKED!");
});

/*

Example of removing an event listener

btn.removeEventListener("click", () => {
    console.log("BUTTON CLICKED!");
});

*/

let buttons = document.querySelectorAll('.button');
let screen = document.querySelector("#screen");

function calculate(input) {
    return new Function('return ' + input)();
}

for (let btn of buttons) {
    btn.addEventListener("click", (event) => {
        
        
        let key = event.target.innerHTML;
        
        switch(key) {

            case '0':
                screen.innerHTML += 0;
                break;
            case '1':
                screen.innerHTML += 1;
                break;
            case '2':
                screen.innerHTML += 2;
                break;
            case '3':
                screen.innerHTML += 3;
                break;
            case '4':
                screen.innerHTML += 4;
                break;
            case '5':
                screen.innerHTML += 5;
                break;
            case '6':
                screen.innerHTML += 6;
                break;
            case '7':
                screen.innerHTML += 7;
                break;
            case '8':
                screen.innerHTML += 8;
                break;
            case '9':
                screen.innerHTML += 9;
                break;
            case '*':
                screen.innerHTML += '*';
                break;
            case '-':
                screen.innerHTML += '-';
                break;
            case '+':
                screen.innerHTML += "+";
                break;
            case '/':
                screen.innerHTML += "/";
                break;
            case 'Enter':
                screen.innerHTML = calculate(screen.innerHTML);
                break;
            case 'Clear':
                screen.innerHTML = '';
        }
    });
}
