/**
 * Ejercicios: Verificación de arrays ES6
 * ======================================
 *
 * Practica métodos de verificación y validación de arrays
 */

/**
 * EJERCICIO 1: Array.isArray() y verificaciones de tipo
 *
 * Implementa funciones robustas de verificación
 */
function esArrayValido(entrada) {
  // TODO: Verificar que entrada es un array válido y no vacío
  // Usar Array.isArray()
  // Retornar objeto con: { esArray: boolean, esValido: boolean, longitud: number }
}

function clasificarTiposDatos(elementos) {
  // TODO: Clasificar elementos de array por tipo
  // Retornar objeto con contadores:
  // { strings: 0, numbers: 0, booleans: 0, objects: 0, arrays: 0, null: 0, undefined: 0 }
  // Usar Array.isArray() para distinguir arrays de objetos
}

/**
 * EJERCICIO 2: Validación de estructura de arrays
 *
 * Valida que arrays tengan la estructura esperada
 */
function validarArrayUsuarios(usuarios) {
  // TODO: Validar que el array contiene objetos usuario válidos
  // Cada usuario debe tener: nombre (string), email (string), edad (number)
  // Retornar: { valido: boolean, errores: [], usuariosValidos: number }
}

function verificarArrayHomogeneo(array, tipoEsperado) {
  // TODO: Verificar que todos los elementos sean del tipo esperado
  // tipoEsperado: 'string', 'number', 'boolean', 'object', 'array'
  // Retornar: { homogeneo: boolean, tiposDiferentes: [], indicesInvalidos: [] }
}

/**
 * EJERCICIO 3: Verificaciones complejas de arrays
 *
 * Implementa validaciones más avanzadas
 */
function analizarArrayAnidado(arrayAnidado) {
  // TODO: Analizar array que puede contener otros arrays
  // Retornar objeto con:
  // - esArrayAnidado: boolean (contiene al menos un array)
  // - profundidadMaxima: number (máximo nivel de anidación)
  // - totalElementos: number (suma de todos los elementos, incluyendo anidados)
  // - estructuraPlana: array (todos los elementos aplanados)
}

function validarMatriz(matriz, filas, columnas) {
  // TODO: Validar que es una matriz rectangular válida
  // Verificar que:
  // - Es array de arrays
  // - Tiene exactamente 'filas' filas
  // - Cada fila tiene exactamente 'columnas' columnas
  // - Todos los elementos son números
  // Retornar: { valida: boolean, errores: [], dimensiones: [filas, columnas] }
}

module.exports = {
  esArrayValido,
  clasificarTiposDatos,
  validarArrayUsuarios,
  verificarArrayHomogeneo,
  analizarArrayAnidado,
  validarMatriz
};
