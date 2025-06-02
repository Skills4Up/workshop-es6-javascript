/**
 * Ejercicios: Iteración de arrays ES6
 * ===================================
 *
 * Practica los métodos de iteración modernos de arrays
 */

/**
 * EJERCICIO 1: map() para transformaciones
 *
 * Transforma arrays de datos usando map()
 */
function procesarUsuarios(usuarios) {
  // TODO: Usar map() para transformar array de usuarios
  // Input: [{ nombre: 'Ana', edad: 25, activo: true }, ...]
  // Output: Array con objetos que incluyan:
  // - nombre en mayúsculas
  // - edad en meses (edad * 12)
  // - status: 'activo' o 'inactivo'
  // - id: generado automáticamente
}

function extraerEmails(usuarios) {
  // TODO: Usar map() para extraer solo los emails
  // Input: [{ nombre: 'Ana', email: 'ana@test.com' }, ...]
  // Output: ['ana@test.com', ...]
}

/**
 * EJERCICIO 2: filter() para filtrado
 *
 * Filtra arrays según diferentes criterios
 */
function filtrarProductosDisponibles(productos) {
  // TODO: Filtrar productos con stock > 0 y activo = true
  // Usar filter()
}

function buscarPorCriterios(items, criterios) {
  // TODO: Filtrar items que cumplan TODOS los criterios del objeto criterios
  // Ejemplo: criterios = { categoria: 'libro', precio: valor => valor < 50 }
  // Debe ser flexible para cualquier cantidad de criterios
}

/**
 * EJERCICIO 3: reduce() para agregaciones
 *
 * Realiza cálculos complejos con reduce()
 */
function calcularEstadisticasVentas(ventas) {
  // TODO: Usar reduce() para calcular:
  // - total: suma de todos los montos
  // - promedio: promedio de ventas
  // - ventaMayor: venta con mayor monto
  // - ventasPorMes: objeto agrupando ventas por mes
  // Input: [{ monto: 100, fecha: '2024-01-15', cliente: 'Ana' }, ...]
}

function agruparPorPropiedad(array, propiedad) {
  // TODO: Agrupar elementos del array por valor de la propiedad
  // Usar reduce() para crear objeto con grupos
  // Ejemplo: agruparPorPropiedad([{tipo: 'A', valor: 1}, {tipo: 'A', valor: 2}], 'tipo')
  // → { A: [{tipo: 'A', valor: 1}, {tipo: 'A', valor: 2}] }
}

module.exports = {
  procesarUsuarios,
  extraerEmails,
  filtrarProductosDisponibles,
  buscarPorCriterios,
  calcularEstadisticasVentas,
  agruparPorPropiedad
};
