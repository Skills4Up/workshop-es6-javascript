/**
 * Tests para ejercicios de Enhanced Object Literals
 */
const { crearLibro, crearConfiguracion, crearCalculadora } = require('./exercise');

describe('Ejercicios de Enhanced Object Literals', () => {

  describe('Ejercicio 1: Property Shorthand - crearLibro', () => {
    test('debe crear libro con todas las propiedades', () => {
      const libro = crearLibro('1984', 'George Orwell', 328, true);

      expect(libro).toHaveProperty('titulo', '1984');
      expect(libro).toHaveProperty('autor', 'George Orwell');
      expect(libro).toHaveProperty('paginas', 328);
      expect(libro).toHaveProperty('disponible', true);
      expect(libro).toHaveProperty('isbn');
      expect(libro).toHaveProperty('fechaPublicacion');

      expect(libro.isbn).toMatch(/^ISBN-/);
      expect(libro.fechaPublicacion).toBeInstanceOf(Date);
    });

    test('debe usar property shorthand syntax', () => {
      const fnStr = crearLibro.toString();

      // Verificar que NO usa la sintaxis larga
      expect(fnStr).not.toMatch(/titulo\s*:\s*titulo/);
      expect(fnStr).not.toMatch(/autor\s*:\s*autor/);
      expect(fnStr).not.toMatch(/paginas\s*:\s*paginas/);
      expect(fnStr).not.toMatch(/disponible\s*:\s*disponible/);

      // Verificar que las propiedades están presentes (sintaxis corta)
      expect(fnStr).toMatch(/{\s*[\s\S]*titulo[\s,]/);
      expect(fnStr).toMatch(/autor[\s,]/);
      expect(fnStr).toMatch(/paginas[\s,]/);
      expect(fnStr).toMatch(/disponible[\s,]/);
    });
  });

  describe('Ejercicio 2: Computed Property Names - crearConfiguracion', () => {
    test('debe crear configuración con propiedades computadas', () => {
      const config = crearConfiguracion('development', 'api', { timeout: 5000 });

      expect(config).toHaveProperty('development_url');
      expect(config).toHaveProperty('api_config');
      expect(config).toHaveProperty('development_api_active');
      expect(config).toHaveProperty('version');
      expect(config).toHaveProperty('timestamp');

      expect(config.development_url).toBe('http://localhost:3000');
      expect(config.api_config).toEqual({ timeout: 5000 });
    });

    test('debe funcionar con diferentes entornos', () => {
      const configProd = crearConfiguracion('production', 'auth', { secure: true });

      expect(configProd).toHaveProperty('production_url', 'https://app.com');
      expect(configProd).toHaveProperty('auth_config', { secure: true });
      expect(configProd).toHaveProperty('production_auth_active');
    });

    test('debe usar computed property names', () => {
      const fnStr = crearConfiguracion.toString();
      expect(fnStr).toMatch(/\[\s*`?\$\{.*\}`?\s*\]/);
    });
  });

  describe('Ejercicio 3: Method Shorthand - crearCalculadora', () => {
    test('debe crear calculadora con valor inicial', () => {
      const calc = crearCalculadora(10);

      expect(calc.obtenerValor()).toBe(10);
      expect(calc).toHaveProperty('valorInicial', 10);
      expect(calc).toHaveProperty('version');
    });

    test('operaciones matemáticas deben funcionar correctamente', () => {
      const calc = crearCalculadora(0);

      calc.sumar(5);
      expect(calc.obtenerValor()).toBe(5);

      calc.multiplicar(3);
      expect(calc.obtenerValor()).toBe(15);

      calc.restar(5);
      expect(calc.obtenerValor()).toBe(10);

      calc.dividir(2);
      expect(calc.obtenerValor()).toBe(5);
    });

    test('debe manejar división por cero', () => {
      const calc = crearCalculadora(10);

      expect(() => calc.dividir(0)).toThrow();
      expect(calc.obtenerValor()).toBe(10); // Valor no debe cambiar
    });

    test('reset debe volver al valor inicial', () => {
      const calc = crearCalculadora(100);

      calc.sumar(50);
      calc.multiplicar(2);
      expect(calc.obtenerValor()).toBe(300);

      calc.reset();
      expect(calc.obtenerValor()).toBe(100);
    });

    test('debe llevar historial de operaciones', () => {
      const calc = crearCalculadora(0);

      calc.sumar(10);
      calc.multiplicar(2);
      calc.restar(5);

      const historial = calc.obtenerHistorial();
      expect(historial).toHaveLength(3);
      expect(historial).toEqual([
        'sumar(10)',
        'multiplicar(2)',
        'restar(5)'
      ]);
    });

    test('debe usar method shorthand syntax', () => {
      const fnStr = crearCalculadora.toString();

      // Verificar que NO usa la sintaxis larga function
      expect(fnStr).not.toMatch(/:\s*function\s*\(/);

      // Verificar que usa sintaxis concisa de métodos
      expect(fnStr).toMatch(/sumar\s*\(/);
      expect(fnStr).toMatch(/restar\s*\(/);
      expect(fnStr).toMatch(/multiplicar\s*\(/);
      expect(fnStr).toMatch(/dividir\s*\(/);
    });
  });
});
