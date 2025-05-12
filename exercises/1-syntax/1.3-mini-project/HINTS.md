# 💡 Pistas para el Mini-proyecto

Este documento contiene pistas organizadas por cada función del sistema, para ayudarte cuando te encuentres atascado. Consulta solo la sección que necesites para mantener el desafío.

## 🔑 Pistas Generales

- Recuerda que `this` se refiere a la instancia actual de la clase
- En métodos de array como `map`, `filter` y `reduce`, aprovecha las arrow functions para mantener el contexto de `this`
- Usa el operador spread (`...`) para crear copias de arrays y objetos sin modificar los originales

## 📝 Constructor

<details>
<summary>Pista 1: Inicialización</summary>

```javascript
constructor() {
  this.products = [...initialInventory];
  this.notifications = [];
}
```

El operador spread (`...`) crea una copia del array original para evitar mutarlo directamente.
</details>

## 🆕 addProduct

<details>
<summary>Pista 1: Desestructuración con valores por defecto</summary>

```javascript
const {
  id = `P${Date.now().toString().slice(-6)}`,
  name,
  category = 'general',
  price,
  stock = 0,
  minStock = 5
} = productData;
```

Extraes todas las propiedades con sus valores por defecto en una sola operación.
</details>

<details>
<summary>Pista 2: Creación del producto con enhanced object literals</summary>

```javascript
const newProduct = {
  id,
  name,
  category,
  price,
  stock,
  minStock
};

this.products.push(newProduct);
return newProduct;
```

Usando enhanced object literals, no necesitas escribir `id: id` cuando el nombre de la variable es igual al de la propiedad.
</details>

## 🔄 updateProduct

<details>
<summary>Pista 1: Encontrar producto</summary>

```javascript
const productIndex = this.products.findIndex(product => product.id === productId);
if (productIndex === -1) return null;
```

Usa `findIndex` para obtener la posición del producto en el array.
</details>

<details>
<summary>Pista 2: Actualizar con spread operator</summary>

```javascript
this.products[productIndex] = {
  ...this.products[productIndex],
  ...updateData
};

return this.products[productIndex];
```

El spread operator (`...`) combina ambos objetos, donde las propiedades de `updateData` sobrescriben las existentes.
</details>

## 📦 processOrder

<details>
<summary>Pista 1: Validación de productos</summary>

```javascript
const orderDetails = orderItems.map(({ productId, quantity }) => {
  const product = this.products.find(p => p.id === productId);

  if (!product) {
    return { productId, status: 'error', message: 'Producto no encontrado' };
  }

  if (product.stock < quantity) {
    return {
      productId,
      status: 'error',
      message: `Stock insuficiente (disponible: ${product.stock})`
    };
  }

  return { productId, quantity, product, status: 'ok' };
});

const hasErrors = orderDetails.some(item => item.status === 'error');
if (hasErrors) {
  return {
    status: 'error',
    items: orderDetails
  };
}
```

Usa `map` para transformar cada item del pedido con su validación.
</details>

<details>
<summary>Pista 2: Actualización de stock</summary>

```javascript
const updatedProducts = orderDetails.map(({ productId, quantity, product }) => {
  return this.updateStock(productId, -quantity);
});

return {
  status: 'success',
  items: updatedProducts
};
```

Aprovecha el método `updateStock` que implementarás para actualizar el inventario.
</details>

## 🔍 findProducts

<details>
<summary>Pista 1: Filtrado combinado</summary>

```javascript
return this.products.filter(product => {
  const nameMatch = product.name.toLowerCase().includes(name.toLowerCase());
  const categoryMatch = category ? product.category === category : true;
  const priceMatch = product.price >= minPrice && product.price <= maxPrice;
  const stockMatch = inStock ? product.stock > 0 : true;

  return nameMatch && categoryMatch && priceMatch && stockMatch;
});
```

Aplica múltiples condiciones de filtrado usando una única expresión de `filter`.
</details>

## 📊 generateLowStockReport

<details>
<summary>Pista 1: Obtener productos de bajo stock</summary>

```javascript
const lowStockProducts = this.products.filter(product =>
  product.stock <= product.minStock
);

if (lowStockProducts.length === 0) {
  return { status: 'OK', products: [], statistics: { count: 0 } };
}
```

Filtra los productos que tienen un stock igual o menor a su mínimo establecido.
</details>

<details>
<summary>Pista 2: Calcular estadísticas</summary>

```javascript
const totalValue = lowStockProducts.reduce((sum, { price, stock }) =>
  sum + (price * stock), 0
);

const mostCritical = lowStockProducts.reduce((critical, product) =>
  (product.stock / product.minStock < critical.stock / critical.minStock)
    ? product : critical
, lowStockProducts[0]);

return {
  status: 'WARNING',
  products: lowStockProducts,
  statistics: {
    count: lowStockProducts.length,
    totalValue,
    mostCritical: mostCritical.name
  }
};
```

Usa `reduce` para calcular totales y encontrar el producto más crítico basado en la relación stock/minStock.
</details>

## 📝 generateInventoryReport

<details>
<summary>Pista 1: Obtener productos según tipo de informe</summary>

```javascript
let productsToReport;
let title;

switch (type) {
  case 'lowStock':
    const report = this.generateLowStockReport();
    productsToReport = report.products;
    title = 'Productos con Stock Bajo';
    break;

  case 'category':
    const { category } = options;
    productsToReport = this.findProducts({ category });
    title = `Productos de categoría: ${category}`;
    break;

  default:
    productsToReport = this.products;
    title = 'Inventario Completo';
}
```

Usa un switch para determinar qué productos incluir según el tipo.
</details>

<details>
<summary>Pista 2: Crear informe HTML con template literals</summary>

```javascript
return `
  <div class="inventory-report">
    <h1>${title}</h1>
    <p>Total de productos: ${productsToReport.length}</p>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        ${productsToReport.map(product => `
          <tr class="${product.stock <= product.minStock ? 'low-stock' : ''}">
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
`;
```

Los template literals permiten crear HTML multilinea con interpolación de expresiones JavaScript.
</details>

## 📊 getProductsByCategory

<details>
<summary>Pista 1: Agrupación con reduce</summary>

```javascript
const categories = this.products.reduce((acc, product) => {
  const { category } = product;

  if (!acc[category]) {
    acc[category] = {
      products: [],
      count: 0,
      totalValue: 0
    };
  }

  acc[category].products.push(product);
  acc[category].count += 1;
  acc[category].totalValue += product.price * product.stock;

  return acc;
}, {});

return categories;
```

El método `reduce` es perfecto para agrupar datos y crear estructuras más complejas.
</details>

## 📦 updateStock

<details>
<summary>Pista 1: Actualizar el stock</summary>

```javascript
const productIndex = this.products.findIndex(p => p.id === productId);
if (productIndex === -1) return null;

const product = this.products[productIndex];
const currentStock = product.stock;

// Actualizar stock según parámetro absolute
const updatedStock = absolute ? newStock : currentStock + newStock;
const finalStock = Math.max(0, updatedStock); // Evitar stock negativo

this.products[productIndex] = {
  ...product,
  stock: finalStock
};
```

Usa el parámetro `absolute` para determinar si reemplazar o sumar/restar stock.
</details>

<details>
<summary>Pista 2: Generar notificaciones</summary>

```javascript
let notification = null;

if (finalStock <= product.minStock) {
  notification = {
    type: 'low-stock',
    productId,
    message: `El producto ${product.name} tiene un stock bajo (${finalStock}/${product.minStock})`
  };

  this.notifications.push(notification);
}

return {
  product: this.products[productIndex],
  notification
};
```

Comprueba si el stock actual está por debajo del mínimo para generar alertas.
</details>

