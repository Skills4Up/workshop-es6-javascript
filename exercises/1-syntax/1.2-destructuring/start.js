/**
 * DESTRUCTURING EN JAVASCRIPT MODERNO
 * ===================================
 * Este archivo contiene ejercicios para practicar diferentes técnicas
 * de destructuring en JavaScript ES6+.
 */

// Datos de muestra
const producto = {
  id: 'P001',
  nombre: 'Smartphone Galaxy X10',
  precio: 799.99,
  disponible: true,
  categoria: 'Electrónica',
  fabricante: {
    nombre: 'Samsung',
    pais: 'Corea del Sur',
    fundacion: 1938
  },
  especificaciones: ['6GB RAM', 'Pantalla 6.1"', '128GB', '5G'],
  calificaciones: [4.5, 4.8, 5.0, 4.2, 4.7]
};

const usuario = {
  id: 'U123',
  nombre: 'Ana García',
  email: 'ana.garcia@example.com',
  preferencias: {
    tema: 'oscuro',
    notificaciones: true,
    idioma: 'español'
  },
  carrito: [
    { id: 'P001', cantidad: 1 },
    { id: 'P034', cantidad: 2 }
  ],
  metodosPago: ['tarjeta', 'paypal']
};

/**
 * EJERCICIO 1: Destructuring Básico de Objetos
 *
 * Extrae las propiedades id, nombre y precio del objeto producto
 * en variables individuales.
 */
function extraerInfoProducto(producto) {
  // Completa el código:
  // const { ... } = producto;

  // Retorna un objeto con las propiedades extraídas
  return null; // Reemplaza null con el objeto que contiene las propiedades
}

/**
 * EJERCICIO 2: Destructuring con Alias
 *
 * Extrae la propiedad 'nombre' del fabricante como 'marcaProducto'
 * y el 'pais' del fabricante como 'paisOrigen'.
 */
function extraerFabricante(producto) {
  // Completa el código:
  // const { ... } = producto.fabricante;

  return null; // Retorna un objeto con las propiedades extraídas y renombradas
}

/**
 * EJERCICIO 3: Destructuring de Arrays
 *
 * Extrae el primer, tercer y último elemento del array de especificaciones
 */
function extraerEspecificaciones(producto) {
  // Completa el código:
  // const [ ... ] = producto.especificaciones;

  return null; // Retorna un objeto con las propiedades extraídas
}

/**
 * EJERCICIO 4: Valores por Defecto
 *
 * Extrae la propiedad 'descuento' del producto con un valor por defecto de 0
 * y la propiedad 'garantia' con un valor por defecto de '1 año'
 */
function extraerDetallesAdicionales(producto) {
  // Completa el código:
  // const { ... } = producto;

  return null; // Retorna un objeto con las propiedades descuento y garantia
}

/**
 * EJERCICIO 5: Destructuring Anidado
 *
 * Extrae en una sola sentencia de destructuring:
 * - El id del usuario
 * - El idioma de las preferencias (como 'idiomaUsuario')
 * - El método de pago principal (primer elemento de metodosPago como 'metodoPrincipal')
 */
function extraerPerfilUsuario(usuario) {
  // Completa el código:
  // const { ... } = usuario;

  return null; // Retorna un objeto con las propiedades extraídas
}

/**
 * EJERCICIO 6: Destructuring en Parámetros de Función
 *
 * Refactoriza la función para usar destructuring directamente en los parámetros
 */
function crearMensajeBienvenida(usuario) {
  // La función debería extraer nombre y tema de preferencias directamente en la firma
  // usando destructuring de parámetros

  return `Bienvenido/a, ${usuario.nombre}. Usando tema: ${usuario.preferencias.tema}`;
}

/**
 * EJERCICIO 7: Rest en Destructuring de Objetos
 *
 * Extrae el id y nombre del producto, y agrupa todas las demás propiedades
 * en un objeto llamado 'detalles'
 */
function separarProducto(producto) {
  // Completa el código:
  // const { ... } = producto;

  return null; // Retorna un objeto con id, nombre, y detalles
}

/**
 * EJERCICIO 8: Rest en Destructuring de Arrays
 *
 * Extrae la primera calificación como 'calificacionPrincipal' y
 * el resto de calificaciones en un array 'calificacionesAdicionales'
 */
function separarCalificaciones(producto) {
  // Completa el código:
  // const [ ... ] = producto.calificaciones;

  return null; // Retorna un objeto con las propiedades extraídas
}

// Exporta las funciones para pruebas
module.exports = {
  extraerInfoProducto,
  extraerFabricante,
  extraerEspecificaciones,
  extraerDetallesAdicionales,
  extraerPerfilUsuario,
  crearMensajeBienvenida,
  separarProducto,
  separarCalificaciones
};
