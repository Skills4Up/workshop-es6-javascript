# 3.1 Clases y Módulos en JavaScript Moderno

## 🎯 Objetivo

Dominar la sintaxis de clases ES6+ y el sistema de módulos para construir aplicaciones con arquitecturas escalables, mantenibles y orientadas a objetos, aplicando principios de diseño modernos en JavaScript.

## 🌍 Contexto Real

Como desarrollador frontend en una startup de tecnología financiera (fintech), necesitas modernizar el sistema de gestión de cuentas y transacciones. La base de código actual usa patrones antiguos como funciones constructoras, mixins y el patrón módulo mediante IIFEs. 

Tu equipo ha decidido migrar a una arquitectura basada en clases ES6+ y módulos para:

1. Mejorar la organización del código en componentes reutilizables
2. Implementar herencia y polimorfismo de manera clara
3. Encapsular lógica y datos internos
4. Facilitar la carga bajo demanda de funcionalidades
5. Simplificar las pruebas unitarias

## 📋 Instrucciones

1. Abre el archivo `start.js` donde encontrarás la estructura básica de código
2. Implementa las clases y módulos solicitados, siguiendo los comentarios y los requerimientos
3. Ejecuta los tests con `npm test exercises/3-architecture/3.1-classes-modules`
4. Consulta `HINTS.md` si necesitas ayuda en conceptos específicos

## 🧩 Conceptos Clave

### Clases

- **Declaración**: Sintaxis `class`, constructores, métodos
- **Herencia**: Extensión de clases base con `extends` y `super`
- **Métodos Estáticos**: Funcionalidad a nivel de clase
- **Campos Privados**: Encapsulación con `#` (ES2022)
- **Getters y Setters**: Acceso controlado a propiedades

```javascript
class BankAccount {
  #balance = 0;  // Campo privado
  
  constructor(accountHolder, initialBalance = 0) {
    this.accountHolder = accountHolder;
    this.#balance = initialBalance;
  }
  
  // Getter
  get balance() {
    return this.#balance;
  }
  
  // Método público
  deposit(amount) {
    if (amount <= 0) throw new Error('Invalid amount');
    this.#balance += amount;
    return this.#balance;
  }
  
  // Método estático
  static generateAccountNumber() {
    return Math.floor(Math.random() * 1000000);
  }
}

// Herencia
class SavingsAccount extends BankAccount {
  #interestRate = 0.01;
  
  constructor(accountHolder, initialBalance = 0, interestRate = 0.01) {
    super(accountHolder, initialBalance);
    this.#interestRate = interestRate;
  }
  
  addInterest() {
    const interest = this.balance * this.#interestRate;
    return this.deposit(interest);
  }
}
```

### Módulos ES

- **Exportación**: `export` de funciones, clases y variables
- **Importación**: `import` de componentes específicos o módulos completos
- **Exportación predeterminada**: `export default` y su importación
- **Reexportación**: Agrupación y reexportación de módulos
- **Importación dinámica**: Carga bajo demanda con `import()`

```javascript
// account.js
export class Account {
  // Implementación
}

export function validateAccount(account) {
  // Validación
}

// main.js
import { Account, validateAccount } from './account.js';
import Transaction from './transaction.js'; // Importación de default export

// Importación dinámica (carga bajo demanda)
async function loadReportModule() {
  const { generateReport } = await import('./reports.js');
  return generateReport();
}
```

## 🔄 Comparación con Patrones Anteriores

| Aspecto                | Enfoque ES5                        | Enfoque ES6+            |
| ---------------------- | ---------------------------------- | ----------------------- |
| Declaración de "clase" | Función constructora + prototype   | Sintaxis `class`        |
| Herencia               | Manipulación de prototype          | `extends` y `super`     |
| Métodos estáticos      | Asignación directa                 | Palabra clave `static`  |
| Encapsulación          | Convenciones de nombres o closures | Campos privados con `#` |
| Módulos                | IIFEs o CommonJS/AMD               | Módulos ES nativos      |
| Importación            | Globals o require                  | `import` / `export`     |

## 📚 Recursos Adicionales

- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: Private class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [MDN: Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [MDN: Export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

