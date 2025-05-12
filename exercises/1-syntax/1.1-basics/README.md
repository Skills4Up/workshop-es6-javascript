# 1.1 Conceptos Básicos ES6+

## 🎯 Objetivo

Dominar los conceptos fundamentales de ES6+ que forman la base de JavaScript moderno: let/const, arrow functions, template literals, parámetros por defecto y enhanced object literals.

## 🌍 Contexto Real

Como desarrollador en una startup de tecnología, has heredado una base de código legacy de un producto de e-commerce. Tu equipo ha decidido modernizar gradualmente el código utilizando características de ES6+. Tu primera tarea es actualizar las funciones de gestión de productos.

## 📋 Instrucciones

1. Abre el archivo `start.js`
2. Completa cada ejercicio siguiendo las instrucciones en los comentarios
3. Ejecuta los tests para verificar tu implementación: `npm test exercises/1-syntax/1.1-basics`
4. Una vez completados los ejercicios básicos, intenta los retos adicionales en `challenges.js`

## 🧩 Conceptos Clave

### Variables y Scope

- **`let`**: Para variables que necesitan ser reasignadas
- **`const`**: Para variables que no cambiarán (inmutables)
- **Block scope**: Variables limitadas a su bloque `{}`

### Arrow Functions

- Sintaxis concisa: `() => {}`
- Sin binding propio de `this`
- Ideal para callbacks y funciones cortas

### Template Literals

- Strings con `` `backticks` ``
- Interpolación con `${expresion}`
- Strings multilínea sin concatenación

### Parámetros por Defecto

- Valores predeterminados: `function(param = 'default'){}`
- Evitan verificaciones explícitas de undefined

### Enhanced Object Literals

- Shorthand: `{ x }` en lugar de `{ x: x }`
- Métodos concisos: `{ method(){} }` en lugar de `{ method: function(){} }`
- Propiedades computadas: `{ [expression]: value }`

## 🚀 Próximos Pasos

Después de dominar estos conceptos básicos, avanzarás a técnicas más poderosas como destructuring y operadores spread/rest.

## 📚 Recursos

- [MDN: let](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/let)
- [MDN: const](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/const)
- [MDN: Arrow Functions](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN: Template Literals](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals)
