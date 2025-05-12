/**
 * Tests para el módulo de Clases y Módulos
 */
const {
  BankAccount,
  SavingsAccount,
  AccountGenerator,
  Transaction,
  AccountType,
  BankSystem,
  InvestmentMixin,
  RewardsMixin,
  PremiumAccount,
  BankClient,
  PersonalClient,
  calculateCompoundInterest,
  calculateLoanPayment,
  FinancialReport,
  default: FinancialUtils
} = require('./start');

describe('3.1 Clases y Módulos', () => {

  test('Ejercicio 1: Clase Base - Cuenta Bancaria', () => {
    const account = new BankAccount('John Doe', 1000);

    // Verificar que la clase se ha implementado correctamente
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.accountHolder).toBe('John Doe');
    expect(account.balance).toBe(1000);
    expect(account.accountNumber).toBeDefined();

    // Verificar campos privados (deben ser inaccesibles directamente)
    expect(account['#balance']).toBeUndefined();
    expect(account['#accountNumber']).toBeUndefined();

    // Verificar métodos
    expect(account.deposit(500)).toBe(1500);
    expect(account.balance).toBe(1500);

    expect(account.withdraw(300)).toBe(1200);
    expect(account.balance).toBe(1200);

    // Verificar validaciones
    expect(() => account.deposit(-100)).toThrow();
    expect(() => account.withdraw(5000)).toThrow('Insufficient funds');
  });

  test('Ejercicio 2: Herencia - Cuenta de Ahorro', () => {
    const savingsAccount = new SavingsAccount('Jane Smith', 2000, 0.05);

    // Verificar que hereda correctamente de BankAccount
    expect(savingsAccount).toBeInstanceOf(BankAccount);
    expect(savingsAccount).toBeInstanceOf(SavingsAccount);

    // Verificar propiedades específicas
    expect(savingsAccount.accountHolder).toBe('Jane Smith');
    expect(savingsAccount.balance).toBe(2000);
    expect(savingsAccount.interestRate).toBe(0.05);

    // Verificar métodos heredados
    expect(savingsAccount.deposit(1000)).toBe(3000);
    expect(savingsAccount.withdraw(500)).toBe(2500);

    // Verificar método específico
    expect(savingsAccount.applyInterest()).toBe(2625); // 2500 + (2500 * 0.05)

    // Verificar que el método withdraw ha sido sobrescrito con validación adicional
    if (savingsAccount.withdraw.toString() !== BankAccount.prototype.withdraw.toString()) {
      // Si el método fue sobrescrito, debe tener validaciones adicionales
      const miniAccount = new SavingsAccount('Mini', 150);
      expect(() => miniAccount.withdraw(100)).toThrow(); // Debería fallar si el saldo queda por debajo del mínimo
    }
  });

  test('Ejercicio 3: Clase Estática - Generador de Cuentas', () => {
    // Verificar métodos estáticos
    const accountNumber = AccountGenerator.generateAccountNumber();
    expect(typeof accountNumber).toBe('string');
    expect(accountNumber.length).toBeGreaterThan(0);

    // Verificar validación
    expect(AccountGenerator.validateAccountNumber(accountNumber)).toBe(true);
    expect(AccountGenerator.validateAccountNumber('INVALID')).toBe(false);

    // Verificar que está usando campos estáticos
    expect(AccountGenerator.PREFIX).toBeDefined();

    // No debe ser instanciable o al menos no es necesario
    if (AccountGenerator.prototype.constructor === AccountGenerator) {
      // Si es una clase normal, debe tener métodos estáticos
      expect(typeof AccountGenerator.generateAccountNumber).toBe('function');
    }
  });

  test('Ejercicio 4: Composición - Transacción Bancaria', () => {
    const sourceAccount = new BankAccount('Source', 1000);
    const targetAccount = new BankAccount('Target', 500);

    const transaction = new Transaction(sourceAccount, targetAccount, 300);

    // Verificar estructura
    expect(transaction.id).toBeDefined();
    expect(transaction.sourceAccount).toBe(sourceAccount);
    expect(transaction.targetAccount).toBe(targetAccount);
    expect(transaction.amount).toBe(300);
    expect(transaction.date).toBeInstanceOf(Date);

    // Verificar validación
    const validationResult = transaction.validate();
    expect(validationResult.valid).toBe(true);

    // Verificar validación negativa
    const invalidTransaction = new Transaction(sourceAccount, targetAccount, 5000);
    const invalidResult = invalidTransaction.validate();
    expect(invalidResult.valid).toBe(false);

    // Verificar método toString/toJSON
    const str = transaction.toString();
    expect(typeof str).toBe('string');
    expect(str).toContain('300');

    if (transaction.toJSON) {
      const json = transaction.toJSON();
      expect(json.id).toBe(transaction.id);
      expect(json.amount).toBe(300);
    }
  });

  test('Ejercicio 5: Enumeración - Tipos de Cuenta', () => {
    // Verificar que AccountType es inmutable
    const initialKeys = Object.keys(AccountType).sort();
    try {
      AccountType.NEW_TYPE = 'new';
    } catch (e) {
      // Si falla al añadir una propiedad, está bien
    }
    const afterKeys = Object.keys(AccountType).sort();
    expect(afterKeys).toEqual(initialKeys);

    // Verificar valores
    expect(AccountType.CHECKING).toBeDefined();
    expect(AccountType.SAVINGS).toBeDefined();
    expect(AccountType.INVESTMENT).toBeDefined();

    // Verificar método de validación
    expect(AccountType.isValid(AccountType.CHECKING)).toBe(true);
    expect(AccountType.isValid('invalid')).toBe(false);

    // Verificar que fue creado con Object.freeze
    expect(Object.isFrozen(AccountType)).toBe(true);
  });

  test('Ejercicio 6: Patrón Singleton - Sistema Bancario', () => {
    // Verificar que es un singleton
    const instance1 = BankSystem.getInstance();
    const instance2 = BankSystem.getInstance();
    expect(instance1).toBe(instance2);

    // Verificar que el constructor directo está protegido
    let threwError = false;
    try {
      new BankSystem();
    } catch (e) {
      threwError = true;
    }
    expect(threwError).toBe(true);

    // Verificar funcionalidad básica
    const bankSystem = BankSystem.getInstance();
    const account = new BankAccount('Test User', 1000);

    bankSystem.addAccount(account);
    expect(bankSystem.getAccount(account.accountNumber)).toBe(account);

    // Verificar validaciones
    expect(() => bankSystem.addAccount('not an account')).toThrow();

    // Verificar transferencias si está implementado
    if (typeof bankSystem.transfer === 'function') {
      const account1 = new BankAccount('User 1', 1000);
      const account2 = new BankAccount('User 2', 500);

      bankSystem.addAccount(account1);
      bankSystem.addAccount(account2);

      const transaction = bankSystem.transfer(
        account1.accountNumber,
        account2.accountNumber,
        300
      );

      expect(account1.balance).toBe(700);
      expect(account2.balance).toBe(800);
      expect(transaction).toBeDefined();
    }
  });

  test('Ejercicio 7: Herencia Múltiple - Cuenta Premium', () => {
    const premiumAccount = new PremiumAccount('Premium User', 5000, 0.03);

    // Verificar que hereda de SavingsAccount
    expect(premiumAccount).toBeInstanceOf(SavingsAccount);

    // Verificar que tiene propiedades del mixin de Investment
    expect(typeof premiumAccount.invest).toBe('function');
    expect(typeof premiumAccount.calculateReturns).toBe('function');

    // Verificar que tiene propiedades del mixin de Rewards
    expect(typeof premiumAccount.addRewardPoints).toBe('function');
    expect(typeof premiumAccount.redeemPoints).toBe('function');

    // Probar funcionalidad combinada
    premiumAccount.deposit(1000); // Debe añadir reward points
    expect(premiumAccount.balance).toBe(6000);
    expect(premiumAccount.rewardPoints).toBeGreaterThan(0);

    premiumAccount.invest(2000, 'stocks');
    expect(premiumAccount.balance).toBe(4000);
    expect(premiumAccount.investments.length).toBe(1);

    const returns = premiumAccount.calculateReturns();
    expect(returns).toBeGreaterThan(0);

    // Verificar método específico si existe
    if (typeof premiumAccount.getAccountSummary === 'function') {
      const summary = premiumAccount.getAccountSummary();
      expect(summary.accountHolder).toBe('Premium User');
      expect(summary.balance).toBe(4000);
    }
  });

  test('Ejercicio 8 y 9: Interfaz y su Implementación', () => {
    // Verificar que BankClient es una clase abstracta
    let threwError = false;
    try {
      new BankClient();
    } catch (e) {
      threwError = true;
    }
    expect(threwError).toBe(true);

    // Verificar implementación PersonalClient
    const client = new PersonalClient('John', 'Doe', '12345', 'john@example.com', '555-1234');

    expect(client).toBeInstanceOf(BankClient);
    expect(client.getName()).toBe('John Doe');
    expect(client.getIdentification()).toBe('12345');

    const contactInfo = client.getContactInfo();
    expect(contactInfo.email).toBe('john@example.com');

    // Verificar funcionalidad específica
    if (typeof client.addAccount === 'function') {
      const account = new BankAccount('John Doe', 1000);
      client.addAccount(account);

      expect(client.getAccounts).toBeDefined();
      expect(client.getAccounts().length).toBe(1);
      expect(client.getAccounts()[0]).toBe(account);
    }
  });

  test('Ejercicio 10: Módulo de Utilidades Financieras', () => {
    // Verificar función de interés compuesto
    const interest = calculateCompoundInterest(1000, 5, 3, 1);
    expect(interest).toBeDefined();
    expect(interest.amount).toBeGreaterThan(1000);

    // Verificar función de pago de préstamo
    const loan = calculateLoanPayment(200000, 4.5, 30);
    expect(loan).toBeDefined();
    expect(loan.monthlyPayment).toBeGreaterThan(0);
    expect(loan.totalInterest).toBeGreaterThan(0);

    // Verificar clase FinancialReport
    const report = new FinancialReport('Test Report');
    report.addSection('Test Section', { value: 100 });

    expect(typeof report.generateTextReport).toBe('function');
    const textReport = report.generateTextReport();
    expect(typeof textReport).toBe('string');
    expect(textReport).toContain('Test Report');

    // Verificar exportación por defecto
    expect(FinancialUtils).toBeDefined();
    expect(FinancialUtils.calculateCompoundInterest).toBe(calculateCompoundInterest);
    expect(FinancialUtils.calculateLoanPayment).toBe(calculateLoanPayment);
    expect(FinancialUtils.FinancialReport).toBe(FinancialReport);
  });

});
