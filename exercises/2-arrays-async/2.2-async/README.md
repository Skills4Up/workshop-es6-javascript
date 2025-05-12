# 2.2 Programación Asíncrona Moderna

## 🎯 Objetivo

Dominar las técnicas de programación asíncrona moderna con Promises y async/await, manejando escenarios comunes en aplicaciones web reales como peticiones HTTP paralelas, manejo de errores y patrones de composición asíncrona.

## 🌍 Contexto Real

Como desarrollador frontend para una aplicación de comercio electrónico, necesitas implementar diversas funcionalidades que involucran operaciones asíncronas:

1. Cargar datos de productos desde una API
2. Procesar pagos mientras muestras estados de carga
3. Implementar búsquedas que no bloqueen la interfaz de usuario
4. Manejar errores de red de forma elegante
5. Organizar operaciones secuenciales y paralelas

En lugar de usar callbacks anidados que pueden llevar a un "callback hell", implementarás estas funcionalidades con Promises y async/await para crear código más limpio, mantenible y robusto.

## 📋 Instrucciones

1. Abre el archivo `start.js`
2. Completa cada ejercicio siguiendo las instrucciones en los comentarios
3. Ejecuta los tests para verificar tu implementación: `npm test exercises/2-arrays-async/2.2-async`
4. Si necesitas ayuda, consulta las pistas en `HINTS.md`

## 🧩 Conceptos Clave

### Promises

- **Creación**: Con el constructor `new Promise((resolve, reject) => { ... })`
- **Estados**: Pending, Fulfilled, Rejected
- **Encadenamiento**: `.then()`, `.catch()`, `.finally()`
- **Combinación**: `Promise.all()`, `Promise.race()`, `Promise.allSettled()`

### Async/Await

- **Funciones async**: Declaradas con `async function` o `const fn = async () => {}`
- **Operador await**: Espera el resultado de una Promise sin bloquear el hilo principal
- **Manejo de errores**: Usando bloques `try/catch` en lugar de `.catch()`
- **Ejecución secuencial vs. paralela**: Cuándo usar múltiples awaits o Promise.all

### Patrones Asíncronos

- **Retry Logic**: Reintentar operaciones fallidas con backoff exponencial
- **Timeout**: Establecer límites de tiempo para operaciones
- **Cancelación**: Abortar operaciones asíncronas en curso
- **Paralelización controlada**: Limitar número de operaciones concurrentes

## 📚 Comparación con Enfoques Anteriores

| Aspecto        | Callbacks                  | Promises               | Async/Await                    |
| -------------- | -------------------------- | ---------------------- | ------------------------------ |
| Sintaxis       | Anidada, callback hell     | Encadenada con .then() | Secuencial, similar a síncrono |
| Error handling | Parámetros de error        | .catch()               | try/catch                      |
| Composición    | Difícil, manual            | Promise.all, .then()   | Intuitiva con await            |
| Legibilidad    | Baja con múltiples niveles | Media                  | Alta                           |

## 🚀 Recursos Adicionales

- [JavaScript.info: Promises](https://javascript.info/promise-basics)
- [MDN: Async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

