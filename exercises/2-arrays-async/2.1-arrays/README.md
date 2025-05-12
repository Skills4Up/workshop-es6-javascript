# 2.1 Métodos Funcionales de Arrays ES6+

## 🎯 Objetivo

Dominar los métodos funcionales de arrays en JavaScript moderno como `map`, `filter`, `reduce`, `find`, y otros, para transformar y manipular datos de forma declarativa, limpia y eficiente.

## 🌍 Contexto Real

Como desarrollador frontend en una plataforma de comercio electrónico, has recibido datos de la API que necesitan ser transformados y filtrados para su visualización en diferentes secciones de la interfaz. En lugar de usar bucles tradicionales y variables temporales, aplicarás métodos funcionales de arrays para crear pipelines de transformación de datos claros y mantenibles.

## 📋 Instrucciones

1. Abre el archivo `start.js`
2. Completa cada ejercicio siguiendo las instrucciones en los comentarios
3. Ejecuta los tests para verificar tu implementación: `npm test exercises/2-arrays-async/2.1-arrays`
4. Una vez completados los ejercicios básicos, intenta los retos adicionales en `challenges.js`

## 🧩 Conceptos Clave

### Métodos de transformación

- **`map()`**: Transforma cada elemento de un array y devuelve un nuevo array
- **`filter()`**: Selecciona elementos que cumplen una condición
- **`reduce()`**: Combina todos los elementos en un único valor resultante
- **`flatMap()`**: Combina `map()` seguido de `flat()` para un array plano

### Métodos de búsqueda

- **`find()`**: Encuentra el primer elemento que cumple una condición
- **`findIndex()`**: Encuentra la posición del primer elemento que cumple una condición
- **`some()`**: Verifica si al menos un elemento cumple una condición
- **`every()`**: Verifica si todos los elementos cumplen una condición

### Métodos de ordenación y manipulación

- **`sort()`**: Ordena elementos según una función de comparación
- **`reverse()`**: Invierte el orden de los elementos
- **`flat()`**: Aplana arrays anidados
- **`slice()`/`splice()`**: Extrae/modifica porciones del array

## 🛠️ Patrones Comunes

1. **Data Pipeline**: Encadenar métodos para transformaciones sucesivas

   ```javascript
   const result = data
     .filter(item => item.active)
     .map(item => transformItem(item))
     .sort((a, b) => a.priority - b.priority);
   ```

2. **Agrupación de datos**: Usar `reduce()` para crear objetos agrupados

   ```javascript
   const groupedByCategory = products.reduce((groups, product) => {
     const category = product.category;
     groups[category] = groups[category] || [];
     groups[category].push(product);
     return groups;
   }, {});
   ```

3. **Indexación**: Crear mapas para acceso rápido por ID

   ```javascript
   const productsById = products.reduce((map, product) => {
     map[product.id] = product;
     return map;
   }, {});
   ```

## 🚀 Para profundizar

- [MDN: Array methods](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript Info: Arrays methods](https://javascript.info/array-methods)
