/**
 * Tests para el módulo de Patrones de Diseño
 */
const {
  // Factory Method
  Transaction,
  PaymentTransaction,
  RefundTransaction,
  TransferTransaction,
  TransactionFactory,

  // Builder
  FinancialReportBuilder,
  ReportDirector,

  // Singleton
  AuditService,

  // Adapter
  PaymentProcessor,
  ExternalPaymentGateway,
  PaymentGatewayAdapter,

  // Decorator
  LoggingTransactionDecorator,
  ValidationTransactionDecorator,
  PerformanceTransactionDecorator,

  // Observer
  TransactionEventSubject,
  EmailNotifier,
  AuditLogger,
  DashboardUpdater,

  // Strategy
  paymentStrategies,
  PaymentProcessor as StrategyPaymentProcessor,

  // Chain of Responsibility
  TransactionValidator,
  AmountValidator,
  FraudValidator,
  AccountValidator,

  // Template Method
  TransactionProcessor,
  PaymentProcessor as TemplatePaymentProcessor,
  RefundProcessor,

  // Composite
  ReportComponent,
  ReportItem,
  ReportSection
} = require('./start');

// Intenta cargar los retos avanzados
let challenges;
try {
  challenges = require('./challenges');
} catch (error) {
  challenges = {};
}

// Tests para los ejercicios básicos
describe('3.2 Patrones de Diseño', () => {

  test('Ejercicio 1: Factory Method - Creación de Transacciones', () => {
    // Verificar que el factory existe y crea diferentes tipos
    const payment = TransactionFactory.createTransaction('payment', {
      id: 'P123',
      amount: 100,
      cardDetails: { number: '4111XXXXXXXXXXXX', expiry: '12/25' }
    });

    const refund = TransactionFactory.createTransaction('refund', {
      id: 'R456',
      amount: 50,
      originalTransactionId: 'P123'
    });

    const transfer = TransactionFactory.createTransaction('transfer', {
      id: 'T789',
      amount: 200,
      sourceAccount: 'ACC001',
      destinationAccount: 'ACC002'
    });

    // Verificar que cada tipo es una instancia correcta
    expect(payment).toBeInstanceOf(PaymentTransaction);
    expect(refund).toBeInstanceOf(RefundTransaction);
    expect(transfer).toBeInstanceOf(TransferTransaction);

    // Verificar propiedades específicas
    expect(payment.amount).toBe(100);
    expect(refund.originalTransactionId).toBe('P123');
    expect(transfer.sourceAccount).toBe('ACC001');
    expect(transfer.destinationAccount).toBe('ACC002');

    // Verificar que maneja tipos inválidos
    expect(() => {
      TransactionFactory.createTransaction('invalidType', { id: 'X999', amount: 100 });
    }).toThrow();
  });

  test('Ejercicio 2: Builder - Generador de Reportes Financieros', () => {
    // Verificar el Builder con method chaining
    const builder = new FinancialReportBuilder();

    const report = builder
      .withTitle('Informe Financiero Q2 2023')
      .withDate(new Date(2023, 5, 30))
      .withAuthor('John Doe')
      .addSection('Resumen Ejecutivo', { content: 'Análisis general del trimestre...' })
      .addSection('Ingresos', { data: [100, 200, 300], total: 600 })
      .addSection('Gastos', { data: [50, 75, 100], total: 225 })
      .withFooter('Informe generado automáticamente')
      .build();

    // Verificar estructura del reporte
    expect(report.title).toBe('Informe Financiero Q2 2023');
    expect(report.author).toBe('John Doe');
    expect(report.sections.length).toBe(3);
    expect(report.sections[0].title).toBe('Resumen Ejecutivo');
    expect(report.sections[1].data).toEqual([100, 200, 300]);
    expect(report.footer).toBe('Informe generado automáticamente');

    // Verificar que el Report Director funciona si está implementado
    if (ReportDirector) {
      const director = new ReportDirector();
      const builder2 = new FinancialReportBuilder();

      // Crear un reporte predefinido
      const monthlyReport = director.createMonthlyReport(builder2, {
        month: 'Junio',
        year: 2023
      });

      expect(monthlyReport).toBeDefined();
      expect(monthlyReport.title).toContain('Junio');
    }
  });

  test('Ejercicio 3: Singleton - Servicio de Auditoría', () => {
    // Verificar que se obtiene la misma instancia
    const instance1 = AuditService.getInstance();
    const instance2 = AuditService.getInstance();

    expect(instance1).toBe(instance2);

    // Verificar que no se puede instanciar directamente
    expect(() => {
      new AuditService();
    }).toThrow();

    // Probar funcionalidad
    instance1.logEvent('test', { action: 'login', user: 'admin' });
    instance1.logEvent('transaction', { id: 'T123', amount: 100 });

    const events = instance2.getEvents();
    expect(events.length).toBe(2);
    expect(events[0].type).toBe('test');
    expect(events[1].type).toBe('transaction');

    // Verificar búsqueda de eventos
    const transactionEvents = instance1.findEvents('transaction');
    expect(transactionEvents.length).toBe(1);
    expect(transactionEvents[0].data.id).toBe('T123');
  });

  test('Ejercicio 4: Adapter - Integración de Pasarela de Pago', () => {
    // Crear la pasarela externa y el adaptador
    const externalGateway = new ExternalPaymentGateway();
    const adapter = new PaymentGatewayAdapter(externalGateway);

    // Verificar que el adaptador implementa la interfaz que esperamos
    expect(typeof adapter.processPayment).toBe('function');

    // Probar la adaptación
    return adapter.processPayment({
      amount: 99.99,
      currency: 'USD',
      cardDetails: {
        number: '4111111111111111',
        expiry: '12/23',
        cvv: '123'
      }
    }).then(result => {
      // Verificar que la respuesta ha sido adaptada al formato esperado
      expect(result.success).toBe(true);
      expect(result.transactionId).toBeDefined();
    });
  });

  test('Ejercicio 5: Decorator - Transacciones con Características Adicionales', () => {
    // Crear una transacción base
    const transaction = new PaymentTransaction('P123', 100, new Date(), {
      cardNumber: '4111XXXXXXXXXXXX'
    });

    // Decorar con múltiples decoradores
    const validatedTransaction = new ValidationTransactionDecorator(transaction);
    const loggedTransaction = new LoggingTransactionDecorator(validatedTransaction);
    const measuredTransaction = new PerformanceTransactionDecorator(loggedTransaction);

    // Verificar que mantiene la misma interfaz
    expect(measuredTransaction).toHaveProperty('execute');
    expect(typeof measuredTransaction.execute).toBe('function');

    // Ejecutar con todos los decoradores
    const result = measuredTransaction.execute();

    // Verificar que el resultado final es el esperado
    expect(result.success).toBe(true);
    expect(result.transactionId).toBe('P123');

    // Verificar que cada decorador añade su propio comportamiento
    // lo comprobaremos por el formato del toString o por propiedades adicionales
    if (measuredTransaction.toString) {
      const str = measuredTransaction.toString();
      expect(str).toContain('Validation');
      expect(str).toContain('Logging');
      expect(str).toContain('Performance');
    }

    if (measuredTransaction.validationPassed !== undefined) {
      expect(measuredTransaction.validationPassed).toBe(true);
    }

    if (measuredTransaction.executionTime !== undefined) {
      expect(measuredTransaction.executionTime).toBeGreaterThanOrEqual(0);
    }
  });

  test('Ejercicio 6: Observer - Sistema de Notificaciones', () => {
    // Crear el subject
    const subject = new TransactionEventSubject();

    // Crear observadores
    const emailNotifier = new EmailNotifier();
    const auditLogger = new AuditLogger();
    const dashboardUpdater = new DashboardUpdater();

    // Espiar los métodos de update
    const emailSpy = jest.spyOn(emailNotifier, 'update');
    const auditSpy = jest.spyOn(auditLogger, 'update');
    const dashboardSpy = jest.spyOn(dashboardUpdater, 'update');

    // Suscribir observadores
    subject.subscribe(emailNotifier);
    subject.subscribe(auditLogger);
    subject.subscribe(dashboardUpdater);

    // Generar una notificación
    const eventData = {
      type: 'transaction.completed',
      transaction: { id: 'T123', amount: 100 },
      timestamp: new Date()
    };

    subject.notify(eventData);

    // Verificar que todos fueron notificados
    expect(emailSpy).toHaveBeenCalledWith(eventData);
    expect(auditSpy).toHaveBeenCalledWith(eventData);
    expect(dashboardSpy).toHaveBeenCalledWith(eventData);

    // Desuscribir un observador
    subject.unsubscribe(emailNotifier);

    // Generar otra notificación
    const eventData2 = {
      type: 'transaction.failed',
      transaction: { id: 'T124', amount: 200 },
      error: 'Insufficient funds',
      timestamp: new Date()
    };

    subject.notify(eventData2);

    // Verificar que solo fueron notificados los que siguen suscritos
    expect(emailSpy).toHaveBeenCalledTimes(1); // No cambió
    expect(auditSpy).toHaveBeenCalledTimes(2); // Incrementó
    expect(dashboardSpy).toHaveBeenCalledTimes(2); // Incrementó
  });

  test('Ejercicio 7: Strategy - Algoritmos de Procesamiento de Pagos', () => {
    // Verificar que existen las estrategias
    expect(paymentStrategies.creditCard).toBeDefined();
    expect(paymentStrategies.bankTransfer).toBeDefined();
    expect(paymentStrategies.digitalWallet).toBeDefined();

    // Crear procesador con estrategia inicial
    const processor = new StrategyPaymentProcessor(paymentStrategies.creditCard);

    // Datos de prueba
    const paymentData = {
      amount: 250,
      currency: 'USD',
      cardDetails: { number: '4111XXXXXXXXXXXX', expiry: '12/25' }
    };

    // Procesar con la estrategia inicial
    const result1 = processor.processPayment(paymentData);
    expect(result1).toBeDefined();

    // Cambiar estrategia y procesar de nuevo
    processor.setStrategy(paymentStrategies.bankTransfer);

    const result2 = processor.processPayment({
      amount: 500,
      currency: 'USD',
      accountNumber: 'ACC001',
      routingNumber: '123456789'
    });

    expect(result2).toBeDefined();

    // Verificar que cada estrategia procesa de forma diferente
    // (podemos comprobar si tienen diferentes propiedades)
    if (result1.paymentMethod && result2.paymentMethod) {
      expect(result1.paymentMethod).toBe('creditCard');
      expect(result2.paymentMethod).toBe('bankTransfer');
    }
  });

  test('Ejercicio 8: Chain of Responsibility - Validación de Transacciones', () => {
    // Crear los validadores
    const amountValidator = new AmountValidator();
    const fraudValidator = new FraudValidator();
    const accountValidator = new AccountValidator();

    // Crear la cadena
    amountValidator.setNext(fraudValidator);
    fraudValidator.setNext(accountValidator);

    // Transacción válida
    const validTransaction = {
      id: 'T123',
      amount: 100,
      account: 'ACC001',
      riskScore: 20
    };

    // Debe pasar todas las validaciones
    expect(amountValidator.validate(validTransaction)).toBe(true);

    // Transacción inválida por monto
    const invalidAmount = {
      id: 'T124',
      amount: -10, // Monto negativo
      account: 'ACC001',
      riskScore: 20
    };

    expect(amountValidator.validate(invalidAmount)).toBe(false);

    // Transacción inválida por riesgo de fraude
    const highRiskTransaction = {
      id: 'T125',
      amount: 100,
      account: 'ACC001',
      riskScore: 90 // Alto riesgo
    };

    expect(amountValidator.validate(highRiskTransaction)).toBe(false);

    // Transacción inválida por cuenta
    const invalidAccount = {
      id: 'T126',
      amount: 100,
      account: 'INVALID', // Cuenta inválida
      riskScore: 20
    };

    expect(amountValidator.validate(invalidAccount)).toBe(false);
  });

  test('Ejercicio 9: Template Method - Procesamiento de Transacciones', () => {
    // Instanciar procesadores concretos
    const paymentProcessor = new TemplatePaymentProcessor();
    const refundProcessor = new RefundProcessor();

    // Datos de transacciones
    const paymentTransaction = {
      id: 'P123',
      type: 'payment',
      amount: 100,
      source: 'credit_card'
    };

    const refundTransaction = {
      id: 'R456',
      type: 'refund',
      amount: 50,
      originalTransaction: 'P123'
    };

    // Procesar transacciones
    const paymentResult = paymentProcessor.processTransaction(paymentTransaction);
    const refundResult = refundProcessor.processTransaction(refundTransaction);

    // Verificar que ambos procesan correctamente
    expect(paymentResult.success).toBe(true);
    expect(refundResult.success).toBe(true);

    // Verificar que cada uno añade detalles específicos
    expect(paymentResult.transactionType).toBe('payment');
    expect(refundResult.transactionType).toBe('refund');

    // Verificar que se llamaron los hooks apropiados
    // (si se implementó con espías o flags para testing)
    if (paymentProcessor.hooksExecuted) {
      expect(paymentProcessor.hooksExecuted.preProcess).toBe(true);
      expect(paymentProcessor.hooksExecuted.postProcess).toBe(true);
    }
  });

  test('Ejercicio 10: Composite - Estructura de Reportes Jerárquicos', () => {
    // Crear items individuales (hojas)
    const item1 = new ReportItem('Item 1', { value: 100 });
    const item2 = new ReportItem('Item 2', { value: 200 });
    const item3 = new ReportItem('Item 3', { value: 150 });
    const item4 = new ReportItem('Item 4', { value: 300 });

    // Crear secciones (compuestos)
    const section1 = new ReportSection('Section 1');
    const section2 = new ReportSection('Section 2');
    const mainSection = new ReportSection('Main Report');

    // Construir jerarquía
    section1.addChild(item1);
    section1.addChild(item2);

    section2.addChild(item3);
    section2.addChild(item4);

    mainSection.addChild(section1);
    mainSection.addChild(section2);

    // Verificar cálculo del total
    expect(item1.getTotal()).toBe(100);
    expect(section1.getTotal()).toBe(300); // 100 + 200
    expect(mainSection.getTotal()).toBe(750); // (100 + 200) + (150 + 300)

    // Verificar renderizado
    const rendered = mainSection.render();
    expect(rendered).toBeDefined();

    // Verificar que es una estructura jerárquica
    if (typeof rendered === 'string') {
      expect(rendered).toContain('Main Report');
      expect(rendered).toContain('Section 1');
      expect(rendered).toContain('Item 1');
    } else if (typeof rendered === 'object') {
      expect(rendered.title).toBe('Main Report');
      expect(rendered.children.length).toBe(2);
      expect(rendered.children[0].title).toBe('Section 1');
      expect(rendered.children[0].children.length).toBe(2);
    }
  });

});

// Tests para los desafíos avanzados
describe('Retos avanzados de Patrones de Diseño', () => {
  const hasChallenges =
    typeof challenges.DatabaseConnectionManager === 'function' &&
    typeof challenges.MiddlewareChain === 'function' &&
    typeof challenges.createReactiveProxy === 'function' &&
    typeof challenges.EventStore === 'function' &&
    typeof challenges.PluginManager === 'function';

  beforeEach(() => {
    if (!hasChallenges) {
      console.log('⚠️ Los retos avanzados aún no han sido implementados');
    }
  });

  test('Reto 1: Lazy Singleton - Conexión a Base de Datos', () => {
    if (!hasChallenges) return;

    const connectionManager = challenges.DatabaseConnectionManager.getInstance();

    // Verificar que es un singleton
    expect(connectionManager).toBe(challenges.DatabaseConnectionManager.getInstance());

    // Verificar que no ha creado conexión todavía (lazy)
    expect(connectionManager.isConnected()).toBe(false);

    // Crear conexión
    const connection = connectionManager.getConnection('postgres');

    // Verificar que ahora sí está conectado
    expect(connectionManager.isConnected()).toBe(true);
    expect(connection).toBeDefined();

    // Verificar que se reutiliza la conexión
    const connection2 = connectionManager.getConnection('postgres');
    expect(connection).toBe(connection2);

    // Verificar diferentes tipos de bases de datos
    if (connectionManager.supportsMultipleDatabases) {
      const mongoConnection = connectionManager.getConnection('mongodb');
      expect(mongoConnection).toBeDefined();
      expect(mongoConnection).not.toBe(connection);
    }
  });

  test('Reto 2: Cadena de Promises - Middleware Pattern', () => {
    if (!hasChallenges) return;

    const middleware = new challenges.MiddlewareChain();

    // Middleware sync
    middleware.use((data, next) => {
      data.step1 = true;
      return next();
    });

    // Middleware async
    middleware.use(async (data, next) => {
      data.step2 = true;
      await new Promise(resolve => setTimeout(resolve, 10));
      return next();
    });

    // Middleware que detiene la cadena
    middleware.use((data, next) => {
      if (data.stop) {
        data.stopped = true;
        return Promise.resolve();
      }
      return next();
    });

    // Middleware que no debería ejecutarse si la cadena se detiene
    middleware.use((data, next) => {
      data.step3 = true;
      return next();
    });

    // Middleware de error
    middleware.catchError((err, data) => {
      data.error = err.message;
      return Promise.resolve();
    });

    // Probar ejecución normal
    return middleware.execute({ test: true })
      .then(data => {
        expect(data.step1).toBe(true);
        expect(data.step2).toBe(true);
        expect(data.step3).toBe(true);
      })
      .then(() => {
        // Probar detener la cadena
        return middleware.execute({ test: true, stop: true });
      })
      .then(data => {
        expect(data.step1).toBe(true);
        expect(data.step2).toBe(true);
        expect(data.stopped).toBe(true);
        expect(data.step3).toBeUndefined();
      })
      .then(() => {
        // Probar manejo de errores
        middleware.use(() => {
          throw new Error('Test error');
        });

        return middleware.execute({ test: true });
      })
      .then(data => {
        expect(data.error).toBe('Test error');
      });
  });

  test('Reto 3: Proxy Reactivo - Sistema de Datos Observables', () => {
    if (!hasChallenges) return;

    // Crear datos reactivos
    const state = challenges.createReactiveProxy({
      user: {
        name: 'John',
        preferences: {
          theme: 'dark'
        }
      },
      products: [
        { id: 1, name: 'Product 1' }
      ],
      counter: 0
    });

    // Verificar acceso a propiedades
    expect(state.user.name).toBe('John');
    expect(state.user.preferences.theme).toBe('dark');

    // Suscribirse a cambios
    const handler = jest.fn();
    const unsubscribe = state.$subscribe(handler);

    // Modificar datos
    state.user.name = 'Jane';

    // Verificar que se notificó el cambio
    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].path).toBe('user.name');
    expect(handler.mock.calls[0][0].value).toBe('Jane');

    // Modificar datos anidados
    state.user.preferences.theme = 'light';

    // Verificar notificación de cambio anidado
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler.mock.calls[1][0].path).toBe('user.preferences.theme');

    // Desuscribirse
    unsubscribe();

    // Modificar de nuevo
    state.counter = 1;

    // Verificar que no hay más notificaciones
    expect(handler).toHaveBeenCalledTimes(2);

    // Probar tienda reactiva si está implementada
    if (challenges.ReactiveStore) {
      const store = new challenges.ReactiveStore({
        count: 0
      });

      const storeHandler = jest.fn();
      store.subscribe(storeHandler);

      store.update('count', 5);

      expect(storeHandler).toHaveBeenCalled();
      expect(store.getState().count).toBe(5);
    }
  });

  test('Reto 4: Event Sourcing - Patrón Command + Observer', () => {
    if (!hasChallenges) return;

    // Crear un event store
    const eventStore = new challenges.EventStore();

    // Crear comandos
    class AddUserCommand extends challenges.Command {
      constructor(userId, name) {
        super();
        this.userId = userId;
        this.name = name;
      }

      execute(state) {
        return {
          ...state,
          users: {
            ...state.users,
            [this.userId]: { id: this.userId, name: this.name }
          }
        };
      }
    }

    class UpdateUserCommand extends challenges.Command {
      constructor(userId, changes) {
        super();
        this.userId = userId;
        this.changes = changes;
      }

      execute(state) {
        return {
          ...state,
          users: {
            ...state.users,
            [this.userId]: {
              ...state.users[this.userId],
              ...this.changes
            }
          }
        };
      }
    }

    // Crear store eventsourced
    const store = new challenges.EventSourcedStore(eventStore, { users: {} });

    // Verificar observer funcionando
    const observer = jest.fn();
    store.subscribe(observer);

    // Aplicar comandos
    store.execute(new AddUserCommand('user1', 'John'));
    store.execute(new UpdateUserCommand('user1', { age: 30 }));

    // Verificar estado final
    expect(store.getState().users.user1.name).toBe('John');
    expect(store.getState().users.user1.age).toBe(30);

    // Verificar que el observador fue notificado
    expect(observer).toHaveBeenCalledTimes(2);

    // Verificar historial de eventos
    expect(eventStore.getEvents().length).toBe(2);

    // Verificar time travel
    const previousState = store.getStateAtIndex(0);
    expect(previousState.users.user1.name).toBe('John');
    expect(previousState.users.user1.age).toBeUndefined();
  });

  test('Reto 5: Plugin Architecture - Extensibilidad Modular', () => {
    if (!hasChallenges) return;

    // Crear aplicación base
    const app = new challenges.Application();

    // Crear gestor de plugins
    const pluginManager = new challenges.PluginManager(app);

    // Crear plugins
    class LoggerPlugin extends challenges.Plugin {
      constructor() {
        super();
        this.name = 'logger';
      }

      onInitialize(app) {
        app.logger = {
          log: jest.fn()
        };
      }
    }

    class AuthPlugin extends challenges.Plugin {
      constructor() {
        super();
        this.name = 'auth';
        this.dependencies = ['logger'];
      }

      onInitialize(app) {
        app.auth = {
          login: jest.fn(),
          logout: jest.fn()
        };

        app.logger.log('Auth plugin initialized');
      }
    }

    // Registrar plugins
    pluginManager.register(new LoggerPlugin());
    pluginManager.register(new AuthPlugin());

    // Inicializar plugins
    pluginManager.initializePlugins();

    // Verificar que los plugins están disponibles
    expect(app.logger).toBeDefined();
    expect(app.auth).toBeDefined();

    // Verificar que las dependencias funcionaron
    expect(app.logger.log).toHaveBeenCalledWith('Auth plugin initialized');

    // Probar un hook de ciclo de vida
    pluginManager.triggerHook('beforeRequest', { url: '/test' });

    // Desregistrar un plugin
    pluginManager.unregister('logger');

    // Verificar que no se puede inicializar auth si su dependencia está desregistrada
    expect(() => {
      pluginManager.initializePlugins();
    }).toThrow(/dependency/i);
  });

  test('Reto 6: Patrón Multi-Provider - Inyección de Dependencias', () => {
    if (!hasChallenges) return;

    const container = new challenges.DependencyContainer();

    // Registrar providers simples
    container.register('config', {
      apiUrl: 'https://api.example.com',
      timeout: 5000
    });

    container.register('httpClient', (container) => {
      const config = container.resolve('config');
      return {
        get: jest.fn().mockImplementation((url) => {
          return Promise.resolve({ url, baseUrl: config.apiUrl });
        }),
        timeout: config.timeout
      };
    });

    container.register('userService', (container) => {
      const httpClient = container.resolve('httpClient');
      return {
        getUser: (id) => httpClient.get(`/users/${id}`),
        httpClient
      };
    });

    // Resolver dependencias
    const userService = container.resolve('userService');

    // Verificar que las dependencias se resolvieron correctamente
    expect(userService).toBeDefined();
    expect(userService.httpClient).toBeDefined();
    expect(userService.httpClient.timeout).toBe(5000);

    // Probar la funcionalidad
    return userService.getUser(123).then(result => {
      expect(result.url).toBe('/users/123');
      expect(result.baseUrl).toBe('https://api.example.com');
    });
  });

  test('Reto 7: Finite State Machine - Gestión de Estados', () => {
    if (!hasChallenges) return;

    // Definir una máquina de estados para un proceso de pedido
    const orderStateMachine = new challenges.StateMachine({
      initialState: 'draft',
      states: {
        draft: {
          transitions: {
            submit: 'pending'
          }
        },
        pending: {
          transitions: {
            approve: 'approved',
            reject: 'rejected'
          }
        },
        approved: {
          transitions: {
            ship: 'shipped',
            cancel: 'cancelled'
          }
        },
        shipped: {
          transitions: {
            deliver: 'delivered',
            return: 'returned'
          }
        },
        delivered: {
          transitions: {
            return: 'returned'
          }
        },
        rejected: {},
        cancelled: {},
        returned: {}
      }
    });

    // Estado inicial
    expect(orderStateMachine.getState()).toBe('draft');

    // Transición válida
    orderStateMachine.transition('submit');
    expect(orderStateMachine.getState()).toBe('pending');

    // Transición inválida
    expect(() => {
      orderStateMachine.transition('ship');
    }).toThrow();

    // Suscribirse a cambios de estado
    const observer = jest.fn();
    const unsubscribe = orderStateMachine.onTransition(observer);

    // Realizar otra transición
    orderStateMachine.transition('approve');
    expect(orderStateMachine.getState()).toBe('approved');

    // Verificar notificación
    expect(observer).toHaveBeenCalledWith({
      from: 'pending',
      to: 'approved',
      event: 'approve'
    });

    // Desuscribirse
    unsubscribe();

    // Transición final
    orderStateMachine.transition('ship');
    expect(orderStateMachine.getState()).toBe('shipped');

    // Verificar que no hay más notificaciones
    expect(observer).toHaveBeenCalledTimes(1);
  });

});


const {
  // Factory Method
  Transaction,
  PaymentTransaction,
  RefundTransaction,
  TransferTransaction,
  TransactionFactory,

  // Builder
  FinancialReportBuilder,
  ReportDirector,

  // Singleton
  AuditService,

  // Adapter
  PaymentProcessor,
  ExternalPaymentGateway,
  PaymentGatewayAdapter,

  // Decorator
  LoggingTransactionDecorator,
  ValidationTransactionDecorator,
  PerformanceTransactionDecorator,

  // Observer
  TransactionEventSubject,
  EmailNotifier,
  AuditLogger,
  DashboardUpdater,

  // Strategy
  paymentStrategies,
  PaymentProcessor as StrategyPaymentProcessor,

  // Chain of Responsibility
  TransactionValidator,
  AmountValidator,
  FraudValidator,
  AccountValidator,

  // Template Method
  TransactionProcessor,
  PaymentProcessor as TemplatePaymentProcessor,
  RefundProcessor,

  // Composite
  ReportComponent,
  ReportItem,
  ReportSection
} = require('./start');

// Intenta cargar los retos avanzados
let challenges;
try {
  challenges = require('./challenges');
} catch (error) {
  challenges = {};
}

// Tests para los ejercicios básicos
describe('3.2 Patrones de Diseño', () => {

  test('Ejercicio 1: Factory Method - Creación de Transacciones', () => {
    // Verificar que el factory existe y crea diferentes tipos
    const payment = TransactionFactory.createTransaction('payment', {
      id: 'P123',
      amount: 100,
      cardDetails: { number: '4111XXXXXXXXXXXX', expiry: '12/25' }
    });

    const refund = TransactionFactory.createTransaction('refund', {
      id: 'R456',
      amount: 50,
      originalTransactionId: 'P123'
    });

    const transfer = TransactionFactory.createTransaction('transfer', {
      id: 'T789',
      amount: 200,
      sourceAccount: 'ACC001',
      destinationAccount: 'ACC002'
    });

    // Verificar que cada tipo es una instancia correcta
    expect(payment).toBeInstanceOf(PaymentTransaction);
    expect(refund).toBeInstanceOf(RefundTransaction);
    expect(transfer).toBeInstanceOf(TransferTransaction);

    // Verificar propiedades específicas
    expect(payment.amount).toBe(100);
    expect(refund.originalTransactionId).toBe('P123');
    expect(transfer.sourceAccount).toBe('ACC001');
    expect(transfer.destinationAccount).toBe('ACC002');

    // Verificar que maneja tipos inválidos
    expect(() => {
      TransactionFactory.createTransaction('invalidType', { id: 'X999', amount: 100 });
    }).toThrow();
  });

  test('Ejercicio 2: Builder - Generador de Reportes Financieros', () => {
    // Verificar el Builder con method chaining
    const builder = new FinancialReportBuilder();

    const report = builder
      .withTitle('Informe Financiero Q2 2023')
      .withDate(new Date(2023, 5, 30))
      .withAuthor('John Doe')
      .addSection('Resumen Ejecutivo', { content: 'Análisis general del trimestre...' })
      .addSection('Ingresos', { data: [100, 200, 300], total: 600 })
      .addSection('Gastos', { data: [50, 75, 100], total: 225 })
      .withFooter('Informe generado automáticamente')
      .build();

    // Verificar estructura del reporte
    expect(report.title).toBe('Informe Financiero Q2 2023');
    expect(report.author).toBe('John Doe');
    expect(report.sections.length).toBe(3);
    expect(report.sections[0].title).toBe('Resumen Ejecutivo');
    expect(report.sections[1].data).toEqual([100, 200, 300]);
    expect(report.footer).toBe('Informe generado automáticamente');

    // Verificar que el Report Director funciona si está implementado
    if (ReportDirector) {
      const director = new ReportDirector();
      const builder2 = new FinancialReportBuilder();

      // Crear un reporte predefinido
      const monthlyReport = director.createMonthlyReport(builder2, {
        month: 'Junio',
        year: 2023
      });

      expect(monthlyReport).toBeDefined();
      expect(monthlyReport.title).toContain('Junio');
    }
  });

  test('Ejercicio 3: Singleton - Servicio de Auditoría', () => {
    // Verificar que se obtiene la misma instancia
    const instance1 = AuditService.getInstance();
    const instance2 = AuditService.getInstance();

    expect(instance1).toBe(instance2);

    // Verificar que no se puede instanciar directamente
    expect(() => {
      new AuditService();
    }).toThrow();

    // Probar funcionalidad
    instance1.logEvent('test', { action: 'login', user: 'admin' });
    instance1.logEvent('transaction', { id: 'T123', amount: 100 });

    const events = instance2.getEvents();
    expect(events.length).toBe(2);
    expect(events[0].type).toBe('test');
    expect(events[1].type).toBe('transaction');

    // Verificar búsqueda de eventos
    const transactionEvents = instance1.findEvents('transaction');
    expect(transactionEvents.length).toBe(1);
    expect(transactionEvents[0].data.id).toBe('T123');
  });

  test('Ejercicio 4: Adapter - Integración de Pasarela de Pago', () => {
    // Crear la pasarela externa y el adaptador
    const externalGateway = new ExternalPaymentGateway();
    const adapter = new PaymentGatewayAdapter(externalGateway);

    // Verificar que el adaptador implementa la interfaz que esperamos
    expect(typeof adapter.processPayment).toBe('function');

    // Probar la adaptación
    return adapter.processPayment({
      amount: 99.99,
      currency: 'USD',
      cardDetails: {
        number: '4111111111111111',
        expiry: '12/23',
        cvv: '123'
      }
    }).then(result => {
      // Verificar que la respuesta ha sido adaptada al formato esperado
      expect(result.success).toBe(true);
      expect(result.transactionId).toBeDefined();
    });
  });

  test('Ejercicio 5: Decorator - Transacciones con Características Adicionales', () => {
    // Crear una transacción base
    const transaction = new PaymentTransaction('P123', 100, new Date(), {
      cardNumber: '4111XXXXXXXXXXXX'
    });

    // Decorar con múltiples decoradores
    const validatedTransaction = new ValidationTransactionDecorator(transaction);
    const loggedTransaction = new LoggingTransactionDecorator(validatedTransaction);
    const measuredTransaction = new PerformanceTransactionDecorator(loggedTransaction);

    // Verificar que mantiene la misma interfaz
    expect(measuredTransaction).toHaveProperty('execute');
    expect(typeof measuredTransaction.execute).toBe('function');

    // Ejecutar con todos los decoradores
    const result = measuredTransaction.execute();

    // Verificar que el resultado final es el esperado
    expect(result.success).toBe(true);
    expect(result.transactionId).toBe('P123');

    // Verificar que cada decorador añade su propio comportamiento
    // lo comprobaremos por el formato del toString o por propiedades adicionales
    if (measuredTransaction.toString) {
      const str = measuredTransaction.toString();
      expect(str).toContain('Validation');
      expect(str).toContain('Logging');
      expect(str).toContain('Performance');
    }

    if (measuredTransaction.validationPassed !== undefined) {
      expect(measuredTransaction.validationPassed).toBe(true);
    }

    if (measuredTransaction.executionTime !== undefined) {
      expect(measuredTransaction.executionTime).toBeGreaterThanOrEqual(0);
    }
  });

  test('Ejercicio 6: Observer - Sistema de Notificaciones', () => {
    // Crear el subject
    const subject = new TransactionEventSubject();

    // Crear observadores
    const emailNotifier = new EmailNotifier();
    const auditLogger = new AuditLogger();
    const dashboardUpdater = new DashboardUpdater();

    // Espiar los métodos de update
    const emailSpy = jest.spyOn(emailNotifier, 'update');
    const auditSpy = jest.spyOn(auditLogger, 'update');
    const dashboardSpy = jest.spyOn(dashboardUpdater, 'update');

    // Suscribir observadores
    subject.subscribe(emailNotifier);
    subject.subscribe(auditLogger);
    subject.subscribe(dashboardUpdater);

    // Generar una notificación
    const eventData = {
      type: 'transaction.completed',
      transaction: { id: 'T123', amount: 100 },
      timestamp: new Date()
    };

    subject.notify(eventData);

    // Verificar que todos fueron notificados
    expect(emailSpy).toHaveBeenCalledWith(eventData);
    expect(auditSpy).toHaveBeenCalledWith(eventData);
    expect(dashboardSpy).toHaveBeenCalledWith(eventData);

    // Desuscribir un observador
    subject.unsubscribe(emailNotifier);

    // Generar otra notificación
    const eventData2 = {
      type: 'transaction.failed',
      transaction: { id: 'T124', amount: 200 },
      error: 'Insufficient funds',
      timestamp: new Date()
    };

    subject.notify(eventData2);

    // Verificar que solo fueron notificados los que siguen suscritos
    expect(emailSpy).toHaveBeenCalledTimes(1); // No cambió
    expect(auditSpy).toHaveBeenCalledTimes(2); // Incrementó
    expect(dashboardSpy).toHaveBeenCalledTimes(2); // Incrementó
  });

  test('Ejercicio 7: Strategy - Algoritmos de Procesamiento de Pagos', () => {
    // Verificar que existen las estrategias
    expect(paymentStrategies.creditCard).toBeDefined();
    expect(paymentStrategies.bankTransfer).toBeDefined();
    expect(paymentStrategies.digitalWallet).toBeDefined();

    // Crear procesador con estrategia inicial
    const processor = new StrategyPaymentProcessor(paymentStrategies.creditCard);

    // Datos de prueba
    const paymentData = {
      amount: 250,
      currency: 'USD',
      cardDetails: { number: '4111XXXXXXXXXXXX', expiry: '12/25' }
    };

    // Procesar con la estrategia inicial
    const result1 = processor.processPayment(paymentData);
    expect(result1).toBeDefined();

    // Cambiar estrategia y procesar de nuevo
    processor.setStrategy(paymentStrategies.bankTransfer);

    const result2 = processor.processPayment({
      amount: 500,
      currency: 'USD',
      accountNumber: 'ACC001',
      routingNumber: '123456789'
    });

    expect(result2).toBeDefined();

    // Verificar que cada estrategia procesa de forma diferente
    // (podemos comprobar si tienen diferentes propiedades)
    if (result1.paymentMethod && result2.paymentMethod) {
      expect(result1.paymentMethod).toBe('creditCard');
      expect(result2.paymentMethod).toBe('bankTransfer');
    }
  });

  test('Ejercicio 8: Chain of Responsibility - Validación de Transacciones', () => {
    // Crear los validadores
    const amountValidator = new AmountValidator();
    const fraudValidator = new FraudValidator();
    const accountValidator = new AccountValidator();

    // Crear la cadena
    amountValidator.setNext(fraudValidator);
    fraudValidator.setNext(accountValidator);

    // Transacción válida
    const validTransaction = {
      id: 'T123',
      amount: 100,
      account: 'ACC001',
      riskScore: 20
    };

    // Debe pasar todas las validaciones
    expect(amountValidator.validate(validTransaction)).toBe(true);

    // Transacción inválida por monto
    const invalidAmount = {
      id: 'T124',
      amount: -10, // Monto negativo
      account: 'ACC001',
      riskScore: 20
    };

    expect(amountValidator.validate(invalidAmount)).toBe(false);

    // Transacción inválida por riesgo de fraude
    const highRiskTransaction = {
      id: 'T125',
      amount: 100,
      account: 'ACC001',
      riskScore: 90 // Alto riesgo
    };

    expect(amountValidator.validate(highRiskTransaction)).toBe(false);

    // Transacción inválida por cuenta
    const invalidAccount = {
      id: 'T126',
      amount: 100,
      account: 'INVALID', // Cuenta inválida
      riskScore: 20
    };

    expect(amountValidator.validate(invalidAccount)).toBe(false);
  });

  test('Ejercicio 9: Template Method - Procesamiento de Transacciones', () => {
    // Instanciar procesadores concretos
    const paymentProcessor = new TemplatePaymentProcessor();
    const refundProcessor = new RefundProcessor();

    // Datos de transacciones
    const paymentTransaction = {
      id: 'P123',
      type: 'payment',
      amount: 100,
      source: 'credit_card'
    };

    const refundTransaction = {
      id: 'R456',
      type: 'refund',
      amount: 50,
      originalTransaction: 'P123'
    };

    // Procesar transacciones
    const paymentResult = paymentProcessor.processTransaction(paymentTransaction);
    const refundResult = refundProcessor.processTransaction(refundTransaction);

    // Verificar que ambos procesan correctamente
    expect(paymentResult.success).toBe(true);
    expect(refundResult.success).toBe(true);

    // Verificar que cada uno añade detalles específicos
    expect(paymentResult.transactionType).toBe('payment');
    expect(refundResult.transactionType).toBe('refund');

    // Verificar que se llamaron los hooks apropiados
    // (si se implementó con espías o flags para testing)
    if (paymentProcessor.hooksExecuted) {
      expect(paymentProcessor.hooksExecuted.preProcess).toBe(true);
      expect(paymentProcessor.hooksExecuted.postProcess).toBe(true);
    }
  });

  test('Ejercicio 10: Composite - Estructura de Reportes Jerárquicos', () => {
    // Crear items individuales (hojas)
    const item1 = new ReportItem('Item 1', { value: 100 });
    const item2 = new ReportItem('Item 2', { value: 200 });
    const item3 = new ReportItem('Item 3', { value: 150 });
    const item4 = new ReportItem('Item 4', { value: 300 });

    // Crear secciones (compuestos)
    const section1 = new ReportSection('Section 1');
    const section2 = new ReportSection('Section 2');
    const mainSection = new ReportSection('Main Report');

    // Construir jerarquía
    section1.addChild(item1);
    section1.addChild(item2);

    section2.addChild(item3);
    section2.addChild(item4);

    mainSection.addChild(section1);
    mainSection.addChild(section2);

    // Verificar cálculo del total
    expect(item1.getTotal()).toBe(100);
    expect(section1.getTotal()).toBe(300); // 100 + 200
    expect(mainSection.getTotal()).toBe(750); // (100 + 200) + (150 + 300)

    // Verificar renderizado
    const rendered = mainSection.render();
    expect(rendered).toBeDefined();

    // Verificar que es una estructura jerárquica
    if (typeof rendered === 'string') {
      expect(rendered).toContain('Main Report');
      expect(rendered).toContain('Section 1');
      expect(rendered).toContain('Item 1');
    } else if (typeof rendered === 'object') {
      expect(rendered.title).toBe('Main Report');
      expect(rendered.children.length).toBe(2);
      expect(rendered.children[0].title).toBe('Section 1');
      expect(rendered.children[0].children.length).toBe(2);
    }
  });

});

// Tests para los desafíos avanzados
describe('Retos avanzados de Patrones de Diseño', () => {
  const hasChallenges =
    typeof challenges.DatabaseConnectionManager === 'function' &&
    typeof challenges.MiddlewareChain === 'function' &&
    typeof challenges.createReactiveProxy === 'function' &&
    typeof challenges.EventStore === 'function' &&
    typeof challenges.PluginManager === 'function';

  beforeEach(() => {
    if (!hasChallenges) {
      console.log('⚠️ Los retos avanzados aún no han sido implementados');
    }
  });

  test('Reto 1: Lazy Singleton - Conexión a Base de Datos', () => {
    if (!hasChallenges) return;

    const connectionManager = challenges.DatabaseConnectionManager.getInstance();

    // Verificar que es un singleton
    expect(connectionManager).toBe(challenges.DatabaseConnectionManager.getInstance());

    // Verificar que no ha creado conexión todavía (lazy)
    expect(connectionManager.isConnected()).toBe(false);

    // Crear conexión
    const connection = connectionManager.getConnection('postgres');

    // Verificar que ahora sí está conectado
    expect(connectionManager.isConnected()).toBe(true);
    expect(connection).toBeDefined();

    // Verificar que se reutiliza la conexión
    const connection2 = connectionManager.getConnection('postgres');
    expect(connection).toBe(connection2);

    // Verificar diferentes tipos de bases de datos
    if (connectionManager.supportsMultipleDatabases) {
      const mongoConnection = connectionManager.getConnection('mongodb');
      expect(mongoConnection).toBeDefined();
      expect(mongoConnection).not.toBe(connection);
    }
  });

  test('Reto 2: Cadena de Promises - Middleware Pattern', () => {
    if (!hasChallenges) return;

    const middleware = new challenges.MiddlewareChain();

    // Middleware sync
    middleware.use((data, next) => {
      data.step1 = true;
      return next();
    });

    // Middleware async
    middleware.use(async (data, next) => {
      data.step2 = true;
      await new Promise(resolve => setTimeout(resolve, 10));
      return next();
    });

    // Middleware que detiene la cadena
    middleware.use((data, next) => {
      if (data.stop) {
        data.stopped = true;
        return Promise.resolve();
      }
      return next();
    });

    // Middleware que no debería ejecutarse si la cadena se detiene
    middleware.use((data, next) => {
      data.step3 = true;
      return next();
    });

    // Middleware de error
    middleware.catchError((err, data) => {
      data.error = err.message;
      return Promise.resolve();
    });

    // Probar ejecución normal
    return middleware.execute({ test: true })
      .then(data => {
        expect(data.step1).toBe(true);
        expect(data.step2).toBe(true);
        expect(data.step3).toBe(true);
      })
      .then(() => {
        // Probar detener la cadena
        return middleware.execute({ test: true, stop: true });
      })
      .then(data => {
        expect(data.step1).toBe(true);
        expect(data.step2).toBe(true);
        expect(data.stopped).toBe(true);
        expect(data.step3).toBeUndefined();
      })
      .then(() => {
        // Probar manejo de errores
        middleware.use(() => {
          throw new Error('Test error');
        });

        return middleware.execute({ test: true });
      })
      .then(data => {
        expect(data.error).toBe('Test error');
      });
  });

  test('Reto 3: Proxy Reactivo - Sistema de Datos Observables', () => {
    if (!hasChallenges) return;

    // Crear datos reactivos
    const state = challenges.createReactiveProxy({
      user: {
        name: 'John',
        preferences: {
          theme: 'dark'
        }
      },
      products: [
        { id: 1, name: 'Product 1' }
      ],
      counter: 0
    });

    // Verificar acceso a propiedades
    expect(state.user.name).toBe('John');
    expect(state.user.preferences.theme).toBe('dark');

    // Suscribirse a cambios
    const handler = jest.fn();
    const unsubscribe = state.$subscribe(handler);

    // Modificar datos
    state.user.name = 'Jane';

    // Verificar que se notificó el cambio
    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].path).toBe('user.name');
    expect(handler.mock.calls[0][0].value).toBe('Jane');

    // Modificar datos anidados
    state.user.preferences.theme = 'light';

    // Verificar notificación de cambio anidado
    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler.mock.calls[1][0].path).toBe('user.preferences.theme');

    // Desuscribirse
    unsubscribe();

    // Modificar de nuevo
    state.counter = 1;

    // Verificar que no hay más notificaciones
    expect(handler).toHaveBeenCalledTimes(2);

    // Probar tienda reactiva si está implementada
    if (challenges.ReactiveStore) {
      const store = new challenges.ReactiveStore({
        count: 0
      });

      const storeHandler = jest.fn();
      store.subscribe(storeHandler);

      store.update('count', 5);

      expect(storeHandler).toHaveBeenCalled();
      expect(store.getState().count).toBe(5);
    }
  });

  test('Reto 4: Event Sourcing - Patrón Command + Observer', () => {
    if (!hasChallenges) return;

    // Crear un event store
    const eventStore = new challenges.EventStore();

    // Crear comandos
    class AddUserCommand extends challenges.Command {
      constructor(userId, name) {
        super();
        this.userId = userId;
        this.name = name;
      }

      execute(state) {
        return {
          ...state,
          users: {
            ...state.users,
            [this.userId]: { id: this.userId, name: this.name }
          }
        };
      }
    }

    class UpdateUserCommand extends challenges.Command {
      constructor(userId, changes) {
        super();
        this.userId = userId;
        this.changes = changes;
      }

      execute(state) {
        return {
          ...state,
          users: {
            ...state.users,
            [this.userId]: {
              ...state.users[this.userId],
              ...this.changes
            }
          }
        };
      }
    }

    // Crear store eventsourced
    const store = new challenges.EventSourcedStore(eventStore, { users: {} });

    // Verificar observer funcionando
    const observer = jest.fn();
    store.subscribe(observer);

    // Aplicar comandos
    store.execute(new AddUserCommand('user1', 'John'));
    store.execute(new UpdateUserCommand('user1', { age: 30 }));

    // Verificar estado final
    expect(store.getState().users.user1.name).toBe('John');
    expect(store.getState().users.user1.age).toBe(30);

    // Verificar que el observador fue notificado
    expect(observer).toHaveBeenCalledTimes(2);

    // Verificar historial de eventos
    expect(eventStore.getEvents().length).toBe(2);

    // Verificar time travel
    const previousState = store.getStateAtIndex(0);
    expect(previousState.users.user1.name).toBe('John');
    expect(previousState.users.user1.age).toBeUndefined();
  });

  test('Reto 5: Plugin Architecture - Extensibilidad Modular', () => {
    if (!hasChallenges) return;

    // Crear aplicación base
    const app = new challenges.Application();

    // Crear gestor de plugins
    const pluginManager = new challenges.PluginManager(app);

    // Crear plugins
    class LoggerPlugin extends challenges.Plugin {
      constructor() {
        super();
        this.name = 'logger';
      }

      onInitialize(app) {
        app.logger = {
          log: jest.fn()
        };
      }
    }

    class AuthPlugin extends challenges.Plugin {
      constructor() {
        super();
        this.name = 'auth';
        this.dependencies = ['logger'];
      }

      onInitialize(app) {
        app.auth = {
          login: jest.fn(),
          logout: jest.fn()
        };

        app.logger.log('Auth plugin initialized');
      }
    }

    // Registrar plugins
    pluginManager.register(new LoggerPlugin());
    pluginManager.register(new AuthPlugin());

    // Inicializar plugins
    pluginManager.initializePlugins();

    // Verificar que los plugins están disponibles
    expect(app.logger).toBeDefined();
    expect(app.auth).toBeDefined();

    // Verificar que las dependencias funcionaron
    expect(app.logger.log).toHaveBeenCalledWith('Auth plugin initialized');

    // Probar un hook de ciclo de vida
    pluginManager.triggerHook('beforeRequest', { url: '/test' });

    // Desregistrar un plugin
    pluginManager.unregister('logger');

    // Verificar que no se puede inicializar auth si su dependencia está desregistrada
    expect(() => {
      pluginManager.initializePlugins();
    }).toThrow(/dependency/i);
  });

  test('Reto 6: Patrón Multi-Provider - Inyección de Dependencias', () => {
    if (!hasChallenges) return;

    const container = new challenges.DependencyContainer();

    // Registrar providers simples
    container.register('config', {
      apiUrl: 'https://api.example.com',
      timeout: 5000
    });

    container.register('httpClient', (container) => {
      const config = container.resolve('config');
      return {
        get: jest.fn().mockImplementation((url) => {
          return Promise.resolve({ url, baseUrl: config.apiUrl });
        }),
        timeout: config.timeout
      };
    });

    container.register('userService', (container) => {
      const httpClient = container.resolve('httpClient');
      return {
        getUser: (id) => httpClient.get(`/users/${id}`),
        httpClient
      };
    });

    // Resolver dependencias
    const userService = container.resolve('userService');

    // Verificar que las dependencias se resolvieron correctamente
    expect(userService).toBeDefined();
    expect(userService.httpClient).toBeDefined();
    expect(userService.httpClient.timeout).toBe(5000);

    // Probar la funcionalidad
    return userService.getUser(123).then(result => {
      expect(result.url).toBe('/users/123');
      expect(result.baseUrl).toBe('https://api.example.com');
    });
  });

  test('Reto 7: Finite State Machine - Gestión de Estados', () => {
    if (!hasChallenges) return;

    // Definir una máquina de estados para un proceso de pedido
    const orderStateMachine = new challenges.StateMachine({
      initialState: 'draft',
      states: {
        draft: {
          transitions: {
            submit: 'pending'
          }
        },
        pending: {
          transitions: {
            approve: 'approved',
            reject: 'rejected'
          }
        },
        approved: {
          transitions: {
            ship: 'shipped',
            cancel: 'cancelled'
          }
        },
        shipped: {
          transitions: {
            deliver: 'delivered',
            return: 'returned'
          }
        },
        delivered: {
          transitions: {
            return: 'returned'
          }
        },
        rejected: {},
        cancelled: {},
        returned: {}
      }
    });

    // Estado inicial
    expect(orderStateMachine.getState()).toBe('draft');

    // Transición válida
    orderStateMachine.transition('submit');
    expect(orderStateMachine.getState()).toBe('pending');

    // Transición inválida
    expect(() => {
      orderStateMachine.transition('ship');
    }).toThrow();

    // Suscribirse a cambios de estado
    const observer = jest.fn();
    const unsubscribe = orderStateMachine.onTransition(observer);

    // Realizar otra transición
    orderStateMachine.transition('approve');
    expect(orderStateMachine.getState()).toBe('approved');

    // Verificar notificación
    expect(observer).toHaveBeenCalledWith({
      from: 'pending',
      to: 'approved',
      event: 'approve'
    });

    // Desuscribirse
    unsubscribe();

    // Transición final
    orderStateMachine.transition('ship');
    expect(orderStateMachine.getState()).toBe('shipped');

    // Verificar que no hay más notificaciones
    expect(observer).toHaveBeenCalledTimes(1);
  });

});
