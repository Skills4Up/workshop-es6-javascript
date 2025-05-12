/**
 * Tests para los ejercicios de Async ES6+
 */
const {
  cargarDatos,
  obtenerProductoConPromise,
  obtenerProductoConAsync,
  obtenerVariosProductos,
  verificarYComprar,
  conTimeout,
  conReintentos,
  obtenerProductosConResultado,
  procesarEnSerie,
  operacionCancelable
} = require('./start');

// API simulada para pruebas
const api = require('./helpers/api');

// Mock para setTimeout para pruebas de timing
jest.useFakeTimers();

describe('2.2 Programación Asíncrona Moderna', () => {

  test('Ejercicio 1: Creación de Promises', async () => {
    // Caso de éxito
    const promesaExito = cargarDatos({ id: 1, nombre: 'Test' }, 500);
    expect(promesaExito).toBeInstanceOf(Promise);

    // Avanzar temporizadores para que se resuelva
    jest.advanceTimersByTime(500);
    const resultado = await promesaExito;
    expect(resultado).toEqual({ id: 1, nombre: 'Test' });

    // Caso de error
    const promesaError = cargarDatos(null, 500);
    expect(promesaError).toBeInstanceOf(Promise);

    // Avanzar temporizadores
    jest.advanceTimersByTime(500);
    await expect(promesaError).rejects.toThrow();
  });

  test('Ejercicio 2: Consumo de Promises', async () => {
    // Mock api.obtenerProducto
    const originalObtenerProducto = api.obtenerProducto;
    api.obtenerProducto = jest.fn().mockImplementation((id) => {
      if (id === 1) {
        return Promise.resolve({ id: 1, nombre: 'laptop test', precio: 1000 });
      } else {
        return Promise.reject(new Error('Producto no encontrado'));
      }
    });

    // Caso de éxito
    const resultado = await obtenerProductoConPromise(1);
    expect(resultado.nombre).toBe('LAPTOP TEST'); // Transformación a mayúsculas
    expect(api.obtenerProducto).toHaveBeenCalledWith(1);

    // Caso de error
    await expect(obtenerProductoConPromise(999)).rejects.toThrow();

    // Restaurar implementación original
    api.obtenerProducto = originalObtenerProducto;
  });

  test('Ejercicio 3: Async/Await', async () => {
    // Mock api.obtenerProducto
    const originalObtenerProducto = api.obtenerProducto;
    api.obtenerProducto = jest.fn().mockImplementation((id) => {
      if (id === 1) {
        return Promise.resolve({ id: 1, nombre: 'laptop test', precio: 1000 });
      } else {
        return Promise.reject(new Error('Producto no encontrado'));
      }
    });

    // Caso de éxito
    const resultado = await obtenerProductoConAsync(1);
    expect(resultado.nombre).toBe('LAPTOP TEST'); // Debe hacer la misma transformación
    expect(api.obtenerProducto).toHaveBeenCalledWith(1);

    // Caso de error
    await expect(obtenerProductoConAsync(999)).rejects.toThrow();

    // Restaurar implementación original
    api.obtenerProducto = originalObtenerProducto;
  });

  test('Ejercicio 4: Operaciones Paralelas', async () => {
    // Mock api.obtenerProducto
    const originalObtenerProducto = api.obtenerProducto;
    api.obtenerProducto = jest.fn().mockImplementation((id) => {
      if (id <= 3) {
        return Promise.resolve({ id, nombre: `Producto ${id}`, precio: id * 100 });
      } else {
        return Promise.reject(new Error(`Producto ${id} no encontrado`));
      }
    });

    // Caso de éxito con múltiples IDs
    const resultados = await obtenerVariosProductos([1, 2, 3]);
    expect(resultados.length).toBe(3);
    expect(resultados[0].id).toBe(1);
    expect(resultados[1].id).toBe(2);
    expect(resultados[2].id).toBe(3);

    // Verificar que se llamó a la API correctamente
    expect(api.obtenerProducto).toHaveBeenCalledTimes(3);
    expect(api.obtenerProducto).toHaveBeenCalledWith(1);
    expect(api.obtenerProducto).toHaveBeenCalledWith(2);
    expect(api.obtenerProducto).toHaveBeenCalledWith(3);

    // Caso con un ID que falla
    await expect(obtenerVariosProductos([1, 4, 3])).rejects.toThrow();

    // Restaurar implementación original
    api.obtenerProducto = originalObtenerProducto;
  });

  test('Ejercicio 5: Operaciones Secuenciales', async () => {
    // Mock de las funciones de API
    const originalVerificar = api.verificarDisponibilidad;
    const originalComprar = api.procesarCompra;

    api.verificarDisponibilidad = jest.fn().mockImplementation((id, cantidad) => {
      if (id === 1 && cantidad <= 5) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });

    api.procesarCompra = jest.fn().mockImplementation((id, cantidad) => {
      if (id === 1 && cantidad <= 5) {
        return Promise.resolve({
          pedidoId: 12345,
          mensaje: 'Compra procesada con éxito',
          total: cantidad * 1000
        });
      } else {
        return Promise.reject(new Error('Error al procesar compra'));
      }
    });

    // Caso de éxito
    const resultado = await verificarYComprar(1, 3);
    expect(resultado.pedidoId).toBe(12345);
    expect(resultado.total).toBe(3000);

    // Verificar orden de llamadas
    expect(api.verificarDisponibilidad).toHaveBeenCalledWith(1, 3);
    expect(api.procesarCompra).toHaveBeenCalledWith(1, 3);
    expect(api.verificarDisponibilidad.mock.invocationCallOrder[0])
      .toBeLessThan(api.procesarCompra.mock.invocationCallOrder[0]);

    // Caso donde no hay disponibilidad
    await expect(verificarYComprar(1, 10)).rejects.toThrow();
    expect(api.procesarCompra).not.toHaveBeenCalledWith(1, 10);

    // Restaurar implementaciones originales
    api.verificarDisponibilidad = originalVerificar;
    api.procesarCompra = originalComprar;
  });

  test('Ejercicio 6: Control de Tiempo de Espera', async () => {
    // Crear una promesa lenta y una rápida para probar
    const promesaLenta = new Promise(resolve => setTimeout(() => resolve('resultado'), 2000));
    const promesaRapida = Promise.resolve('éxito rápido');

    // Probar timeout en promesa lenta
    const conTimeoutLenta = conTimeout(promesaLenta, 1000);
    jest.advanceTimersByTime(1001);
    await expect(conTimeoutLenta).rejects.toThrow('Timeout');

    // Probar promesa rápida que debe resolverse antes del timeout
    const conTimeoutRapida = conTimeout(promesaRapida, 1000);
    const resultado = await conTimeoutRapida;
    expect(resultado).toBe('éxito rápido');
  });

  test('Ejercicio 7: Reintentos Automáticos', async () => {
    // Crear una función que falla los primeros N intentos
    let intentos = 0;
    const operacionQueFalla = jest.fn().mockImplementation(() => {
      intentos++;
      if (intentos <= 2) {
        return Promise.reject(new Error(`Fallo intento ${intentos}`));
      } else {
        return Promise.resolve('Éxito en intento ' + intentos);
      }
    });

    // Probar reintentos con éxito en tercer intento
    const resultado = conReintentos(operacionQueFalla, 3, 500);

    // Avanzar tiempo para el primer reintento
    jest.advanceTimersByTime(500);
    // Avanzar tiempo para el segundo reintento
    jest.advanceTimersByTime(500);

    const valorFinal = await resultado;
    expect(valorFinal).toBe('Éxito en intento 3');
    expect(operacionQueFalla).toHaveBeenCalledTimes(3);

    // Reiniciar para la siguiente prueba
    intentos = 0;
    operacionQueFalla.mockClear();

    // Probar reintentos que agotan el máximo de intentos
    const resultadoConFallo = conReintentos(operacionQueFalla, 2, 500);

    // Avanzar tiempo para el primer reintento
    jest.advanceTimersByTime(500);

    await expect(resultadoConFallo).rejects.toThrow('Fallo intento 2');
    expect(operacionQueFalla).toHaveBeenCalledTimes(2);
  });

  test('Ejercicio 8: Promise.allSettled', async () => {
    // Mock api.obtenerProducto
    const originalObtenerProducto = api.obtenerProducto;
    api.obtenerProducto = jest.fn().mockImplementation((id) => {
      if (id % 2 === 0) {
        return Promise.resolve({ id, nombre: `Producto ${id}`, precio: id * 100 });
      } else {
        return Promise.reject(new Error(`Producto ${id} no encontrado`));
      }
    });

    // Probar con una mezcla de éxitos y fallos
    const resultado = await obtenerProductosConResultado([1, 2, 3, 4]);

    // Verificar estructura del resultado
    expect(resultado).toHaveProperty('exitosos');
    expect(resultado).toHaveProperty('fallidos');

    // Verificar productos exitosos
    expect(resultado.exitosos.length).toBe(2);
    expect(resultado.exitosos[0].id).toBe(2);
    expect(resultado.exitosos[1].id).toBe(4);

    // Verificar productos fallidos
    expect(resultado.fallidos.length).toBe(2);
    expect(resultado.fallidos[0].id).toBe(1);
    expect(resultado.fallidos[1].id).toBe(3);
    expect(resultado.fallidos[0].error).toBeDefined();

    // Restaurar implementación original
    api.obtenerProducto = originalObtenerProducto;
  });

  test('Ejercicio 9: Procesamiento en Serie', async () => {
    // Crear una función procesadora que devuelve una promesa
    const procesadora = jest.fn().mockImplementation((n) => {
      return new Promise(resolve => {
        setTimeout(() => resolve(n * 2), 100);
      });
    });

    // Probar procesamiento en serie
    const resultado = procesarEnSerie([1, 2, 3], procesadora);

    // Avanzar tiempo para cada elemento
    jest.advanceTimersByTime(100);
    jest.advanceTimersByTime(100);
    jest.advanceTimersByTime(100);

    const valorFinal = await resultado;
    expect(valorFinal).toEqual([2, 4, 6]);

    // Verificar que se procesaron en orden
    expect(procesadora.mock.calls[0][0]).toBe(1);
    expect(procesadora.mock.calls[1][0]).toBe(2);
    expect(procesadora.mock.calls[2][0]).toBe(3);
  });

  test('Ejercicio 10: Cancelación de Operaciones', async () => {
    // Mock para función cancelable
    const mockOperacion = jest.fn().mockImplementation((signal) => {
      return new Promise((resolve, reject) => {
        // Manejar señal de aborto
        if (signal && signal.aborted) {
          return reject(new Error('Operación cancelada'));
        }

        const timeoutId = setTimeout(() => resolve('Resultado'), 1000);

        if (signal) {
          signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            reject(new Error('Operación cancelada'));
          });
        }
      });
    });

    // Probar operación completada
    const { promesa, cancelar } = operacionCancelable(mockOperacion);
    jest.advanceTimersByTime(1000);
    const resultado = await promesa;
    expect(resultado).toBe('Resultado');

    // Probar operación cancelada
    const op2 = operacionCancelable(mockOperacion);
    // Cancelar antes de que complete
    setTimeout(() => op2.cancelar(), 500);
    jest.advanceTimersByTime(500);

    await expect(op2.promesa).rejects.toThrow('cancelada');
  });
});
