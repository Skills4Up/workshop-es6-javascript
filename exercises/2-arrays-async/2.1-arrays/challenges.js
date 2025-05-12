/**
 * 2.1 Arrays - Retos Avanzados
 * ===========================
 *
 * Estos retos te permitirán profundizar en técnicas avanzadas de
 * manipulación de arrays con métodos funcionales en ES6+.
 */

// Datos de muestra (no modificar)
const productos = [
  { id: 1, nombre: 'Laptop Pro', precio: 1200, categorias: ['Electrónica', 'Computadoras'], stock: 15, rating: 4.5 },
  { id: 2, nombre: 'Smartphone X', precio: 800, categorias: ['Electrónica', 'Móviles'], stock: 20, rating: 4.2 },
  { id: 3, nombre: 'Monitor UltraWide', precio: 420, categorias: ['Electrónica', 'Accesorios'], stock: 5, rating: 4.7 },
  { id: 4, nombre: 'Teclado Mecánico', precio: 120, categorias: ['Accesorios', 'Gaming'], stock: 30, rating: 4.1 },
  { id: 5, nombre: 'Tablet Mini', precio: 350, categorias: ['Electrónica', 'Tablets'], stock: 0, rating: 3.9 },
  { id: 6, nombre: 'SSD 1TB', precio: 150, categorias: ['Almacenamiento', 'Componentes'], stock: 25, rating: 4.8 },
  { id: 7, nombre: 'Auriculares Bluetooth', precio: 75, categorias: ['Audio', 'Accesorios'], stock: 0, rating: 4.0 },
  { id: 8, nombre: 'Mouse Gamer', precio: 60, categorias: ['Accesorios', 'Gaming'], stock: 12, rating: 4.3 },
  { id: 9, nombre: 'Webcam HD', precio: 90, categorias: ['Accesorios', 'Periféricos'], stock: 8, rating: 3.8 },
  { id: 10, nombre: 'Impresora Láser', precio: 280, categorias: ['Oficina', 'Periféricos'], stock: 3, rating: 4.4 }
];

const clientes = [
  { id: 'C001', nombre: 'Ana García', email: 'ana@example.com', tipo: 'premium', compras: 12 },
  { id: 'C002', nombre: 'Juan Pérez', email: 'juan@example.com', tipo: 'regular', compras: 3 },
  { id: 'C003', nombre: 'María López', email: 'maria@example.com', tipo: 'premium', compras: 8 },
  { id: 'C004', nombre: 'Carlos Ruiz', email: 'carlos@example.com', tipo: 'regular', compras: 2 },
  { id: 'C005', nombre: 'Elena Martín', email: 'elena@example.com', tipo: 'regular', compras: 5 }
];

const ventas = [
  { id: 'V001', clienteId: 'C001', productos: [1, 6], total: 1350, fecha: '2023-05-10' },
  { id: 'V002', clienteId: 'C002', productos: [4, 8], total: 180, fecha: '2023-05-15' },
  { id: 'V003', clienteId: 'C001', productos: [2, 3], total: 1220, fecha: '2023-05-20' },
  { id: 'V004', clienteId: 'C003', productos: [5, 7], total: 425, fecha: '2023-05-22' },
  { id: 'V005', clienteId: 'C005', productos: [9], total: 90, fecha: '2023-05-25' },
  { id: 'V006', clienteId: 'C004', productos: [10], total: 280, fecha: '2023-05-27' },
  { id: 'V007', clienteId: 'C003', productos: [1, 4], total: 1320, fecha: '2023-06-01' },
  { id: 'V008', clienteId: 'C001', productos: [6, 8], total: 210, fecha: '2023-06-03' },
  { id: 'V009', clienteId: 'C005', productos: [3], total: 420, fecha: '2023-06-05' },
  { id: 'V010', clienteId: 'C002', productos: [2], total: 800, fecha: '2023-06-10' }
];

/**
 * RETO 1: Análisis de Ventas Avanzado
 *
 * Implementa una función que analice las ventas y devuelva un array con:
 * - Total de ventas por cliente (nombre del cliente, no ID)
 * - Productos más vendidos (top 3)
 * - Promedio de venta por cliente
 * - Fecha con mayor volumen de ventas
 */
function analizarVentas(productos, clientes, ventas) {
  // IMPLEMENTAR
  // Usa métodos como map, reduce, sort, filter de forma combinada
  // Requiere correlacionar datos entre los tres arrays
}

/**
 * RETO 2: Sistema de Recomendación Simple
 *
 * Implementa un sistema de recomendación que, dado un ID de cliente:
 * 1. Identifique las categorías de productos que ha comprado
 * 2. Encuentre productos de esas mismas categorías que no haya comprado
 * 3. Ordene esos productos por rating y devuelva los 3 mejores
 */
function recomendarProductos(clienteId, productos, clientes, ventas) {
  // IMPLEMENTAR
  // Usa combinaciones de métodos de array para filtrar, mapear y ordenar
}

/**
 * RETO 3: Agrupación y Segmentación
 *
 * Implementa una función que, dada una lista de productos:
 * 1. Agrupe los productos por rango de precio (0-100, 101-500, 501+)
 * 2. Para cada grupo, calcule:
 *   - Número de productos
 *   - Promedio de rating
 *   - Lista de categorías únicas
 *   - Producto más caro y más barato
 */
function segmentarPorPrecio(productos) {
  // IMPLEMENTAR
  // Usa reduce y otros métodos para agrupar y analizar
}

/**
 * RETO 4: Transformación Recursiva
 *
 * Implementa una función que convierta un array plano de productos
 * en una estructura jerárquica de categorías y subcategorías:
 *
 * [{ id: 1, categorias: ['Electrónica', 'Computadoras'], ... }, ...]
 *
 * a:
 *
 * {
 *   Electrónica: {
 *     productos: [...],
 *     subcategorias: {
 *       Computadoras: { productos: [...] },
 *       Móviles: { productos: [...] }
 *     }
 *   },
 *   Accesorios: { ... }
 * }
 */
function crearArbolCategorias(productos) {
  // IMPLEMENTAR
  // Usa métodos funcionales y recursividad si es necesario
}

/**
 * RETO 5: Pipeline de Procesamiento
 *
 * Implementa una función que aplique una serie de transformaciones
 * configurables a un array de productos. Cada transformación es una
 * función que recibe un array y devuelve un array.
 */
function procesarProductos(productos, transformaciones) {
  // Las transformaciones son un array de funciones a aplicar en secuencia
  // Ejemplo de transformaciones:
  // [
  //   productos => productos.filter(p => p.stock > 0),
  //   productos => productos.map(p => ({ nombre: p.nombre, precio: p.precio })),
  //   productos => productos.sort((a, b) => a.precio - b.precio)
  // ]

  // IMPLEMENTAR
  // Usa reduce o métodos similares para aplicar las transformaciones en secuencia
}

// Exporta las funciones para las pruebas
module.exports = {
  analizarVentas,
  recomendarProductos,
  segmentarPorPrecio,
  crearArbolCategorias,
  procesarProductos
};

