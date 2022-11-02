import getA from "./module2";
import getB from "./module1";
alert(getA() * getB());
function greet(person) {
    alert("Hello, ".concat(person.firstName));
}
var person = { firstName: "Frank" };
greet(person);
function greetOther(person) {
    alert("Hello, ".concat(person.firstName));
}
var anotherPerson = { firstName: "Frank", hairColor: "Black" };
greetOther(anotherPerson);
