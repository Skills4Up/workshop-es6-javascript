/**
 * Ejercicios: Utilidades de objetos ES6
 * =====================================
 *
 * Practica utilidades avanzadas y patrones con objetos
 */

/**
 * EJERCICIO 1: Clonado profundo y superficial
 *
 * Implementa diferentes estrategias de clonado
 */
function clonadoSuperficial(objeto) {
  // TODO: Implementar clonado superficial usando múltiples métodos
  // Retornar objeto con diferentes implementaciones:
  // {
  //   objectAssign: resultado usando Object.assign,
  //   spread: resultado usando spread operator,
  //   original: objeto original (para comparar referencias)
  // }
}

function clonadoProfundo(objeto) {
  // TODO: Implementar clonado profundo recursivo
  // Debe manejar:
  // - Objetos anidados
  // - Arrays anidados
  // - Valores primitivos
  // - null y undefined
  // NO usar JSON.parse/stringify
}

/**
 * EJERCICIO 2: Comparación de objetos
 *
 * Implementa funciones de comparación avanzada
 */
function compararObjetosSuperficial(obj1, obj2) {
  // TODO: Comparar objetos de forma superficial
  // Verificar que tengan las mismas propiedades con los mismos valores
  // Solo primer nivel (no anidado)
}

function compararObjetosProfundo(obj1, obj2) {
  // TODO: Comparar objetos de forma profunda (recursiva)
  // Debe manejar objetos anidados y arrays
}

/**
 * EJERCICIO 3: Manipulación avanzada de objetos
 *
 * Implementa utilidades complejas
 */
function limpiarObjeto(objeto, valoresAEliminar = [null, undefined, '', 0]) {
  // TODO: Crear nuevo objeto eliminando propiedades con valores específicos
  // Por defecto eliminar: null, undefined, '', 0
  // Debe funcionar recursivamente con objetos anidados
}

function aplanarObjeto(objetoAnidado, separador = '.') {
  // TODO: Aplanar objeto anidado a un nivel
  // Ejemplo: { a: { b: { c: 1 } } } → { 'a.b.c': 1 }
  // Usar separador personalizable
}

function reconstruirObjetoAplanado(objetoAplanado, separador = '.') {
  // TODO: Reconstruir objeto anidado desde objeto aplanado
  // Ejemplo: { 'a.b.c': 1 } → { a: { b: { c: 1 } } }
  // Operación inversa a aplanarObjeto
}

module.exports = {
  clonadoSuperficial,
  clonadoProfundo,
  compararObjetosSuperficial,
  compararObjetosProfundo,
  limpiarObjeto,
  aplanarObjeto,
  reconstruirObjetoAplanado
};
