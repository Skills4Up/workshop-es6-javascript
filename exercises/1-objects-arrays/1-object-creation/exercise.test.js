/**
 * Tests para ejercicios de creación de objetos
 */
const { crearUsuario, crearProductoConConstructor, crearVehiculo } = require('./exercise');

describe('Ejercicios de Creación de Objetos', () => {

  describe('Ejercicio 1: crearUsuario', () => {
    test('debe crear un objeto usuario con todas las propiedades', () => {
      const usuario = crearUsuario('Ana', 'ana@test.com', 25);

      expect(usuario).toHaveProperty('nombre', 'Ana');
      expect(usuario).toHaveProperty('email', 'ana@test.com');
      expect(usuario).toHaveProperty('edad', 25);
      expect(usuario).toHaveProperty('activo', true);
      expect(usuario).toHaveProperty('fechaRegistro');
      expect(usuario).toHaveProperty('id');

      // Verificar que fechaRegistro es una fecha válida
      expect(usuario.fechaRegistro).toBeInstanceOf(Date);

      // Verificar que id está en el rango correcto
      expect(usuario.id).toBeGreaterThanOrEqual(1000);
      expect(usuario.id).toBeLessThanOrEqual(9999);
    });

    test('debe crear usuarios únicos con diferentes IDs', () => {
      const usuario1 = crearUsuario('Carlos', 'carlos@test.com', 30);
      const usuario2 = crearUsuario('Luis', 'luis@test.com', 28);

      expect(usuario1.id).not.toBe(usuario2.id);
    });
  });

  describe('Ejercicio 2: crearProductoConConstructor', () => {
    test('debe crear producto usando constructor Object', () => {
      const producto = crearProductoConConstructor('Laptop', 999);

      expect(producto).toHaveProperty('nombre', 'Laptop');
      expect(producto).toHaveProperty('precio', 999);
      expect(producto).toHaveProperty('categoria', 'general');
      expect(producto).toHaveProperty('disponible', true);
      expect(producto).toHaveProperty('codigo');

      // Verificar formato del código
      expect(producto.codigo).toMatch(/^PROD-\d{3}$/);
    });

    test('debe marcar como no disponible si precio es 0', () => {
      const producto = crearProductoConConstructor('Gratis', 0);
      expect(producto.disponible).toBe(false);
    });

    test('debe usar el constructor Object', () => {
      const fnStr = crearProductoConConstructor.toString();
      expect(fnStr).toMatch(/new\s+Object\s*\(\s*\)/);
    });
  });

  describe('Ejercicio 3: crearVehiculo', () => {
    test('debe crear vehículo que herede del prototipo', () => {
      const vehiculo = crearVehiculo('Toyota', 'Corolla', 2023);

      expect(vehiculo).toHaveProperty('marca', 'Toyota');
      expect(vehiculo).toHaveProperty('modelo', 'Corolla');
      expect(vehiculo).toHaveProperty('anio', 2023);

      // Propiedades heredadas del prototipo
      expect(vehiculo).toHaveProperty('tipo', 'terrestre');
      expect(vehiculo).toHaveProperty('encendido', false);
      expect(vehiculo).toHaveProperty('arrancar');
      expect(vehiculo).toHaveProperty('apagar');
    });

    test('los métodos arrancar y apagar deben funcionar', () => {
      const vehiculo = crearVehiculo('Honda', 'Civic', 2022);

      expect(vehiculo.encendido).toBe(false);

      vehiculo.arrancar();
      expect(vehiculo.encendido).toBe(true);

      vehiculo.apagar();
      expect(vehiculo.encendido).toBe(false);
    });

    test('debe usar Object.create', () => {
      const fnStr = crearVehiculo.toString();
      expect(fnStr).toMatch(/Object\.create\s*\(/);
    });
  });
});
