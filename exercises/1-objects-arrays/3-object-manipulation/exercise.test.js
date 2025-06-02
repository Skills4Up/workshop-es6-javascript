/**
 * Tests para ejercicios de manipulación de objetos
 */
const { combinarPerfil, analizarInventario, crearConfiguracionInmutable } = require('./exercise');

describe('Ejercicios de Manipulación de Objetos', () => {

  describe('Ejercicio 1: combinarPerfil', () => {
    test('debe combinar objetos correctamente', () => {
      const perfilBase = { nombre: 'Ana', edad: 25, activo: true };
      const preferencias = { tema: 'oscuro', idioma: 'es', activo: false };
      const configuracion = { notificaciones: true, idioma: 'en' };

      const resultado = combinarPerfil(perfilBase, preferencias, configuracion);

      expect(resultado.nombre).toBe('Ana');
      expect(resultado.edad).toBe(25);
      expect(resultado.tema).toBe('oscuro');
      expect(resultado.idioma).toBe('en'); // configuracion tiene prioridad
      expect(resultado.activo).toBe(false); // preferencias sobre perfilBase
      expect(resultado.notificaciones).toBe(true);
      expect(resultado.ultimaActualizacion).toBeInstanceOf(Date);
    });

    test('no debe mutar objetos originales', () => {
      const perfilBase = { nombre: 'Luis' };
      const preferencias = { tema: 'claro' };
      const configuracion = { activo: true };

      const original = { ...perfilBase };
      combinarPerfil(perfilBase, preferencias, configuracion);

      expect(perfilBase).toEqual(original);
    });
  });

  describe('Ejercicio 2: analizarInventario', () => {
    test('debe analizar inventario correctamente', () => {
      const inventario = {
        laptops: 15,
        mouses: 30,
        teclados: 0,
        monitores: 8,
        cables: 50
      };

      const analisis = analizarInventario(inventario);

      expect(analisis.totalProductos).toBe(5);
      expect(analisis.stockTotal).toBe(103);
      expect(analisis.productoMayorStock).toBe('cables');
      expect(analisis.productoMenorStock).toBe('teclados');
      expect(analisis.promedioStock).toBe(20.6);
      expect(analisis.productosAgotados).toEqual(['teclados']);
    });

    test('debe manejar inventario vacío', () => {
      const inventario = {};
      const analisis = analizarInventario(inventario);

      expect(analisis.totalProductos).toBe(0);
      expect(analisis.stockTotal).toBe(0);
      expect(analisis.productosAgotados).toEqual([]);
    });
  });

  describe('Ejercicio 3: crearConfiguracionInmutable', () => {
    test('debe crear configuración inmutable', () => {
      const config = { api: 'https://api.com', timeout: 5000, debug: false };
      const configInmutable = crearConfiguracionInmutable(config);

      expect(configInmutable.obtener('api')).toBe('https://api.com');
      expect(configInmutable.existe('timeout')).toBe(true);
      expect(configInmutable.existe('inexistente')).toBe(false);
      expect(configInmutable.claves()).toEqual(['api', 'timeout', 'debug']);

      const copia = configInmutable.toObject();
      expect(copia).toEqual(config);
      expect(copia).not.toBe(config); // Debe ser copia, no referencia
    });

    test('configuración debe ser inmutable', () => {
      const config = { valor: 100 };
      const configInmutable = crearConfiguracionInmutable(config);

      expect(() => {
        config.valor = 200; // Esto debería fallar o no afectar
      }).not.toThrow();

      expect(Object.isFrozen(config)).toBe(true);
    });
  });
});
