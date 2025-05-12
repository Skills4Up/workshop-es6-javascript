/**
 * Tests para el mini-proyecto de Sistema de Gestión de Inventario
 */
const { InventorySystem, initialInventory } = require('./start');

// Utilidades para testing
const cloneObject = obj => JSON.parse(JSON.stringify(obj));

describe('Mini-proyecto: Sistema de Gestión de Inventario', () => {
  let inventorySystem;

  beforeEach(() => {
    // Crear una nueva instancia para cada test
    inventorySystem = new InventorySystem();
  });

  describe('Inicialización', () => {
    test('El sistema debe inicializarse con el inventario correcto', () => {
      expect(inventorySystem.products).toBeDefined();
      expect(Array.isArray(inventorySystem.products)).toBe(true);
      expect(inventorySystem.products.length).toBe(initialInventory.length);

      // Verificar que es una copia y no la referencia original
      expect(inventorySystem.products).not.toBe(initialInventory);

      // Verificar que se inicializa el array de notificaciones
      expect(inventorySystem.notifications).toBeDefined();
      expect(Array.isArray(inventorySystem.notifications)).toBe(true);
      expect(inventorySystem.notifications.length).toBe(0);
    });
  });

  describe('Gestión de productos', () => {
    test('addProduct - debe añadir un nuevo producto con valores por defecto', () => {
      const newProduct = inventorySystem.addProduct({
        name: 'Test Product',
        price: 100
      });

      // Verificar propiedades obligatorias
      expect(newProduct.name).toBe('Test Product');
      expect(newProduct.price).toBe(100);

      // Verificar valores por defecto
      expect(newProduct.category).toBe('general');
      expect(newProduct.stock).toBe(0);
      expect(newProduct.minStock).toBe(5);

      // Verificar ID generado
      expect(newProduct.id).toBeDefined();
      expect(newProduct.id.startsWith('P')).toBe(true);

      // Verificar que se añadió al inventario
      expect(inventorySystem.products).toContainEqual(newProduct);
      expect(inventorySystem.products.length).toBe(initialInventory.length + 1);
    });

    test('addProduct - debe respetar los valores proporcionados', () => {
      const productData = {
        id: 'CUSTOM001',
        name: 'Custom Product',
        category: 'custom',
        price: 99.99,
        stock: 10,
        minStock: 2
      };

      const newProduct = inventorySystem.addProduct(productData);

      // Verificar que mantiene todos los valores proporcionados
      expect(newProduct).toEqual(productData);

      // Verificar que se añadió al inventario
      expect(inventorySystem.products).toContainEqual(productData);
    });

    test('updateProduct - debe actualizar un producto existente', () => {
      const productId = 'P001';
      const updateData = {
        name: 'Updated Laptop Pro',
        price: 1299.99
      };

      const updatedProduct = inventorySystem.updateProduct(productId, updateData);

      // Verificar que se actualizaron los campos
      expect(updatedProduct.name).toBe('Updated Laptop Pro');
      expect(updatedProduct.price).toBe(1299.99);

      // Verificar que se mantienen los campos no actualizados
      expect(updatedProduct.category).toBe('electronics');
      expect(updatedProduct.stock).toBe(15);

      // Verificar que se actualizó en el inventario
      const productInInventory = inventorySystem.products.find(p => p.id === productId);
      expect(productInInventory).toEqual(updatedProduct);
    });

    test('updateProduct - debe devolver null si el producto no existe', () => {
      const result = inventorySystem.updateProduct('NONEXISTENT', { name: 'Test' });
      expect(result).toBeNull();
    });
  });

  describe('Procesamiento de pedidos', () => {
    test('processOrder - debe procesar un pedido válido', () => {
      const orderItems = [
        { productId: 'P001', quantity: 2 },
        { productId: 'P003', quantity: 3 }
      ];

      const result = inventorySystem.processOrder(orderItems);

      // Verificar estado exitoso
      expect(result.status).toBe('success');

      // Verificar actualización de stock
      const laptop = inventorySystem.products.find(p => p.id === 'P001');
      const headphones = inventorySystem.products.find(p => p.id === 'P003');

      expect(laptop.stock).toBe(13); // 15 - 2
      expect(headphones.stock).toBe(19); // 22 - 3
    });

    test('processOrder - debe rechazar pedidos con productos inexistentes', () => {
      const orderItems = [
        { productId: 'P001', quantity: 1 },
        { productId: 'NONEXISTENT', quantity: 1 }
      ];

      const result = inventorySystem.processOrder(orderItems);

      // Verificar estado de error
      expect(result.status).toBe('error');

      // Verificar detalles del error
      const errorItem = result.items.find(item => item.productId === 'NONEXISTENT');
      expect(errorItem.status).toBe('error');
      expect(errorItem.message).toContain('no encontrado');

      // Verificar que no se actualizó ningún stock
      const laptop = inventorySystem.products.find(p => p.id === 'P001');
      expect(laptop.stock).toBe(15); // Sin cambios
    });

    test('processOrder - debe rechazar pedidos con stock insuficiente', () => {
      const orderItems = [
        { productId: 'P001', quantity: 20 } // Más de las 15 disponibles
      ];

      const result = inventorySystem.processOrder(orderItems);

      // Verificar estado de error
      expect(result.status).toBe('error');

      // Verificar mensaje de stock insuficiente
      const errorItem = result.items.find(item => item.productId === 'P001');
      expect(errorItem.status).toBe('error');
      expect(errorItem.message).toContain('insuficiente');

      // Verificar que no se actualizó el stock
      const laptop = inventorySystem.products.find(p => p.id === 'P001');
      expect(laptop.stock).toBe(15); // Sin cambios
    });
  });

  describe('Búsqueda y filtrado', () => {
    test('findProducts - debe filtrar por nombre', () => {
      const result = inventorySystem.findProducts({ name: 'laptop' });

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('P001');
    });

    test('findProducts - debe filtrar por categoría', () => {
      const result = inventorySystem.findProducts({ category: 'electronics' });

      expect(result.length).toBe(3);
      expect(result.map(p => p.id)).toEqual(['P001', 'P002', 'P004']);
    });

    test('findProducts - debe filtrar por rango de precio', () => {
      const result = inventorySystem.findProducts({
        minPrice: 100,
        maxPrice: 1000
      });

      expect(result.length).toBe(3);
      expect(result.map(p => p.id)).toEqual(['P002', 'P004', 'P005']);
    });

    test('findProducts - debe filtrar productos sin stock cuando inStock=false', () => {
      // Primero modificamos un producto para que no tenga stock
      inventorySystem.updateStock('P002', 0, true);

      // Buscar todos los productos, incluso sin stock
      const result = inventorySystem.findProducts({ inStock: false });

      expect(result.length).toBe(5);

      // Verificar que con inStock=true se excluye el producto sin stock
      const inStockOnly = inventorySystem.findProducts({ inStock: true });
      expect(inStockOnly.length).toBe(4);
      expect(inStockOnly.find(p => p.id === 'P002')).toBeUndefined();
    });

    test('findProducts - debe combinar múltiples filtros', () => {
      const result = inventorySystem.findProducts({
        category: 'electronics',
        minPrice: 800,
        maxPrice: 1500
      });

      expect(result.length).toBe(2);
      expect(result.map(p => p.id)).toEqual(['P001', 'P002']);
    });
  });

  describe('Informes y notificaciones', () => {
    test('generateLowStockReport - debe identificar productos con stock bajo', () => {
      // Modificar un producto para tener stock bajo
      inventorySystem.updateStock('P004', 1, true); // Stock = 1, minStock = 2

      const report = inventorySystem.generateLowStockReport();

      // Verificar estado y productos
      expect(report.status).toBe('WARNING');
      expect(report.products.length).toBe(1);
      expect(report.products[0].id).toBe('P004');

      // Verificar estadísticas
      expect(report.statistics.count).toBe(1);
      expect(report.statistics.totalValue).toBe(420); // precio * stock
      expect(report.statistics.mostCritical).toBe('Monitor UltraWide');
    });

    test('generateLowStockReport - debe manejar caso sin productos de stock bajo', () => {
      // Asegurar que todos los productos tienen stock adecuado
      inventorySystem.products.forEach(p => {
        inventorySystem.updateStock(p.id, p.minStock + 5, true);
      });

      const report = inventorySystem.generateLowStockReport();

      expect(report.status).toBe('OK');
      expect(report.products.length).toBe(0);
      expect(report.statistics.count).toBe(0);
    });

    test('updateStock - debe generar notificación cuando el stock baja del mínimo', () => {
      const result = inventorySystem.updateStock('P001', 2, true); // Stock = 2, minStock = 3

      // Verificar actualización de stock
      expect(result.product.stock).toBe(2);

      // Verificar notificación
      expect(result.notification).not.toBeNull();
      expect(result.notification.type).toBe('low-stock');
      expect(result.notification.productId).toBe('P001');

      // Verificar que se añadió a las notificaciones
      expect(inventorySystem.notifications.length).toBe(1);
      expect(inventorySystem.notifications[0]).toEqual(result.notification);
    });

    test('updateStock - debe incrementar/decrementar cuando absolute=false', () => {
      // Incrementar stock
      const increment = inventorySystem.updateStock('P001', 5, false);
      expect(increment.product.stock).toBe(20); // 15 + 5

      // Decrementar stock
      const decrement = inventorySystem.updateStock('P001', -8, false);
      expect(decrement.product.stock).toBe(12); // 20 - 8
    });

    test('updateStock - debe prevenir stock negativo', () => {
      const result = inventorySystem.updateStock('P001', -20, false);

      // El stock debe ser 0, no negativo
      expect(result.product.stock).toBe(0);
    });
  });

  describe('Reportes avanzados', () => {
    test('generateInventoryReport - debe generar informe HTML completo', () => {
      const html = inventorySystem.generateInventoryReport();

      // Verificar estructura básica
      expect(html).toContain('<h1>Inventario Completo</h1>');
      expect(html).toContain('<table>');

      // Verificar que incluye todos los productos
      inventorySystem.products.forEach(product => {
        expect(html).toContain(product.name);
        expect(html).toContain(product.id);
      });
    });

    test('generateInventoryReport - debe generar informe de stock bajo', () => {
      // Modificar un producto para tener stock bajo
      inventorySystem.updateStock('P002', 1, true);

      const html = inventorySystem.generateInventoryReport('lowStock');

      // Verificar título específico
      expect(html).toContain('<h1>Productos con Stock Bajo</h1>');

      // Verificar que solo incluye el producto con stock bajo
      expect(html).toContain('Smartphone X');
      expect(html).not.toContain('Laptop Pro');

      // Verificar clase especial para productos con stock bajo
      expect(html).toContain('class="low-stock"');
    });

    test('generateInventoryReport - debe generar informe por categoría', () => {
      const html = inventorySystem.generateInventoryReport('category', { category: 'accessories' });

      // Verificar título específico
      expect(html).toContain('<h1>Productos de categoría: accessories</h1>');

      // Verificar que solo incluye productos de esa categoría
      expect(html).toContain('Auriculares Bluetooth');
      expect(html).toContain('Teclado Mecánico');
      expect(html).not.toContain('Laptop Pro');
    });

    test('getProductsByCategory - debe agrupar productos por categoría', () => {
      const categories = inventorySystem.getProductsByCategory();

      // Verificar categorías
      expect(Object.keys(categories)).toContain('electronics');
      expect(Object.keys(categories)).toContain('accessories');

      // Verificar conteo
      expect(categories.electronics.count).toBe(3);
      expect(categories.accessories.count).toBe(2);

      // Verificar productos
      expect(categories.electronics.products.length).toBe(3);
      expect(categories.accessories.products.length).toBe(2);

      // Verificar valor total
      const electronicsValue = categories.electronics.totalValue;
      expect(electronicsValue).toBeGreaterThan(0);
    });
  });
});
