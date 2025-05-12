# 2.3 Características Modernas ES2020+

**start.js**: Contiene 10 ejercicios prácticos que cubren las principales características:

- Optional Chaining (`?.`)
- Nullish Coalescing (`??`)
- Promise.allSettled()
- BigInt
- String.prototype.replaceAll()
- Logical Assignment Operators
- Array.at()
- Object.hasOwn()
- Promise.any()
- Combinación de varias características

**challenges.js**: Ofrece 5 desafíos avanzados que aplican estas características en escenarios más complejos y realistas:

- Sistema de configuración jerárquico
- Cálculo de tiempos de espera con BigInt
- Parser de consultas anidadas
- Procesamiento de transacciones distribuidas
- Sistema de caché inteligente

## 🎯 Objetivo

Dominar las características más recientes de JavaScript (ES2020 en adelante) para escribir código más expresivo, robusto y con menos verbosidad, mejorando tanto la legibilidad como el manejo de errores en aplicaciones modernas.

## 🌍 Contexto Real

Como desarrollador frontend en una startup de tecnología, debes modernizar una base de código existente. Tu equipo ha decidido adoptar las características más recientes de JavaScript para mejorar la calidad del código y reducir errores comunes. Necesitarás aplicar características de ES2020+ para hacer el código:

1. Más resiliente a datos nulos o indefinidos
2. Capaz de manejar objetos anidados de forma segura
3. Más expresivo con menos código
4. Preparado para trabajar con números grandes y estructuras de datos complejas

## 📋 Instrucciones

1. Abre el archivo `start.js`
2. Completa cada ejercicio siguiendo las instrucciones en los comentarios
3. Ejecuta los tests para verificar tu implementación: `npm test exercises/2-arrays-async/2.3-es2020plus`
4. Una vez completados los ejercicios básicos, intenta los retos avanzados en `challenges.js`

## 🧩 Características Principales ES2020+

### ES2020

- **Optional Chaining (`?.`)**: Acceso seguro a propiedades anidadas

  ```javascript
  const name = user?.profile?.name; // No falla si user o profile son null/undefined
  ```

- **Nullish Coalescing (`??`)**: Valores por defecto solo para null/undefined

  ```javascript
  const count = data.count ?? 0; // 0 solo si data.count es null o undefined
  ```

- **Promise.allSettled()**: Espera a que todas las promesas completen (éxito o fallo)

  ```javascript
  const results = await Promise.allSettled(promises);
  // results incluye tanto los valores resueltos como los errores
  ```

- **BigInt**: Números enteros de precisión arbitraria

  ```javascript
  const bigNumber = 9007199254740991n; // 'n' al final para BigInt
  ```

- **Dynamic Import**: Importación de módulos bajo demanda

  ```javascript
  const module = await import('./module.js');
  ```

### ES2021

- **String.prototype.replaceAll()**: Reemplazo de todas las ocurrencias

  ```javascript
  const newStr = str.replaceAll('find', 'replace');
  ```

- **Promise.any()**: Resuelve cuando cualquier promesa se cumple

  ```javascript
  const result = await Promise.any(promises);
  ```

- **Logical Assignment Operators**: Asignación combinada con operadores lógicos

  ```javascript
  x ||= y;  // x = x || y
  x &&= y;  // x = x && y
  x ??= y;  // x = x ?? y
  ```

### ES2022

- **Top-level await**: await fuera de funciones async

  ```javascript
  // En un módulo ES
  const data = await fetch('/api/data');
  ```

- **Object.hasOwn()**: Verificación segura de propiedades

  ```javascript
  if (Object.hasOwn(obj, 'prop')) {
    // Más seguro que obj.hasOwnProperty('prop')
  }
  ```

- **Array.at()**: Acceso a elementos con índices negativos

  ```javascript
  const last = array.at(-1); // Último elemento
  ```

## 🚀 Recursos Adicionales

- [MDN: Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [MDN: Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
- [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [ES2020 Features with Examples](https://www.freecodecamp.org/news/javascript-new-features-es2020/)
