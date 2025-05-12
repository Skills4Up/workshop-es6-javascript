/**
 * 3.2 Patrones de Diseño en JavaScript Moderno
 * ============================================
 *
 * Este archivo contiene ejercicios para implementar patrones de diseño
 * comunes utilizando características modernas de JavaScript ES6+.
 */

// =========================================================================
// EJERCICIO 1: Factory Method - Creación de Transacciones
// =========================================================================
/**
 * Implementa un Factory Method que cree diferentes tipos de transacciones
 * financieras basadas en el tipo solicitado.
 *
 * - Debe soportar al menos 3 tipos: "payment", "refund", "transfer"
 * - Cada tipo debe tener propiedades específicas
 * - Usar métodos estáticos para implementar el factory
 */

// Clase base Transaction
export class Transaction {
  constructor(id, amount, date = new Date()) {
    this.id = id;
    this.amount = amount;
    this.date = date;
    this.status = 'pending';
  }

  execute() {
    this.status = 'completed';
    return { success: true, transactionId: this.id };
  }
}

// Clases específicas
export class PaymentTransaction extends Transaction {
  // IMPLEMENTAR:
  // - Constructor con propiedades específicas
  // - Sobrescribir el método execute si es necesario
}

export class RefundTransaction extends Transaction {
  // IMPLEMENTAR:
  // - Constructor con propiedades específicas
  // - Sobrescribir el método execute si es necesario
}

export class TransferTransaction extends Transaction {
  // IMPLEMENTAR:
  // - Constructor con propiedades específicas
  // - Sobrescribir el método execute si es necesario
}

// Factory
export class TransactionFactory {
  // IMPLEMENTAR:
  // - Método estático createTransaction para crear el tipo apropiado
  // - Validaciones necesarias
}

// =========================================================================
// EJERCICIO 2: Builder - Generador de Reportes Financieros
// =========================================================================
/**
 * Implementa un Builder para construir objetos de reporte financiero complejos
 * con múltiples secciones y formatos.
 *
 * - Debe permitir añadir diferentes secciones (encabezado, resumen, detalle, etc.)
 * - Debe permitir generar el reporte en diferentes formatos
 * - Debe usar method chaining para una API fluida
 */
export class FinancialReportBuilder {
  // IMPLEMENTAR:
  // - Constructor que inicialice el objeto reporte
  // - Métodos para añadir diferentes partes del reporte
  // - Método build para devolver el reporte final
}

// Director opcional que conoce el orden para construir reportes específicos
export class ReportDirector {
  // IMPLEMENTAR:
  // - Métodos para construir reportes predefinidos usando el builder
}

// =========================================================================
// EJERCICIO 3: Singleton - Servicio de Auditoría
// =========================================================================
/**
 * Implementa un Singleton para un servicio de auditoría que registre
 * todas las operaciones críticas del sistema.
 *
 * - Debe garantizar una única instancia
 * - Debe mantener un registro de eventos
 * - Debe permitir consultar el historial de eventos
 */
export class AuditService {
  // IMPLEMENTAR:
  // - Campo estático privado para la instancia
  // - Método estático getInstance()
  // - Método para registrar eventos
  // - Método para consultar eventos
}

// =========================================================================
// EJERCICIO 4: Adapter - Integración de Pasarela de Pago
// =========================================================================
/**
 * Implementa un Adapter para integrar una pasarela de pago externa
 * con una interfaz diferente a la esperada por nuestro sistema.
 *
 * - La pasarela externa usa una interfaz incompatible
 * - Nuestro sistema espera una interfaz específica
 * - El adapter debe traducir entre ambas interfaces
 */

// Interfaz que espera nuestro sistema
export class PaymentProcessor {
  processPayment(payment) {
    // Espera un objeto con: { amount, currency, cardDetails }
    // y devuelve una promesa con { success, transactionId }
  }
}

// Simulación de la pasarela de pago externa con interfaz incompatible
export class ExternalPaymentGateway {
  constructor() {
    this.name = 'ExternalGateway';
  }

  makePayment(paymentData) {
    // Espera: { value, currencyCode, cardInfo, metadata }
    // Devuelve promesa con: { result, id, timestamp }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          result: 'OK',
          id: `TX-${Date.now()}`,
          timestamp: new Date().toISOString()
        });
      }, 100);
    });
  }
}

// Adapter para la pasarela externa
export class PaymentGatewayAdapter {
  // IMPLEMENTAR:
  // - Constructor que recibe la instancia de la pasarela externa
  // - Método que adapta la interfaz esperada a la interfaz externa
}

// =========================================================================
// EJERCICIO 5: Decorator - Transacciones con Características Adicionales
// =========================================================================
/**
 * Implementa Decorators para añadir comportamientos a las transacciones:
 * logging, validación, encriptación, etc.
 *
 * - Cada decorator debe envolver una transacción y añadir funcionalidad
 * - Los decorators deben ser apilables (se pueden combinar)
 * - Deben mantener la misma interfaz que la clase original
 */

// Decorador para logging
export class LoggingTransactionDecorator {
  // IMPLEMENTAR:
  // - Constructor que recibe una transacción
  // - Método execute que añade logging antes y después
}

// Decorador para validación
export class ValidationTransactionDecorator {
  // IMPLEMENTAR:
  // - Constructor que recibe una transacción
  // - Método execute que valida antes de ejecutar
}

// Decorador para medición de rendimiento
export class PerformanceTransactionDecorator {
  // IMPLEMENTAR:
  // - Constructor que recibe una transacción
  // - Método execute que mide el tiempo de ejecución
}

// =========================================================================
// EJERCICIO 6: Observer - Sistema de Notificaciones
// =========================================================================
/**
 * Implementa un Observer para un sistema de notificaciones que informe
 * a múltiples componentes sobre eventos de transacciones.
 *
 * - Debe permitir suscribirse y desuscribirse de eventos
 * - Debe notificar a todos los observadores cuando ocurre un evento
 * - Debe pasar datos relevantes a los observadores
 */

// Sujeto observable
export class TransactionEventSubject {
  // IMPLEMENTAR:
  // - Colección de observadores
  // - Métodos para suscribir y desuscribir
  // - Método para notificar eventos
}

// Observadores concretos
export class EmailNotifier {
  // IMPLEMENTAR:
  // - Método update que recibe datos del evento
}

export class AuditLogger {
  // IMPLEMENTAR:
  // - Método update que recibe datos del evento
}

export class DashboardUpdater {
  // IMPLEMENTAR:
  // - Método update que recibe datos del evento
}

// =========================================================================
// EJERCICIO 7: Strategy - Algoritmos de Procesamiento de Pagos
// =========================================================================
/**
 * Implementa el patrón Strategy para permitir diferentes algoritmos
 * de procesamiento de pagos (tarjeta, transferencia, etc.)
 *
 * - Debe definir una interfaz común para todas las estrategias
 * - Debe permitir cambiar la estrategia en tiempo de ejecución
 * - Cada estrategia debe implementar su lógica específica
 */

// Estrategias concretas
export const paymentStrategies = {
  // IMPLEMENTAR:
  // - Estrategia para tarjeta de crédito
  // - Estrategia para transferencia bancaria
  // - Estrategia para monedero digital
};

// Contexto que usa las estrategias
export class PaymentProcessor {
  // IMPLEMENTAR:
  // - Constructor que recibe una estrategia
  // - Método para establecer una nueva estrategia
  // - Método para procesar el pago usando la estrategia actual
}

// =========================================================================
// EJERCICIO 8: Chain of Responsibility - Validación de Transacciones
// =========================================================================
/**
 * Implementa Chain of Responsibility para validar transacciones
 * pasando la solicitud a través de varios validadores.
 *
 * - Cada handler debe decidir procesar y/o pasar al siguiente
 * - La cadena debe ser configurable
 * - Debe proporcionar un resultado final de validación
 */

// Handler base abstracto
export class TransactionValidator {
  // IMPLEMENTAR:
  // - Campo para el siguiente validador
  // - Método para establecer el siguiente validador
  // - Método validate abstracto
}

// Handlers concretos
export class AmountValidator extends TransactionValidator {
  // IMPLEMENTAR:
  // - Lógica de validación específica
  // - Llamada al siguiente validador si procede
}

export class FraudValidator extends TransactionValidator {
  // IMPLEMENTAR:
  // - Lógica de validación específica
  // - Llamada al siguiente validador si procede
}

export class AccountValidator extends TransactionValidator {
  // IMPLEMENTAR:
  // - Lógica de validación específica
  // - Llamada al siguiente validador si procede
}

// =========================================================================
// EJERCICIO 9: Template Method - Procesamiento de Transacciones
// =========================================================================
/**
 * Implementa Template Method para definir el esqueleto de un algoritmo
 * de procesamiento de transacciones, permitiendo que las subclases
 * redefinan ciertos pasos.
 *
 * - La clase base debe definir el esqueleto del algoritmo
 * - Las subclases deben implementar pasos específicos
 * - Debe incluir "ganchos" opcionales para las subclases
 */

// Clase base con template method
export class TransactionProcessor {
  // IMPLEMENTAR:
  // - Método principal que define el algoritmo
  // - Métodos abstractos que las subclases deben implementar
  // - Métodos "gancho" opcionales

  // Ejemplo:
  processTransaction(transaction) {
    this.validateTransaction(transaction);
    this.preProcess(transaction); // Hook opcional
    const result = this.executeTransaction(transaction);
    this.postProcess(transaction, result); // Hook opcional
    return result;
  }

  // Métodos abstractos y hooks...
}

// Subclases concretas
export class PaymentProcessor extends TransactionProcessor {
  // IMPLEMENTAR:
  // - Implementaciones específicas de los métodos abstractos
  // - Posibles redefiniciones de los hooks
}

export class RefundProcessor extends TransactionProcessor {
  // IMPLEMENTAR:
  // - Implementaciones específicas de los métodos abstractos
  // - Posibles redefiniciones de los hooks
}

// =========================================================================
// EJERCICIO 10: Composite - Estructura de Reportes Jerárquicos
// =========================================================================
/**
 * Implementa Composite para representar una estructura jerárquica
 * de reportes financieros (secciones, subsecciones, elementos).
 *
 * - Debe definir una interfaz común para componentes simples y compuestos
 * - Los componentes compuestos pueden contener otros componentes
 * - Debe permitir operar sobre toda la estructura uniformemente
 */

// Interfaz de componente
export class ReportComponent {
  // IMPLEMENTAR:
  // - Métodos comunes: render, getTotal, etc.
}

// Componente hoja
export class ReportItem extends ReportComponent {
  // IMPLEMENTAR:
  // - Implementación de los métodos para componentes simples
}

// Componente compuesto
export class ReportSection extends ReportComponent {
  // IMPLEMENTAR:
  // - Lista de hijos (componentes)
  // - Métodos para añadir/eliminar hijos
  // - Implementación de métodos que opera sobre los hijos
}

