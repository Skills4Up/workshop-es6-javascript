# 💡 Pistas para el Proyecto Final de E-commerce

Este documento proporciona guías estratégicas para implementar los componentes clave del sistema E-commerce. Consulta estas pistas si te encuentras atascado en partes específicas.

## 🧩 Estrategia de implementación recomendada

Para atacar este proyecto de manera efectiva, se recomienda seguir este orden:

1. Primero implementa los componentes del núcleo (`EventEmitter`, `Database`, `BaseModel`)
2. Continúa con las utilidades (`Validator`, `Logger`, `ErrorHandler`)
3. Implementa los modelos de datos básicos
4. Desarrolla los servicios de negocio
5. Finalmente, integra todo en la aplicación principal

## 📊 Núcleo del Sistema (Core)

### EventEmitter

El patrón Observer es fundamental para desacoplar componentes:

```javascript
export class EventEmitter {
  #handlers = new Map();
  
  on(event, handler) {
    if (!this.#handlers.has(event)) {
      this.#handlers.set(event, new Set());
    }
    this.#handlers.get(event).add(handler);
    return () => this.off(event, handler); // Retornar función para desuscribirse
  }
  
  off(event, handler) {
    if (this.#handlers.has(event)) {
      this.#handlers.get(event).delete(handler);
    }
  }
  
  emit(event, data) {
    if (this.#handlers.has(event)) {
      for (const handler of this.#handlers.get(event)) {
        handler(data);
      }
    }
    
    // Soporte para wildcards (opcional)
    if (this.#handlers.has('*')) {
      for (const handler of this.#handlers.get('*')) {
        handler({ event, data });
      }
    }
  }
}
```

### Database

Para simular una base de datos asíncrona:

```javascript
export class Database {
  #collections = new Map();
  #delay = 100; // Simular latencia
  
  async find(collection, query = {}) {
    await this.#simulateDelay();
    
    if (!this.#collections.has(collection)) {
      return [];
    }
    
    const items = this.#collections.get(collection);
    
    // Filtrar según la query
    return items.filter(item => {
      return Object.entries(query).every(([key, value]) => {
        return item[key] === value;
      });
    });
  }
  
  async findById(collection, id) {
    await this.#simulateDelay();
    
    if (!this.#collections.has(collection)) {
      return null;
    }
    
    return this.#collections.get(collection).find(item => item.id === id) || null;
  }
  
  async insert(collection, data) {
    await this.#simulateDelay();
    
    if (!this.#collections.has(collection)) {
      this.#collections.set(collection, []);
    }
    
    const id = data.id || this.#generateId();
    const timestamp = new Date().toISOString();
    
    const item = { 
      ...data, 
      id, 
      createdAt: data.createdAt || timestamp,
      updatedAt: timestamp
    };
    
    this.#collections.get(collection).push(item);
    return item;
  }
  
  // Implementar update, delete y otros métodos...
  
  #simulateDelay() {
    return new Promise(resolve => setTimeout(resolve, this.#delay));
  }
  
  #generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}
```

### BaseModel

El modelo base debe proporcionar operaciones CRUD comunes:

```javascript
export class BaseModel {
  static database = new Database();
  static validator = new Validator();
  
  constructor(data = {}) {
    Object.assign(this, data);
  }
  
  static get collectionName() {
    // Derivar el nombre de la colección del nombre de la clase
    return this.name.toLowerCase() + 's';
  }
  
  static async findById(id) {
    const data = await this.database.findById(this.collectionName, id);
    return data ? new this(data) : null;
  }
  
  static async find(query = {}) {
    const items = await this.database.find(this.collectionName, query);
    return items.map(item => new this(item));
  }
  
  async save() {
    // Ejecutar validaciones
    this.validate();
    
    // Si ya tiene ID, actualizar, si no, insertar
    if (this.id) {
      return this.update();
    } else {
      const data = await this.constructor.database.insert(
        this.constructor.collectionName,
        this.toJSON()
      );
      Object.assign(this, data);
      return this;
    }
  }
  
  // Implementar update, delete y otros métodos...
  
  validate() {
    // Las clases derivadas implementarán validaciones específicas
    return true;
  }
  
  toJSON() {
    // Convertir la instancia a un objeto plano
    const json = {};
    
    // Obtener las propiedades propias (no heredadas)
    Object.keys(this).forEach(key => {
      if (this[key] !== undefined) {
        json[key] = this[key];
      }
    });
    
    return json;
  }
}
```

## 🔧 Utilidades (Utils)

### Validator

Un validator simple pero flexible:

```javascript
export class Validator {
  static string(value, { min, max, required = false } = {}) {
    if (value === undefined || value === null) {
      return !required;
    }
    
    if (typeof value !== 'string') {
      return false;
    }
    
    if (min !== undefined && value.length < min) {
      return false;
    }
    
    if (max !== undefined && value.length > max) {
      return false;
    }
    
    return true;
  }
  
  static email(value, options = {}) {
    if (!this.string(value, options)) {
      return false;
    }
    
    // Regex simple para validar email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  
  // Implementar más validadores: number, boolean, date, etc.
}
```

## 📦 Modelos (Models)

### Product

Ejemplo de modelo con validaciones:

```javascript
export class Product extends BaseModel {
  static fields = {
    name: { type: 'string', required: true, min: 3, max: 100 },
    price: { type: 'number', required: true, min: 0 },
    description: { type: 'string', max: 1000 },
    stock: { type: 'number', required: true, min: 0 },
    categoryId: { type: 'string', required: true }
  };
  
  validate() {
    const errors = {};
    
    // Validar cada campo según sus reglas
    Object.entries(Product.fields).forEach(([field, rules]) => {
      if (rules.required && (this[field] === undefined || this[field] === null)) {
        errors[field] = `${field} is required`;
      } else if (this[field] !== undefined) {
        // Validar según tipo
        if (rules.type === 'string') {
          if (typeof this[field] !== 'string') {
            errors[field] = `${field} must be a string`;
          } else {
            if (rules.min && this[field].length < rules.min) {
              errors[field] = `${field} must be at least ${rules.min} characters`;
            }
            if (rules.max && this[field].length > rules.max) {
              errors[field] = `${field} must be at most ${rules.max} characters`;
            }
          }
        } else if (rules.type === 'number') {
          if (typeof this[field] !== 'number') {
            errors[field] = `${field} must be a number`;
          } else {
            if (rules.min !== undefined && this[field] < rules.min) {
              errors[field] = `${field} must be at least ${rules.min}`;
            }
            if (rules.max !== undefined && this[field] > rules.max) {
              errors[field] = `${field} must be at most ${rules.max}`;
            }
          }
        }
        // Implementar validaciones para otros tipos
      }
    });
    
    if (Object.keys(errors).length > 0) {
      throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
    }
    
    return true;
  }
  
  decreaseStock(quantity) {
    if (this.stock < quantity) {
      throw new Error(`Not enough stock for product ${this.name}`);
    }
    
    this.stock -= quantity;
    return this.save();
  }
  
  // Otros métodos específicos...
}
```

## 🔌 Servicios (Services)

### AuthenticationService

Ejemplo de implementación:

```javascript
export class AuthenticationService {
  constructor(userModel, eventEmitter) {
    this.userModel = userModel;
    this.events = eventEmitter;
  }
  
  async register(userData) {
    // Validar que no exista un usuario con ese email
    const existingUser = await this.userModel.findByEmail(userData.email);
    
    if (existingUser) {
      throw new Error('Email already registered');
    }
    
    // Crear nuevo usuario
    const user = new this.userModel(userData);
    
    // Aquí iría la lógica de hash de password en un sistema real
    // user.password = await bcrypt.hash(user.password, 10);
    
    await user.save();
    
    // Emitir evento
    this.events.emit('user.registered', { userId: user.id });
    
    return { userId: user.id };
  }
  
  async login(email, password) {
    // Buscar usuario
    const user = await this.userModel.findByEmail(email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Aquí iría la verificación real de password
    // const isValid = await bcrypt.compare(password, user.password);
    const isValid = password === user.password; // Simulado
    
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    
    // Generar token (simulado)
    const token = this.generateToken(user);
    
    // Emitir evento
    this.events.emit('user.loggedIn', { userId: user.id });
    
    return { token, user: user.toPublicJSON() };
  }
  
  generateToken(user) {
    // Simulación simple de token
    return Buffer.from(JSON.stringify({
      userId: user.id,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 horas
    })).toString('base64');
  }
  
  verifyToken(token) {
    try {
      // Decodificar token
      const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
      
      // Verificar expiración
      if (decoded.exp < Date.now()) {
        throw new Error('Token expired');
      }
      
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
```

## 🔄 Patrones de diseño recomendados

Para este proyecto, considera aplicar estos patrones de diseño:

1. **Observer** (EventEmitter): Para comunicación desacoplada entre componentes
2. **Factory** (createECommerceApp): Para crear instancias configuradas
3. **Singleton** (Database): Para recursos compartidos
4. **Strategy** (PaymentService): Para diferentes algoritmos de pago
5. **Decorator** (Logger): Para añadir funcionalidad a métodos existentes
6. **Repository** (BaseModel): Para abstraer persistencia de datos
7. **Facade** (ECommerceApp): Para simplificar interfaz compleja

## 🧪 Estrategia de testing

Para facilitar el testing de tu implementación:

1. Diseña clases con dependencias inyectables
2. Usa métodos públicos bien definidos para las operaciones principales
3. Implementa getters/setters para controlar acceso a las propiedades
4. Centraliza la validación para facilitar testing aislado
5. Usa el patrón Repository para abstraer la capa de datos

## 🚧 Solución de problemas comunes

### Problema 1: Manejo de relaciones entre modelos

Para gestionar relaciones (Producto pertenece a Categoría, Usuario tiene Carrito):

```javascript
// Enfoque directo - Cargar relacionado bajo demanda
async getCategory() {
  if (!this.categoryId) return null;
  return await Category.findById(this.categoryId);
}

// Enfoque eager - Cargar al obtener el producto
static async findByIdWithCategory(id) {
  const product = await this.findById(id);
  if (!product) return null;
  
  product.category = await Category.findById(product.categoryId);
  return product;
}
```

### Problema 2: Manejo de errores asíncronos

```javascript
// En métodos de servicio
async createOrder(cartId, userId) {
  try {
    // Lógica de creación de orden
    return order;
  } catch (error) {
    // Log específico del error
    this.logger.error(`Error creating order: ${error.message}`, {
      userId,
      cartId,
      stack: error.stack
    });
    
    // Rethrow con contexto adicional
    throw new ApplicationError('Failed to create order', {
      originalError: error,
      code: 'ORDER_CREATION_FAILED'
    });
  }
}
```

### Problema 3: Transacciones y consistencia de datos

En un sistema real usarías transacciones de DB, pero para simular:

```javascript
async checkout(cartId, paymentDetails) {
  // Iniciar "transacción" simulada
  const operations = [];
  let success = false;
  
  try {
    // 1. Obtener carrito
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Cart not found');
    
    // 2. Verificar stock
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }
      
      // Reservar stock (no guardar todavía)
      product.stock -= item.quantity;
      operations.push(product);
    }
    
    // 3. Procesar pago
    const paymentResult = await this.paymentService.processPayment(
      cart.total,
      paymentDetails
    );
    
    if (!paymentResult.success) {
      throw new Error(`Payment failed: ${paymentResult.message}`);
    }
    
    // 4. Crear orden
    const order = new Order({
      userId: cart.userId,
      items: cart.items,
      total: cart.total,
      paymentId: paymentResult.paymentId,
      status: 'paid'
    });
    
    await order.save();
    
    // 5. Vaciar carrito
    cart.items = [];
    await cart.save();
    
    // 6. Confirmar cambios (guardar productos)
    for (const product of operations) {
      await product.save();
    }
    
    success = true;
    return order;
  } catch (error) {
    // Si algo falla, no se confirman los cambios
    return { error: error.message };
  }
}
```

## 📌 Consejos finales

1. **Implementa incrementalmente**: No intentes todo a la vez
2. **Usa la abstracción**: Oculta detalles de implementación internos
3. **Mantén la consistencia**: Usa patrones similares en todo el proyecto
4. **Prioriza la legibilidad**: El código claro es más mantenible
5. **Documenta decisiones**: Comenta el porqué, no solo el qué
