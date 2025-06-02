/**
 * Ejercicios: Creación de arrays ES6
 * ==================================
 *
 * Practica las diferentes formas de crear y manipular arrays
 */

/**
 * EJERCICIO 1: Array.from() para convertir estructuras
 *
 * Crea funciones que usen Array.from() para diferentes conversiones
 */
function convertirTextoAArray(texto) {
  // TODO: Usar Array.from() para convertir string a array de caracteres
  // Debe manejar emojis y caracteres especiales correctamente
}

function crearRangoNumeros(inicio, fin) {
  // TODO: Usar Array.from() para crear array de números en rango
  // Ejemplo: crearRangoNumeros(1, 5) → [1, 2, 3, 4, 5]
}

function convertirMapAArray(mapa) {
  // TODO: Convertir Map a array de arrays [clave, valor]
  // Usar Array.from() con Map
}

/**
 * EJERCICIO 2: Array.of() vs constructor Array()
 *
 * Demuestra las diferencias entre Array.of() y new Array()
 */
function crearArraySeguro(elemento) {
  // TODO: Usar Array.of() para crear array con un elemento
  // Debe funcionar correctamente incluso si elemento es un número
}

function compararCreacionArrays(valor) {
  // TODO: Retornar objeto que compare Array.of() vs new Array()
  // Retornar: { arrayOf: resultado_Array_of, arrayConstructor: resultado_new_Array }
}

/**
 * EJERCICIO 3: Spread operator para arrays
 *
 * Usa spread operator para operaciones avanzadas con arrays
 */
function combinarArrays(...arrays) {
  // TODO: Combinar múltiples arrays usando spread operator
  // Debe eliminar duplicados y retornar array ordenado
}

function clonarYModificar(arrayOriginal, elementoAgregar) {
  // TODO: Clonar array y agregar elemento sin modificar original
  // Usar spread operator
}

function insertarEnPosicion(array, posicion, elemento) {
  // TODO: Insertar elemento en posición específica usando spread
  // No modificar array original
}

module.exports = {
  convertirTextoAArray,
  crearRangoNumeros,
  convertirMapAArray,
  crearArraySeguro,
  compararCreacionArrays,
  combinarArrays,
  clonarYModificar,
  insertarEnPosicion
};
