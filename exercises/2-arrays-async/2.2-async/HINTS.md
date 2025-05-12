# 💡 Pistas para Programación Asíncrona Moderna

Este documento contiene pistas organizadas por cada ejercicio del módulo 2.2 Async.Consulta solo la sección que necesites cuando te encuentres atascado.

## 🔑 Pistas Generales

  - Recuerda que una Promise puede estar en uno de tres estados: pendiente, cumplida o rechazada
    - Las funciones async siempre devuelven Promises
      - El operador await siempre debe usarse dentro de una función async
        - Puedes combinar Promises y async / await según tus necesidades

## 📝 Ejercicio 1: Creación de Promises

  < details >
  <summary>Pista 1: Estructura básica</summary>

Una Promise se crea con el constructor `new Promise()` que recibe una función con dos parámetros:

```javascript
return new Promise((resolve, reject) => {
  // Operación asíncrona
});
```

`resolve` es la función que llamas cuando la operación tiene éxito.
`reject` es la función que llamas cuando la operación falla.
</details >

<details>
<summary>Pista 2: Simulación con setTimeout</summary>

```javascript
return new Promise((resolve, reject) => {
  setTimeout(() => {
    // Aquí decides si resolver o rechazar la promesa
  }, delay);
});
```
</details>

<details>
<summary>Pista 3: Solución completa</summary>

```javascript
function cargarDatos(datos, delay = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (datos === null || datos === undefined) {
        reject(new Error('No se proporcionaron datos para cargar'));
      } else {
        resolve(datos);
      }
    }, delay);
  });
}
```
</details>

## 📝 Ejercicio 2: Consumo de Promises

  < details >
  <summary>Pista 1: Estructura con .then/.catch</summary>

Puedes encadenar métodos `.then()` y `.catch()` a una promesa:

```javascript
return api.obtenerProducto(id)
  .then(resultado => {
    // Procesar resultado
    return resultadoProcesado;
  })
  .catch(error => {
    // Manejar error
    throw new Error(`Error personalizado: ${ error.message } `);
  });
```
</details >

  <details>
    <summary>Pista 2: Transformación de datos</summary>

    Dentro del `.then()` puedes transformar los datos:

    ```javascript
.then(producto => {
  return {
      ...producto,
      nombre: producto.nombre.toUpperCase(),
    // Otras transformaciones
  };
})
    ```
  </details>

## 📝 Ejercicio 3: Async / Await

  < details >
  <summary>Pista 1: Estructura con async/await</summary>

```javascript
async function obtenerProductoConAsync(id) {
  try {
    const producto = await api.obtenerProducto(id);
    // Procesar producto
    return productoProcesado;
  } catch (error) {
    // Manejar error
    throw new Error(`Error personalizado: ${ error.message } `);
  }
}
```
</details >

  <details>
    <summary>Pista 2: Transformación con async/await</summary>

    La transformación es más directa con async/await:

    ```javascript
    const producto = await api.obtenerProducto(id);
    return {
      ...producto,
      nombre: producto.nombre.toUpperCase(),
  // Otras transformaciones
};
    ```
  </details>

## 📝 Ejercicio 4: Operaciones Paralelas

  < details >
  <summary>Pista 1: Usar Promise.all</summary>

`Promise.all()` toma un array de promesas y devuelve una única promesa que:
- Se resuelve cuando todas las promesas se resuelven
  - Se rechaza si alguna promesa se rechaza

    ```javascript
const promesas = ids.map(id => api.obtenerProducto(id));
return Promise.all(promesas);
```
</details >

  <details>
    <summary>Pista 2: Implementación con async/await</summary>

    ```javascript
    async function obtenerVariosProductos(ids) {
  const promesas = ids.map(id => api.obtenerProducto(id));
    return await Promise.all(promesas);
}
    ```
  </details>

## 📝 Ejercicio 5: Operaciones Secuenciales

  < details >
  <summary>Pista 1: Secuencia con async/await</summary>

Para operaciones secuenciales, simplemente coloca un await antes del siguiente:

```javascript
async function operacionSecuencial() {
  const resultadoA = await operacionA();
  const resultadoB = await operacionB(resultadoA);
  return resultadoB;
}
```
</details >

  <details>
    <summary>Pista 2: Solución completa</summary>

    ```javascript
    async function verificarYComprar(productoId, cantidad) {
  try {
    // Primero verificar disponibilidad
    const disponible = await api.verificarDisponibilidad(productoId, cantidad);

    if (!disponible) {
      throw new Error(`Producto ${productoId} no disponible en cantidad ${cantidad}`);
    }

    // Luego procesar la compra
    const resultado = await api.procesarCompra(productoId, cantidad);
    return resultado;
  } catch (error) {
    throw error; // Re-lanzar el error para que lo maneje el llamador
  }
}
    ```
  </details>

## 📝 Ejercicio 6: Control de Tiempo de Espera

  < details >
  <summary>Pista 1: Crear promesa de timeout</summary>

Puedes crear una promesa que se rechace después de un tiempo específico:

```javascript
function timeoutPromise(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operación cancelada por timeout')), ms);
  });
}
```
</details >

<details>
<summary>Pista 2: Usar Promise.race</summary>

`Promise.race()` toma un array de promesas y se resuelve o rechaza tan pronto como se resuelva o rechace cualquiera de las promesas del array:

```javascript
return Promise.race([
  promesaOriginal,
  timeoutPromise(tiempoLimite)
]);
```
</details>

<details>
<summary>Pista 3: Solución completa</summary>

```javascript
function conTimeout(promesa, tiempoLimite) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Timeout después de ${tiempoLimite}ms`));
    }, tiempoLimite);
  });

  return Promise.race([promesa, timeoutPromise]);
}
```
</details>

## 📝 Ejercicio 7: Reintentos Automáticos

  < details >
  <summary>Pista 1: Estructura básica con recursión</summary>

Los reintentos se implementan bien con una función recursiva:

```javascript
async function conReintentos(operacion, maxIntentos, retraso) {
  try {
    return await operacion();
  } catch (error) {
    if (maxIntentos <= 1) throw error;

    // Esperar antes de reintentar
    await new Promise(resolve => setTimeout(resolve, retraso));

    // Reintentar con un intento menos
    return conReintentos(operacion, maxIntentos - 1, retraso);
  }
}
```
</details >

  <details>
    <summary>Pista 2: Implementar backoff exponencial</summary>

    El backoff exponencial aumenta el tiempo de espera en cada intento:

    ```javascript
    // Dentro del catch:
    const nuevoRetraso = retraso * 2; // O retraso * 1.5, etc.
    return conReintentos(operacion, maxIntentos - 1, nuevoRetraso);
    ```
  </details>

## 📝 Ejercicio 8: Promise.allSettled

  < details >
  <summary>Pista 1: Usar Promise.allSettled</summary>

A diferencia de`Promise.all()`, `Promise.allSettled()` nunca rechaza la promesa.En su lugar, devuelve un array de objetos con el estado y valor / razón de cada promesa:

```javascript
const promesas = ids.map(id => api.obtenerProducto(id));
const resultados = await Promise.allSettled(promesas);
```

Cada resultado tiene un formato:
- Para promesas cumplidas: `{ status: 'fulfilled', value: ... }`
  - Para promesas rechazadas: `{ status: 'rejected', reason: ... }`
</details >

  <details>
    <summary>Pista 2: Procesar los resultados</summary>

    ```javascript
    const exitosos = resultados
  .filter(r => r.status === 'fulfilled')
  .map(r => r.value);

    const fallidos = resultados
  .filter(r => r.status === 'rejected')
  .map((r, index) => ({
      id: ids[index],
    error: r.reason.message
  }));
    ```
  </details>

## 📝 Ejercicio 9: Procesamiento en Serie

  < details >
  <summary>Pista 1: Usar reduce con async/await</summary>

Puedes usar `reduce()` con una función async para procesar elementos en serie:

```javascript
async function procesarEnSerie(items, funcionProcesadora) {
  return items.reduce(async (acumuladorPromesa, item) => {
    // Esperar a que termine lo anterior
    const acumulador = await acumuladorPromesa;

    // Procesar el elemento actual
    const resultado = await funcionProcesadora(item);

    // Añadir al acumulador
    return [...acumulador, resultado];
  }, Promise.resolve([]));
}
```
</details >

  <details>
    <summary>Pista 2: Usar un bucle for...of</summary>

    Alternativamente, puedes usar un bucle `for...of` que es más fácil de entender:

    ```javascript
    async function procesarEnSerie(items, funcionProcesadora) {
  const resultados = [];

    for (const item of items) {
    const resultado = await funcionProcesadora(item);
    resultados.push(resultado);
  }

    return resultados;
}
    ```
  </details>

## 📝 Ejercicio 10: Cancelación de Operaciones

  < details >
  <summary>Pista 1: Usar AbortController</summary>

El `AbortController` es una API estándar para cancelar operaciones asíncronas:

```javascript
function operacionCancelable(operacion) {
  const controller = new AbortController();
  const { signal } = controller;

  const promesa = operacion(signal);

  return {
    promesa,
    cancelar: () => controller.abort()
  };
}
```

La operación debe verificar si la señal está abortada:

```javascript
function algunaOperacion(signal) {
  return new Promise((resolve, reject) => {
    // Verificar si ya está cancelada
    if (signal.aborted) {
      return reject(new Error('Operación cancelada'));
    }

    // Escuchar eventos de cancelación futuros
    signal.addEventListener('abort', () => {
      // Limpiar recursos y rechazar
      clearTimeout(timer);
      reject(new Error('Operación cancelada'));
    });

    const timer = setTimeout(() => resolve('Completado'), 5000);
  });
}
```
</details >

  <details>
    <summary>Pista 2: Implementación con fetch</summary>

    Si la operación es un `fetch`, el API de Fetch ya soporta la señal de AbortController:

    ```javascript
    function fetchCancelable(url) {
  const controller = new AbortController();

    return {
      promesa: fetch(url, {signal: controller.signal })
      .then(res => res.json()),
    cancelar: () => controller.abort()
  };
}
    ```
  </details>

