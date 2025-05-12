/**
 * DESAFÍOS AVANZADOS DE DESTRUCTURING
 * ===================================
 * Estos desafíos te permitirán profundizar tu dominio de la desestructuración
 * en JavaScript moderno, enfrentándote a casos más realistas y complejos.
 */

// Datos de muestra para los desafíos
const datosAPI = {
  status: 'success',
  code: 200,
  data: {
    productos: [
      {
        id: 'P001',
        nombre: 'Smartphone Galaxy X10',
        precio: 799.99,
        stock: {
          disponible: 15,
          reservado: 5,
          ubicaciones: ['Almacén A', 'Tienda Central']
        },
        categorias: ['Electrónica', 'Móviles', 'Destacados'],
        reviews: { promedio: 4.7, total: 245 }
      },
      {
        id: 'P002',
        nombre: 'Laptop UltraBook Pro',
        precio: 1299.99,
        stock: {
          disponible: 8,
          reservado: 2,
          ubicaciones: ['Almacén B']
        },
        categorias: ['Electrónica', 'Computadoras', 'Profesional'],
        reviews: { promedio: 4.9, total: 189 }
      }
    ],
    metadata: {
      ultimaActualizacion: '2023-06-15T08:30:00Z',
      moneda: 'USD',
      filtros: ['disponibles', 'nuevos']
    }
  },
  pagination: {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 10
  }
};

/**
 * DESAFÍO 1: Extracción Multinivel con Condiciones
 *
 * Extrae de datosAPI:
 * - El código de estado (como 'statusCode')
 * - El nombre del primer producto (como 'primerProducto')
 * - El stock disponible del primer producto (como 'stockDisponible')
 * - La ubicación principal del primer producto (primer elemento de ubicaciones como 'ubicacionPrincipal')
 * - El total de reviews del primer producto (como 'totalReviews')
 * - La moneda (como 'divisa')
 *
 * Además, si la ubicación principal es 'Almacén A', añade una propiedad 'almacenPrincipal: true'
 */
function extraerDatosComplejos(datos) {
  // Completa el código con destructuring anidado
  return null; // Retorna un objeto con todas las propiedades solicitadas
}

/**
 * DESAFÍO 2: Función Procesadora de Respuesta API
 *
 * Crea una función que procese la respuesta de la API y:
 * 1. Use destructuring en los parámetros directamente
 * 2. Extraiga: estado, productos, y metadata en una sola operación
 * 3. Para cada producto, extraiga solo id, nombre, precio y stock disponible
 * 4. Incluya la moneda de metadata en cada producto
 * 5. Calcule un nuevo campo 'stockTotal' sumando disponible y reservado
 *
 * Retorne un array de productos procesados con solo esas propiedades
 */
function procesarRespuestaAPI(/* Usa destructuring en los parámetros */) {
  // Completa el código
  return null; // Retorna el array de productos procesados
}

/**
 * DESAFÍO 3: Combinación de Objetos con Spread y Destructuring
 *
 * Crea una función que permita:
 * 1. Recibir un objeto producto
 * 2. Recibir un objeto actualización con posibles cambios
 * 3. Combinar ambos, pero con las siguientes reglas:
 *    - El id nunca debe cambiar
 *    - Si el precio en actualización es menor que el precio original, usar el original
 *    - Combinar las categorías de ambos objetos sin duplicados
 *    - Sumar el stock.disponible de ambos objetos
 *    - El resto de propiedades de actualización sobrescriben a las originales
 */
function actualizarProducto(producto, actualizacion) {
  // Usa destructuring y spread para lograr lo solicitado
  return null; // Retorna el producto actualizado según las reglas
}

/**
 * DESAFÍO 4: Pattern Matching simulado
 *
 * Implementa una función que reciba un objeto y:
 * 1. Verifique su "forma" mediante destructuring con valores por defecto
 * 2. Según la "forma" detectada, procese de forma diferente:
 *    - Si tiene {type: 'USER', ...} → extraer id, nombre, email
 *    - Si tiene {type: 'PRODUCT', ...} → extraer id, nombre, precio
 *    - Si tiene {type: 'ORDER', ...} → extraer id, userId, productId, status
 *    - Para cualquier otro caso, retornar {type: 'UNKNOWN'}
 * 3. Adicionalmente, añade un campo 'processedAt' con la fecha actual
 */
function procesarEntidad(entidad) {
  // Usa destructuring para "detectar" el tipo y extraer los campos relevantes
  return null; // Retorna el objeto procesado según su tipo
}

// Exportamos las funciones para las pruebas
module.exports = {
  extraerDatosComplejos,
  procesarRespuestaAPI,
  actualizarProducto,
  procesarEntidad
};
