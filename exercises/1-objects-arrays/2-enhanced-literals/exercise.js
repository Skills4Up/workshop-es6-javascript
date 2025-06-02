/**
 * Ejercicios: Enhanced Object Literals ES6
 * ========================================
 *
 * Practica las mejoras en la sintaxis de objetos literales de ES6
 */

/**
 * EJERCICIO 1: Property Shorthand
 *
 * Refactoriza esta función para usar la sintaxis abreviada de propiedades ES6
 *
 * @param {string} titulo - Título del libro
 * @param {string} autor - Autor del libro
 * @param {number} paginas - Número de páginas
 * @param {boolean} disponible - Si está disponible
 * @returns {Object} Objeto libro con sintaxis abreviada
 */
function crearLibro(titulo, autor, paginas, disponible) {
  // TODO: Refactorizar para usar property shorthand
  // En lugar de { titulo: titulo, autor: autor ... }
  // Usar la sintaxis abreviada de ES6

  const isbn = `ISBN-${Math.random().toString(36).substr(2, 9)}`;
  const fechaPublicacion = new Date();

  return {
    // TODO: Implementar con sintaxis abreviada
    titulo: titulo,
    autor: autor,
    paginas: paginas,
    disponible: disponible,
    isbn: isbn,
    fechaPublicacion: fechaPublicacion
  };
}

/**
 * EJERCICIO 2: Computed Property Names
 *
 * Crea un objeto de configuración usando nombres de propiedades computados
 *
 * @param {string} entorno - 'development', 'staging', 'production'
 * @param {string} servicio - nombre del servicio
 * @param {Object} configuracion - configuración específica
 * @returns {Object} Objeto con propiedades computadas
 */
function crearConfiguracion(entorno, servicio, configuracion) {
  // TODO: Crear objeto usando computed property names
  // Debe incluir:
  // - Una propiedad con clave `${entorno}_url`
  // - Una propiedad con clave `${servicio}_config`
  // - Una propiedad con clave `${entorno}_${servicio}_active`
  // - Propiedades fijas: version, timestamp

  const baseUrl = {
    development: 'http://localhost:3000',
    staging: 'https://staging.app.com',
    production: 'https://app.com'
  };

  // TODO: Implementar usando computed property names
}

/**
 * EJERCICIO 3: Method Shorthand
 *
 * Crea una calculadora usando la sintaxis concisa de métodos ES6
 *
 * @param {number} valorInicial - Valor inicial de la calculadora
 * @returns {Object} Objeto calculadora con métodos concisos
 */
function crearCalculadora(valorInicial = 0) {
  // TODO: Implementar objeto con métodos usando sintaxis concisa
  // En lugar de { sumar: function(n) { ... } }
  // Usar { sumar(n) { ... } }

  let valor = valorInicial;

  return {
    // TODO: Implementar métodos con sintaxis concisa
    // - sumar(n): suma n al valor actual
    // - restar(n): resta n del valor actual
    // - multiplicar(n): multiplica valor actual por n
    // - dividir(n): divide valor actual por n (verificar división por 0)
    // - reset(): vuelve al valor inicial
    // - obtenerValor(): retorna el valor actual
    // - obtenerHistorial(): retorna array con operaciones realizadas

    // Usar también property shorthand para:
    valorInicial, // valor inicial (parámetro)
    // version: '1.0.0'
  };
}

module.exports = {
  crearLibro,
  crearConfiguracion,
  crearCalculadora
};
