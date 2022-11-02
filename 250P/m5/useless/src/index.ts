import getA from "./module2";
import getB from "./module1";

alert(getA() * getB());

function greet(person: { firstName: string }) {
  alert(`Hello, ${person.firstName}`);
}

const person = { firstName: "Frank" };
greet(person);

interface IPerson {
  firstName: string;
}
function greetOther(person: IPerson) {
  alert(`Hello, ${person.firstName}`);
}
const anotherPerson = {firstName: "Frank", hairColor: "Black"};
greetOther(anotherPerson);