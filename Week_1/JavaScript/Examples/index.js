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

let expressionToEvaluate = 0;

if(expressionToEvaluate) {
    console.log("I RAN! I RAN SO FAR AWAAAYYYY");
} 

if(expressionToEvaluate) {
    console.log("I RAN! I RAN SO FAR AWAAAYYYY");
} else {
    console.log("wooooooooooooooooooo!");
}


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

