# 📑 ES6+ JavaScript Cheatsheet

Esta guía de referencia rápida cubre las características principales de JavaScript moderno (ES6+) que se exploran durante el workshop.

## Índice

- [📑 ES6+ JavaScript Cheatsheet](#-es6-javascript-cheatsheet)
  - [Índice](#índice)
  - [Variables y Scope](#variables-y-scope)
    - [`let` y `const` vs `var`](#let-y-const-vs-var)
    - [Block Scope](#block-scope)
    - [Temporal Dead Zone (TDZ)](#temporal-dead-zone-tdz)
  - [Arrow Functions](#arrow-functions)
    - [Sintaxis Básica](#sintaxis-básica)
    - [Lexical `this`](#lexical-this)
  - [Template Literals](#template-literals)
    - [String Multilínea](#string-multilínea)
    - [Interporación](#interporación)
    - [Expresiones](#expresiones)
    - [Tagged Templates](#tagged-templates)
  - [Default Parameters](#default-parameters)
    - [Básicos](#básicos)
    - [Con expresiones](#con-expresiones)
    - [Con Funciones](#con-funciones)
    - [En Destructuring](#en-destructuring)
  - [Destructuring](#destructuring)
    - [Objetos](#objetos)
    - [Arrays](#arrays)
    - [Anidado](#anidado)
  - [Spread y Rest Operators](#spread-y-rest-operators)
    - [Spread en Arrays](#spread-en-arrays)
    - [Spread en Objetos](#spread-en-objetos)
    - [Rest en Parameters](#rest-en-parameters)
  - [Enhanced Object Literals](#enhanced-object-literals)
    - [Shorthand Properties](#shorthand-properties)
    - [Métodos Concisos](#métodos-concisos)
    - [Propiedades Computadas](#propiedades-computadas)
    - [Combinación de Características](#combinación-de-características)
  - [Arrays y Métodos Funcionales](#arrays-y-métodos-funcionales)
    - [map()](#map)
    - [filter()](#filter)
    - [reduce()](#reduce)
    - [find() / findIndex()](#find--findindex)
    - [some() / every()](#some--every)
    - [flat() / flatMap()](#flat--flatmap)
  - [Promises](#promises)
    - [Creación Básica](#creación-básica)
    - [Métodos .then() / .catch() / .finally()](#métodos-then--catch--finally)
    - [Promise.all()](#promiseall)
    - [Promise.race()](#promiserace)
    - [Promise.allSettled()](#promiseallsettled)
  - [Async/Await](#asyncawait)
    - [Funciones Async](#funciones-async)
    - [Await Básico](#await-básico)
    - [Ejecución Paralela](#ejecución-paralela)
    - [Patrones Comunes](#patrones-comunes)
  - [Clases](#clases)
    - [Sintaxis Básica](#sintaxis-básica-1)
    - [Herencia](#herencia)
    - [Propiedades Privadas](#propiedades-privadas)
    - [Getters y Setters](#getters-y-setters)
  - [Módulos ES](#módulos-es)
    - [Export Básico](#export-básico)
    - [Export Default](#export-default)
    - [Import](#import)
    - [Alias de imports](#alias-de-imports)
    - [Re-exportar](#re-exportar)
    - [Dynamic imports](#dynamic-imports)
  - [ES2020+ Features](#es2020-features)
    - [Optional Chaining (?.)](#optional-chaining-)
    - [nullis Coalescing (??)](#nullis-coalescing-)
    - [Private Class Fields (#)](#private-class-fields-)
    - [Top-Level await](#top-level-await)
    - [Logica Assignment (\&\&=, ||=, ?==)](#logica-assignment---)

## Variables y Scope

### `let` y `const` vs `var`

```javascript
// var - function scope, puede redeclararse y reasignarse
var x = 1;
var x = 2; // Permitido

// let - block scope, no puede redeclararse pero sí reasignarse
let y = 1;
y = 2;     // Permitido
// let y = 3; // Error: ya declarada

// const - block scope, no puede redeclararse ni reasignarse
const z = 1;
// z = 2;     // Error: reasignación no permitida
// const z = 3; // Error: ya declarada

```

### Block Scope

```js
if (true) {
  var varVariable = 'Accesible fuera';  
  let letVariable = 'Solo en bloque';    
  const constVariable = 'Solo en bloque';
}

console.log(varVariable);     // 'Accesible fuera'
// console.log(letVariable);     // Error: no definida
// console.log(constVariable);   // Error: no definida
```

### Temporal Dead Zone (TDZ)

```js
// console.log(tdz);  // Error: no se puede acceder antes de inicializar
let tdz = 'Inaccesible antes de declaración';

console.log(hoisted);  // undefined (es "elevada" pero sin valor)
var hoisted = 'var es elevada con valor undefined';
```

## Arrow Functions

### Sintaxis Básica

```javascript
// Función tradicional
function add(a, b) {
  return a + b;
}

// Arrow function (return implícito con una expresión)
const add = (a, b) => a + b;

// Con cuerpo de función (requiere return explícito)
const add = (a, b) => {
  const sum = a + b;
  return sum;
};

// Un solo parámetro (paréntesis opcionales)
const square = x => x * x;

// Sin parámetros (paréntesis requeridos)
const getRandom = () => Math.random();
```

### Lexical `this`

```js
// Problema con funciones tradicionales
function Timer() {
  this.seconds = 0;
  
  setInterval(function() {
    this.seconds++; // 'this' refiere a setInterval, no a Timer
    console.log(this.seconds); // NaN
  }, 1000);
}

// Solución con arrow function
function Timer() {
  this.seconds = 0;
  
  setInterval(() => {
    this.seconds++; // 'this' heredado de Timer
    console.log(this.seconds); // 1, 2, 3...
  }, 1000);
}
```

## Template Literals

### String Multilínea

```javascript
// ES5 - Multilínea con concatenación
var multilineES5 = 'Línea 1\n' +
                  'Línea 2\n' +
                  'Línea 3';

// ES6 - Multilínea directa
const multiline = `Línea 1
Línea 2
Línea 3`;
```

### Interporación

```js
const name = 'María';
const age = 28;

// ES5
var messageES5 = 'Me llamo ' + name + ' y tengo ' + age + ' años.';

// ES6
const message = `Me llamo ${name} y tengo ${age} años.`;
```

### Expresiones

```js
const a = 5;
const b = 10;

console.log(`La suma es: ${a + b}`);
console.log(`${a} es ${a < b ? 'menor' : 'mayor'} que ${b}`);
```

### Tagged Templates

```js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}${values[i] ? `<strong>${values[i]}</strong>` : ''}`;
  }, '');
}

const name = 'JavaScript';
const result = highlight`Estoy aprendiendo ${name}!`;
// 'Estoy aprendiendo <strong>JavaScript</strong>!'
```

## Default Parameters

### Básicos

```javascript
// ES5
function greetES5(name) {
  name = name || 'Usuario';
  return 'Hola, ' + name;
}

// ES6+
function greet(name = 'Usuario') {
  return `Hola, ${name}`;
}

greet();        // 'Hola, Usuario'
greet('María'); // 'Hola, María'
```

### Con expresiones

```js
function calculatePrice(price, tax = price * 0.21, shipping = 5) {
  return price + tax + shipping;
}

calculatePrice(100);         // 100 + 21 + 5 = 126
calculatePrice(100, 15);     // 100 + 15 + 5 = 120
calculatePrice(100, 15, 10); // 100 + 15 + 10 = 125
```

### Con Funciones

```js
function getDefaultValue() {
  return 'Valor calculado';
}

function example(value = getDefaultValue()) {
  return value;
}

example();      // 'Valor calculado'
example('Test'); // 'Test'
```

### En Destructuring

```js
function configureApp({port = 3000, env = 'development'} = {}) {
  console.log(`Server running on port ${port} in ${env} mode`);
}

configureApp();                // Usa valores por defecto
configureApp({port: 8080});    // Usa port personalizado, env por defecto
configureApp({env: 'production'}); // Usa env personalizado, port por defecto
```

## Destructuring

### Objetos

```javascript
const person = {
  name: 'Ana',
  age: 32,
  city: 'Barcelona',
  country: 'España'
};

// Destructuring básico
const { name, age } = person;
console.log(name, age); // 'Ana', 32

// Con alias
const { name: fullName, age: years } = person;
console.log(fullName, years); // 'Ana', 32

// Valores por defecto
const { name, job = 'Desconocido' } = person;
console.log(job); // 'Desconocido'

// Resto de propiedades
const { name, ...rest } = person;
console.log(rest); // { age: 32, city: 'Barcelona', country: 'España' }
```

### Arrays

```js
const colors = ['rojo', 'verde', 'azul', 'amarillo'];

// Destructuring básico
const [primary, secondary] = colors;
console.log(primary, secondary); // 'rojo', 'verde'

// Omitir elementos
const [, , tertiary] = colors;
console.log(tertiary); // 'azul'

// Con spread
const [first, ...others] = colors;
console.log(first, others); // 'rojo', ['verde', 'azul', 'amarillo']

// Valores por defecto
const [red, green, blue, yellow, purple = 'púrpura'] = colors;
console.log(purple); // 'púrpura'

// Swap (intercambio)
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

### Anidado

```js
const user = {
  id: 1,
  personal: {
    name: 'Luis',
    address: {
      street: 'Calle Principal',
      city: 'Madrid'
    }
  }
};

// Destructuring anidado
const { personal: { name, address: { city } } } = user;
console.log(name, city); // 'Luis', 'Madrid'
```

## Spread y Rest Operators

### Spread en Arrays

```javascript
// Copiar arrays
const original = [1, 2, 3];
const copy = [...original];

// Combinar arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Insertar en posición específica
const withInsert = [...arr1.slice(0, 1), 42, ...arr1.slice(1)];
// [1, 42, 2, 3]

// Argumentos de función
function sum(x, y, z) {
  return x + y + z;
}
const nums = [1, 2, 3];
console.log(sum(...nums)); // 6
```

### Spread en Objetos

```js
// Copiar objetos
const original = { a: 1, b: 2 };
const copy = { ...original };

// Combinar objetos
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a:1, b:2, c:3, d:4 }

// Sobrescribir propiedades
const updated = { ...original, b: 42 }; // { a:1, b:42 }

// Añadir propiedades
const withExtra = { ...original, c: 3 }; // { a:1, b:2, c:3 }
```

### Rest en Parameters

```js
// Capturar argumentos restantes
function sum(first, ...others) {
  return first + others.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10

// En destructuring de arrays
const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]

// En destructuring de objetos
const { a, ...rest } = { a: 1, b: 2, c: 3 };
console.log(a);    // 1
console.log(rest); // { b: 2, c: 3 }
```

## Enhanced Object Literals

### Shorthand Properties

```javascript
// ES5
var name = 'Carlos';
var age = 25;
var userES5 = {
  name: name,
  age: age
};

// ES6+
const name = 'Carlos';
const age = 25;
const user = { name, age };  // { name: 'Carlos', age: 25 }
```

### Métodos Concisos

```js
// ES5
var calculatorES5 = {
  add: function(a, b) {
    return a + b;
  },
  subtract: function(a, b) {
    return a - b;
  }
};

// ES6+
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};
```

### Propiedades Computadas

```js
// ES5
var keyName = 'dynamicKey';
var objES5 = {};
objES5[keyName] = 'valor';

// ES6+
const keyName = 'dynamicKey';
const obj = {
  [keyName]: 'valor',
  [`prefijo_${keyName}`]: 'valor con prefijo'
};

console.log(obj.dynamicKey);         // 'valor'
console.log(obj.prefijo_dynamicKey); // 'valor con prefijo'
```

### Combinación de Características

```js
const field = 'name';
const value = 'valor';

const createField = (key, val) => ({ [key]: val });

const config = {
  id: 1234,
  [field]: value,
  validate() {
    return this.id > 0;
  },
  ...createField('extra', true)
};

// { id: 1234, name: 'valor', validate: [Function], extra: true }
```

## Arrays y Métodos Funcionales

### map()

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8]

const users = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Luis' }
];
const names = users.map(user => user.name);
// ['Ana', 'Luis']
```

### filter()

```js
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(num => num % 2 === 0);
// [2, 4, 6]

const users = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true }
];
const activeUsers = users.filter(user => user.active);
// [{ id: 1, active: true }, { id: 3, active: true }]
```

### reduce()

```js
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((total, num) => total + num, 0);
// 10

// Agrupación
const items = [
  { category: 'A', value: 10 },
  { category: 'B', value: 20 },
  { category: 'A', value: 30 }
];

const grouped = items.reduce((result, item) => {
  result[item.category] = (result[item.category] || 0) + item.value;
  return result;
}, {});
// { A: 40, B: 20 }
```

### find() / findIndex()

```js
const users = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Luis' },
  { id: 3, name: 'Carlos' }
];

const luis = users.find(user => user.name === 'Luis');
// { id: 2, name: 'Luis' }

const carlosIndex = users.findIndex(user => user.name === 'Carlos');
// 2
```

### some() / every()

```js
const numbers = [1, 3, 5, 6, 7];

const hasEven = numbers.some(num => num % 2 === 0);
// true

const allPositive = numbers.every(num => num > 0);
// true
```

### flat() / flatMap()

```js
const nested = [1, [2, 3], [4, [5, 6]]];
const flattened = nested.flat();
// [1, 2, 3, 4, [5, 6]]

const deepFlattened = nested.flat(2);
// [1, 2, 3, 4, 5, 6]

const sentences = ['hello world', 'welcome to js'];
const words = sentences.flatMap(s => s.split(' '));
// ['hello', 'world', 'welcome', 'to', 'js']
```

## Promises

### Creación Básica

```javascript
const promise = new Promise((resolve, reject) => {
  // Código asíncrono
  const success = true;
  
  if (success) {
    resolve('Operación exitosa');
  } else {
    reject(new Error('Algo falló'));
  }
});
```

### Métodos .then() / .catch() / .finally()

```js
promise
  .then(result => {
    console.log(result); // 'Operación exitosa'
    return 'Valor modificado';
  })
  .then(newResult => {
    console.log(newResult); // 'Valor modificado'
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Promesa finalizada'); // Se ejecuta siempre
  });
```

### Promise.all()

```js
const promise1 = Promise.resolve('uno');
const promise2 = new Promise(resolve => setTimeout(() => resolve('dos'), 100));
const promise3 = fetch('https://api.example.com/data');

Promise.all([promise1, promise2, promise3])
  .then(([result1, result2, result3]) => {
    // Se ejecuta cuando todas las promesas se resuelven
    console.log(result1, result2, result3);
  })
  .catch(error => {
    // Se ejecuta si cualquiera de las promesas es rechazada
    console.error(error);
  });
```

### Promise.race()

```js
const promiseTimeout = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout')), 5000)
);

const promiseData = fetch('https://api.example.com/data');

Promise.race([promiseData, promiseTimeout])
  .then(data => console.log('Datos recibidos:', data))
  .catch(error => console.error('Error o timeout:', error));
```

### Promise.allSettled()

```js
const promises = [
  Promise.resolve('éxito'),
  Promise.reject('fallo'),
  Promise.resolve('otro éxito')
];

Promise.allSettled(promises)
  .then(results => {
    // [
    //   { status: 'fulfilled', value: 'éxito' },
    //   { status: 'rejected', reason: 'fallo' },
    //   { status: 'fulfilled', value: 'otro éxito' }
    // ]
    console.log(results);
  });
```

## Async/Await

### Funciones Async

```javascript
// Función que devuelve una promesa
async function getData() {
  return 'Datos';  // Equivalente a: return Promise.resolve('Datos');
}

// Con arrow function
const fetchUsers = async () => {
  // código asíncrono
  return ['Ana', 'Luis', 'Carlos'];
};
```

### Await Básico

```js
async function getUser(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('Usuario no encontrado');
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;  // Relanzamos el error
  }
}
```

### Ejecución Paralela

```js
async function loadDashboard() {
  // Secuencial (más lento)
  const user = await fetchUser();
  const posts = await fetchPosts();
  // Total: tiempo de user + tiempo de posts
  
  // Paralelo (más rápido)
  const [userData, postsData] = await Promise.all([
    fetchUser(), 
    fetchPosts()
  ]);
  // Total: máximo entre tiempo de user y tiempo de posts
  
  return { user: userData, posts: postsData };
}
```

### Patrones Comunes

```js
// Bucle con await
async function processItems(items) {
  const results = [];
  
  for (const item of items) {
    // Secuencial (cada item espera al anterior)
    const result = await processItem(item);
    results.push(result);
  }
  
  return results;
}

// Procesamiento paralelo de un array
async function processItemsParallel(items) {
  // Todos los ítems se procesan simultáneamente
  const promises = items.map(item => processItem(item));
  return Promise.all(promises);
}
```

## Clases

### Sintaxis Básica

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hola, soy ${this.name} y tengo ${this.age} años`;
  }
  
  // Método estático (se llama en la clase, no en instancias)
  static createAnonymous() {
    return new Person('Anónimo', 0);
  }
}

const person = new Person('María', 28);
console.log(person.greet()); // "Hola, soy María y tengo 28 años"

const anonymous = Person.createAnonymous();
console.log(anonymous.name); // "Anónimo"
```

### Herencia

```js
class Employee extends Person {
  constructor(name, age, jobTitle) {
    // Llama al constructor de la clase padre
    super(name, age);
    this.jobTitle = jobTitle;
  }
  
  // Sobrescribe el método de la clase padre
  greet() {
    return `${super.greet()} y trabajo como ${this.jobTitle}`;
  }
  
  work() {
    return `${this.name} está trabajando`;
  }
}

const employee = new Employee('Carlos', 35, 'Developer');
console.log(employee.greet()); 
// "Hola, soy Carlos y tengo 35 años y trabajo como Developer"
```

### Propiedades Privadas

```js
class BankAccount {
  // Propiedad privada (requiere navegadores/Node.js modernos)
  #balance = 0;
  
  constructor(owner) {
    this.owner = owner;
  }
  
  deposit(amount) {
    if (amount <= 0) throw new Error('La cantidad debe ser positiva');
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount > this.#balance) throw new Error('Fondos insuficientes');
    if (amount <= 0) throw new Error('La cantidad debe ser positiva');
    this.#balance -= amount;
    return this.#balance;
  }
  
  get balance() {
    return this.#balance;
  }
}

const account = new BankAccount('Ana');
account.deposit(1000);
console.log(account.balance); // 1000
// console.log(account.#balance); // Error: propiedad privada
```

### Getters y Setters

```js
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  
  // Getters
  get width() {
    return this._width;
  }
  
  get height() {
    return this._height;
  }
  
  get area() {
    return this._width * this._height;
  }
  
  // Setters
  set width(value) {
    if (value <= 0) throw new Error('Width must be positive');
    this._width = value;
  }
  
  set height(value) {
    if (value <= 0) throw new Error('Height must be positive');
    this._height = value;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area); // 50
rect.width = 15;
console.log(rect.area); // 75
```

## Módulos ES

### Export Básico

```javascript
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Función que no se exporta (privada del módulo)
function multiply(a, b) {
  return a * b;
}
```

### Export Default

```js
// user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
  
  sayHello() {
    return `Hello, I'm ${this.name}`;
  }
}

// También puede ser:
// const user = { ... };
// export default user;
```

### Import

```js
// Importar exports con nombre
import { PI, add } from './math.js';
console.log(PI);    // 3.14159
console.log(add(2, 3)); // 5

// Importar todo como objeto
import * as math from './math.js';
console.log(math.PI);    // 3.14159
console.log(math.subtract(5, 2)); // 3

// Importar default export
import User from './user.js';
const user = new User('John');
```

### Alias de imports

```js
import { add as sum, subtract as minus } from './math.js';
console.log(sum(2, 3)); // 5
```

### Re-exportar

```js
// helpers.js
export { add, subtract } from './math.js';
export { default as User } from './user.js';
```

### Dynamic imports

```js
async function loadModule() {
  if (condition) {
    // Carga dinámica (útil para lazy loading)
    const { default: User } = await import('./user.js');
    return new User('Dynamic User');
  }
}
```

## ES2020+ Features

### Optional Chaining (?.)

```javascript
const user = {
  name: 'Ana',
  details: {
    address: {
      street: 'Calle Principal'
    }
  }
};

// Sin optional chaining (propenso a errores)
const zipCode = user.details && 
               user.details.address && 
               user.details.address.zipCode;

// Con optional chaining
const zipCode = user.details?.address?.zipCode;
// undefined (sin error aunque las propiedades no existan)

// Con métodos
const result = user.getDetails?.(); // undefined si el método no existe

// Con arrays
const firstItem = array?.[0]; // undefined si array es null/undefined
```

### nullis Coalescing (??)

```js
// El operador || usa "falsy values" (0, '', false se consideran falsos)
let count = 0;
const defaultCount = count || 10; // 10 (porque 0 es "falsy")

// El operador ?? solo considera null y undefined como "faltantes"
const nullishCount = count ?? 10; // 0 (porque 0 no es null ni undefined)

const name = null;
const defaultName = name ?? 'Anónimo'; // 'Anónimo'

// Encadenamiento con optional chaining
const city = user?.address?.city ?? 'Ciudad desconocida';
```

### Private Class Fields (#)

```js
class Counter {
  #count = 0;  // Campo privado
  
  increment() {
    this.#count++;
    return this.#count;
  }
  
  get value() {
    return this.#count;
  }
}

const counter = new Counter();
counter.increment();
console.log(counter.value); // 1
// console.log(counter.#count); // Error: private field
```

### Top-Level await

```js
// En módulos ES, se puede usar await fuera de funciones async
// archivo.js (debe ser un módulo ES)
const response = await fetch('https://api.example.com/data');
const data = await response.json();

export { data };
```

### Logica Assignment (&&=, ||=, ?==)

```js
// a &&= b equivale a: a = a && b
let x = 1;
x &&= 2; // x = 2

// a ||= b equivale a: a = a || b
let y = 0;
y ||= 5; // y = 5

// a ??= b equivale a: a = a ?? b
let z = undefined;
z ??= 10; // z = 10

let w = 0;
w ??= 42; // w = 0 (porque 0 no es null/undefined)
```
