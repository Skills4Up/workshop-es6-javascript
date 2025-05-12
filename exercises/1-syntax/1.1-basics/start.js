/**
 * 1.1 Conceptos Básicos ES6+
 * ==========================
 *
 * Este archivo contiene ejercicios para practicar los conceptos
 * fundamentales de ES6+:
 * - let y const
 * - arrow functions
 * - template literals
 * - parámetros por defecto
 * - enhanced object literals
 */

// Contexto: Estás trabajando en un sistema de e-commerce y necesitas
// modernizar algunas funciones de gestión de productos.

/**
 * EJERCICIO 1: Variables - let y const
 *
 * Refactoriza este código usando let/const apropiadamente.
 * - Usa const para valores que no cambian
 * - Usa let para valores que necesitan ser reasignados
 */
function calculateProductDiscount(price, discountPercent) {
  // ❌ Código legacy ES5
  var TAX_RATE = 0.19;
  var discount = price * (discountPercent / 100);
  var priceWithDiscount = price - discount;
  var taxes = priceWithDiscount * TAX_RATE;

  if (priceWithDiscount < 10) {
    var shippingCost = 5;
  } else {
    var shippingCost = 10;
  }

  var total = priceWithDiscount + taxes + shippingCost;
  return total;

  // ✅ Tu código modernizado aquí (reemplaza el código anterior)
}

/**
 * EJERCICIO 2: Arrow Functions
 *
 * Refactoriza la siguiente función usando arrow functions.
 */
// ❌ Código legacy ES5
function filterAvailableProducts(products) {
  return products.filter(function (product) {
    return product.stock > 0;
  });
}

// ✅ Tu código modernizado aquí (reescribe la función completa)
// const filterAvailableProducts = ...


/**
 * EJERCICIO 3: Template Literals
 *
 * Refactoriza esta función para usar template literals.
 */
// ❌ Código legacy ES5
function formatProductCard(product) {
  return '<div class="product">' +
    '<h2>' + product.name + '</h2>' +
    '<p class="price">$' + product.price.toFixed(2) + '</p>' +
    '<p class="stock">Stock: ' + product.stock + ' unidades</p>' +
    '</div>';
}

// ✅ Tu código modernizado aquí (reescribe la función completa)
// const formatProductCard = ...


/**
 * EJERCICIO 4: Parámetros por Defecto
 *
 * Refactoriza esta función para usar parámetros por defecto.
 */
// ❌ Código legacy ES5
function createProduct(name, price, category, stock) {
  if (category === undefined) {
    category = 'general';
  }
  if (stock === undefined) {
    stock = 0;
  }

  return {
    name: name,
    price: price,
    category: category,
    stock: stock,
    available: stock > 0
  };
}

// ✅ Tu código modernizado aquí (reescribe la función completa)
// const createProduct = ...


/**
 * EJERCICIO 5: Enhanced Object Literals
 *
 * Refactoriza esta función para usar enhanced object literals:
 * - Shorthand syntax para propiedades
 * - Métodos concisos
 * - Propiedades computadas para 'discount' + type
 */
// ❌ Código legacy ES5
function createProductCampaign(name, product, type, discount) {
  var discountProperty = 'discount' + type.charAt(0).toUpperCase() + type.slice(1);

  return {
    name: name,
    product: product,
    active: true,
    applyDiscount: function (price) {
      return price * (1 - discount / 100);
    },
    getInfo: function () {
      return this.name + ' - ' + discount + '% off';
    }
  };
}

// ✅ Tu código modernizado aquí (reescribe la función completa)
// const createProductCampaign = ...


// No modifiques estas exportaciones
module.exports = {
  calculateProductDiscount,
  filterAvailableProducts,
  formatProductCard,
  createProduct,
  createProductCampaign
};
