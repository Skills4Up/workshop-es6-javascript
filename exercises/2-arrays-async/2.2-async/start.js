/**
 * 2.2 Programación Asíncrona Moderna
 * ==================================
 *
 * Este archivo contiene ejercicios para practicar con Promises y async/await.
 * Implementarás diversos escenarios comunes de programación asíncrona.
 */

// API simulada para los ejercicios - No modificar
const api = require('./helpers/api');

/**
 * EJERCICIO 1: Creación de Promises
 *
 * Implementa una función que simule una operación asíncrona de carga de datos
 * utilizando una Promise.
 *
 * - Debe devolver una Promise que se resuelva después de 'delay' milisegundos
 * - Si los datos son null o undefined, debe rechazar con un error apropiado
 */
function cargarDatos(datos, delay = 1000) {
  // IMPLEMENTAR:
  // - Crear y devolver una nueva Promise
  // - Usar setTimeout para simular operación asíncrona
  // - Resolver con los datos o rechazar según corresponda
}

/**
 * EJERCICIO 2: Consumo de Promises
 *
 * Implementa una función que consuma la API simulada para obtener los detalles
 * de un producto por su ID usando el enfoque de Promises con .then/.catch
 *
 * - Debe manejar los errores adecuadamente
 * - Debe devolver una Promise
 */
function obtenerProductoConPromise(id) {
  // IMPLEMENTAR:
  // - Llama a api.obtenerProducto(id) que devuelve una Promise
  // - Maneja el resultado con .then()
  // - Captura errores con .catch()
  // - Realiza una transformación al resultado antes de devolverlo
}

/**
 * EJERCICIO 3: Async/Await
 *
 * Implementa la misma funcionalidad que en el ejercicio 2 pero usando
 * async/await en lugar de .then()/.catch()
 */
async function obtenerProductoConAsync(id) {
  // IMPLEMENTAR:
  // - Usar async/await para esperar la respuesta de api.obtenerProducto(id)
  // - Manejar errores con try/catch
  // - Realizar la misma transformación que en el ejercicio anterior
}

/**
 * EJERCICIO 4: Operaciones Paralelas
 *
 * Implementa una función que obtenga detalles de múltiples productos en paralelo.
 *
 * - Recibe un array de IDs de productos
 * - Debe hacer todas las peticiones simultáneamente
 * - Debe devolver un array con todos los resultados cuando todas las peticiones completen
 * - Si alguna petición falla, toda la operación debe fallar
 */
async function obtenerVariosProductos(ids) {
  // IMPLEMENTAR:
  // - Usar Promise.all() con async/await
  // - Convertir cada ID en una promesa usando api.obtenerProducto()
  // - Devolver array de resultados
}

/**
 * EJERCICIO 5: Operaciones Secuenciales
 *
 * Implementa una función que verifique la disponibilidad de un producto y luego
 * realice una compra, de forma secuencial (primero una, luego la otra).
 *
 * - Si el producto no está disponible, debe fallar sin intentar la compra
 * - Debe manejar errores de ambas operaciones
 * - Debe devolver el resultado de la compra
 */
async function verificarYComprar(productoId, cantidad) {
  // IMPLEMENTAR:
  // - Llamar a api.verificarDisponibilidad(productoId, cantidad)
  // - Si está disponible, llamar a api.procesarCompra(productoId, cantidad)
  // - Usar async/await y manejo de errores apropiado
}

/**
 * EJERCICIO 6: Control de Tiempo de Espera (Timeout)
 *
 * Implementa una función que agregue un límite de tiempo a cualquier promesa.
 * Si la promesa no se resuelve dentro del tiempo límite, debe rechazarse.
 */
function conTimeout(promesa, tiempoLimite) {
  // IMPLEMENTAR:
  // - Devolver una nueva Promise que encapsule la promesa original
  // - Crear una promesa de timeout usando setTimeout
  // - Usar Promise.race() para competir entre la promesa original y el timeout
}

/**
 * EJERCICIO 7: Reintentos Automáticos
 *
 * Implementa una función que ejecute una operación asíncrona y reintente
 * automáticamente si falla, con un número máximo de intentos.
 */
async function conReintentos(operacion, maxIntentos, retraso = 1000) {
  // IMPLEMENTAR:
  // - Ejecutar la operación (que devuelve una promesa)
  // - Si falla, esperar el retraso y reintentar hasta maxIntentos veces
  // - Opcionalmente, implementar backoff exponencial aumentando el retraso en cada intento
  // - Lanzar el último error si se agotan los intentos
}

/**
 * EJERCICIO 8: Promise.allSettled
 *
 * Implementa una función que intente obtener información de varios productos
 * y devuelva tanto los resultados exitosos como los errores.
 */
async function obtenerProductosConResultado(ids) {
  // IMPLEMENTAR:
  // - Similar al ejercicio 4, pero usar Promise.allSettled() en lugar de Promise.all()
  // - Transformar los resultados para devolver un objeto con arrays separados de:
  //   * exitosos: productos encontrados
  //   * fallidos: objetos {id, error} para los que fallaron
}

/**
 * EJERCICIO 9: Procesamiento en Serie
 *
 * Implementa una función que procese un array de elementos en serie,
 * esperando a que termine el procesamiento de un elemento antes de empezar con el siguiente.
 */
async function procesarEnSerie(items, funcionProcesadora) {
  // IMPLEMENTAR:
  // - Procesar cada elemento del array uno por uno
  // - Esperar a que cada elemento termine de procesarse antes de continuar con el siguiente
  // - Acumular y devolver los resultados en un array nuevo
}

/**
 * EJERCICIO 10: Cancelación de Operaciones
 *
 * Implementa una función que permita cancelar una operación asíncrona en curso.
 * Pista: Puedes usar AbortController para esto.
 */
function operacionCancelable(operacion) {
  // IMPLEMENTAR:
  // - Crear una instancia de AbortController
  // - Ejecutar operacion pasando la señal del controller
  // - Devolver un objeto con:
  //   * promesa: la promesa de la operación
  //   * cancelar: función para cancelar la operación
}

// No modificar estas exportaciones
module.exports = {
  cargarDatos,
  obtenerProductoConPromise,
  obtenerProductoConAsync,
  obtenerVariosProductos,
  verificarYComprar,
  conTimeout,
  conReintentos,
  obtenerProductosConResultado,
  procesarEnSerie,
  operacionCancelable
};
