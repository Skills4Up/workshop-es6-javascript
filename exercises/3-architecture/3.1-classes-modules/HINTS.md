# 💡 Pistas para Clases y Módulos

Este documento contiene pistas organizadas para ayudarte a completar los ejercicios del módulo 3.1. Consulta solo las secciones que necesites cuando te encuentres atascado.

## 🔑 Pistas Generales

- Las clases en JavaScript son principalmente "azúcar sintáctico" sobre el modelo de prototipos
- Los campos privados con `#` sólo son accesibles dentro de la misma clase
- `super()` debe llamarse antes de usar `this` en constructores de clases derivadas
- Los métodos estáticos se llaman directamente en la clase, no en instancias

## 📝 Ejercicio 1: Clase Base - Cuenta Bancaria

<details>
<summary>Pista 1: Estructura básica</summary>

```javascript
export class BankAccount {
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
  
  // Métodos...
}
```
</details>

<details>
<summary>Pista 2: Métodos para depositar y retirar</summary>

```javascript
deposit(amount) {
  // Validar que amount sea un número positivo
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Invalid deposit amount');
  }
  
  this.#balance += amount;
  return this.#balance;
}

withdraw(amount) {
  // Validar que amount sea un número positivo y no exceda el saldo
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error('Invalid withdrawal amount');
  }
  
  if (amount > this.#balance) {
    throw new Error('Insufficient funds');
  }
  
  this.#balance -= amount;
  return this.#balance;
}
```
</details>

<details>
<summary>Pista 3: Método privado para generar número de cuenta</summary>

```javascript
#generateAccountNumber() {
  return 'AC' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}
```
</details>

## 📝 Ejercicio 2: Herencia - Cuenta de Ahorro

<details>
<summary>Pista 1: Estructura de la clase heredada</summary>

```javascript
export class SavingsAccount extends BankAccount {
  #interestRate;
  
  constructor(accountHolder, initialBalance = 0, interestRate = 0.01) {
    super(accountHolder, initialBalance);
    this.#interestRate = interestRate;
  }
  
  get interestRate() {
    return this.#interestRate;
  }
  
  // Métodos adicionales...
}
```
</details>

<details>
<summary>Pista 2: Método para aplicar interés</summary>

```javascript
applyInterest() {
  const interest = this.balance * this.#interestRate;
  return this.deposit(interest);
}
```
</details>

<details>
<summary>Pista 3: Sobrescribir método withdraw</summary>

```javascript
withdraw(amount) {
  // Podemos añadir validaciones adicionales antes de llamar al método de la clase padre
  if (this.balance - amount < 100) {
    throw new Error('Savings account must maintain a minimum balance of 100');
  }
  
  // Llamar al método de la clase padre
  return super.withdraw(amount);
}
```
</details>

## 📝 Ejercicio 3: Clase Estática - Generador de Cuentas

<details>
<summary>Pista 1: Estructura con campos estáticos</summary>

```javascript
export class AccountGenerator {
  static PREFIX = 'AC';
  static LENGTH = 8;
  
  // Métodos estáticos...
}
```
</details>

<details>
<summary>Pista 2: Método para generar número de cuenta</summary>

```javascript
static generateAccountNumber() {
  const randomPart = Math.floor(Math.random() * Math.pow(10, this.LENGTH - 2));
  return this.PREFIX + randomPart.toString().padStart(this.LENGTH - 2, '0');
}
```
</details>

<details>
<summary>Pista 3: Método para validar número de cuenta</summary>

```javascript
static validateAccountNumber(accountNumber) {
  if (!accountNumber || typeof accountNumber !== 'string') {
    return false;
  }
  
  // Verificar que comience con el prefijo correcto
  if (!accountNumber.startsWith(this.PREFIX)) {
    return false;
  }
  
  // Verificar longitud
  if (accountNumber.length !== this.LENGTH) {
    return false;
  }
  
  // Verificar que el resto sean dígitos
  const numericPart = accountNumber.substring(this.PREFIX.length);
  return /^\d+$/.test(numericPart);
}
```
</details>

## 📝 Ejercicio 4: Composición - Transacción Bancaria

<details>
<summary>Pista 1: Estructura de la clase</summary>

```javascript
export class Transaction {
  constructor(sourceAccount, targetAccount, amount, date = new Date()) {
    this.id = this.#generateTransactionId();
    this.sourceAccount = sourceAccount;
    this.targetAccount = targetAccount;
    this.amount = amount;
    this.date = date;
    this.status = 'pending'; // pending, completed, failed
  }
  
  // Métodos...
}
```
</details>

<details>
<summary>Pista 2: Generar ID y validar transacción</summary>

```javascript
#generateTransactionId() {
  return 'TX' + Date.now() + Math.floor(Math.random() * 1000);
}

validate() {
  // Verificar que amount sea positivo
  if (this.amount <= 0) {
    return { valid: false, reason: 'Invalid amount' };
  }
  
  // Verificar que sourceAccount tenga fondos suficientes
  if (this.sourceAccount.balance < this.amount) {
    return { valid: false, reason: 'Insufficient funds' };
  }
  
  // Verificar que las cuentas existan y sean diferentes
  if (!this.sourceAccount || !this.targetAccount) {
    return { valid: false, reason: 'Invalid accounts' };
  }
  
  if (this.sourceAccount.accountNumber === this.targetAccount.accountNumber) {
    return { valid: false, reason: 'Source and target accounts must be different' };
  }
  
  return { valid: true };
}
```
</details>

<details>
<summary>Pista 3: Método toString/toJSON</summary>

```javascript
toString() {
  return `Transaction ${this.id}: ${this.amount} from ${this.sourceAccount.accountNumber} to ${this.targetAccount.accountNumber} (${this.status})`;
}

toJSON() {
  return {
    id: this.id,
    sourceAccountNumber: this.sourceAccount.accountNumber,
    targetAccountNumber: this.targetAccount.accountNumber,
    amount: this.amount,
    status: this.status,
    date: this.date.toISOString()
  };
}
```
</details>

## 📝 Ejercicio 5: Enumeración - Tipos de Cuenta

<details>
<summary>Pista 1: Implementación con Object.freeze</summary>

```javascript
export const AccountType = Object.freeze({
  CHECKING: 'checking',
  SAVINGS: 'savings',
  INVESTMENT: 'investment',
  
  isValid(type) {
    return Object.values(this).includes(type) && typeof type === 'string';
  },
  
  getDescription(type) {
    const descriptions = {
      [this.CHECKING]: 'Everyday banking account for regular transactions',
      [this.SAVINGS]: 'Account for building savings with interest',
      [this.INVESTMENT]: 'Account for growing wealth through investments'
    };
    
    return descriptions[type] || 'Unknown account type';
  }
});
```
</details>

<details>
<summary>Pista 2: Forma alternativa con IIFE</summary>

```javascript
export const AccountType = (function() {
  const types = {
    CHECKING: 'checking',
    SAVINGS: 'savings',
    INVESTMENT: 'investment'
  };
  
  return Object.freeze({
    ...types,
    
    isValid(type) {
      return Object.values(types).includes(type);
    },
    
    getDescription(type) {
      const descriptions = {
        [types.CHECKING]: 'Everyday banking account for regular transactions',
        [types.SAVINGS]: 'Account for building savings with interest',
        [types.INVESTMENT]: 'Account for growing wealth through investments'
      };
      
      return descriptions[type] || 'Unknown account type';
    }
  });
})();
```
</details>

## 📝 Ejercicio 6: Patrón Singleton - Sistema Bancario

<details>
<summary>Pista 1: Implementación básica del Singleton</summary>

```javascript
export class BankSystem {
  static #instance = null;
  #accounts = [];
  #transactions = [];
  
  constructor() {
    // Evitar instanciación directa
    if (BankSystem.#instance) {
      throw new Error('BankSystem is a singleton, use getInstance()');
    }
    
    BankSystem.#instance = this;
  }
  
  static getInstance() {
    if (!BankSystem.#instance) {
      BankSystem.#instance = new BankSystem();
    }
    return BankSystem.#instance;
  }
  
  // Métodos...
}
```
</details>

<details>
<summary>Pista 2: Métodos para gestionar cuentas</summary>

```javascript
addAccount(account) {
  if (!(account instanceof BankAccount)) {
    throw new Error('Invalid account object');
  }
  
  // Verificar que la cuenta no exista ya
  if (this.#accounts.some(a => a.accountNumber === account.accountNumber)) {
    throw new Error('Account already exists');
  }
  
  this.#accounts.push(account);
  return account;
}

getAccount(accountNumber) {
  return this.#accounts.find(account => account.accountNumber === accountNumber);
}

listAccounts() {
  return [...this.#accounts]; // Devolver copia para evitar modificaciones directas
}
```
</details>

<details>
<summary>Pista 3: Método para transferencias</summary>

```javascript
transfer(sourceAccountNumber, targetAccountNumber, amount) {
  const sourceAccount = this.getAccount(sourceAccountNumber);
  const targetAccount = this.getAccount(targetAccountNumber);
  
  if (!sourceAccount || !targetAccount) {
    throw new Error('One or both accounts not found');
  }
  
  const transaction = new Transaction(sourceAccount, targetAccount, amount);
  const validation = transaction.validate();
  
  if (!validation.valid) {
    transaction.status = 'failed';
    this.#transactions.push(transaction);
    throw new Error(`Transaction failed: ${validation.reason}`);
  }
  
  // Ejecutar la transferencia
  sourceAccount.withdraw(amount);
  targetAccount.deposit(amount);
  
  transaction.status = 'completed';
  this.#transactions.push(transaction);
  
  return transaction;
}
```
</details>

## 📝 Ejercicio 7: Herencia Múltiple - Cuenta Premium

<details>
<summary>Pista 1: Implementación de mixins</summary>

```javascript
export const InvestmentMixin = {
  invest(amount, instrument) {
    if (amount > this.balance) {
      throw new Error('Insufficient funds for investment');
    }
    
    this.withdraw(amount);
    this.investments = this.investments || [];
    this.investments.push({
      amount,
      instrument,
      date: new Date()
    });
    
    return this.investments;
  },
  
  calculateReturns() {
    if (!this.investments || this.investments.length === 0) {
      return 0;
    }
    
    return this.investments.reduce((total, inv) => {
      // Cálculo simplificado, en un caso real sería más complejo
      const rate = inv.instrument === 'stocks' ? 0.08 : 0.05;
      return total + (inv.amount * rate);
    }, 0);
  }
};

export const RewardsMixin = {
  initializeRewards() {
    this.rewardPoints = 0;
  },
  
  addRewardPoints(amount) {
    // Por cada $10 gastados, 1 punto
    const points = Math.floor(amount / 10);
    this.rewardPoints = (this.rewardPoints || 0) + points;
    return this.rewardPoints;
  },
  
  redeemPoints(points) {
    if (!this.rewardPoints || points > this.rewardPoints) {
      throw new Error('Insufficient reward points');
    }
    
    this.rewardPoints -= points;
    // Convertimos puntos a dinero (1 punto = $0.01)
    const cashback = points * 0.01;
    this.deposit(cashback);
    
    return {
      remainingPoints: this.rewardPoints,
      cashbackAmount: cashback
    };
  }
};
```
</details>

<details>
<summary>Pista 2: Clase PremiumAccount con mixins</summary>

```javascript
export class PremiumAccount extends SavingsAccount {
  constructor(accountHolder, initialBalance = 1000, interestRate = 0.02) {
    super(accountHolder, initialBalance, interestRate);
    
    // Inicializar propiedades de los mixins
    this.investments = [];
    this.rewardPoints = 0;
    
    // Copiar métodos de los mixins a esta instancia
    Object.assign(this, InvestmentMixin, RewardsMixin);
  }
  
  // Sobrescribir el método deposit para añadir puntos automáticamente
  deposit(amount) {
    // Llamar al método original
    const newBalance = super.deposit(amount);
    
    // Añadir puntos si el mixin está inicializado
    if (typeof this.addRewardPoints === 'function') {
      this.addRewardPoints(amount);
    }
    
    return newBalance;
  }
  
  // Método específico de PremiumAccount
  getAccountSummary() {
    return {
      accountHolder: this.accountHolder,
      accountNumber: this.accountNumber,
      balance: this.balance,
      interestRate: this.interestRate,
      investments: this.investments,
      rewardPoints: this.rewardPoints
    };
  }
}
```
</details>

## 📝 Ejercicio 8 y 9: Interfaz y su Implementación

<details>
<summary>Pista 1: Implementación de la interfaz BankClient</summary>

La implementación está ya bastante completa en el archivo start.js. La clave está en usar validación en tiempo de ejecución en el constructor para asegurar que las subclases implementen los métodos requeridos.

```javascript
export class BankClient {
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
```
</details>

<details>
<summary>Pista 2: Implementación de PersonalClient</summary>

```javascript
export class PersonalClient extends BankClient {
  constructor(firstName, lastName, idNumber, email, phone) {
    super(); // Llamar para hacer validaciones
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNumber = idNumber;
    this.contactInfo = { email, phone };
    this.accounts = [];
  }
  
  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  getIdentification() {
    return this.idNumber;
  }
  
  getContactInfo() {
    return this.contactInfo;
  }
  
  // Métodos adicionales específicos
  addAccount(account) {
    if (account.accountHolder !== this.getName()) {
      throw new Error('Account holder name does not match client name');
    }
    
    this.accounts.push(account);
    return this.accounts.length;
  }
  
  getAccounts() {
    return [...this.accounts];
  }
}
```
</details>

## 📝 Ejercicio 10: Módulo de Utilidades Financieras

<details>
<summary>Pista 1: Función de Interés Compuesto</summary>

```javascript
export function calculateCompoundInterest(principal, rate, time, frequency = 1) {
  // Validar parámetros
  if (
    typeof principal !== 'number' || principal <= 0 ||
    typeof rate !== 'number' || rate < 0 ||
    typeof time !== 'number' || time <= 0 ||
    typeof frequency !== 'number' || frequency <= 0
  ) {
    throw new Error('Invalid parameters for compound interest calculation');
  }
  
  // Fórmula de interés compuesto: P * (1 + r/n)^(n*t)
  const amount = principal * Math.pow(1 + (rate / (frequency * 100)), frequency * time);
  const interest = amount - principal;
  
  return {
    principal,
    rate,
    time,
    frequency,
    amount,
    interest
  };
}
```
</details>

<details>
<summary>Pista 2: Función de Pago de Préstamo</summary>

```javascript
export function calculateLoanPayment(principal, rate, time) {
  // Validar parámetros
  if (
    typeof principal !== 'number' || principal <= 0 ||
    typeof rate !== 'number' || rate <= 0 ||
    typeof time !== 'number' || time <= 0
  ) {
    throw new Error('Invalid parameters for loan payment calculation');
  }
  
  // Convertir tasa anual a tasa mensual
  const monthlyRate = rate / 1200; // rate% por año a decimal por mes
  const numberOfPayments = time * 12; // time en años a meses
  
  // Fórmula para pago mensual: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyPayment = 
    principal * 
    monthlyRate * 
    Math.pow(1 + monthlyRate, numberOfPayments) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;
  
  return {
    principal,
    rate,
    time,
    monthlyPayment,
    totalPayment,
    totalInterest,
    numberOfPayments
  };
}
```
</details>

<details>
<summary>Pista 3: Clase FinancialReport</summary>

```javascript
export class FinancialReport {
  constructor(title, date = new Date()) {
    this.title = title;
    this.date = date;
    this.sections = [];
  }
  
  addSection(title, data) {
    this.sections.push({ title, data });
    return this;
  }
  
  generateTextReport() {
    let report = `=== ${this.title} ===\n`;
    report += `Date: ${this.date.toLocaleDateString()}\n\n`;
    
    this.sections.forEach(section => {
      report += `--- ${section.title} ---\n`;
      
      if (Array.isArray(section.data)) {
        section.data.forEach(item => {
          report += `* ${JSON.stringify(item)}\n`;
        });
      } else {
        report += JSON.stringify(section.data, null, 2) + '\n';
      }
      
      report += '\n';
    });
    
    return report;
  }
  
  generateHTMLReport() {
    let html = `<h1>${this.title}</h1>`;
    html += `<p>Date: ${this.date.toLocaleDateString()}</p>`;
    
    this.sections.forEach(section => {
      html += `<h2>${section.title}</h2>`;
      
      if (Array.isArray(section.data)) {
        html += '<ul>';
        section.data.forEach(item => {
          html += `<li>${JSON.stringify(item)}</li>`;
        });
        html += '</ul>';
      } else {
        html += `<pre>${JSON.stringify(section.data, null, 2)}</pre>`;
      }
    });
    
    return html;
  }
}
```
</details>

