var age = 10;
function add(a,b){
    console.log(this.age)
    return a+b;
}

const result = add(2,3);
console.log(result);

// Arrow function does not have its own 'this', it takes 'this' from the surrounding context
const addFun = (a,b) => {
    console.log(calc.age)
    return a+b

};
const calc = {add: addFun,age:20};
calc.add(2,3);

const res2 = addFun(2,4);
console.log(res2);

const addFun2 = (a,b) => a+b;
const res3 = addFun2(5,4);
console.log(res3);

const square = x => x*x;
const res4 = square(5);
console.log(res4);


// ternary perator
// condition ? expr1 : expr2;

const age1 = 18;
const canVote = age1 >= 18 ? "yes can vote" : "no cannot vote";
console.log(canVote);


// map and filter

const numbers = [1,2,3,4,5];
const doubled = numbers.map(n => n*2);
console.log(doubled);

const evenNumbers = numbers.filter(n => n%2 === 0);
console.log(evenNumbers);

// async await

async function getTodo(){
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const todo = await response.json();
        console.log(todo);
    } catch (error) {
        
    }

}
getTodo();


function Student(){
    console.log("Student function called");
}
const student = new Student();
student.greet2 = function(){
    console.log("Hello from greet2");
}

const student2 = new Student();
student2.greet2 = function(){
    console.log("Hello from greet2 - student2");
}
Student.prototype.greet = function(){
    console.log("Hello from Student");
}
student.greet();
Student.prototype.greet3 = function(){
    console.log("Hello from greet3");
}
student.greet3();
student2.greet3();

class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    greet(){
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const person1 = new Person("Manoj",30);
const person2 = new Person("Sumit",23);
person1.greet();
person2.greet();

const names = ["Sumit" ,"Manoj","Ankit"];
const temp1 = names[0];
const temp2 = names[1];
console.log(temp1,temp2);
const [first,second,...rest] = names;
console.log(first,second,rest);

const person = {
    name: "Manoj",
    age: 30,
    address: {
        city: "Delhi",
        country: "India"    
    }
}
const name1 = person.name;
const age2 = person.age;
const city1 = person.address.city;
console.log(name1,age1,city1);

const {name,age,address:{city}} = person;
console.log(name,age,city);
