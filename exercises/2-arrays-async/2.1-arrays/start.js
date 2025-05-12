/**
 * 2.1 Métodos Funcionales de Arrays ES6+
 * ======================================
 *
 * Este archivo contiene ejercicios para practicar con los métodos
 * funcionales de arrays en JavaScript moderno.
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
 * EJERCICIO 1: Filtrado básico
 *
 * Implementa una función que devuelva todos los productos disponibles en stock.
 */
function obtenerProductosDisponibles(productos) {
  // IMPLEMENTAR: usa filter() para obtener productos con stock > 0
}

/**
 * EJERCICIO 2: Transformación con map
 *
 * Implementa una función que devuelva un array con solo los nombres
 * y precios de los productos, en formato "Nombre - $Precio".
 */
function obtenerListaPrecios(productos) {
  // IMPLEMENTAR: usa map() para crear un array de strings con formato "Nombre - $Precio"
}

/**
 * EJERCICIO 3: Búsqueda con find
 *
 * Implementa una función que encuentre un producto por su ID.
 */
function buscarProductoPorId(productos, id) {
  // IMPLEMENTAR: usa find() para encontrar un producto por su ID
}

/**
 * EJERCICIO 4: Cálculo con reduce
 *
 * Implementa una función que calcule el valor total del inventario
 * (suma de precio * stock de todos los productos).
 */
function calcularValorTotalInventario(productos) {
  // IMPLEMENTAR: usa reduce() para calcular el valor total del inventario
}

/**
 * EJERCICIO 5: Filtrado múltiple
 *
 * Implementa una función que devuelva productos que cumplan varios criterios:
 * - Pertenecen a la categoría especificada
 * - Tienen un precio dentro del rango especificado
 * - Están en stock si onlyAvailable es true
 */
function filtrarProductos(productos, { categoria, precioMin = 0, precioMax = Infinity, onlyAvailable = false }) {
  // IMPLEMENTAR: usa filter() con múltiples condiciones
}

/**
 * EJERCICIO 6: Ordenación
 *
 * Implementa una función que ordene productos por precio o rating según el parámetro 'criterio'.
 * El parámetro 'orden' puede ser 'asc' o 'desc'.
 */
function ordenarProductos(productos, { criterio = 'precio', orden = 'asc' }) {
  // IMPLEMENTAR: usa sort() para ordenar productos según criterio y orden
}

/**
 * EJERCICIO 7: Transformación compleja
 *
 * Implementa una función que devuelva un array de objetos con:
 * - La categoría
 * - El número de productos en esa categoría
 * - El precio promedio de los productos en esa categoría
 */
function analizarCategorias(productos) {
  // IMPLEMENTAR: usa reduce(), map() y otros métodos para agrupar y analizar por categoría
}

/**
 * EJERCICIO 8: Encadenamiento de métodos
 *
 * Implementa una función que devuelva los nombres de los 3 productos más caros
 * que están disponibles en stock.
 */
function obtenerProductosPremium(productos) {
  // IMPLEMENTAR: encadena filter(), sort() y map() para obtener lo solicitado
}

/**
 * EJERCICIO 9: every y some
 *
 * Implementa una función que verifique si todos los productos de una categoría
 * cumplen con un precio mínimo (every) y si al menos uno está disponible (some).
 */
function verificarProductosCategoria(productos, categoria, precioMinimo) {
  // Filtrar productos por categoría
  const productosCategoria = productos.filter(producto =>
    producto.categorias.includes(categoria)
  );

  // IMPLEMENTAR:
  // 1. Verifica si TODOS los productos de la categoría tienen un precio mayor o igual al mínimo
  // 2. Verifica si AL MENOS UN producto de la categoría tiene stock disponible
  // 3. Retorna un objeto con ambos resultados
}

/**
 * EJERCICIO 10: flatMap
 *
 * Implementa una función que devuelva un array con todas las categorías
 * disponibles, sin duplicados.
 */
function obtenerTodasCategorias(productos) {
  // IMPLEMENTAR: usa flatMap() (o map() + flat()) y luego elimina duplicados
}

// Exporta las funciones para las pruebas
module.exports = {
  obtenerProductosDisponibles,
  obtenerListaPrecios,
  buscarProductoPorId,
  calcularValorTotalInventario,
  filtrarProductos,
  ordenarProductos,
  analizarCategorias,
  obtenerProductosPremium,
  verificarProductosCategoria,
  obtenerTodasCategorias
};

