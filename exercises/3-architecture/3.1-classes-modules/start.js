/**
 * 3.1 Clases y Módulos en JavaScript Moderno
 * ==========================================
 *
 * Este archivo contiene ejercicios para implementar un sistema financiero
 * utilizando clases ES6+ y módulos.
 *
 * Nota: Para este ejercicio asumimos que estamos en un entorno donde los
 * módulos ES pueden ser utilizados sin transpilación.
 */

// =========================================================================
// EJERCICIO 1: Clase Base - Cuenta Bancaria
// =========================================================================
/**
 * Implementa una clase base para representar una cuenta bancaria
 * - Debe tener campos privados para saldo y número de cuenta
 * - Debe incluir getters para acceder a los campos privados
 * - Debe tener métodos para depositar y retirar fondos
 * - Debe incluir validación para operaciones inválidas
 */
export class BankAccount {
  // IMPLEMENTAR:
  // - Usar # para campos privados
  // - Crear constructor que inicialice los campos
  // - Implementar getters
  // - Implementar métodos depositar, retirar, etc.

  #balance = 0;
  #accountNumber;

  constructor(accountHolder, initialBalance = 0) {
    this.accountHolder = accountHolder;
    this.#balance = initialBalance;
    this.#accountNumber = this.#generateAccountNumber();
  }

  get balance() {
    return this.#balance;
  }

  get accountNumber() {
    return this.#accountNumber;
  }
}

// =========================================================================
// EJERCICIO 2: Herencia - Cuenta de Ahorro
// =========================================================================
/**
 * Implementa una clase que herede de BankAccount para representar una
 * cuenta de ahorro con funcionalidad específica.
 * - Debe heredar todas las funcionalidades de BankAccount
 * - Debe añadir un campo privado para la tasa de interés
 * - Debe incluir un método para aplicar interés al saldo
 * - Debe sobrescribir el método de retiro para agregar validación adicional
 */
export class SavingsAccount extends BankAccount {
  // IMPLEMENTAR:
  // - Usar super() en el constructor
  // - Crear campo privado para tasa de interés
  // - Implementar método para aplicar interés
  // - Sobrescribir método retirar para validaciones adicionales
}

// =========================================================================
// EJERCICIO 3: Clase Estática - Generador de Cuentas
// =========================================================================
/**
 * Implementa una clase con métodos estáticos para generar y validar
 * números de cuenta bancaria.
 * - Debe tener un método estático para generar números de cuenta
 * - Debe tener un método estático para validar números de cuenta
 * - Debe tener constantes estáticas para configuración
 */
export class AccountGenerator {
  // IMPLEMENTAR:
  // - Crear campos estáticos
  // - Implementar método estático para generar números de cuenta
  // - Implementar método estático para validar números de cuenta
}

// =========================================================================
// EJERCICIO 4: Composición - Transacción Bancaria
// =========================================================================
/**
 * Implementa una clase que represente una transacción bancaria.
 * - Debe incluir información sobre origen, destino, monto y fecha
 * - Debe generar automáticamente un ID único para cada transacción
 * - Debe tener un método para verificar si la transacción es válida
 * - Debe tener una representación en string del objeto
 */
export class Transaction {
  // IMPLEMENTAR:
  // - Crear constructor con parámetros necesarios
  // - Implementar método para validar transacción
  // - Implementar método toString o toJSON
}

// =========================================================================
// EJERCICIO 5: Enumeración - Tipos de Cuenta
// =========================================================================
/**
 * Implementa una "enumeración" para tipos de cuentas utilizando
 * Object.freeze para hacerla inmutable.
 * - Debe definir diferentes tipos de cuenta (Checking, Savings, Investment)
 * - Debe incluir métodos para verificar si un tipo es válido
 * - Debe ser inmutable (Object.freeze)
 */
export const AccountType = (function () {
  // IMPLEMENTAR:
  // - Definir constantes para los tipos
  // - Añadir método para validar un tipo
  // - Usar Object.freeze para hacer inmutable el objeto
  // - Devolver objeto congelado
})();

// =========================================================================
// EJERCICIO 6: Patrón Singleton - Sistema Bancario
// =========================================================================
/**
 * Implementa una clase que utilice el patrón Singleton para
 * representar un sistema bancario centralizado.
 * - Debe aplicar el patrón Singleton (una sola instancia)
 * - Debe mantener un registro de todas las cuentas y transacciones
 * - Debe proveer métodos para crear cuentas y realizar transferencias
 */
export class BankSystem {
  // IMPLEMENTAR:
  // - Crear campo estático para instancia única
  // - Hacer private el constructor
  // - Crear método getInstance() estático
  // - Implementar métodos para añadir cuentas y realizar transferencias
}

// =========================================================================
// EJERCICIO 7: Herencia Múltiple - Cuenta Premium
// =========================================================================
/**
 * Implementa una clase que simule "herencia múltiple" combinando
 * comportamientos de diferentes clases/mixins.
 *
 * En JavaScript no hay herencia múltiple nativa, pero podemos
 * simularla con composición y mixins.
 *
 * - Debe combinar comportamientos de cuenta de ahorro y cuenta de inversión
 * - Debe usar un enfoque de composición para agregar funcionalidades
 */

// Un mixin es una clase que contiene métodos que pueden ser utilizados por otras clases
export const InvestmentMixin = {
  // IMPLEMENTAR:
  // - Añadir métodos relacionados con inversiones
  invest(amount, instrument) {
    // Lógica de inversión
  },

  calculateReturns() {
    // Cálculo de rendimientos
  }
};

export const RewardsMixin = {
  // IMPLEMENTAR:
  // - Añadir métodos relacionados con recompensas
  addRewardPoints(amount) {
    // Lógica de puntos de recompensa
  },

  redeemPoints(points) {
    // Canjear puntos
  }
};

export class PremiumAccount extends SavingsAccount {
  // IMPLEMENTAR:
  // - Extender SavingsAccount
  // - Incorporar métodos de InvestmentMixin y RewardsMixin
  // - Implementar lógica específica de PremiumAccount
}

// =========================================================================
// EJERCICIO 8: Interfaz - Cliente Bancario
// =========================================================================
/**
 * En JavaScript no hay interfaces nativas como en TypeScript o Java,
 * pero podemos implementar un patrón similar usando clases abstractas
 * o validación en tiempo de ejecución.
 *
 * Implementa una "interfaz" para un cliente bancario:
 * - Debe definir un contrato que otras clases deben implementar
 * - Debe incluir validación en tiempo de ejecución
 */
export class BankClient {
  // IMPLEMENTAR:
  // - Crear un "contrato" que otras clases deben seguir
  // - Añadir validación para asegurar que las clases implementen correctamente

  constructor() {
    // Asegurar que esta clase no se instancia directamente
    if (this.constructor === BankClient) {
      throw new Error('BankClient is an abstract class and cannot be instantiated directly');
    }

    // Verificar que los métodos requeridos estén implementados
    const requiredMethods = ['getName', 'getIdentification', 'getContactInfo'];
    for (const method of requiredMethods) {
      if (typeof this[method] !== 'function') {
        throw new Error(`BankClient subclass must implement ${method}() method`);
      }
    }
  }

  // Métodos que deben ser implementados por subclases
  getName() { throw new Error('Method not implemented'); }
  getIdentification() { throw new Error('Method not implemented'); }
  getContactInfo() { throw new Error('Method not implemented'); }
}

// =========================================================================
// EJERCICIO 9: Implementación de Cliente Bancario
// =========================================================================
/**
 * Implementa una clase que siga la "interfaz" de BankClient.
 * - Debe extender BankClient
 * - Debe implementar todos los métodos requeridos
 * - Debe añadir funcionalidades específicas para clientes personales
 */
export class PersonalClient extends BankClient {
  // IMPLEMENTAR:
  // - Extender BankClient
  // - Implementar todos los métodos requeridos
  // - Añadir funcionalidad específica para clientes personales
}

// =========================================================================
// EJERCICIO 10: Módulo de Utilidades Financieras
// =========================================================================
/**
 * Implementa un módulo de utilidades financieras.
 * - Debe exportar funciones para cálculos financieros comunes
 * - Debe exportar clases de ayuda para informes y análisis
 */

// Función para calcular interés compuesto
export function calculateCompoundInterest(principal, rate, time, frequency = 1) {
  // IMPLEMENTAR: Cálculo de interés compuesto
}

// Función para calcular pagos de préstamos
export function calculateLoanPayment(principal, rate, time) {
  // IMPLEMENTAR: Cálculo de pagos de préstamos
}

// Clase para generar informes financieros
export class FinancialReport {
  // IMPLEMENTAR: Clase para generación de informes
}

// Exportación por defecto del módulo
export default {
  calculateCompoundInterest,
  calculateLoanPayment,
  FinancialReport
};

// Nota: En un proyecto real, cada una de estas clases y módulos estaría en su propio archivo.
// Para simplificar este ejercicio, hemos puesto todo en un solo archivo.

