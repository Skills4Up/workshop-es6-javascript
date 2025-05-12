# Contenido para knowledge-check.md en bloques

## Bloque 1: Título e Introducción

```markdown
# 🧠 Verificación de Conocimientos ES6+

Este documento contiene preguntas para evaluar tu comprensión de las características modernas de JavaScript. Utilízalo para comprobar tu progreso durante el workshop y reforzar conceptos clave.

## Instrucciones

- Intenta responder las preguntas sin consultar el material
- Verifica tus respuestas y revisa los conceptos que necesites reforzar
- Usa el formulario de respuestas al final para registrar tu progreso
```

## Bloque 2: Bloque 1 - Sintaxis Moderna

```markdown
## Bloque 1: Sintaxis Moderna

### Variables y Scope

1. **¿Cuál es la principal diferencia entre `var`, `let` y `const` respecto al scope?**
   - A) No hay diferencia significativa
   - B) `var` tiene function scope, mientras que `let` y `const` tienen block scope
   - C) `var` y `let` tienen block scope, mientras que `const` tiene function scope
   - D) Las tres tienen global scope por defecto

2. **¿Qué ocurre al intentar redeclarar una variable con `let`?**
   - A) Se sobrescribe el valor anterior sin error
   - B) La redeclaración es permitida solo dentro de bloques diferentes
   - C) Se produce un error de sintaxis
   - D) La segunda declaración es ignorada

3. **¿Cuál de estos casos produciría un error?**
   ```javascript
   // A
   const obj = { name: 'John' };
   obj.name = 'Jane';
   
   // B
   const arr = [1, 2, 3];
   arr.push(4);
   
   // C
   const value = 42;
   value = 100;
   
   // D
   const user = { age: 30 };
   user.age += 1;
   ```

### Arrow Functions

4. **¿Qué característica diferencia principalmente a las arrow functions de las funciones tradicionales?**
   - A) No pueden tener más de un parámetro
   - B) No heredan el `this` del contexto circundante
   - C) Tienen su propio contexto léxico de `this`
   - D) Solo pueden usarse como callbacks

5. **¿Cuál es la sintaxis correcta para una arrow function con retorno implícito?**
   - A) `(x, y) => { return x + y }`
   - B) `(x, y) => x + y`
   - C) `function(x, y) => x + y`
   - D) `x, y => x + y`

### Template Literals y Destructuring

6. **¿Qué permite hacer la sintaxis de template literals que no es posible con strings tradicionales?**
   - A) Manipular strings como arrays
   - B) Strings multilínea e interpolación de expresiones
   - C) Comparación directa de strings
   - D) Encriptación automática de strings

7. **Completa el código para extraer las propiedades `name` y `age` con un nombre de variable distinto:**

   ```javascript
   const person = { name: 'Ana', age: 28, city: 'Madrid' };
   // Completa la línea para extraer name como userName y age como userAge
   const { ____ } = person;
   ```

8. **¿Qué hace este código de destructuring?**

   ```javascript
   const [first, ...rest] = [1, 2, 3, 4, 5];
   ```

   - A) Asigna 1 a `first` y [2, 3, 4, 5] a `rest`
   - B) Asigna [1] a `first` y 2, 3, 4, 5 a `rest` como valores separados
   - C) Produce un error de sintaxis
   - D) Asigna 1 a `first` y 5 a `rest`

## Bloque 2: Arrays y Asincronía

### Métodos Funcionales de Arrays

9. **¿Qué método de array deberías usar para transformar cada elemento en un nuevo valor?**
   - A) `forEach()`
   - B) `filter()`
   - C) `map()`
   - D) `reduce()`

10. **¿Qué hace el siguiente código?**
    ```javascript
    const numbers = [1, 2, 3, 4, 5];
    const result = numbers.reduce((acc, num) => acc + num, 0);
    ```
    - A) Suma todos los números del array
    - B) Concatena todos los números como string
    - C) Cuenta cuántos números hay en el array
    - D) Obtiene el número más grande del array

11. **¿Cuál es la principal ventaja de usar métodos como `map()` y `filter()` en lugar de bucles `for`?**
    - A) Son significativamente más rápidos en ejecución
    - B) Promueven un estilo declarativo y evitan efectos secundarios
    - C) Pueden procesar arrays infinitos
    - D) Utilizan menos memoria

12. **Completa el código para filtrar los números pares y duplicarlos:**
    ```javascript
    const numbers = [1, 2, 3, 4, 5, 6];
    // Completa para obtener [4, 8, 12]
    const result = numbers.____
    ```

### Promises y Async/Await

13. **¿Cuáles son los posibles estados de una Promise?**
    - A) active, resolved, rejected
    - B) pending, fulfilled, rejected
    - C) waiting, success, error
    - D) initial, completed, failed

14. **¿Qué hace este código?**
    ```javascript
    async function getData() {
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error:', error);
        return null;
      }
    }
    ```
    - A) Realiza una petición HTTP, convierte la respuesta a JSON y la retorna
    - B) Crea una nueva API en el servidor
    - C) Descarga datos y los guarda en una base de datos
    - D) Genera un error porque `await` no puede usarse en funciones regulares

15. **¿Cuál es la principal ventaja de `async/await` sobre las Promises con `.then()`?**
    - A) Es la única forma de manejar errores en código asíncrono
    - B) Permite código asíncrono con apariencia de síncrono, más legible
    - C) Es significativamente más rápido en ejecución
    - D) No hay ventajas reales, son equivalentes en todos los aspectos

16. **Completa el código para ejecutar tres funciones asíncronas en paralelo:**
    ```javascript
    async function runAll() {
      const results = await ____(
        fetchUsers(),
        fetchProducts(),
        fetchOrders()
      );
      return results;
    }
    ```

### ES2020+ Features

17. **¿Qué hace el operador de optional chaining (`?.`)?**
    - A) Permite acceder a propiedades anidadas sin verificar si cada nivel existe
    - B) Evita errores al acceder a propiedades de objetos potencialmente nulos/undefined
    - C) Crea automáticamente propiedades faltantes en un objeto
    - D) Es una forma abreviada de usar el operador ternario

## Bloque 3: Arquitectura Moderna

### Clases

18. **¿Qué es una clase en JavaScript ES6+?**
    - A) Un tipo de dato primitivo
    - B) Una forma de función constructora con sintaxis mejorada
    - C) Una implementación completamente nueva sin relación con funciones constructoras
    - D) Un módulo para encapsular código

19. **¿Cómo se define un campo privado en una clase moderna?**
    - A) Usando la palabra clave `private`
    - B) Prefijando el nombre con un guión bajo (`_property`)
    - C) Usando un símbolo (`Symbol`) como nombre de propiedad
    - D) Prefijando el nombre con `#` (`#property`)

20. **¿Qué hace el siguiente código?**
    ```javascript
    class Animal {
      constructor(name) {
        this.name = name;
      }
      
      speak() {
        console.log(`${this.name} makes a noise.`);
      }
    }
    
    class Dog extends Animal {
      speak() {
        console.log(`${this.name} barks.`);
      }
    }
    ```
    - A) Crea dos clases independientes sin relación
    - B) Implementa herencia, donde `Dog` extiende y sobrescribe un método de `Animal`
    - C) Produce un error porque JavaScript no soporta herencia de clases
    - D) Crea un mixín para compartir funcionalidad

### Módulos ES

21. **¿Cuál es la diferencia entre export default y export con nombre?**
    - A) No hay diferencia funcional, solo es una preferencia de estilo
    - B) Los export default solo pueden ser usados una vez por archivo
    - C) Los export con nombre son más lentos
    - D) Los export default no pueden ser funciones

22. **¿Qué hace este código?**
    ```javascript
    // math.js
    export const PI = 3.14159;
    export function add(a, b) { return a + b; }
    export default function multiply(a, b) { return a * b; }
    
    // app.js
    import multiply, { PI, add as sum } from './math.js';
    ```
    - A) Importa todas las funciones y constantes de math.js
    - B) Importa la función default como `multiply`, la constante `PI` y la función `add` renombrada como `sum`
    - C) Produce un error porque no se puede mezclar import default con named imports
    - D) Renombra todas las importaciones

23. **¿Cuál es la ventaja principal de los módulos ES sobre los sistemas de módulos anteriores como CommonJS?**
    - A) Son significativamente más rápidos
    - B) Funcionan tanto en el navegador como en Node.js sin herramientas adicionales
    - C) Permiten análisis estático, importaciones/exportaciones con nombre y carga asíncrona
    - D) Utilizan menos memoria

### Patrones de Diseño

24. **¿Qué es el patrón Factory en JavaScript moderno?**
    - A) Una fábrica de objetos DOM para manipular HTML
    - B) Una función que crea y retorna objetos sin usar `new` o clases
    - C) Un método especial dentro de una clase para crear subclases
    - D) Una forma de configurar herencia prototípica

25. **¿Cuál de estos conceptos NO es parte central de la programación funcional en JavaScript?**
    - A) Funciones puras
    - B) Inmutabilidad
    - C) Herencia de prototipos
    - D) Composición de funciones

## Aplicación Práctica

26. **Refactoriza el siguiente código usando características ES6+:**
    ```javascript
    var calculateTotal = function(items) {
      var total = 0;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        total += item.price * item.quantity;
      }
      return total;
    };
    ```

27. **Implementa una función asíncrona que obtenga datos de dos APIs distintas y combine los resultados:**
    ```javascript
    // Implementa fetchCombinedData que llame a estas dos funciones y combine sus resultados
    function fetchUserData() {
      return fetch('https://api.example.com/users')
        .then(response => response.json());
    }
    
    function fetchProductData() {
      return fetch('https://api.example.com/products')
        .then(response => response.json());
    }
    
    // Completa esta función
    async function fetchCombinedData() {
      // Tu código aquí
    }
    ```

28. **Crea una clase y un módulo apropiado para el siguiente escenario:**
    ```javascript
    // Crea una clase ShoppingCart con métodos para añadir productos, calcular el total,
    // y aplicar descuentos. Luego exporta la clase desde un módulo.
    ```

## 📝 Respuestas correctas

<details>
<summary>Haz clic para ver las respuestas (intenta resolver las preguntas primero)</summary>

1. B - `var` tiene function scope, mientras que `let` y `const` tienen block scope
2. C - Se produce un error de sintaxis
3. C - La reasignación de una constante produce un error
4. C - Tienen su propio contexto léxico de `this`
5. B - `(x, y) => x + y`
6. B - Strings multilínea e interpolación de expresiones
7. `const { name: userName, age: userAge } = person;`
8. A - Asigna 1 a `first` y [2, 3, 4, 5] a `rest`
9. C - `map()`
10. A - Suma todos los números del array
11. B - Promueven un estilo declarativo y evitan efectos secundarios
12. `const result = numbers.filter(n => n % 2 === 0).map(n => n * 2);`
13. B - pending, fulfilled, rejected
14. A - Realiza una petición HTTP, convierte la respuesta a JSON y la retorna
15. B - Permite código asíncrono con apariencia de síncrono, más legible
16. `const results = await Promise.all(...`
17. B - Evita errores al acceder a propiedades de objetos potencialmente nulos/undefined
18. B - Una forma de función constructora con sintaxis mejorada
19. D - Prefijando el nombre con `#` (`#property`)
20. B - Implementa herencia, donde `Dog` extiende y sobrescribe un método de `Animal`
21. B - Los export default solo pueden ser usados una vez por archivo
22. B - Importa la función default como `multiply`, la constante `PI` y la función `add` renombrada como `sum`
23. C - Permiten análisis estático, importaciones/exportaciones con nombre y carga asíncrona
24. B - Una función que crea y retorna objetos sin usar `new` o clases
25. C - Herencia de prototipos

</details>

## Soluciones para ejercicios prácticos

<details>
<summary>Refactorización con ES6+ (Ejercicio 26)</summary>

```javascript
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Versión más concisa
const calculateTotal = items => 
  items.reduce((total, {price, quantity}) => total + price * quantity, 0);
```

</details>

<details>
<summary>Función asíncrona combinada (Ejercicio 27)</summary>

```javascript
async function fetchCombinedData() {
  try {
    const [userData, productData] = await Promise.all([
      fetchUserData(),
      fetchProductData()
    ]);
    
    return {
      users: userData,
      products: productData,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
```

</details>

<details>
<summary>Clase y módulo (Ejercicio 28)</summary>

```javascript
// filepath: ShoppingCart.js
export default class ShoppingCart {
  #items = [];
  #discountRate = 0;
  
  addItem(product, quantity = 1) {
    this.#items.push({ 
      product, 
      quantity,
      subtotal: product.price * quantity 
    });
    return this;
  }
  
  removeItem(productId) {
    this.#items = this.#items.filter(item => item.product.id !== productId);
    return this;
  }
  
  applyDiscount(rate) {
    this.#discountRate = rate;
    return this;
  }
  
  calculateTotal() {
    const subtotal = this.#items.reduce((sum, item) => sum + item.subtotal, 0);
    const discount = subtotal * this.#discountRate;
    return {
      items: this.#items.length,
      subtotal,
      discount,
      total: subtotal - discount
    };
  }
}

// Uso:
// import ShoppingCart from './ShoppingCart.js';
// const cart = new ShoppingCart();
```

</details>
