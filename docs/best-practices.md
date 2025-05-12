# 🚀 Mejores Prácticas ES6+

Esta guía recopila patrones y prácticas recomendadas para escribir JavaScript moderno efectivo, mantenible y de alto rendimiento.

## Principios generales

1. **Prefiere código declarativo sobre imperativo**
2. **Escribe código autoexplicativo**
3. **Minimiza mutaciones y efectos secundarios**
4. **Optimiza para legibilidad, no para brevedad**
5. **Mantén la consistencia en el estilo**

## Variables y referencias

### ✅ Usa `const` por defecto, `let` cuando sea necesario

```javascript
// ❌ Mal
var user = getUser();
user = transformUser(user);

// ✅ Bien
const user = getUser();
const transformedUser = transformUser(user);

// ✅ Bien (cuando realmente necesitas reasignar)
let count = 0;
while (hasMoreOperations()) {
  count += processOperation();
}
```

### ✅ Utiliza nombres descriptivos

```javascript
// ❌ Mal
const u = getUser();
const s = u.getSubscription();
const t = s.total;

// ✅ Bien
const user = getUser();
const subscription = user.getSubscription();
const totalAmount = subscription.total;
```

## Funciones

### ✅ Prefiere arrow functions para funciones anónimas

```javascript
// ❌ Mal
[1, 2, 3].map(function(number) {
  return number * 2;
});

// ✅ Bien
[1, 2, 3].map(number => number * 2);
```

### ✅ Usa funciones nombradas para mejor depuración

```javascript
// ❌ Mal (difícil de trazar en stack traces)
const loadData = () => {
  return fetchData().then(data => {
    return processData(data).then(result => {
      return formatResult(result);
    });
  });
};

// ✅ Bien
const loadData = () => {
  return fetchData()
    .then(function processRemoteData(data) {
      return processData(data);
    })
    .then(function formatProcessedData(result) {
      return formatResult(result);
    });
};
```

### ✅ Evita efectos secundarios en funciones

```javascript
// ❌ Mal
const cart = { items: [] };

function addItem(item) {
  cart.items.push(item);
}

// ✅ Bien
function addItem(cart, item) {
  return {
    ...cart,
    items: [...cart.items, item]
  };
}

const updatedCart = addItem(cart, { id: 1, name: 'Product' });
```

### ✅ Prefiere parámetros por defecto sobre condicionales

```javascript
// ❌ Mal
function createUser(name, role) {
  role = role || 'user';
  // ...
}

// ✅ Bien
function createUser(name, role = 'user') {
  // ...
}
```

## Uso efectivo del destructuring

### ✅ Desctructuring en parámetros de funciones

```javascript
// ❌ Mal
function processUser(user) {
  const name = user.name;
  const email = user.email;
  // ...
}

// ✅ Bien
function processUser({ name, email }) {
  // ...
}
```

### ✅ Valores por defecto y alias útiles

```javascript
// ✅ Bien
function fetchConfig({ 
  endpoint, 
  method = 'GET', 
  headers: customHeaders = {}, 
  timeout = 5000 
} = {}) {
  // ...
}

// Llamada sin parámetros también funciona
fetchConfig();
```

### ✅ Alias semánticos

```javascript
const userData = { id: 1, userName: 'johndoe' };

// ✅ Bien (renombrar para mejor contexto)
const { userName: displayName } = userData;
console.log(`Welcome, ${displayName}!`);
```

## Objetos

### ✅ Usa property shorthand

```javascript
// ❌ Mal
function makeUser(name, age) {
  return {
    name: name,
    age: age
  };
}

// ✅ Bien
function makeUser(name, age) {
  return {
    name,
    age
  };
}
```

### ✅ Agrupa propiedades relacionadas

```javascript
// ❌ Mal
const product = {
  name: 'Laptop',
  price: 1200,
  category: 'Electronics',
  brand: 'TechCo',
  inStock: true,
  weight: 2.5,
  dimensions: { width: 30, height: 20, depth: 2.5 }
};

// ✅ Bien
const product = {
  // Info básica
  name: 'Laptop',
  brand: 'TechCo',
  category: 'Electronics',
  
  // Detalles comerciales
  price: 1200,
  inStock: true,
  
  // Características físicas
  weight: 2.5,
  dimensions: { width: 30, height: 20, depth: 2.5 }
};
```

## Arrays y operaciones funcionales

### ✅ Prefiere métodos funcionales sobre bucles

```javascript
const numbers = [1, 2, 3, 4, 5];

// ❌ Mal
const doubled = [];
for (let i = 0; i < numbers.length; i++) {
  doubled.push(numbers[i] * 2);
}

// ✅ Bien
const doubled = numbers.map(num => num * 2);
```

### ✅ Usa métodos apropiados para cada transformación

```javascript
const users = [/* ... */];

// ❌ Mal (sobreuso de reduce)
const premiumUsernames = users.reduce((names, user) => {
  if (user.isPremium) {
    names.push(user.username);
  }
  return names;
}, []);

// ✅ Bien (combinación clara de métodos)
const premiumUsernames = users
  .filter(user => user.isPremium)
  .map(user => user.username);
```

### ✅ Encadena con moderación y claridad

```javascript
// ❌ Mal (difícil de leer y depurar)
const result = data.filter(x => x.active).map(x => x.value).reduce((a, b) => a + b, 0).toString();

// ✅ Bien (legible y fácil de depurar)
const result = data
  .filter(item => item.active)
  .map(item => item.value)
  .reduce((sum, value) => sum + value, 0)
  .toString();
```

### ✅ Evita mutaciones con operadores spread

```javascript
const original = [1, 2, 3];

// ❌ Mal (mutación)
function addItem(array, item) {
  array.push(item);
  return array;
}

// ✅ Bien (inmutabilidad)
function addItem(array, item) {
  return [...array, item];
}

const updated = addItem(original, 4);
console.log(original); // [1, 2, 3] (sin cambios)
console.log(updated);  // [1, 2, 3, 4]
```

## Patrones asíncronos

### ✅ Prefiere async/await sobre promesas encadenadas

```javascript
// ❌ Aceptable pero más difícil de leer
function fetchUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('User not found');
      }
      return response.json();
    })
    .then(userData => {
      return fetch(`/api/posts?userId=${userData.id}`);
    })
    .then(response => response.json())
    .then(posts => {
      return { user: userData, posts };
    });
}

// ✅ Mejor (más claro y manejo de errores más explícito)
async function fetchUserData(userId) {
  const userResponse = await fetch(`/api/users/${userId}`);
  
  if (!userResponse.ok) {
    throw new Error('User not found');
  }
  
  const userData = await userResponse.json();
  const postsResponse = await fetch(`/api/posts?userId=${userData.id}`);
  const posts = await postsResponse.json();
  
  return { user: userData, posts };
}
```

### ✅ Manejo explícito de errores

```javascript
// ❌ Mal (errores generales)
async function fetchData() {
  try {
    const data = await fetchFromAPI();
    return processData(data);
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// ✅ Bien (manejo específico de errores)
async function fetchData() {
  try {
    const data = await fetchFromAPI();
    return processData(data);
  } catch (error) {
    if (error.name === 'NetworkError') {
      // Reintento o estrategia específica
      return fetchWithRetry();
    }
    
    if (error.status === 404) {
      return { isEmpty: true };
    }
    
    // Manejo para otros tipos de errores
    logger.error('Unexpected error:', error);
    throw new ApplicationError('Data fetch failed', { cause: error });
  }
}
```

### ✅ Paralelización consciente

```javascript
// ❌ Mal (ejecución secuencial innecesaria)
async function loadDashboard() {
  const user = await fetchUser();
  const posts = await fetchPosts();
  const notifications = await fetchNotifications();
  
  return { user, posts, notifications };
}

// ✅ Bien (ejecución en paralelo)
async function loadDashboard() {
  const [user, posts, notifications] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchNotifications()
  ]);
  
  return { user, posts, notifications };
}
```

## Módulos y organización de código

### ✅ Prefiere imports nombrados sobre default

```javascript
// ❌ Menos recomendado
import UserService from './UserService';

// ✅ Mejor (más explícito y facilita refactoring)
import { getUserById, createUser, updateUser } from './UserService';
```

### ✅ Agrupa y ordena imports

```javascript
// ✅ Bien (agrupado y ordenado)
// 1. Librerías externas
import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';

// 2. Componentes y utilidades propias
import { Button, Card, Modal } from '../components';
import { fetchData, formatCurrency } from '../utils';

// 3. Estilos y assets
import './Dashboard.scss';
import logo from '../assets/logo.svg';
```

### ✅ Exporta interfaces/tipos con el código

```javascript
// user.js

// ✅ Bien (co-ubicación de tipos e implementación)
/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

/**
 * @returns {Promise<User>}
 */
export async function fetchUser() {
  // ...
}
```

### ✅ Usa barrel files para API pública

```javascript
// components/index.js (barrel file)
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Modal } from './Modal';

// En otro archivo
import { Button, Card, Modal } from './components';
```

## Rendimiento y optimización

### ✅ Evita recálculos innecesarios

```javascript
// ❌ Mal (recalculo en cada render)
function UserList({ users }) {
  const sortedUsers = users
    .filter(user => user.active)
    .sort((a, b) => a.name.localeCompare(b.name));
    
  // ...render sortedUsers
}

// ✅ Bien (con memoización)
function UserList({ users }) {
  // Usando useMemo en React
  const sortedUsers = useMemo(() => {
    return users
      .filter(user => user.active)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users]);
  
  // ...render sortedUsers
}
```

### ✅ Deferring Complex Calculations

```javascript
// ❌ Mal (bloquea el hilo principal)
function processLargeDataset(data) {
  const result = heavyCalculation(data);
  updateUI(result);
}

// ✅ Bien (no bloquea la UI)
function processLargeDataset(data) {
  // Usando setTimeout con delay 0 o requestAnimationFrame
  setTimeout(() => {
    const result = heavyCalculation(data);
    updateUI(result);
  }, 0);
}

// ✅ Mejor (con Web Workers para cálculos realmente pesados)
function processLargeDataset(data) {
  const worker = new Worker('heavy-calculation.js');
  
  worker.postMessage(data);
  worker.onmessage = (event) => {
    updateUI(event.data);
  };
}
```

### ✅ Optimiza condicionalmente

```javascript
// ❌ Menos óptimo (verifica siempre todas las condiciones)
function

Similar code found with 2 license types
