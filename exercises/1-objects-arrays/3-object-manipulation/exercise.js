/**
 * Ejercicios: Manipulación de objetos ES6
 * =======================================
 *
 * Practica las operaciones avanzadas con objetos usando métodos de Object
 */

/**
 * EJERCICIO 1: Object.assign para combinar objetos
 *
 * Crea una función que combine información de perfil de usuario
 *
 * @param {Object} perfilBase - Información básica del usuario
 * @param {Object} preferencias - Preferencias del usuario
 * @param {Object} configuracion - Configuración adicional
 * @returns {Object} Objeto combinado sin mutar los originales
 */
function combinarPerfil(perfilBase, preferencias, configuracion) {
  // TODO: Usar Object.assign para combinar los objetos
  // - No debe mutar los objetos originales
  // - configuracion debe tener prioridad sobre preferencias
  // - preferencias debe tener prioridad sobre perfilBase
  // - Añadir propiedad ultimaActualizacion con fecha actual
}

/**
 * EJERCICIO 2: Object.keys, values, entries
 *
 * Crea funciones de análisis de un objeto inventario
 *
 * @param {Object} inventario - Objeto con productos y cantidades
 * @returns {Object} Objeto con estadísticas del inventario
 */
function analizarInventario(inventario) {
  // TODO: Implementar usando Object.keys, Object.values, Object.entries
  // Retornar objeto con:
  // - totalProductos: número de productos diferentes
  // - stockTotal: suma de todas las cantidades
  // - productoMayorStock: producto con mayor cantidad
  // - productoMenorStock: producto with menor cantidad
  // - promedioStock: promedio de cantidades
  // - productosAgotados: array de productos con cantidad 0
}

/**
 * EJERCICIO 3: Object.freeze y mutabilidad
 *
 * Crea una función que maneje configuración inmutable
 *
 * @param {Object} config - Configuración base
 * @returns {Object} Configuración congelada con métodos de acceso
 */
function crearConfiguracionInmutable(config) {
  // TODO: Crear objeto inmutable con Object.freeze
  // Retornar objeto con métodos:
  // - obtener(clave): obtiene valor de configuración
  // - existe(clave): verifica si existe la clave
  // - toObject(): retorna copia del objeto de configuración
  // - claves(): retorna array de claves disponibles
  // La configuración original debe ser inmutable
}

module.exports = {
  combinarPerfil,
  analizarInventario,
  crearConfiguracionInmutable
};
