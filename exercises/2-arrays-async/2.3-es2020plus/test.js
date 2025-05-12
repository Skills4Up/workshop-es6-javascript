/**
 * Tests para las características de ES2020+
 */
const {
  getEmail,
  configureSettings,
  processRequests,
  calculateLargeNumbers,
  replaceAllOccurrences,
  updateOptions,
  getLastElements,
  hasOwnProperty,
  loadFromFirstAvailable,
  processUserData
} = require('./start');

// Intenta cargar los retos avanzados
let challenges;
try {
  challenges = require('./challenges');
} catch (error) {
  challenges = {};
}

// Tests para los ejercicios básicos
describe('Características modernas ES2020+', () => {

  test('Ejercicio 1: Optional Chaining (?.)', () => {
    // Objeto completo
    const user1 = {
      name: 'John',
      contact: {
        emailAddresses: [
          { type: 'personal', address: 'john@example.com' },
          { type: 'work', address: 'john@company.com' }
        ],
        phone: '555-1234'
      }
    };

    // Objetos incompletos
    const user2 = { name: 'Sarah', contact: { phone: '555-5678' } };
    const user3 = { name: 'Mike' };
    const user4 = null;

    // Pruebas
    expect(getEmail(user1)).toBe('john@example.com');
    expect(getEmail(user2)).toBeUndefined();
    expect(getEmail(user3)).toBeUndefined();
    expect(getEmail(user4)).toBeUndefined();

    // Verificar que se usa optional chaining
    const fnStr = getEmail.toString();
    expect(fnStr).toMatch(/\?\./) // Debe contener ?.
  });

  test('Ejercicio 2: Nullish Coalescing (??)', () => {
    // Configuración completa
    const fullConfig = {
      timeout: 2000,
      retries: 5,
      enabled: false,
      logLevel: 'debug',
      emptyStringAllowed: '',
      zeroAllowed: 0
    };

    // Configuración parcial con valores falsy
    const partialConfig = {
      timeout: 0, // Debe mantener este 0, no usar valor por defecto
      emptyStringAllowed: '', // Debe mantener cadena vacía
      zeroAllowed: 0 // Debe mantener este 0
    };

    // Configuración vacía
    const emptyConfig = {};

    // Pruebas
    const result1 = configureSettings(fullConfig);
    expect(result1).toEqual(fullConfig);

    const result2 = configureSettings(partialConfig);
    expect(result2.timeout).toBe(0); // Mantiene 0, no usa valor por defecto
    expect(result2.retries).toBe(3); // Valor por defecto
    expect(result2.enabled).toBe(true); // Valor por defecto
    expect(result2.logLevel).toBe('info'); // Valor por defecto
    expect(result2.emptyStringAllowed).toBe(''); // Mantiene cadena vacía
    expect(result2.zeroAllowed).toBe(0); // Mantiene 0

    const result3 = configureSettings();
    expect(result3).toEqual({
      timeout: 1000,
      retries: 3,
      enabled: true,
      logLevel: 'info',
      emptyStringAllowed: '',
      zeroAllowed: 0
    });

    // Verificar que se usa nullish coalescing
    const fnStr = configureSettings.toString();
    expect(fnStr).toMatch(/\?\?/) // Debe contener ??
  });

  test('Ejercicio 3: Promise.allSettled()', async () => {
    // Crear promesas de prueba
    const successPromise1 = Promise.resolve({ id: 1, data: 'Success 1' });
    const successPromise2 = Promise.resolve({ id: 2, data: 'Success 2' });
    const failPromise1 = Promise.reject(new Error('Error 1'));
    const failPromise2 = Promise.reject(new Error('Error 2'));

    // Diferentes combinaciones de promesas
    const allSuccess = [successPromise1, successPromise2];
    const allFail = [failPromise1, failPromise2];
    const mixed = [successPromise1, failPromise1, successPromise2];

    // Pruebas
    const result1 = await processRequests(allSuccess);
    expect(result1.successful.length).toBe(2);
    expect(result1.failed.length).toBe(0);

    const result2 = await processRequests(allFail);
    expect(result2.successful.length).toBe(0);
    expect(result2.failed.length).toBe(2);
    expect(result2.failed[0]).toMatch(/Error 1/);

    const result3 = await processRequests(mixed);
    expect(result3.successful.length).toBe(2);
    expect(result3.failed.length).toBe(1);

    // Verificar que se usa Promise.allSettled
    const fnStr = processRequests.toString();
    expect(fnStr).toMatch(/Promise\.allSettled/) // Debe usar Promise.allSettled
  });

  test('Ejercicio 4: BigInt', () => {
    // Números grandes que superan los límites seguros de JavaScript
    const num1 = '9007199254740993'; // Mayor que Number.MAX_SAFE_INTEGER
    const num2 = '9007199254740991';

    // Pruebas de operaciones
    expect(calculateLargeNumbers(num1, num2, 'add')).toBe('18014398509481984');
    expect(calculateLargeNumbers(num1, num2, 'subtract')).toBe('2');
    expect(calculateLargeNumbers(num1, num2, 'multiply')).toBe('81129638414606663088028562913');
    expect(calculateLargeNumbers(num1, num2, 'divide')).toBe('1');

    // Verificar que se usa BigInt
    const fnStr = calculateLargeNumbers.toString();
    expect(fnStr).toMatch(/BigInt/) // Debe usar BigInt
  });

  test('Ejercicio 5: String.prototype.replaceAll()', () => {
    const text1 = 'La casa es roja y la puerta de la casa también es roja';
    const text2 = 'abc abc abc';
    const text3 = 'Sin coincidencias aquí';

    // Pruebas
    expect(replaceAllOccurrences(text1, 'casa', 'mansión')).toBe(
      'La mansión es roja y la puerta de la mansión también es roja'
    );
    expect(replaceAllOccurrences(text1, 'roja', 'azul')).toBe(
      'La casa es azul y la puerta de la casa también es azul'
    );
    expect(replaceAllOccurrences(text2, 'abc', '123')).toBe(
      '123 123 123'
    );
    expect(replaceAllOccurrences(text3, 'xyz', '123')).toBe(
      'Sin coincidencias aquí'
    );

    // Verificar que se usa replaceAll
    const fnStr = replaceAllOccurrences.toString();
    expect(fnStr).toMatch(/replaceAll/) // Debe usar replaceAll
  });

  test('Ejercicio 6: Logical Assignment Operators', () => {
    // Objetos de prueba
    const baseOptions = {
      debug: true,
      cache: { enabled: true, ttl: 3600 },
      retryCount: 0,
      timeout: '',
      nullValue: null,
      undefinedValue: undefined
    };

    // Nuevas opciones para combinar
    const newOptions1 = {
      debug: false,
      cache: { enabled: false },
      newOption: 'value'
    };

    const newOptions2 = {
      debug: true,
      retryCount: 3,
      timeout: 1000,
      nullValue: 'not null anymore',
      extraValue: 'extra'
    };

    // Pruebas
    const result1 = updateOptions({ ...baseOptions }, newOptions1);
    expect(result1.debug).toBe(false); // Debe actualizarse
    expect(result1.cache.enabled).toBe(false); // Debe actualizarse
    expect(result1.cache.ttl).toBe(3600); // Debe mantenerse
    expect(result1.newOption).toBe('value'); // Debe añadirse

    const result2 = updateOptions({ ...baseOptions }, newOptions2);
    expect(result2.retryCount).toBe(3); // Debe actualizarse incluso siendo 0 originalmente
    expect(result2.timeout).toBe(1000); // Debe actualizarse incluso siendo '' originalmente
    expect(result2.nullValue).toBe('not null anymore'); // null debe actualizarse
    expect(result2.undefinedValue).toBe('extra'); // undefined debe actualizarse

    // Verificar que se usan operadores de asignación lógica
    const fnStr = updateOptions.toString();
    expect(fnStr).toMatch(/(\|\|=|&&=|\?\?=)/) // Debe usar alguno de estos operadores
  });

  test('Ejercicio 7: Array.at()', () => {
    const array1 = [10, 20, 30, 40, 50];
    const array2 = ['a', 'b', 'c'];
    const emptyArray = [];

    // Pruebas
    expect(getLastElements(array1, 1)).toEqual([50]);
    expect(getLastElements(array1, 3)).toEqual([30, 40, 50]);
    expect(getLastElements(array1, 5)).toEqual([10, 20, 30, 40, 50]);
    expect(getLastElements(array1, 6)).toEqual([10, 20, 30, 40, 50]); // No debe dar error

    expect(getLastElements(array2, 2)).toEqual(['b', 'c']);
    expect(getLastElements(emptyArray, 2)).toEqual([]);

    // Verificar que se usa Array.at()
    const fnStr = getLastElements.toString();
    expect(fnStr).toMatch(/\.at\(/) // Debe usar el método .at()
  });

  test('Ejercicio 8: Object.hasOwn()', () => {
    // Objeto de prueba
    const parent = { parentProp: 'parent value' };
    const child = Object.create(parent);
    child.childProp = 'child value';

    // Objeto con propiedad hasOwnProperty modificada
    const tricky = {
      prop: 'value',
      hasOwnProperty: null // Esta modificación rompe obj.hasOwnProperty()
    };

    // Pruebas
    expect(hasOwnProperty(child, 'childProp')).toBe(true); // Propiedad propia
    expect(hasOwnProperty(child, 'parentProp')).toBe(false); // Propiedad heredada
    expect(hasOwnProperty(child, 'nonExistent')).toBe(false); // No existe

    expect(hasOwnProperty(tricky, 'prop')).toBe(true); // Debe funcionar incluso con hasOwnProperty roto

    // Verificar que se usa Object.hasOwn
    const fnStr = hasOwnProperty.toString();
    expect(fnStr).toMatch(/Object\.hasOwn/) // Debe usar Object.hasOwn
  });

  test('Ejercicio 9: Promise.any()', async () => {
    // Función mock de fetch
    const mockFetch = jest.fn((url) => {
      if (url.includes('fast')) {
        return Promise.resolve({ data: 'Fast data', source: url });
      } else if (url.includes('medium')) {
        return new Promise(resolve => {
          setTimeout(() => resolve({ data: 'Medium data', source: url }), 100);
        });
      } else if (url.includes('slow')) {
        return new Promise(resolve => {
          setTimeout(() => resolve({ data: 'Slow data', source: url }), 200);
        });
      } else {
        return Promise.reject(new Error(`Failed to fetch ${url}`));
      }
    });

    // URLs de prueba
    const successUrls = [
      'https://api.example.com/fast',
      'https://api.example.com/medium',
      'https://api.example.com/slow'
    ];

    const mixedUrls = [
      'https://api.example.com/error1',
      'https://api.example.com/medium',
      'https://api.example.com/error2'
    ];

    const allFailUrls = [
      'https://api.example.com/error1',
      'https://api.example.com/error2',
      'https://api.example.com/error3'
    ];

    // Pruebas
    const result1 = await loadFromFirstAvailable(successUrls, mockFetch);
    expect(result1.data).toBe('Fast data'); // Debe devolver el más rápido (fast)

    const result2 = await loadFromFirstAvailable(mixedUrls, mockFetch);
    expect(result2.data).toBe('Medium data'); // Debe funcionar mientras al menos uno tenga éxito

    await expect(loadFromFirstAvailable(allFailUrls, mockFetch))
      .rejects.toThrow('Todos los recursos fallaron');

    // Verificar que se usa Promise.any
    const fnStr = loadFromFirstAvailable.toString();
    expect(fnStr).toMatch(/Promise\.any/) // Debe usar Promise.any
  });

  test('Ejercicio 10: Combinación de características', () => {
    // Datos de usuario para probar
    const completeUser = {
      firstName: 'John',
      lastName: 'Doe',
      contacts: {
        email: 'john.doe@example.com',
        phone: '555-1234'
      },
      username: 'John Doe',
      access: {
        level: 'admin',
        roles: ['user', 'editor']
      }
    };

    const partialUser = {
      firstName: 'Jane',
      contacts: {}, // Sin email
      username: 'JANE SMITH',
      // Sin access
    };

    const minimalUser = {
      // Sin nombre
      username: ' user  name with spaces ',
      // Sin contacts ni access
    };

    // Pruebas
    const result1 = processUserData(completeUser);
    expect(result1.fullName).toBe('John Doe');
    expect(result1.email).toBe('john.doe@example.com');
    expect(result1.normalizedUsername).toBe('john-doe');
    expect(result1.accessLevel).toBe('admin');

    const result2 = processUserData(partialUser);
    expect(result2.fullName).toBe('Jane');
    expect(result2.email).toBe('no-email');
    expect(result2.normalizedUsername).toBe('jane-smith');
    expect(result2.accessLevel).toBe('basic');

    const result3 = processUserData(minimalUser);
    expect(result3.fullName).toBe('Usuario Anónimo');
    expect(result3.email).toBe('no-email');
    expect(result3.normalizedUsername).toBe('user-name-with-spaces');
    expect(result3.accessLevel).toBe('basic');

    const result4 = processUserData(null);
    expect(result4.fullName).toBe('Usuario Anónimo');
    expect(result4.email).toBe('no-email');
    expect(result4.normalizedUsername).toBe('guest');
    expect(result4.accessLevel).toBe('basic');

    // Verificar uso de características modernas
    const fnStr = processUserData.toString();
    expect(fnStr).toMatch(/(\?\.|\?\?|replaceAll)/) // Debe usar al menos una de estas características
  });

});

// Tests para los desafíos avanzados
describe('Retos avanzados ES2020+', () => {
  const hasChallenges =
    typeof challenges.mergeConfigurations === 'function' &&
    typeof challenges.calculateExponentialBackoff === 'function' &&
    typeof challenges.parseQuery === 'function' &&
    typeof challenges.processDistributedTransaction === 'function' &&
    typeof challenges.smartCache === 'function';

  beforeEach(() => {
    if (!hasChallenges) {
      console.log('⚠️ Los retos avanzados aún no han sido implementados');
    }
  });

  test('Reto 1: Sistema de Configuración Jerárquico', () => {
    if (!hasChallenges) return;

    // Configuraciones de prueba
    const defaultConfig = {
      theme: 'light',
      notifications: { email: true, push: false },
      timeout: 30000,
      debug: false,
      emptyValue: '',
      zeroValue: 0
    };

    const globalConfig = {
      theme: 'dark',
      notifications: { push: true },
      features: { beta: false }
    };

    const userConfig = {
      timeout: 0, // Debe preservarse aunque sea "falsy"
      emptyValue: null, // Debe ser sobrescrito
      features: { beta: true, experimental: true }
    };

    const sessionConfig = {
      theme: 'system',
      debug: true
    };

    // Prueba
    const result = challenges.mergeConfigurations(
      defaultConfig,
      globalConfig,
      userConfig,
      sessionConfig
    );

    // Verificar resultado
    expect(result.theme).toBe('system'); // De sessionConfig
    expect(result.notifications.email).toBe(true); // De defaultConfig
    expect(result.notifications.push).toBe(true); // De globalConfig
    expect(result.timeout).toBe(0); // De userConfig (preservado aunque es "falsy")
    expect(result.debug).toBe(true); // De sessionConfig
    expect(result.features.beta).toBe(true); // De userConfig
    expect(result.features.experimental).toBe(true); // De userConfig
    expect(result.emptyValue).toBe(''); // De defaultConfig (userConfig tenía null)
    expect(result.zeroValue).toBe(0); // De defaultConfig
  });

  test('Reto 2: Tiempo de Espera Inteligente con BigInt', () => {
    if (!hasChallenges) return;

    // Pruebas básicas
    expect(challenges.calculateExponentialBackoff(1)).toBeGreaterThan(0);
    expect(challenges.calculateExponentialBackoff(2)).toBeGreaterThan(
      challenges.calculateExponentialBackoff(1)
    );

    // Prueba con intentos grandes (que excederían MAX_SAFE_INTEGER sin BigInt)
    const result = challenges.calculateExponentialBackoff(100);
    expect(Number.isFinite(result)).toBe(true);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(3600000); // No debe exceder el máximo

    // Prueba con opciones personalizadas
    const customResult = challenges.calculateExponentialBackoff(5, {
      base: 3,
      factorMs: 50,
      maxWaitMs: 10000
    });

    expect(customResult).toBeGreaterThan(0);
    expect(customResult).toBeLessThanOrEqual(10000);
  });

  test('Reto 3: Parser de Consultas Anidadas', () => {
    if (!hasChallenges) return;

    // Consulta válida completa
    const validQuery = {
      select: ["name", "email", "status"],
      from: "users",
      where: {
        AND: [
          { field: "status", operator: "=", value: "active" },
          { field: "age", operator: ">", value: 18 }
        ]
      },
      orderBy: { field: "createdAt", direction: "DESC" },
      limit: 10
    };

    // Consulta incompleta
    const partialQuery = {
      select: ["name"],
      from: "users"
    };

    // Consulta con errores
    const invalidQuery = {
      select: "name", // No es array
      from: "users",
      where: {
        OR: null // No es array
      }
    };

    // Pruebas
    const result1 = challenges.parseQuery(validQuery);
    expect(result1).toBeDefined();
    expect(result1.isValid).toBe(true);

    const result2 = challenges.parseQuery(partialQuery);
    expect(result2).toBeDefined();
    expect(result2.isValid).toBe(true);

    const result3 = challenges.parseQuery(invalidQuery);
    expect(result3).toBeDefined();
    expect(result3.isValid).toBe(false);
    expect(result3.errors).toBeDefined();
    expect(result3.errors.length).toBeGreaterThan(0);
  });

  test('Reto 4: Procesador de Transacciones Distribuidas', async () => {
    if (!hasChallenges) return;

    // Simular servicios
    const services = {
      payment: jest.fn(async () => ({ success: true, amount: "500" })),
      inventory: jest.fn(async () => ({ success: true, items: 5 })),
      shipping: jest.fn(async () => { throw new Error("Servicio no disponible"); }),
      notification: jest.fn(async () => ({ success: true }))
    };

    // Transacción de prueba
    const transaction = {
      orderId: "ORD-12345",
      items: [
        { productId: "P1", quantity: 2, price: "9999999999999999" }, // Número grande
        { productId: "P2", quantity: 1, price: "5000000000000000" }  // Número grande
      ],
      customer: { id: "C1", email: "test@example.com" }
    };

    // Probar procesamiento
    const result = await challenges.processDistributedTransaction(transaction, services);

    // Verificar resultados
    expect(result).toBeDefined();
    expect(result.orderId).toBe("ORD-12345");
    expect(result.successful.length).toBeGreaterThanOrEqual(2);
    expect(result.failed.length).toBeGreaterThanOrEqual(1);
    expect(result.totalAmount).toBeDefined();

    // Verificar que se llamaron los servicios
    expect(services.payment).toHaveBeenCalled();
    expect(services.inventory).toHaveBeenCalled();
    expect(services.shipping).toHaveBeenCalled();
    expect(services.notification).toHaveBeenCalled();
  });

  test('Reto 5: Sistema de Caché Inteligente', async () => {
    if (!hasChallenges) return;

    // Simular almacenamiento
    const mockStorage = {
      memory: {},
      localStorage: {},

      getFromMemory: jest.fn((key) => mockStorage.memory[key] || null),
      getFromLocalStorage: jest.fn((key) => {
        const value = mockStorage.localStorage[key];
        if (value) {
          return Promise.resolve(value);
        }
        return Promise.reject(new Error("No existe en localStorage"));
      }),

      setInMemory: jest.fn((key, value) => {
        mockStorage.memory[key] = value;
      }),
      setInLocalStorage: jest.fn((key, value) => {
        mockStorage.localStorage[key] = value;
        return Promise.resolve();
      })
    };

    // Simulador de API
    const fetchFromAPI = jest.fn(() =>
      Promise.resolve({ data: "Datos de la API", timestamp: Date.now() })
    );

    // Caso 1: No hay datos en caché
    const result1 = await challenges.smartCache("key1", fetchFromAPI, mockStorage);

    expect(result1).toBeDefined();
    expect(result1.data).toBe("Datos de la API");
    expect(mockStorage.setInMemory).toHaveBeenCalled();
    expect(mockStorage.setInLocalStorage).toHaveBeenCalled();

    // Caso 2: Datos en memoria
    mockStorage.memory.key2 = { data: "Datos en memoria", timestamp: Date.now() };

    const result2 = await challenges.smartCache("key2", fetchFromAPI, mockStorage);

    expect(result2).toBeDefined();
    expect(result2.data).toBe("Datos en memoria");
    expect(fetchFromAPI).toHaveBeenCalledTimes(1); // No se llamó nuevamente

    // Caso 3: Datos solo en localStorage
    mockStorage.localStorage.key3 = { data: "Datos en localStorage", timestamp: Date.now() };

    const result3 = await challenges.smartCache("key3", fetchFromAPI, mockStorage);

    expect(result3).toBeDefined();
    expect(result3.data).toBe("Datos en localStorage");
    expect(fetchFromAPI).toHaveBeenCalledTimes(1); // No se llamó nuevamente
    expect(mockStorage.setInMemory).toHaveBeenCalledWith("key3", mockStorage.localStorage.key3);
  });
});
