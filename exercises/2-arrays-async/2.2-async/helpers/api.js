/**
 * API simulada para los ejercicios de Async
 * No modificar este archivo
 */

// Base de datos ficticia
const db = {
  productos: [
    { id: 1, nombre: 'Laptop Pro', precio: 1200, stock: 15 },
    { id: 2, nombre: 'Smartphone X', precio: 800, stock: 20 },
    { id: 3, nombre: 'Monitor UltraWide', precio: 420, stock: 5 },
    { id: 4, nombre: 'Teclado Mecánico', precio: 120, stock: 30 },
    { id: 5, nombre: 'Tablet Mini', precio: 350, stock: 0 },
    { id: 6, nombre: 'SSD 1TB', precio: 150, stock: 25 },
    { id: 7, nombre: 'Auriculares Bluetooth', precio: 75, stock: 0 },
    { id: 8, nombre: 'Mouse Gamer', precio: 60, stock: 12 },
    { id: 9, nombre: 'Webcam HD', precio: 90, stock: 8 },
    { id: 10, nombre: 'Impresora Láser', precio: 280, stock: 3 }
  ],
  pedidos: []
};

// Utilidad para simular latencia y errores aleatorios
function simularRed(callback, forzarError = false, tiempoMin = 100, tiempoMax = 800) {
  const tiempoRespuesta = Math.floor(Math.random() * (tiempoMax - tiempoMin + 1)) + tiempoMin;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simular error de red aleatorio (10% de probabilidad) o si forzarError es true
      if (forzarError || Math.random() < 0.1) {
        reject(new Error('Error de conexión con el servidor'));
        return;
      }

      try {
        const resultado = callback();
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    }, tiempoRespuesta);
  });
}

// API de productos
const api = {
  /**
   * Obtiene un producto por su ID
   * @param {number} id ID del producto
   * @returns {Promise<Object>} Datos del producto
   */
  obtenerProducto(id) {
    return simularRed(() => {
      const producto = db.productos.find(p => p.id === id);
      if (!producto) {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      return { ...producto };
    });
  },

  /**
   * Verifica si hay stock disponible para un producto
   * @param {number} productoId ID del producto
   * @param {number} cantidad Cantidad solicitada
   * @returns {Promise<boolean>} true si hay stock suficiente
   */
  verificarDisponibilidad(productoId, cantidad) {
    return simularRed(() => {
      const producto = db.productos.find(p => p.id === productoId);
      if (!producto) {
        throw new Error(`Producto con ID ${productoId} no encontrado`);
      }
      return producto.stock >= cantidad;
    });
  },

  /**
   * Procesa una compra
   * @param {number} productoId ID del producto
   * @param {number} cantidad Cantidad a comprar
   * @returns {Promise<Object>} Resultado de la compra
   */
  procesarCompra(productoId, cantidad) {
    return simularRed(() => {
      const producto = db.productos.find(p => p.id === productoId);
      if (!producto) {
        throw new Error(`Producto con ID ${productoId} no encontrado`);
      }

      if (producto.stock < cantidad) {
        throw new Error(`Stock insuficiente para producto ${productoId}`);
      }

      // Actualizar stock
      producto.stock -= cantidad;

      // Registrar pedido
      const pedidoId = Date.now();
      const nuevoPedido = {
        id: pedidoId,
        productoId,
        cantidad,
        total: producto.precio * cantidad,
        fecha: new Date().toISOString()
      };

      db.pedidos.push(nuevoPedido);

      return {
        pedidoId,
        mensaje: 'Compra procesada con éxito',
        total: nuevoPedido.total
      };
    });
  },

  /**
   * Busca productos que coincidan con un término de búsqueda
   * @param {string} termino Término de búsqueda
   * @returns {Promise<Array>} Productos que coinciden
   */
  buscarProductos(termino, signal) {
    return new Promise((resolve, reject) => {
      // Verificar si ya está cancelada
      if (signal && signal.aborted) {
        reject(new Error('Búsqueda cancelada'));
        return;
      }

      // Función para manejar la búsqueda
      const realizarBusqueda = () => {
        try {
          if (!termino || termino.length < 2) {
            throw new Error('El término de búsqueda debe tener al menos 2 caracteres');
          }

          const resultados = db.productos.filter(p =>
            p.nombre.toLowerCase().includes(termino.toLowerCase())
          );

          resolve(resultados);
        } catch (error) {
          reject(error);
        }
      };

      // Simular tiempo de procesamiento
      const timeoutId = setTimeout(realizarBusqueda, 500);

      // Configurar cancelación
      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timeoutId);
          reject(new Error('Búsqueda cancelada'));
        });
      }
    });
  },

  /**
   * Simula una operación que puede fallar para pruebas de reintento
   * @param {boolean} eventualExito Si es true, eventualmente tendrá éxito después de algunos intentos
   * @param {number} intentosHastaExito Número de intentos antes de tener éxito
   * @returns {Promise<Object>} Resultado o error
   */
  operacionInestable(eventualExito = true, intentosHastaExito = 3) {
    let intentoActual = 0;

    const ejecutar = () => {
      return simularRed(() => {
        intentoActual++;

        if (!eventualExito || intentoActual < intentosHastaExito) {
          throw new Error(`Fallo en intento ${intentoActual}`);
        }

        return {
          exito: true,
          mensaje: `Operación completada después de ${intentoActual} intentos`
        };
      }, true); // Forzar error
    };

    return ejecutar();
  }
};

module.exports = api;

