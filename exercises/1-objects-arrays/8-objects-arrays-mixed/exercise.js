/**
 * Ejercicios: Objetos y arrays mixtos ES6
 * =======================================
 *
 * Practica operaciones complejas combinando objetos y arrays
 */

/**
 * EJERCICIO 1: Transformación de estructuras de datos
 *
 * Convierte entre diferentes formatos de datos
 */
function arrayObjetosAMapa(arrayObjetos, clavePropiedad) {
  // TODO: Convertir array de objetos a Map
  // Usar la propiedad especificada como clave del Map
  // Ejemplo: [{id: 1, nombre: 'Ana'}, {id: 2, nombre: 'Luis'}] con 'id'
  // → Map([[1, {id: 1, nombre: 'Ana'}], [2, {id: 2, nombre: 'Luis'}]])
}

function mapaAArrayObjetos(mapa) {
  // TODO: Convertir Map a array de objetos
  // Cada entrada del Map se convierte en objeto {clave, valor}
}

function agruparObjetosPorPropiedad(objetos, propiedad) {
  // TODO: Agrupar objetos por valor de una propiedad
  // Retornar objeto donde las claves son los valores únicos de la propiedad
  // y los valores son arrays de objetos que tienen esa propiedad
}

/**
 * EJERCICIO 2: Manipulación de datos anidados
 *
 * Trabaja con estructuras de datos complejas
 */
function extraerPropiedadesAnidadas(objetos, ruta) {
  // TODO: Extraer propiedades anidadas de array de objetos
  // ruta es string como 'usuario.perfil.nombre'
  // Retornar array con los valores extraídos (undefined si no existe)
}

function fusionarArraysDeObjetos(array1, array2, claveUnion) {
  // TODO: Fusionar dos arrays de objetos usando una clave común
  // Similar a un JOIN de base de datos
  // Retornar array con objetos que tengan propiedades de ambos arrays
}

/**
 * EJERCICIO 3: Operaciones avanzadas
 *
 * Implementa algoritmos complejos con objetos y arrays
 */
function crearIndiceInvertido(documentos) {
  // TODO: Crear índice invertido para búsqueda de texto
  // Input: [{id: 1, texto: 'hola mundo'}, {id: 2, texto: 'mundo feliz'}]
  // Output: Map([['hola', [1]], ['mundo', [1, 2]], ['feliz', [2]]])
  // Dividir texto por espacios, ignorar mayúsculas
}

function procesarVentasAnidadas(ventasPorRegion) {
  // TODO: Procesar objeto anidado de ventas
  // Input: { norte: [{producto: 'A', cantidad: 5}, ...], sur: [...], ... }
  // Output: {
  //   totalGeneral: number,
  //   ventasPorRegion: { norte: number, sur: number, ... },
  //   productoMasVendido: string,
  //   regionMasActiva: string
  // }
}

module.exports = {
  arrayObjetosAMapa,
  mapaAArrayObjetos,
  agruparObjetosPorPropiedad,
  extraerPropiedadesAnidadas,
  fusionarArraysDeObjetos,
  crearIndiceInvertido,
  procesarVentasAnidadas
};
