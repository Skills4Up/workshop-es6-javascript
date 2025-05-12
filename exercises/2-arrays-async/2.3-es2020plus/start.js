/**
 * 2.3 Características Modernas ES2020+
 * ===================================
 *
 * Este archivo contiene ejercicios para practicar con las características
 * más modernas de JavaScript introducidas desde ES2020 en adelante.
 */

/**
 * EJERCICIO 1: Optional Chaining (?.)
 *
 * Implementa una función que obtenga de forma segura el email de un usuario,
 * incluso cuando los objetos anidados pueden ser null o undefined.
 *
 * En el objeto, el email puede estar en user.contact.emailAddresses[0].address
 */
function getEmail(user) {
  // IMPLEMENTAR: usar optional chaining para acceder de forma segura
  // Retornar undefined si alguna parte de la cadena es null/undefined
}

/**
 * EJERCICIO 2: Nullish Coalescing (??)
 *
 * Implementa una función que establezca valores por defecto pero respete
 * valores "falsy" válidos como 0 o cadenas vacías.
 *
 * @param {Object} config Objeto de configuración
 * @returns {Object} Configuración con valores por defecto
 */
function configureSettings(config = {}) {
  // IMPLEMENTAR: usar nullish coalescing para establecer valores por defecto
  // solo cuando las propiedades son null o undefined

  // Valores por defecto:
  // - timeout: 1000
  // - retries: 3
  // - enabled: true
  // - logLevel: 'info'
  // - emptyStringAllowed: '' (debe mantener cadena vacía si se proporciona)
  // - zeroAllowed: 0 (debe mantener 0 si se proporciona)
}

/**
 * EJERCICIO 3: Promise.allSettled()
 *
 * Implementa una función que procesa múltiples peticiones API,
 * capturando tanto los resultados exitosos como los fallidos.
 *
 * @param {Array<Promise>} requests Array de promesas (peticiones API)
 * @returns {Object} Objeto con éxitos y fallos
 */
async function processRequests(requests) {
  // IMPLEMENTAR: usar Promise.allSettled para procesar todas las peticiones
  // Retornar un objeto:
  // {
  //   successful: [resultados de peticiones exitosas],
  //   failed: [mensajes de error de peticiones fallidas]
  // }
}

/**
 * EJERCICIO 4: BigInt
 *
 * Implementa una función que calcule con precisión números muy grandes
 * que están fuera del rango seguro de JavaScript.
 *
 * @param {string} num1 Primer número grande como string
 * @param {string} num2 Segundo número grande como string
 * @returns {string} El resultado como string
 */
function calculateLargeNumbers(num1, num2, operation) {
  // IMPLEMENTAR: usar BigInt para cálculos precisos con números grandes
  // operation puede ser "add", "subtract", "multiply" o "divide"
  // Retornar el resultado como string (sin la "n" del BigInt)
}

/**
 * EJERCICIO 5: String.prototype.replaceAll()
 *
 * Implementa una función que reemplace todas las ocurrencias de una palabra
 * en un texto, sin usar expresiones regulares.
 *
 * @param {string} text Texto original
 * @param {string} search Palabra a buscar
 * @param {string} replace Palabra de reemplazo
 * @returns {string} Texto con reemplazos
 */
function replaceAllOccurrences(text, search, replace) {
  // IMPLEMENTAR: usar replaceAll para reemplazar todas las instancias
}

/**
 * EJERCICIO 6: Logical Assignment Operators
 *
 * Implementa una función que actualice opciones de configuración
 * usando operadores de asignación lógica.
 *
 * @param {Object} options Configuración existente
 * @param {Object} newOptions Nuevas opciones para combinar
 * @returns {Object} Opciones actualizadas
 */
function updateOptions(options, newOptions) {
  // IMPLEMENTAR: modificar "options" usando los operadores ||=, &&=, y ??=

  // - Usar ||= para propiedades que deben ser "truthy" o tomar nuevo valor
  // - Usar &&= para propiedades que solo se mantienen si ambas son "truthy"
  // - Usar ??= para propiedades que solo se actualizan si son null/undefined

  return options;
}

/**
 * EJERCICIO 7: Array.at()
 *
 * Implementa una función que trabaje con índices negativos para acceder
 * a los elementos de un array desde el final.
 *
 * @param {Array} array Array de elementos
 * @param {number} n Número de elementos desde el final
 * @returns {Array} Los 'n' últimos elementos
 */
function getLastElements(array, n) {
  // IMPLEMENTAR: usar Array.at() para obtener los últimos elementos
}

/**
 * EJERCICIO 8: Object.hasOwn()
 *
 * Implementa una función que verifique de forma segura si un objeto
 * tiene una propiedad propia (no heredada).
 *
 * @param {Object} object Objeto a verificar
 * @param {string} property Nombre de la propiedad
 * @returns {boolean} true si la propiedad existe y es propia
 */
function hasOwnProperty(object, property) {
  // IMPLEMENTAR: usar Object.hasOwn para verificar propiedades propias
  // Más seguro que object.hasOwnProperty(property)
}

/**
 * EJERCICIO 9: Promise.any()
 *
 * Implementa una función que intente cargar un recurso desde múltiples
 * URLs y devuelva el primer recurso que cargue correctamente.
 *
 * @param {Array<string>} urls Lista de URLs a intentar
 * @returns {Promise<Object>} Resultado del primer recurso exitoso
 */
async function loadFromFirstAvailable(urls, fetchFunction) {
  // IMPLEMENTAR: usar Promise.any para obtener el primer resultado exitoso
  // Si todas fallan, capturar el error AggregateError y lanzar error personalizado
}

/**
 * EJERCICIO 10: Combinación de características
 *
 * Implementa una función que use varias características ES2020+ para
 * procesar datos de usuario de forma segura y con código conciso.
 *
 * @param {Object} userData Datos de usuario que pueden ser incompletos
 * @returns {Object} Información procesada del usuario
 */
function processUserData(userData) {
  // IMPLEMENTAR: usar varias características modernas para procesar datos
  // - Optional chaining para acceso seguro
  // - Nullish coalescing para valores por defecto
  // - Logical assignment para actualizar valores
  // - replaceAll para normalizar datos de texto
  // etc.

  // Debe:
  // 1. Extraer nombre completo (firstName + lastName) o "Usuario Anónimo" si no existen
  // 2. Obtener email principal o "no-email" como respaldo
  // 3. Normalizar username (reemplazar espacios por guiones y convertir a minúsculas)
  // 4. Establecer nivel de acceso en userData.access.level o "basic" por defecto
  // 5. Retornar objeto con toda esta información procesada
}

// Exportar funciones para testing
module.exports = {
  getEmail,
  configureSettings,
  processRequests,
  calculateLargeNumbers,
  replaceAllOccurrences,
  updateOptions,
  getLastElements,
  hasOwnProperty,
  loadFromFirstAvailable,
  processUserData
};

