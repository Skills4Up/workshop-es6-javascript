# 3.2 Patrones de Diseño en JavaScript Moderno

## 🎯 Objetivo

Dominar los patrones de diseño esenciales en JavaScript moderno para crear arquitecturas más robustas, mantenibles y escalables, aprovechando las características de ES6+ para implementaciones elegantes y efectivas.

## 🌍 Contexto Real

Como desarrollador senior en una empresa de tecnología financiera, te han asignado liderar la implementación de un nuevo sistema de procesamiento de transacciones. El sistema debe ser altamente modular, extensible y tener componentes que puedan interactuar entre sí de manera desacoplada. Los requerimientos incluyen:

1. Una arquitectura que permita añadir nuevos tipos de transacciones sin modificar el código existente
2. Un sistema de notificación que alerte sobre eventos importantes a múltiples componentes
3. Un mecanismo para crear objetos complejos con configuraciones variables
4. Una forma eficiente de compartir recursos entre múltiples partes del sistema
5. Estrategias intercambiables para procesar diferentes tipos de datos

## 📋 Instrucciones

1. Abre el archivo `start.js` que contiene las estructuras base para implementar varios patrones de diseño
2. Implementa cada patrón siguiendo los comentarios y requerimientos detallados
3. Ejecuta los tests con `npm test exercises/3-architecture/3.2-patterns` para validar tu implementación
4. Después de completar las implementaciones básicas, avanza a los desafíos en `challenges.js`

## 🧩 Patrones de Diseño Incluidos

### Patrones Creacionales

- **Factory Method**: Crea objetos sin especificar la clase exacta a crear
  ```javascript
  // Implementación moderna con clases y métodos estáticos
  class TransactionFactory {
    static createTransaction(type, data) {
      // Lógica para crear diferentes tipos de transacciones
    }
  }
  ```

- **Builder**: Construye objetos complejos paso a paso
  ```javascript
  // Versión fluida con method chaining
  class ReportBuilder {
    constructor() {
      this.report = {};
    }
    
    withTitle(title) {
      this.report.title = title;
      return this; // Permite encadenamiento
    }
    
    withDate(date) {
      this.report.date = date;
      return this;
    }
    
    build() {
      return { ...this.report }; // Devuelve una copia inmutable
    }
  }
  ```

- **Singleton**: Asegura una única instancia de una clase
  ```javascript
  // Implementación moderna con módulos ES
  class DatabaseConnection {
    static #instance = null;
    
    static getInstance() {
      if (!DatabaseConnection.#instance) {
        DatabaseConnection.#instance = new DatabaseConnection();
      }
      return DatabaseConnection.#instance;
    }
    
    // Constructor privado
    constructor() {
      if (DatabaseConnection.#instance) {
        throw new Error("Use getInstance() instead");
      }
    }
  }
  ```

### Patrones Estructurales

- **Adapter**: Permite que interfaces incompatibles trabajen juntas
  ```javascript
  // Adaptando una API externa a nuestra interfaz esperada
  class PaymentApiAdapter {
    constructor(externalPaymentApi) {
      this.api = externalPaymentApi;
    }
    
    processPayment(amount, currency) {
      // Adapta nuestra interfaz simple a la compleja API externa
      return this.api.makeTransaction({
        value: amount,
        currencyCode: currency,
        timestamp: Date.now()
      });
    }
  }
  ```

- **Decorator**: Añade responsabilidades a objetos dinámicamente
  ```javascript
  // Decorador moderno usando clases y composición
  class LoggingTransactionDecorator {
    constructor(transaction) {
      this.transaction = transaction;
    }
    
    execute() {
      console.log(`Executing transaction ${this.transaction.id}`);
      const result = this.transaction.execute();
      console.log(`Transaction completed with result: ${result}`);
      return result;
    }
  }
  ```

### Patrones de Comportamiento

- **Observer**: Define una dependencia uno-a-muchos entre objetos
  ```javascript
  // Implementación usando Set para almacenar observadores
  class TransactionSubject {
    #observers = new Set();
    
    subscribe(observer) {
      this.#observers.add(observer);
      return () => this.#observers.delete(observer); // Función para desuscribirse
    }
    
    notify(data) {
      this.#observers.forEach(observer => observer.update(data));
    }
  }
  ```

- **Strategy**: Define una familia de algoritmos intercambiables
  ```javascript
  // Estrategias como objetos con métodos
  const paymentStrategies = {
    creditCard: {
      process(payment) {
        // Lógica para procesar pago con tarjeta
      }
    },
    
    bankTransfer: {
      process(payment) {
        // Lógica para procesar transferencia bancaria
      }
    }
  };
  
  class PaymentProcessor {
    constructor(strategy) {
      this.strategy = strategy;
    }
    
    processPayment(payment) {
      return this.strategy.process(payment);
    }
  }
  ```

- **Chain of Responsibility**: Pasa solicitudes a lo largo de una cadena de handlers
  ```javascript
  class TransactionValidator {
    #nextValidator = null;
    
    setNext(validator) {
      this.#nextValidator = validator;
      return validator; // Para encadenamiento
    }
    
    validate(transaction) {
      if (this.#nextValidator) {
        return this.#nextValidator.validate(transaction);
      }
      return true; // Validación exitosa
    }
  }
  ```

## 🔄 Comparación con Implementaciones Tradicionales

| Patrón    | Implementación ES5                            | Implementación ES6+                   |
| --------- | --------------------------------------------- | ------------------------------------- |
| Factory   | Funciones constructoras con prototipos        | Clases con métodos estáticos          |
| Builder   | Métodos anidados con contexto `this` complejo | Method chaining con arrow functions   |
| Singleton | Closures y variables de módulo                | Clases con campos estáticos privados  |
| Observer  | Arrays para almacenar callbacks               | Sets y métodos de arrays funcionales  |
| Strategy  | Objetos con funciones                         | Clases o funciones arrow encapsuladas |

## 📚 Recursos Adicionales

- [Patrones de Diseño en JavaScript (Refactoring Guru)](https://refactoring.guru/design-patterns/javascript)
- [JavaScript Design Patterns (Addy Osmani)](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
- [Patrones de Diseño Modernos en JavaScript (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

