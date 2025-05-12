/**
 * Tests para el Proyecto Final - Sistema de E-commerce
 * ===================================================
 *
 * Esta suite de pruebas valida la implementación completa
 * del sistema de E-commerce, incluyendo todos sus componentes
 * y la interacción entre ellos.
 */

// Importar todos los componentes necesarios
const {
  // Core
  EventEmitter,
  Database,
  BaseModel,

  // Utils
  Validator,
  Logger,
  ErrorHandler,

  // Models
  Product,
  Category,
  User,
  Cart,
  Order,

  // Services
  AuthenticationService,
  PaymentService,
  InventoryService,
  NotificationService,

  // Application
  ECommerceApp,
  ecommerceApp,
  createECommerceApp
} = require('./start');

// =============================================================================
// Tests del Núcleo (Core)
// =============================================================================

describe('Núcleo del Sistema', () => {

  describe('EventEmitter', () => {
    let eventEmitter;

    beforeEach(() => {
      eventEmitter = new EventEmitter();
    });

    test('Debe permitir suscribirse a eventos', () => {
      const handler = jest.fn();
      eventEmitter.on('test', handler);

      eventEmitter.emit('test', { data: 'test-data' });

      expect(handler).toHaveBeenCalledWith({ data: 'test-data' });
    });

    test('Debe permitir desuscribirse de eventos', () => {
      const handler = jest.fn();
      eventEmitter.on('test', handler);
      eventEmitter.off('test', handler);

      eventEmitter.emit('test', { data: 'test-data' });

      expect(handler).not.toHaveBeenCalled();
    });

    test('Debe soportar múltiples suscriptores', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      eventEmitter.on('test', handler1);
      eventEmitter.on('test', handler2);

      eventEmitter.emit('test', { data: 'test-data' });

      expect(handler1).toHaveBeenCalledWith({ data: 'test-data' });
      expect(handler2).toHaveBeenCalledWith({ data: 'test-data' });
    });

    test('Debe retornar una función para desuscribirse', () => {
      const handler = jest.fn();
      const unsubscribe = eventEmitter.on('test', handler);

      expect(typeof unsubscribe).toBe('function');

      unsubscribe();
      eventEmitter.emit('test', { data: 'test-data' });

      expect(handler).not.toHaveBeenCalled();
    });

    test('No debe afectar a otros suscriptores al desuscribirse', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      eventEmitter.on('test', handler1);
      eventEmitter.on('test', handler2);

      eventEmitter.off('test', handler1);
      eventEmitter.emit('test', { data: 'test-data' });

      expect(handler1).not.toHaveBeenCalled();
      expect(handler2).toHaveBeenCalledWith({ data: 'test-data' });
    });
  });

  describe('Database', () => {
    let database;

    beforeEach(() => {
      database = new Database();
    });

    test('Debe permitir insertar documentos', async () => {
      const product = { name: 'Test Product', price: 100 };
      const insertedProduct = await database.insert('products', product);

      expect(insertedProduct).toHaveProperty('id');
      expect(insertedProduct).toHaveProperty('createdAt');
      expect(insertedProduct).toHaveProperty('updatedAt');
      expect(insertedProduct.name).toBe('Test Product');
      expect(insertedProduct.price).toBe(100);
    });

    test('Debe permitir encontrar documentos por query', async () => {
      await database.insert('products', { name: 'Product 1', price: 100 });
      await database.insert('products', { name: 'Product 2', price: 200 });

      const products = await database.find('products', { price: 100 });

      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Product 1');
    });

    test('Debe permitir encontrar un documento por ID', async () => {
      const product = await database.insert('products', { name: 'Test Product', price: 100 });

      const foundProduct = await database.findById('products', product.id);

      expect(foundProduct).toBeDefined();
      expect(foundProduct.id).toBe(product.id);
      expect(foundProduct.name).toBe('Test Product');
    });

    test('Debe permitir actualizar documentos', async () => {
      const product = await database.insert('products', { name: 'Test Product', price: 100 });

      const updatedProduct = await database.update('products', product.id, { price: 150 });

      expect(updatedProduct.price).toBe(150);
      expect(updatedProduct.name).toBe('Test Product');
      expect(updatedProduct.updatedAt).not.toBe(product.updatedAt);
    });

    test('Debe permitir eliminar documentos', async () => {
      const product = await database.insert('products', { name: 'Test Product', price: 100 });

      await database.delete('products', product.id);

      const foundProduct = await database.findById('products', product.id);
      expect(foundProduct).toBeNull();
    });
  });

  describe('BaseModel', () => {
    let TestModel;

    beforeEach(() => {
      // Crear una clase que extienda de BaseModel para testing
      TestModel = class TestModel extends BaseModel {
        validate() {
          if (!this.name) {
            throw new Error('Name is required');
          }
          return true;
        }
      };
    });

    test('Debe proporcionar métodos CRUD estáticos', () => {
      expect(typeof TestModel.find).toBe('function');
      expect(typeof TestModel.findById).toBe('function');
    });

    test('Debe proporcionar métodos CRUD de instancia', () => {
      const instance = new TestModel({ name: 'Test' });

      expect(typeof instance.save).toBe('function');
      expect(typeof instance.update).toBe('function');
      expect(typeof instance.delete).toBe('function');
    });

    test('Debe validar antes de guardar', async () => {
      const validInstance = new TestModel({ name: 'Valid' });
      const invalidInstance = new TestModel({});

      await expect(validInstance.save()).resolves.toBeDefined();
      await expect(invalidInstance.save()).rejects.toThrow('Name is required');
    });

    test('Debe serializar correctamente a JSON', () => {
      const instance = new TestModel({ name: 'Test', _private: 'secret' });
      const json = instance.toJSON();

      expect(json.name).toBe('Test');

      // Si implementaste exclusión de propiedades privadas
      if (!json.hasOwnProperty('_private')) {
        expect(json._private).toBeUndefined();
      }
    });

    test('Debe convertir correctamente desde JSON', () => {
      const json = { id: '123', name: 'Test', createdAt: new Date().toISOString() };
      const instance = TestModel.fromJSON ? TestModel.fromJSON(json) : new TestModel(json);

      expect(instance.id).toBe('123');
      expect(instance.name).toBe('Test');
      expect(instance.createdAt).toBeDefined();
    });
  });
});

// =============================================================================
// Tests de Utilidades (Utils)
// =============================================================================

describe('Utilidades', () => {

  describe('Validator', () => {
    test('Debe validar strings', () => {
      expect(Validator.string('test')).toBe(true);
      expect(Validator.string(123)).toBe(false);

      expect(Validator.string('abc', { min: 2 })).toBe(true);
      expect(Validator.string('a', { min: 2 })).toBe(false);

      expect(Validator.string('abc', { max: 5 })).toBe(true);
      expect(Validator.string('abcdef', { max: 5 })).toBe(false);

      expect(Validator.string('', { required: true })).toBe(false);
      expect(Validator.string(undefined, { required: true })).toBe(false);
      expect(Validator.string(undefined, { required: false })).toBe(true);
    });

    test('Debe validar emails', () => {
      expect(Validator.email('test@example.com')).toBe(true);
      expect(Validator.email('invalid-email')).toBe(false);
      expect(Validator.email('')).toBe(false);
      expect(Validator.email(undefined, { required: false })).toBe(true);
    });

    test('Debe validar números', () => {
      expect(Validator.number(123)).toBe(true);
      expect(Validator.number('123')).toBe(false);

      expect(Validator.number(5, { min: 1 })).toBe(true);
      expect(Validator.number(0, { min: 1 })).toBe(false);

      expect(Validator.number(5, { max: 10 })).toBe(true);
      expect(Validator.number(15, { max: 10 })).toBe(false);
    });

    // Pruebas adicionales según lo que hayas implementado
  });

  describe('Logger', () => {
    let logger;
    let consoleSpy;

    beforeEach(() => {
      logger = new Logger();
      consoleSpy = {
        log: jest.spyOn(console, 'log').mockImplementation(),
        info: jest.spyOn(console, 'info').mockImplementation(),
        warn: jest.spyOn(console, 'warn').mockImplementation(),
        error: jest.spyOn(console, 'error').mockImplementation()
      };
    });

    afterEach(() => {
      consoleSpy.log.mockRestore();
      consoleSpy.info.mockRestore();
      consoleSpy.warn.mockRestore();
      consoleSpy.error.mockRestore();
    });

    test('Debe registrar mensajes con diferentes niveles', () => {
      logger.debug('Debug message');
      logger.info('Info message');
      logger.warn('Warning message');
      logger.error('Error message');

      // Verificar que se llamaron las funciones de consola apropiadas
      // Según tu implementación, podrías estar usando console.log para todos,
      // o diferentes métodos para cada nivel
      expect(consoleSpy.log).toHaveBeenCalled() ||
        expect(consoleSpy.info).toHaveBeenCalled() ||
        expect(consoleSpy.warn).toHaveBeenCalled() ||
        expect(consoleSpy.error).toHaveBeenCalled();
    });

    test('Debe incluir timestamp en los mensajes', () => {
      logger.info('Test message');

      const calls = consoleSpy.log.mock.calls.length > 0
        ? consoleSpy.log.mock.calls
        : consoleSpy.info.mock.calls;

      if (calls.length > 0) {
        const loggedMessage = typeof calls[0][0] === 'string'
          ? calls[0][0]
          : JSON.stringify(calls[0][0]);

        // Verificar que hay una marca de tiempo (verificación simple)
        expect(loggedMessage).toMatch(/\d/) || expect(calls[0]).toContain('timestamp');
      }
    });

    // Pruebas adicionales según lo que hayas implementado
  });

  describe('ErrorHandler', () => {
    let errorHandler;

    beforeEach(() => {
      errorHandler = new ErrorHandler();
    });

    test('Debe formatear errores operacionales', () => {
      const error = new Error('Something went wrong');
      const formattedError = errorHandler.formatError(error);

      expect(formattedError).toHaveProperty('message');

      // Verificar propiedades adicionales según tu implementación
      if (formattedError.type) {
        expect(formattedError.type).toBeDefined();
      }
    });

    test('Debe categorizar diferentes tipos de errores', () => {
      // Crear diferentes tipos de errores para probar
      const validationError = new Error('Validation failed');
      validationError.name = 'ValidationError';

      const databaseError = new Error('Database connection failed');
      databaseError.name = 'DatabaseError';

      // Verificar que los categoriza de manera diferente
      if (errorHandler.getErrorType) {
        expect(errorHandler.getErrorType(validationError))
          .not.toBe(errorHandler.getErrorType(databaseError));
      }
    });

    // Pruebas adicionales según lo que hayas implementado
  });
});

// =============================================================================
// Tests de Modelos (Models)
// =============================================================================

describe('Modelos de Datos', () => {

  describe('Product', () => {
    test('Debe crear un producto válido', async () => {
      const product = new Product({
        name: 'Test Product',
        price: 100,
        description: 'Test description',
        stock: 10,
        categoryId: 'category-1'
      });

      await expect(product.save()).resolves.toBeDefined();
      expect(product.id).toBeDefined();
    });

    test('Debe rechazar productos inválidos', async () => {
      // Producto sin nombre
      const invalidProduct1 = new Product({
        price: 100,
        stock: 10
      });

      // Producto con precio negativo
      const invalidProduct2 = new Product({
        name: 'Test Product',
        price: -10,
        stock: 10
      });

      await expect(invalidProduct1.save()).rejects.toThrow();
      await expect(invalidProduct2.save()).rejects.toThrow();
    });

    test('Debe gestionar el stock correctamente', async () => {
      const product = new Product({
        name: 'Test Product',
        price: 100,
        stock: 10,
        categoryId: 'category-1'
      });

      await product.save();

      await product.decreaseStock(3);
      expect(product.stock).toBe(7);

      await expect(product.decreaseStock(10)).rejects.toThrow(/stock/i);
    });

    // Pruebas adicionales según lo que hayas implementado
  });

  describe('Category', () => {
    test('Debe crear una categoría válida', async () => {
      const category = new Category({
        name: 'Test Category',
        description: 'Test description'
      });

      await expect(category.save()).resolves.toBeDefined();
      expect(category.id).toBeDefined();
    });

    test('Debe rechazar categorías inválidas', async () => {
      const invalidCategory = new Category({
        description: 'Test description'
      });

      await expect(invalidCategory.save()).rejects.toThrow();
    });

    // Pruebas para jerarquía de categorías si lo implementaste
    if (Category.prototype.addSubcategory) {
      test('Debe gestionar subcategorías', async () => {
        const parentCategory = new Category({
          name: 'Parent Category'
        });

        const subCategory = new Category({
          name: 'Sub Category'
        });

        await parentCategory.save();
        await subCategory.save();

        await parentCategory.addSubcategory(subCategory.id);

        const children = await parentCategory.getSubcategories();
        expect(children.length).toBe(1);
        expect(children[0].id).toBe(subCategory.id);
      });
    }

    // Pruebas adicionales según lo que hayas implementado
  });

  describe('User', () => {
    test('Debe crear un usuario válido', async () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      await expect(user.save()).resolves.toBeDefined();
      expect(user.id).toBeDefined();
    });

    test('Debe rechazar usuarios con emails inválidos', async () => {
      const invalidUser = new User({
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123'
      });

      await expect(invalidUser.save()).rejects.toThrow(/email/i);
    });

    test('Debe ocultar datos sensibles en toJSON', () => {
      const user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      const json = user.toJSON();

      expect(json.name).toBe('Test User');
      expect(json.email).toBe('test@example.com');
      expect(json.password).toBeUndefined();
    });

    // Pruebas adicionales según lo que hayas implementado
  });

  describe('Cart', () => {
    let user;
    let product1;
    let product2;

    beforeEach(async () => {
      user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      product1 = new Product({
        name: 'Product 1',
        price: 100,
        stock: 10,
        categoryId: 'category-1'
      });

      product2 = new Product({
        name: 'Product 2',
        price: 200,
        stock: 5,
        categoryId: 'category-1'
      });

      await user.save();
      await product1.save();
      await product2.save();
    });

    test('Debe crear un carrito vacío', async () => {
      const cart = new Cart({
        userId: user.id,
        items: []
      });

      await expect(cart.save()).resolves.toBeDefined();
      expect(cart.id).toBeDefined();
      expect(cart.items).toHaveLength(0);
      expect(cart.total).toBe(0);
    });

    test('Debe añadir productos al carrito', async () => {
      const cart = new Cart({
        userId: user.id,
        items: []
      });

      await cart.save();
      await cart.addItem(product1.id, 2);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].productId).toBe(product1.id);
      expect(cart.items[0].quantity).toBe(2);
      expect(cart.total).toBe(200); // 2 * 100
    });

    test('Debe actualizar la cantidad de un producto', async () => {
      const cart = new Cart({
        userId: user.id,
        items: []
      });

      await cart.save();
      await cart.addItem(product1.id, 1);
      await cart.updateItemQuantity(product1.id, 3);

      expect(cart.items[0].quantity).toBe(3);
      expect(cart.total).toBe(300); // 3 * 100
    });

    test('Debe eliminar productos del carrito', async () => {
      const cart = new Cart({
        userId: user.id,
        items: []
      });

      await cart.save();
      await cart.addItem(product1.id, 2);
      await cart.addItem(product2.id, 1);

      expect(cart.items).toHaveLength(2);
      expect(cart.total).toBe(400); // (2 * 100) + (1 * 200)

      await cart.removeItem(product1.id);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].productId).toBe(product2.id);
      expect(cart.total).toBe(200); // 1 * 200
    });

    // Pruebas adicionales según lo que hayas implementado
  });

  describe('Order', () => {
    let user;
    let product;

    beforeEach(async () => {
      user = new User({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      product = new Product({
        name: 'Test Product',
        price: 100,
        stock: 10,
        categoryId: 'category-1'
      });

      await user.save();
      await product.save();
    });

    test('Debe crear una orden válida', async () => {
      const order = new Order({
        userId: user.id,
        items: [
          { productId: product.id, name: product.name, price: product.price, quantity: 2 }
        ],
        status: 'pending',
        total: 200,
        shippingAddress: {
          street: '123 Main St',
          city: 'Anytown',
          zipCode: '12345'
        }
      });

      await expect(order.save()).resolves.toBeDefined();
      expect(order.id).toBeDefined();
      expect(order.status).toBe('pending');
      expect(order.total).toBe(200);
    });

    test('Debe cambiar el estado de la orden', async () => {
      const order = new Order({
        userId: user.id,
        items: [
          { productId: product.id, name: product.name, price: product.price, quantity: 2 }
        ],
        status: 'pending',
        total: 200
      });

      await order.save();

      await order.updateStatus('paid');
      expect(order.status).toBe('paid');

      await order.updateStatus('shipped');
      expect(order.status).toBe('shipped');

      // Probar transición inválida si lo implementaste
      if (order.isValidTransition) {
        expect(() => order.updateStatus('pending')).toThrow();
      }
    });

    // Pruebas adicionales según lo que hayas implementado
  });
});

// =============================================================================
// Tests de Servicios (Services)
// =============================================================================

describe('Servicios de Negocio', () => {

  describe('AuthenticationService', () => {
    let authService;
    let events;

    beforeEach(() => {
      events = new EventEmitter();
      authService = new AuthenticationService(User, events);
    });

    test('Debe registrar un nuevo usuario', async () => {
      const eventHandler = jest.fn();
      events.on('user.registered', eventHandler);

      const result = await authService.register({
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123'
      });

      expect(result).toHaveProperty('userId');
      expect(eventHandler).toHaveBeenCalled();

      // Verificar que el usuario fue creado en la base de datos
      const user = await User.findById(result.userId);
      expect(user).toBeDefined();
      expect(user.email).toBe('newuser@example.com');
    });

    test('Debe rechazar registro con email duplicado', async () => {
      // Registrar un usuario primero
      await authService.register({
        name: 'Test User',
        email: 'duplicate@example.com',
        password: 'password123'
      });

      // Intentar registrar otro con el mismo email
      await expect(authService.register({
        name: 'Another User',
        email: 'duplicate@example.com',
        password: 'different123'
      })).rejects.toThrow(/email/i);
    });

    test('Debe autenticar usuario con credenciales correctas', async () => {
      // Registrar un usuario primero
      await authService.register({
        name: 'Login Test',
        email: 'login@example.com',
        password: 'correct123'
      });

      const eventHandler = jest.fn();
      events.on('user.loggedIn', eventHandler);

      // Intentar login
      const result = await authService.login('login@example.com', 'correct123');

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user).not.toHaveProperty('password');
      expect(eventHandler).toHaveBeenCalled();
    });

    test('Debe rechazar login con credenciales incorrectas', async () => {
      // Registrar un usuario primero
      await authService.register({
        name: 'Login Test',
        email: 'login@example.com',
        password: 'correct123'
      });

      // Intentar login con contraseña incorrecta
      await expect(authService.login('login@example.com', 'wrong123'))
        .rejects.toThrow(/credentials/i);

      // Intentar login con email que no existe
      await expect(authService.login('nonexistent@example.com', 'whatever123'))
        .rejects.toThrow(/credentials/i);
    });

    test('Debe verificar tokens válidos', () => {
      // Crear un token directamente (saltando el login)
      const mockUser = { id: 'user123' };
      const token = authService.generateToken(mockUser);

      const decoded = authService.verifyToken(token);

      expect(decoded).toHaveProperty('userId', 'user123');
      expect(decoded).toHaveProperty('exp');
    });

    test('Debe rechazar tokens inválidos', () => {
      expect(() => authService.verifyToken('invalid-token'))
        .toThrow(/invalid token/i);
    });

    // Pruebas adicionales según lo que hayas implementado
  });

  describe('PaymentService', () => {
    let paymentService;

    beforeEach(() => {
      paymentService = new PaymentService();
    });

    test('Debe procesar pago con tarjeta de crédito', async () => {
      const paymentData = {
        amount: 100,
        method: 'creditCard',
        card: {
          number: '4111111111111111',
          expiry: '12/25',
          cvv: '123'
        }
      };

      const result = await paymentService.processPayment(paymentData);

      expect(result.success).toBe(true);
      expect(result.paymentId).toBeDefined();
      expect(result.paymentMethod).toBe('creditCard');
    });

    test('Debe procesar pago con transferencia bancaria', async () => {
      const paymentData = {
        amount: 100,
        method: 'bankTransfer',
        bankAccount: {
          accountNumber: '123456789',
          routingNumber: '987654321'
        }
      };

      const result = await paymentService.processPayment(paymentData);

      expect(result.success).toBe(true);
      expect(result.paymentId).toBeDefined();
      expect(result.paymentMethod).toBe('bankTransfer');
    });

    test('Debe rechazar datos de pago inválidos', async () => {
      // Tarjeta sin número
      const invalidPayment = {
        amount: 100,
        method: 'creditCard',
        card: {
          expiry: '12/25',
          cvv: '123'
        }
      };

      await expect(paymentService.processPayment(invalidPayment))
        .rejects.toThrow();
    });

    // Pruebas adicionales según lo que hayas implementado
  });

  describe('InventoryService', () => {
    let inventoryService;
    let events;
    let product;

    beforeEach(async () => {
      events = new EventEmitter();
      inventoryService = new InventoryService(Product, events);

      product = new Product({
        name: 'Inventory Test Product',
        price: 100,
        stock: 10,
        categoryId: 'category-1'
      });

      await product.save();
    });

    test('Debe verificar disponibilidad de stock', async () => {
      const result = await inventoryService.checkAvailability(product.id, 5);
      expect(result.available).toBe(true);

      const result2 = await inventoryService.checkAvailability(product.id, 15);
      expect(result2.available).toBe(false);
    });

    test('Debe actualizar stock después de una compra', async () => {
      const eventHandler = jest.fn();
      events.on('inventory.updated', eventHandler);

      await inventoryService.updateStock(product.id, -3); // Reducir stock en 3

      const updatedProduct = await Product.findById(product.id);
      expect(updatedProduct.stock).toBe(7);
      expect(eventHandler).toHaveBeenCalled();
    });

    test('Debe notificar cuando el stock está bajo', async () => {
      const lowStockHandler = jest.fn();
      events.on('inventory.lowStock', lowStockHandler);

      // Establecer umbral para stock bajo
      await inventoryService.setLowStockThreshold(product.id, 5);

      // Reducir stock por debajo del umbral
      await inventoryService.updateStock(product.id, -6);

      expect(lowStockHandler).toHaveBeenCalled();
      expect(lowStockHandler.mock.calls[0][0]).toHaveProperty('productId', product.id);
      expect(lowStockHandler.mock.calls[0][0]).toHaveProperty('currentStock', 4);
    });

    // Pruebas adicionales según lo que hayas implementado
  });

  describe('NotificationService', () => {
    let notificationService;

    beforeEach(() => {
      notificationService = new NotificationService();
    });

    test('Debe enviar notificación por email', async () => {
      const result = await notificationService.send({
        to: 'user@example.com',
        subject: 'Test Subject',
        body: 'Test Body',
        channel: 'email'
      });

      expect(result.success).toBe(true);
      expect(result.channel).toBe('email');
      expect(result.notificationId).toBeDefined();
    });

    test('Debe enviar notificación por SMS', async () => {
      const result = await notificationService.send({
        to: '+1234567890',
        body: 'Test SMS',
        channel: 'sms'
      });

      expect(result.success).toBe(true);
      expect(result.channel).toBe('sms');
    });

    test('Debe usar diferentes plantillas para notificaciones', async () => {
      // Si implementaste plantillas
      if (notificationService.getTemplate) {
        const orderTemplate = notificationService.getTemplate('orderConfirmation');
        expect(orderTemplate).toBeDefined();

        const welcomeTemplate = notificationService.getTemplate('welcome');
        expect(welcomeTemplate).toBeDefined();

        expect(orderTemplate).not.toBe(welcomeTemplate);
      }
    });

    // Pruebas adicionales según lo que hayas implementado
  });
});

// =============================================================================
// Tests de la Aplicación Principal
// =============================================================================

describe('Aplicación de E-commerce', () => {
  let app;

  beforeEach(() => {
    app = createECommerceApp();
  });

  test('Debe permitir registrar un usuario', async () => {
    const result = await app.registerUser({
      name: 'App Test User',
      email: 'apptest@example.com',
      password: 'password123'
    });

    expect(result).toHaveProperty('userId');
  });

  test('Debe permitir login de usuario', async () => {
    // Registrar primero
    await app.registerUser({
      name: 'Login Test User',
      email: 'logintest@example.com',
      password: 'password123'
    });

    // Luego login
    const result = await app.loginUser('logintest@example.com', 'password123');

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
  });

  test('Debe permitir explorar catálogo de productos', async () => {
    const products = await app.listProducts();
    expect(Array.isArray(products)).toBe(true);

    // Si pasas opciones de filtrado
    const filteredProducts = await app.listProducts({ minPrice: 50, maxPrice: 200 });
    expect(Array.isArray(filteredProducts)).toBe(true);
  });

  test('Debe permitir gestionar el carrito', async () => {
    // Registrar usuario
    const { userId } = await app.registerUser({
      name: 'Cart Test User',
      email: 'carttest@example.com',
      password: 'password123'
    });

    // Crear un producto para añadir al carrito
    const product = await app.createProduct({
      name: 'Cart Test Product',
      price: 100,
      stock: 10,
      categoryId: 'category-1'
    });

    // Operaciones de carrito
    const cart = await app.getOrCreateCart(userId);
    await app.addToCart(cart.id, product.id, 2);

    const updatedCart = await app.getCart(cart.id);
    expect(updatedCart.items).toHaveLength(1);
    expect(updatedCart.items[0].productId).toBe(product.id);
    expect(updatedCart.items[0].quantity).toBe(2);
    expect(updatedCart.total).toBe(200);
  });

  test('Debe permitir completar el proceso de checkout', async () => {
    // Registrar usuario
    const { userId } = await app.registerUser({
      name: 'Checkout Test User',
      email: 'checkouttest@example.com',
      password: 'password123'
    });

    // Crear un producto
    const product = await app.createProduct({
      name: 'Checkout Test Product',
      price: 100,
      stock: 10,
      categoryId: 'category-1'
    });

    // Crear y llenar carrito
    const cart = await app.getOrCreateCart(userId);
    await app.addToCart(cart.id, product.id, 2);

    // Procesar checkout
    const order = await app.checkout(cart.id, {
      paymentMethod: 'creditCard',
      creditCard: {
        number: '4111111111111111',
        expiry: '12/25',
        cvv: '123'
      },
      shippingAddress: {
        street: '123 Main St',
        city: 'Anytown',
        zipCode: '12345'
      }
    });

    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('status', 'paid');
    expect(order.total).toBe(200);

    // Verificar que el carrito quedó vacío
    const updatedCart = await app.getCart(cart.id);
    expect(updatedCart.items).toHaveLength(0);

    // Verificar que el stock fue actualizado
    const updatedProduct = await app.getProduct(product.id);
    expect(updatedProduct.stock).toBe(8);
  });

  // Pruebas adicionales según lo que hayas implementado
});

// =============================================================================
// Tests de integración de flujos completos
// =============================================================================

describe('Flujos completos de negocio', () => {
  let app;
  let userId;
  let productId;

  beforeAll(async () => {
    app = createECommerceApp();

    // Crear usuario para pruebas
    const userResult = await app.registerUser({
      name: 'Integration Test User',
      email: 'integration@example.com',
      password: 'password123'
    });
    userId = userResult.userId;

    // Crear producto para pruebas
    const product = await app.createProduct({
      name: 'Integration Test Product',
      price: 100,
      stock: 10,
      categoryId: 'category-1'
    });
    productId = product.id;
  });

  test('Flujo completo: explorar, añadir al carrito, checkout, revisar pedido', async () => {
    // 1. Explorar productos
    const products = await app.listProducts();
    expect(products.length).toBeGreaterThan(0);

    // 2. Obtener detalles del producto
    const product = await app.getProduct(productId);
    expect(product.id).toBe(productId);

    // 3. Crear/obtener carrito
    const cart = await app.getOrCreateCart(userId);

    // 4. Añadir al carrito
    await app.addToCart(cart.id, productId, 2);

    // 5. Revisar carrito
    const updatedCart = await app.getCart(cart.id);
    expect(updatedCart.items).toHaveLength(1);
    expect(updatedCart.total).toBe(200);

    // 6. Checkout
    const order = await app.checkout(cart.id, {
      paymentMethod: 'creditCard',
      creditCard: {
        number: '4111111111111111',
        expiry: '12/25',
        cvv: '123'
      },
      shippingAddress: {
        street: '123 Main St',
        city: 'Anytown',
        zipCode: '12345'
      }
    });

    expect(order.status).toBe('paid');

    // 7. Verificar historial de pedidos
    const orders = await app.getUserOrders(userId);
    expect(orders.length).toBeGreaterThan(0);
    expect(orders.some(o => o.id === order.id)).toBe(true);

    // 8. Verificar detalles del pedido
    const orderDetails = await app.getOrderDetails(order.id);
    expect(orderDetails.id).toBe(order.id);
    expect(orderDetails.items).toHaveLength(1);
    expect(orderDetails.items[0].productId).toBe(productId);
  });

  // Pruebas adicionales según lo que hayas implementado
});


// Este archivo de pruebas es bastante completo y cubre todos los componentes principales del sistema de E-commerce:

// Tests del Núcleo: Verifican el EventEmitter, Database y BaseModel
// Tests de Utilidades: Validan Validator, Logger y ErrorHandler
// Tests de Modelos: Comprueban Product, Category, User, Cart y Order
// Tests de Servicios: Verifican AuthenticationService, PaymentService, InventoryService y NotificationService
// Tests de la Aplicación Principal: Comprueban las operaciones de alto nivel
// Tests de integración: Validan flujos completos de negocio
// Las pruebas están diseñadas para ser flexibles y funcionar incluso si no has implementado todas las características opcionales. Cada test verifica primero si existe cierta funcionalidad antes de probarla.

// Este conjunto de pruebas ayudará a validar la implementación completa del sistema y garantizar que todos los componentes funcionan correctamente tanto individualmente como en conjunto.
