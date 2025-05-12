# 1.3 Mini-proyecto: Sistema de Gestión de Inventario

El mini-proyecto se enfoca en un sistema de gestión de inventario que incluye funcionalidades completas como agregar/actualizar productos, procesar pedidos, generar informes y manejar notificaciones, todo implementado con características modernas de ES6+.

## 🎯 Objetivo

Desarrollar un mini sistema de gestión de inventario para una tienda online, aplicando de forma integrada los conceptos fundamentales de ES6+ aprendidos hasta ahora: variables modernas, arrow functions, destructuring, template literals, métodos de objetos mejorados y otros conceptos de sintaxis moderna.

## 🌍 Contexto Real

Trabajas en el equipo de desarrollo de una startup de e-commerce que está migrando su sistema legacy a JavaScript moderno. Como parte de esta migración, se te ha asignado refactorizar y mejorar el módulo de gestión de inventario.

## 📋 Instrucciones

1. En el archivo `start.js` encontrarás la estructura base del proyecto.
2. Tu tarea es implementar cada una de las funciones solicitadas usando ES6+.
3. El sistema debe permitir realizar las operaciones básicas de un inventario:
   - Añadir productos nuevos
   - Actualizar inventario existente
   - Buscar y filtrar productos
   - Generar informes de inventario
   - Gestionar notificaciones de stock bajo

4. Ejecuta los tests para verificar tu implementación:

    ```shell
    npm test exercises/1-syntax/1.3-mini-project
    ```

5. Si necesitas ayuda, consulta las pistas en `HINTS.md`

## 💡 Requisitos técnicos

- Utilizar `let` y `const` adecuadamente (no `var`)
- Implementar arrow functions para callbacks y métodos
- Utilizar destructuring en parámetros y variables
- Implementar template literals para formatear strings
- Usar parámetros por defecto donde sea apropiado
- Aplicar enhanced object literals para métodos y propiedades
- Utilizar el operador spread/rest para arrays y objetos

## 🧩 Estructura del proyecto

El mini-proyecto está organizado en varios módulos conceptuales que representan diferentes aspectos del sistema de inventario. Cada módulo se implementa como un conjunto de funciones que interactúan entre sí:

1. **Gestión de productos**: Añadir, actualizar y eliminar productos del inventario
2. **Consultas y filtros**: Buscar productos según diversos criterios
3. **Gestión de pedidos**: Procesar pedidos y actualizar inventario
4. **Reportes y notificaciones**: Generar informes y alertas sobre productos

## 🚀 Puntos extra (opcional)

Si completas la implementación básica y quieres un desafío adicional:

- Implementa un método de exportación que genere un informe en formato HTML usando template literals
- Añade validaciones de datos avanzadas usando expresiones condicionales modernas
- Crea un sistema de eventos simples para notificar cambios en el inventario

## 📚 Recursos

- [MDN: Object initializer](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Object_initializer)
- [MDN: Template literals](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals)
- [MDN: Destructuring assignment](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
