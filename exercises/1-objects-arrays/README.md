# 📚 Ejercicios: Objetos y Arrays ES6

Esta colección de ejercicios está diseñada para practicar y dominar los conceptos fundamentales de objetos y arrays en JavaScript ES6. Cada ejercicio incluye implementaciones que debes completar y tests unitarios para verificar tu progreso.

## 🎯 Objetivos de aprendizaje

Al completar estos ejercicios podrás:

- ✅ **Crear objetos** usando diferentes métodos (literal, constructor, Object.create)
- ✅ **Usar enhanced object literals** (property shorthand, computed properties, method shorthand)
- ✅ **Manipular objetos** con métodos avanzados (Object.assign, Object.keys, etc.)
- ✅ **Crear arrays** de múltiples formas (Array.from, Array.of, spread operator)
- ✅ **Iterar arrays** eficientemente (map, filter, reduce)
- ✅ **Buscar en arrays** usando métodos modernos (find, includes, some, every)
- ✅ **Verificar arrays** con validaciones robustas
- ✅ **Combinar objetos y arrays** en operaciones complejas
- ✅ **Aplicar utilidades avanzadas** (clonado, comparación, transformaciones)

---

## 📂 Estructura de ejercicios

```plain
exercises/1-objects-arrays/
├── 1-object-creation/           # Creación de objetos
├── 2-enhanced-literals/         # Enhanced Object Literals ES6
├── 3-object-manipulation/       # Manipulación avanzada de objetos
├── 4-array-creation/           # Creación de arrays
├── 5-array-iteration/          # Iteración de arrays (map, filter, reduce)
├── 6-array-search/             # Búsqueda en arrays (find, includes, some, every)
├── 7-array-verification/       # Verificación y validación de arrays
├── 8-objects-arrays-mixed/     # Combinación de objetos y arrays
└── 9-object-utilities/         # Utilidades avanzadas de objetos
```

Cada directorio contiene:

- `exercise.js` - Ejercicios a completar (implementa las funciones marcadas con TODO)
- `exercise.test.js` - Tests unitarios para verificar tu implementación

---

## 🚀 Cómo empezar

### Prerrequisitos

Asegúrate de tener configurado tu entorno según las instrucciones del [`SETUP.md`](../../SETUP.md):

- Node.js v22.x LTS o superior
- npm v10.x o superior
- Jest para testing (se instala automáticamente)

### Instalación

```bash
# Desde el directorio raíz del workshop
cd /path/to/01-es6-workshop

# Instalar dependencias (si no lo has hecho)
npm install

# Navegar a los ejercicios de objetos y arrays
cd exercises/1-objects-arrays
```

### Ejecutar tests

```bash
# Ejecutar todos los tests de una vez
npm test

# Ejecutar tests de un ejercicio específico
npm test 1-object-creation

# Ejecutar tests en modo watch (se re-ejecutan al guardar cambios)
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

### Verificar progreso

```bash
# Ver resumen de todos los ejercicios
npm run check-progress

# Ejecutar linting para verificar calidad del código
npm run lint

# Formatear código automáticamente
npm run format
```

---

## 📋 Guía de ejercicios

### 🟦 Nivel Básico

#### 1. Creación de objetos

**Conceptos:** Notación literal, Object constructor, Object.create()

**Ejercicios:**

- ✏️ Crear usuario con notación literal
- ✏️ Crear producto usando Object constructor  
- ✏️ Crear vehículo con herencia usando Object.create()

**Tiempo estimado:** 15-20 minutos

#### 2. Enhanced Object Literals

**Conceptos:** Property shorthand, computed property names, method shorthand

**Ejercicios:**

- ✏️ Refactorizar objeto libro con property shorthand
- ✏️ Crear configuración con computed property names
- ✏️ Implementar calculadora con method shorthand

**Tiempo estimado:** 20-25 minutos

### 🟨 Nivel Intermedio

#### 3. Manipulación de objetos

**Conceptos:** Object.assign, Object.keys/values/entries, Object.freeze

**Ejercicios:**

- ✏️ Combinar perfiles de usuario sin mutación
- ✏️ Analizar inventario con estadísticas
- ✏️ Crear configuración inmutable

**Tiempo estimado:** 25-30 minutos

#### 4. Creación de arrays

**Conceptos:** Array.from(), Array.of(), spread operator

**Ejercicios:**

- ✏️ Convertir estructuras con Array.from()
- ✏️ Comparar Array.of() vs constructor Array()
- ✏️ Combinar arrays con spread operator

**Tiempo estimado:** 20-25 minutos

#### 5. Iteración de arrays

**Conceptos:** map(), filter(), reduce()

**Ejercicios:**

- ✏️ Transformar usuarios con map()
- ✏️ Filtrar productos por criterios
- ✏️ Calcular estadísticas con reduce()

**Tiempo estimado:** 30-35 minutos

#### 6. Búsqueda en arrays

**Conceptos:** find(), findIndex(), includes(), some(), every()

**Ejercicios:**

- ✏️ Buscar elementos específicos
- ✏️ Verificar permisos de usuario
- ✏️ Validar formularios y calificaciones

**Tiempo estimado:** 25-30 minutos

### 🟧 Nivel Avanzado

#### 7. Verificación de arrays

**Conceptos:** Array.isArray(), validaciones complejas, arrays anidados

**Ejercicios:**

- ✏️ Verificar tipos y estructuras
- ✏️ Validar arrays homogéneos
- ✏️ Analizar matrices rectangulares

**Tiempo estimado:** 30-35 minutos

#### 8. Objetos y arrays mixtos

**Conceptos:** Transformaciones complejas, fusiones, índices

**Ejercicios:**

- ✏️ Convertir entre Map y arrays
- ✏️ Extraer propiedades anidadas
- ✏️ Crear índices invertidos para búsqueda

**Tiempo estimado:** 35-40 minutos

#### 9. Utilidades de objetos

**Conceptos:** Clonado profundo, comparación, aplanado de objetos

**Ejercicios:**

- ✏️ Implementar clonado superficial y profundo
- ✏️ Comparar objetos recursivamente
- ✏️ Aplanar y reconstruir objetos anidados

**Tiempo estimado:** 40-45 minutos

---

## 💡 Metodología de resolución

### 🔍 Antes de empezar cada ejercicio

1. **Lee el archivo de teoría correspondiente** en [`1-js-basico/1-4-objetos-arrays.md`](../../1-js-basico/1-4-objetos-arrays.md)
2. **Revisa los comentarios TODO** en `exercise.js`
3. **Ejecuta los tests** para ver qué se espera: `npm test nombre-ejercicio`
4. **Lee los casos de prueba** en `exercise.test.js` para entender los requisitos

### ✍️ Durante la implementación

1. **Empieza por el ejercicio más simple** de cada bloque
2. **Implementa una función a la vez** y ejecuta tests frecuentemente
3. **Lee los mensajes de error** de los tests - te guían hacia la solución
4. **Usa console.log()** para debuggear si es necesario
5. **Consulta la documentación** de MDN si necesitas ayuda con métodos específicos

### ✅ Al completar cada ejercicio

1. **Todos los tests deben pasar** - verde ✅
2. **Revisa tu código** - ¿es claro y legible?
3. **Ejecuta el linting** - `npm run lint`
4. **Compara con las buenas prácticas** del archivo de teoría

---

## 🎯 Casos de prueba y validación

### Tipos de tests incluidos

- **✅ Funcionalidad básica** - Los casos principales funcionan
- **✅ Casos edge** - Valores límite, arrays vacíos, objetos null
- **✅ Validación de entrada** - Manejo de parámetros inválidos
- **✅ Inmutabilidad** - Las funciones no modifican parámetros originales
- **✅ Tipos de retorno** - Verificación de estructuras devueltas
- **✅ Rendimiento** - Para operaciones con datasets grandes

### Interpretando resultados de tests

```bash
# ✅ Test pasó - tu implementación es correcta
✓ debe crear usuario con todas las propiedades

# ❌ Test falló - necesitas revisar tu código  
✗ debe usar property shorthand syntax
  Expected: not to match /titulo\s*:\s*titulo/
  Received: "titulo: titulo"

# ⚠️ Test pendiente - aún no implementado
○ debe manejar arrays anidados
```

---

## 🛠️ Herramientas de desarrollo

### Scripts disponibles

```bash
# Testing
npm test                    # Ejecutar todos los tests
npm run test:watch         # Tests en modo watch
npm run test:coverage      # Tests con cobertura de código
npm test -- --verbose      # Tests con output detallado

# Calidad de código
npm run lint               # Verificar estilo y errores
npm run lint:fix           # Corregir errores automáticamente
npm run format             # Formatear código con Prettier

# Utilidades
npm run check-progress     # Ver progreso general
npm run clean              # Limpiar archivos temporales
```

### Configuración de VS Code

Si usas VS Code, estas extensiones te ayudarán:

- **Jest** - Ejecutar tests desde el editor
- **ESLint** - Detectar errores en tiempo real
- **Prettier** - Formateo automático
- **JavaScript (ES6) Snippets** - Snippets útiles

### Debugging

```javascript
// En tus funciones, puedes usar:
console.log('Debug:', variable);

// Para arrays y objetos complejos:
console.table(array);
console.dir(objeto, { depth: null });

// Para medir rendimiento:
console.time('operacion');
// ... tu código
console.timeEnd('operacion');
```

---

## 📖 Recursos de referencia

### Documentación oficial

- [Objects - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Arrays - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [ES6 Features - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla)

### Métodos clave por categoría

**Creación de objetos:**

- `Object.create()`, `Object.assign()`, `{...spread}`

**Análisis de objetos:**

- `Object.keys()`, `Object.values()`, `Object.entries()`
- `Object.hasOwnProperty()`, `Object.freeze()`

**Creación de arrays:**

- `Array.from()`, `Array.of()`, `[...spread]`

**Iteración de arrays:**

- `map()`, `filter()`, `reduce()`, `forEach()`

**Búsqueda en arrays:**

- `find()`, `findIndex()`, `includes()`, `indexOf()`
- `some()`, `every()`

**Verificación:**

- `Array.isArray()`, `instanceof`

---

## 🏆 Criterios de éxito

### Para cada ejercicio individual

- [ ] Todos los tests pasan ✅
- [ ] Código pasa el linting sin errores
- [ ] Funciones implementadas según especificaciones
- [ ] Manejo correcto de casos edge

### Para completar el módulo

- [ ] Los 9 ejercicios están completados
- [ ] Cobertura de tests > 90%
- [ ] Código formateado consistentemente
- [ ] Comprensión de todos los conceptos clave

### Indicadores de dominio

- [ ] Puedes explicar las diferencias entre los métodos de creación
- [ ] Entiendes cuándo usar cada método de iteración
- [ ] Puedes implementar operaciones complejas combinando múltiples métodos
- [ ] Reconoces patrones de mutabilidad vs inmutabilidad

---

## 🔄 Próximos pasos

Una vez completados estos ejercicios:

1. **Aplica los conceptos** en el proyecto integrador del workshop
2. **Practica con datos reales** - APIs, JSON, formularios web
3. **Avanza al siguiente módulo**: [ES6 Features](../2-es6/)
4. **Explora patrones avanzados**: Functional programming, async operations

### Desafíos adicionales

Si quieres ir más allá, intenta estos retos:

- 🏃‍♂️ **Optimización**: Mejora el rendimiento de las funciones con datasets grandes
- 🔧 **Extensión**: Añade funcionalidades extra a las implementaciones
- 🧪 **Testing**: Escribe tests adicionales para casos que no están cubiertos
- 📚 **Documentación**: Añade JSDoc a tus funciones

---

## 🆘 Solución de problemas

### Tests no pasan

1. **Lee el mensaje de error completo** - te dice exactamente qué está mal
2. **Verifica que implementaste la función correcta** - nombre y parámetros
3. **Revisa el tipo de retorno esperado** - objeto, array, primitivo
4. **Usa console.log()** para inspeccionar valores intermedios

### Error de sintaxis

1. **Ejecuta el linting**: `npm run lint`
2. **Verifica llaves y paréntesis** están balanceados
3. **Revisa imports/exports** en los archivos
4. **Usa Prettier** para formatear: `npm run format`

### Rendimiento lento

1. **Evita bucles anidados** cuando sea posible
2. **Usa métodos de array apropiados** (map vs forEach)
3. **No reasignes arrays/objetos** innecesariamente
4. **Considera complejidad algorítmica** O(n) vs O(n²)

### Conceptos confusos

1. **Repasa la teoría** en el archivo principal del módulo
2. **Consulta ejemplos** en los comentarios de los ejercicios
3. **Experimenta en la consola** del navegador
4. **Busca documentación** en MDN para métodos específicos

---

## 📝 Notas importantes

- **No modifiques los archivos de test** - solo los archivos `exercise.js`
- **Los ejercicios están ordenados por dificultad** - recomendamos seguir el orden
- **Cada ejercicio es independiente** - puedes saltarte alguno si es necesario
- **Las funciones deben ser puras** cuando sea posible (sin side effects)
- **Usa las características de ES6** específicamente mencionadas en cada ejercicio

---

**🎉 ¡Buena suerte con los ejercicios! Recuerda que la práctica constante es la clave para dominar JavaScript ES6.**

**Si tienes dudas o encuentras problemas, revisa primero la documentación de cada ejercicio y los casos de prueba. ¡Happy coding! 🚀**
