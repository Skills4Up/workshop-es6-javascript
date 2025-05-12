/**
 * Mini-proyecto: Sistema de Gestión de Inventario
 * ==============================================
 *
 * Este archivo contiene la estructura base del sistema de inventario
 * que debes completar usando características modernas de ES6+.
 */

/**
 * Base de datos simulada
 */
const initialInventory = [
  { id: 'P001', name: 'Laptop Pro', category: 'electronics', price: 1200, stock: 15, minStock: 3 },
  { id: 'P002', name: 'Smartphone X', category: 'electronics', price: 850, stock: 8, minStock: 2 },
  { id: 'P003', name: 'Auriculares Bluetooth', category: 'accessories', price: 80, stock: 22, minStock: 5 },
  { id: 'P004', name: 'Monitor UltraWide', category: 'electronics', price: 420, stock: 4, minStock: 2 },
  { id: 'P005', name: 'Teclado Mecánico', category: 'accessories', price: 120, stock: 12, minStock: 4 },
];

/**
 * Clase principal del sistema de inventario
 * Implementa todos los métodos usando ES6+
 */
class InventorySystem {
  constructor() {
    // IMPLEMENTAR: Inicializa el sistema con los productos iniciales
    // Usa sintaxis adecuada de ES6+
  }

  /**
   * Añade un nuevo producto al inventario
   *
   * @param {object} productData Datos del nuevo producto
   * @returns {object} El producto añadido
   */
  addProduct(productData) {
    // IMPLEMENTAR:
    // 1. Desestructura los datos recibidos con valores por defecto apropiados
    // 2. Genera un nuevo ID si no se proporciona uno
    // 3. Crea un objeto de producto usando enhanced object literals
    // 4. Añade el producto al inventario
    // 5. Retorna el producto añadido
  }

  /**
   * Actualiza un producto existente
   *
   * @param {string} productId ID del producto a actualizar
   * @param {object} updateData Datos a actualizar
   * @returns {object|null} El producto actualizado o null si no existe
   */
  updateProduct(productId, updateData) {
    // IMPLEMENTAR:
    // 1. Encuentra el producto por ID
    // 2. Si existe, actualiza sus propiedades usando spread operator
    // 3. Retorna el producto actualizado o null si no se encuentra
  }

  /**
   * Procesa un pedido, reduciendo el stock de productos
   *
   * @param {array} orderItems Array de objetos {productId, quantity}
   * @returns {object} Resultado del procesamiento con productos y estado
   */
  processOrder(orderItems) {
    // IMPLEMENTAR:
    // 1. Valida que todos los productos existan y tengan suficiente stock
    // 2. Si la validación falla, retorna un objeto con error
    // 3. Actualiza el stock de cada producto
    // 4. Retorna un objeto con el resultado y los productos actualizados
    // Utiliza métodos de array, destructuring y arrow functions
  }

  /**
   * Busca productos según diferentes criterios
   *
   * @param {object} criteria Criterios de búsqueda (nombre, categoría, precio mínimo/máximo)
   * @returns {array} Productos que coinciden con los criterios
   */
  findProducts({
    name = '',
    category = '',
    minPrice = 0,
    maxPrice = Infinity,
    inStock = true
  } = {}) {
    // IMPLEMENTAR:
    // Filtra los productos según todos los criterios proporcionados
    // Usa arrow functions y métodos de array
  }

  /**
   * Genera un informe de productos con stock bajo
   *
   * @returns {object} Informe con productos y estadísticas
   */
  generateLowStockReport() {
    // IMPLEMENTAR:
    // 1. Encuentra productos con stock por debajo del mínimo
    // 2. Calcula estadísticas: total productos, valor total, producto más crítico
    // 3. Retorna un objeto con el informe
    // Usa métodos funcionales de array y destructuring
  }

  /**
   * Genera un informe HTML de inventario
   *
   * @param {string} type Tipo de informe ('all', 'lowStock', 'category')
   * @param {object} options Opciones adicionales según el tipo de informe
   * @returns {string} Representación HTML del informe
   */
  generateInventoryReport(type = 'all', options = {}) {
    // IMPLEMENTAR:
    // 1. Según el tipo de informe, obtén los productos correspondientes
    // 2. Genera un HTML con template literals que muestre el informe
    // 3. Incluye estadísticas relevantes según el tipo de informe
    // Usa template literals, destructuring y métodos de array
  }

  /**
   * Obtiene productos agrupados por categoría
   *
   * @returns {object} Productos agrupados por categoría
   */
  getProductsByCategory() {
    // IMPLEMENTAR:
    // 1. Agrupa los productos por categoría
    // 2. Incluye estadísticas por categoría
    // Usa métodos funcionales de array y object literals mejorados
  }

  /**
   * Actualiza el stock de un producto y genera notificaciones si es necesario
   *
   * @param {string} productId ID del producto
   * @param {number} newStock Nueva cantidad de stock
   * @param {boolean} absolute Si es true, establece el valor, si no, lo suma/resta
   * @returns {object} Resultado de la operación y notificaciones generadas
   */
  updateStock(productId, newStock, absolute = false) {
    // IMPLEMENTAR:
    // 1. Encuentra el producto y actualiza su stock según el parámetro absolute
    // 2. Si el stock baja del mínimo, genera una notificación
    // 3. Retorna el producto actualizado y las notificaciones
    // Usa condicionales modernos y template literals
  }
}

// Exports para testing
module.exports = {
  InventorySystem,
  initialInventory
};

