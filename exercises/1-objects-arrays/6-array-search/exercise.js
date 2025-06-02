/**
 * Ejercicios: Búsqueda en arrays ES6
 * ==================================
 *
 * Practica los métodos de búsqueda modernos de arrays
 */

/**
 * EJERCICIO 1: find() y findIndex() para búsquedas específicas
 *
 * Implementa funciones de búsqueda en arrays de objetos
 */
function buscarUsuarioPorEmail(usuarios, email) {
  // TODO: Usar find() para buscar usuario por email
  // Debe ser case-insensitive
  // Retornar el usuario encontrado o null si no existe
}

function obtenerIndiceProducto(productos, codigoProducto) {
  // TODO: Usar findIndex() para encontrar índice del producto
  // Buscar por código de producto
  // Retornar índice o -1 si no se encuentra
}

function buscarPrimerDisponible(items) {
  // TODO: Usar find() para encontrar primer item con disponible = true
  // y stock > 0
}

/**
 * EJERCICIO 2: includes() y indexOf() para verificaciones
 *
 * Verifica existencia de elementos en arrays
 */
function verificarPermisosUsuario(usuario, permisosRequeridos) {
  // TODO: Verificar si usuario tiene TODOS los permisos requeridos
  // usuario.permisos es array de strings
  // permisosRequeridos es array de strings
  // Usar includes() para verificar cada permiso
}

function encontrarPosicionesElemento(array, elemento) {
  // TODO: Encontrar TODAS las posiciones donde aparece el elemento
  // Retornar array con índices
  // Usar indexOf() en bucle o implementar búsqueda manual
}

/**
 * EJERCICIO 3: some() y every() para validaciones
 *
 * Valida condiciones en arrays
 */
function validarFormulario(campos) {
  // TODO: Usar every() y some() para validar formulario
  // Retornar objeto con:
  // - todosCompletos: true si todos los campos tienen valor
  // - algunoInvalido: true si algún campo no cumple su validación
  // - camposVacios: array con nombres de campos vacíos
  //
  // Input: [{ nombre: 'email', valor: 'test@test.com', requerido: true, valido: true }, ...]
}

function analizarCalificaciones(estudiantes) {
  // TODO: Analizar array de estudiantes con calificaciones
  // Retornar objeto con:
  // - todosAprobados: true si todos tienen calificación >= 60
  // - algunoExcelente: true si alguno tiene calificación >= 90
  // - ningunReprobado: true si ninguno tiene calificación < 60
  //
  // Input: [{ nombre: 'Ana', calificacion: 85 }, ...]
}

module.exports = {
  buscarUsuarioPorEmail,
  obtenerIndiceProducto,
  buscarPrimerDisponible,
  verificarPermisosUsuario,
  encontrarPosicionesElemento,
  validarFormulario,
  analizarCalificaciones
};
