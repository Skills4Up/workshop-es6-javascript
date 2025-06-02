/**
 * Ejercicios: Creación de objetos en ES6
 * =====================================
 *
 * Practica las diferentes formas de crear objetos en JavaScript ES6
 */

/**
 * EJERCICIO 1: Crear usuario con notación literal
 *
 * Crea una función que reciba parámetros básicos de un usuario
 * y retorne un objeto usuario usando notación literal de objeto.
 *
 * @param {string} nombre - Nombre del usuario
 * @param {string} email - Email del usuario
 * @param {number} edad - Edad del usuario
 * @returns {Object} Objeto usuario con propiedades básicas
 */
function crearUsuario(nombre, email, edad) {
  // TODO: Implementar función que retorne objeto literal
  // El objeto debe incluir:
  // - nombre, email, edad (parámetros recibidos)
  // - activo: true (por defecto)
  // - fechaRegistro: fecha actual
  // - id: número aleatorio entre 1000 y 9999
}

/**
 * EJERCICIO 2: Crear producto usando Object constructor
 *
 * Crea una función que use el constructor Object() para crear
 * un producto y luego añada propiedades dinámicamente.
 *
 * @param {string} nombre - Nombre del producto
 * @param {number} precio - Precio del producto
 * @returns {Object} Objeto producto creado con constructor
 */
function crearProductoConConstructor(nombre, precio) {
  // TODO: Usar new Object() y añadir propiedades
  // Propiedades a añadir:
  // - nombre, precio (parámetros)
  // - categoria: "general"
  // - disponible: precio > 0
  // - codigo: "PROD-" + número aleatorio de 3 dígitos
}

/**
 * EJERCICIO 3: Crear vehículo con Object.create()
 *
 * Usa Object.create() para crear un objeto que herede
 * de un prototipo base de vehículo.
 *
 * @param {string} marca - Marca del vehículo
 * @param {string} modelo - Modelo del vehículo
 * @param {number} anio - Año del vehículo
 * @returns {Object} Objeto vehículo que hereda del prototipo
 */
function crearVehiculo(marca, modelo, anio) {
  // TODO: Crear objeto prototipo con propiedades comunes
  const prototipoVehiculo = {
    tipo: "terrestre",
    encendido: false,
    // TODO: Añadir método arrancar() que cambie encendido a true
    // TODO: Añadir método apagar() que cambie encendido a false
  };

  // TODO: Usar Object.create() para crear vehículo que herede del prototipo
  // Añadir propiedades específicas: marca, modelo, anio
}

module.exports = {
  crearUsuario,
  crearProductoConConstructor,
  crearVehiculo
};
