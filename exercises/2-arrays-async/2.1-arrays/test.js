/**
 * Tests para los ejercicios de Arrays ES6+
 */
const {
  obtenerProductosDisponibles,
  obtenerListaPrecios,
  buscarProductoPorId,
  calcularValorTotalInventario,
  filtrarProductos,
  ordenarProductos,
  analizarCategorias,
  obtenerProductosPremium,
  verificarProductosCategoria,
  obtenerTodasCategorias
} = require('./start');

// Intenta cargar los retos avanzados
let challenges;
try {
  challenges = require('./challenges');
} catch (error) {
  challenges = {};
}

// Datos de prueba
const productos = [
  { id: 1, nombre: 'Laptop Pro', precio: 1200, categorias: ['Electrónica', 'Computadoras'], stock: 15, rating: 4.5 },
  { id: 2, nombre: 'Smartphone X', precio: 800, categorias: ['Electrónica', 'Móviles'], stock: 20, rating: 4.2 },
  { id: 3, nombre: 'Monitor UltraWide', precio: 420, categorias: ['Electrónica', 'Accesorios'], stock: 5, rating: 4.7 },
  { id: 4, nombre: 'Teclado Mecánico', precio: 120, categorias: ['Accesorios', 'Gaming'], stock: 30, rating: 4.1 },
  { id: 5, nombre: 'Tablet Mini', precio: 350, categorias: ['Electrónica', 'Tablets'], stock: 0, rating: 3.9 },
  { id: 6, nombre: 'SSD 1TB', precio: 150, categorias: ['Almacenamiento', 'Componentes'], stock: 25, rating: 4.8 },
  { id: 7, nombre: 'Auriculares Bluetooth', precio: 75, categorias: ['Audio', 'Accesorios'], stock: 0, rating: 4.0 },
  { id: 8, nombre: 'Mouse Gamer', precio: 60, categorias: ['Accesorios', 'Gaming'], stock: 12, rating: 4.3 },
  { id: 9, nombre: 'Webcam HD', precio: 90, categorias: ['Accesorios', 'Periféricos'], stock: 8, rating: 3.8 },
  { id: 10, nombre: 'Impresora Láser', precio: 280, categorias: ['Oficina', 'Periféricos'], stock: 3, rating: 4.4 }
];

const clientes = [
  { id: 'C001', nombre: 'Ana García', email: 'ana@example.com', tipo: 'premium', compras: 12 },
  { id: 'C002', nombre: 'Juan Pérez', email: 'juan@example.com', tipo: 'regular', compras: 3 },
  { id: 'C003', nombre: 'María López', email: 'maria@example.com', tipo: 'premium', compras: 8 },
  { id: 'C004', nombre: 'Carlos Ruiz', email: 'carlos@example.com', tipo: 'regular', compras: 2 },
  { id: 'C005', nombre: 'Elena Martín', email: 'elena@example.com', tipo: 'regular', compras: 5 }
];

const ventas = [
  { id: 'V001', clienteId: 'C001', productos: [1, 6], total: 1350, fecha: '2023-05-10' },
  { id: 'V002', clienteId: 'C002', productos: [4, 8], total: 180, fecha: '2023-05-15' },
  { id: 'V003', clienteId: 'C001', productos: [2, 3], total: 1220, fecha: '2023-05-20' },
  { id: 'V004', clienteId: 'C003', productos: [5, 7], total: 425, fecha: '2023-05-22' },
  { id: 'V005', clienteId: 'C005', productos: [9], total: 90, fecha: '2023-05-25' },
  { id: 'V006', clienteId: 'C004', productos: [10], total: 280, fecha: '2023-05-27' },
  { id: 'V007', clienteId: 'C003', productos: [1, 4], total: 1320, fecha: '2023-06-01' },
  { id: 'V008', clienteId: 'C001', productos: [6, 8], total: 210, fecha: '2023-06-03' },
  { id: 'V009', clienteId: 'C005', productos: [3], total: 420, fecha: '2023-06-05' },
  { id: 'V010', clienteId: 'C002', productos: [2], total: 800, fecha: '2023-06-10' }
];

// Tests para los ejercicios básicos
describe('Ejercicios básicos de Arrays ES6+', () => {
  test('Ejercicio 1: Filtrado básico', () => {
    const disponibles = obtenerProductosDisponibles(productos);

    // Verificar que solo incluye productos con stock > 0
    expect(disponibles.length).toBe(8);
    expect(disponibles.every(p => p.stock > 0)).toBe(true);
    expect(disponibles.some(p => p.nombre === 'Tablet Mini')).toBe(false);
    expect(disponibles.some(p => p.nombre === 'Auriculares Bluetooth')).toBe(false);

    // Verificar que no modifica el array original
    const fnStr = obtenerProductosDisponibles.toString();
    expect(fnStr).toMatch(/filter/);
  });

  test('Ejercicio 2: Transformación con map', () => {
    const lista = obtenerListaPrecios(productos);

    // Verificar formato correcto
    expect(lista.length).toBe(productos.length);
    expect(lista[0]).toBe('Laptop Pro - $1200');
    expect(lista[3]).toBe('Teclado Mecánico - $120');

    // Verificar uso de map
    const fnStr = obtenerListaPrecios.toString();
    expect(fnStr).toMatch(/map/);
  });

  test('Ejercicio 3: Búsqueda con find', () => {
    const producto = buscarProductoPorId(productos, 5);

    // Verificar que encuentra el producto correcto
    expect(producto).toBeDefined();
    expect(producto.nombre).toBe('Tablet Mini');

    // Verificar que devuelve undefined si no encuentra
    expect(buscarProductoPorId(productos, 99)).toBeUndefined();

    // Verificar uso de find
    const fnStr = buscarProductoPorId.toString();
    expect(fnStr).toMatch(/find/);
  });

  test('Ejercicio 4: Cálculo con reduce', () => {
    const valorTotal = calcularValorTotalInventario(productos);

    // El valor total debe ser la suma de precio * stock de cada producto
    const valorEsperado = productos.reduce((total, p) => total + p.precio * p.stock, 0);
    expect(valorTotal).toBe(valorEsperado);
    expect(valorTotal).toBeGreaterThan(0);

    // Verificar uso de reduce
    const fnStr = calcularValorTotalInventario.toString();
    expect(fnStr).toMatch(/reduce/);
  });

  test('Ejercicio 5: Filtrado múltiple', () => {
    // Probar filtro por categoría
    const electronicos = filtrarProductos(productos, { categoria: 'Electrónica' });
    expect(electronicos.length).toBe(4);
    expect(electronicos.every(p => p.categorias.includes('Electrónica'))).toBe(true);

    // Probar filtro por rango de precio
    const rango = filtrarProductos(productos, { precioMin: 100, precioMax: 400 });
    expect(rango.length).toBe(3);
    expect(rango.every(p => p.precio >= 100 && p.precio <= 400)).toBe(true);

    // Probar filtro por disponibilidad
    const disponibles = filtrarProductos(productos, { onlyAvailable: true });
    expect(disponibles.length).toBe(8);
    expect(disponibles.every(p => p.stock > 0)).toBe(true);

    // Probar combinación de filtros
    const combinado = filtrarProductos(productos, {
      categoria: 'Accesorios',
      precioMin: 50,
      precioMax: 150,
      onlyAvailable: true
    });
    expect(combinado.length).toBe(2);
    expect(combinado.every(p => p.categorias.includes('Accesorios') &&
      p.precio >= 50 &&
      p.precio <= 150 &&
      p.stock > 0)).toBe(true);
  });

  test('Ejercicio 6: Ordenación', () => {
    // Ordenar por precio ascendente
    const precioAsc = ordenarProductos(productos, { criterio: 'precio', orden: 'asc' });
    expect(precioAsc[0].precio).toBe(60);
    expect(precioAsc[precioAsc.length - 1].precio).toBe(1200);

    // Ordenar por precio descendente
    const precioDesc = ordenarProductos(productos, { criterio: 'precio', orden: 'desc' });
    expect(precioDesc[0].precio).toBe(1200);
    expect(precioDesc[precioDesc.length - 1].precio).toBe(60);

    // Ordenar por rating ascendente
    const ratingAsc = ordenarProductos(productos, { criterio: 'rating', orden: 'asc' });
    expect(ratingAsc[0].rating).toBe(3.8);
    expect(ratingAsc[ratingAsc.length - 1].rating).toBe(4.8);

    // Ordenar por rating descendente
    const ratingDesc = ordenarProductos(productos, { criterio: 'rating', orden: 'desc' });
    expect(ratingDesc[0].rating).toBe(4.8);
    expect(ratingDesc[ratingDesc.length - 1].rating).toBe(3.8);

    // Verificar uso de sort
    const fnStr = ordenarProductos.toString();
    expect(fnStr).toMatch(/sort/);
  });

  test('Ejercicio 7: Transformación compleja', () => {
    const analisis = analizarCategorias(productos);

    // Verificar que hay entradas para cada categoría
    expect(analisis.length).toBeGreaterThan(0);

    // Verificar algunas categorías específicas
    const electronica = analisis.find(c => c.categoria === 'Electrónica');
    expect(electronica).toBeDefined();
    expect(electronica.cantidad).toBe(4);
    expect(electronica.precioPromedio).toBeCloseTo((1200 + 800 + 420 + 350) / 4, 1);

    const accesorios = analisis.find(c => c.categoria === 'Accesorios');
    expect(accesorios).toBeDefined();
    expect(accesorios.cantidad).toBe(4);
  });

  test('Ejercicio 8: Encadenamiento de métodos', () => {
    const premium = obtenerProductosPremium(productos);

    // Debe devolver los nombres de los 3 productos disponibles más caros
    expect(premium.length).toBe(3);
    expect(premium).toContain('Laptop Pro');
    expect(premium).toContain('Smartphone X');
    expect(premium).not.toContain('Tablet Mini'); // No disponible

    // Verificar que son exactamente los 3 más caros disponibles
    const preciosProductosDisponibles = productos
      .filter(p => p.stock > 0)
      .sort((a, b) => b.precio - a.precio)
      .slice(0, 3)
      .map(p => p.nombre);

    expect(premium).toEqual(expect.arrayContaining(preciosProductosDisponibles));
    expect(preciosProductosDisponibles).toEqual(expect.arrayContaining(premium));
  });

  test('Ejercicio 9: every y some', () => {
    // Verificar categoría con todos los productos sobre el precio mínimo
    const resultadoElectronica = verificarProductosCategoria(productos, 'Electrónica', 300);
    expect(resultadoElectronica.todosSuperanPrecio).toBe(true);
    expect(resultadoElectronica.algunoDisponible).toBe(true);

    // Verificar categoría con algunos productos bajo el precio mínimo
    const resultadoAccesorios = verificarProductosCategoria(productos, 'Accesorios', 100);
    expect(resultadoAccesorios.todosSuperanPrecio).toBe(false);
    expect(resultadoAccesorios.algunoDisponible).toBe(true);

    // Verificar categoría sin productos disponibles
    const resultadoAudio = verificarProductosCategoria(productos, 'Audio', 50);
    expect(resultadoAudio.algunoDisponible).toBe(false);

    // Verificar uso de every y some
    const fnStr = verificarProductosCategoria.toString();
    expect(fnStr).toMatch(/every|some/);
  });

  test('Ejercicio 10: flatMap', () => {
    const categorias = obtenerTodasCategorias(productos);

    // Verificar que devuelve un array de categorías únicas
    expect(Array.isArray(categorias)).toBe(true);
    expect(categorias.length).toBeGreaterThan(0);

    // Verificar que no hay duplicados
    const categoriasUnicas = new Set(categorias);
    expect(categorias.length).toBe(categoriasUnicas.size);

    // Verificar categorías específicas
    expect(categorias).toContain('Electrónica');
    expect(categorias).toContain('Accesorios');
    expect(categorias).toContain('Gaming');

    // Verificar uso de flatMap o combinación map+flat o similar
    const fnStr = obtenerTodasCategorias.toString();
    expect(fnStr).toMatch(/flatMap|flat\(|Set\(/);
  });
});

// Tests para los desafíos avanzados
describe('Retos avanzados de Arrays ES6+', () => {
  const hasChallenges =
    typeof challenges.analizarVentas === 'function' &&
    typeof challenges.recomendarProductos === 'function' &&
    typeof challenges.segmentarPorPrecio === 'function' &&
    typeof challenges.crearArbolCategorias === 'function' &&
    typeof challenges.procesarProductos === 'function';

  beforeEach(() => {
    if (!hasChallenges) {
      console.log('⚠️ Los retos avanzados aún no han sido implementados');
    }
  });

  test('Reto 1: Análisis de Ventas Avanzado', () => {
    if (!hasChallenges) return;

    const analisis = challenges.analizarVentas(productos, clientes, ventas);

    // Verificar la estructura del resultado
    expect(analisis).toHaveProperty('ventasPorCliente');
    expect(analisis).toHaveProperty('productosMasVendidos');
    expect(analisis).toHaveProperty('promedioVenta');
    expect(analisis).toHaveProperty('fechaMayorVolumen');

    // Verificar ventas por cliente
    expect(analisis.ventasPorCliente.length).toBe(clientes.length);
    const anaGarcia = analisis.ventasPorCliente.find(v => v.cliente === 'Ana García');
    expect(anaGarcia).toBeDefined();
    expect(anaGarcia.total).toBeCloseTo(1350 + 1220 + 210, 1);

    // Verificar productos más vendidos
    expect(analisis.productosMasVendidos.length).toBeLessThanOrEqual(3);

    // Verificar promedio de venta
    expect(analisis.promedioVenta).toBeCloseTo(ventas.reduce((sum, v) => sum + v.total, 0) / ventas.length, 1);
  });

  test('Reto 2: Sistema de Recomendación Simple', () => {
    if (!hasChallenges) return;

    // Recomendaciones para Ana (C001)
    const recsAna = challenges.recomendarProductos('C001', productos, clientes, ventas);

    // Debe devolver productos que no ha comprado pero son de categorías que sí compró
    expect(recsAna.length).toBeLessThanOrEqual(3);

    // No debe recomendar productos que ya compró
    const productosCompradosAna = ventas
      .filter(v => v.clienteId === 'C001')
      .flatMap(v => v.productos);

    recsAna.forEach(rec => {
      expect(productosCompradosAna.includes(rec.id)).toBe(false);
    });

    // Deben ser productos con buen rating
    recsAna.forEach(rec => {
      expect(rec.rating).toBeGreaterThanOrEqual(3.8);
    });
  });

  test('Reto 3: Agrupación y Segmentación', () => {
    if (!hasChallenges) return;

    const segmentos = challenges.segmentarPorPrecio(productos);

    // Verificar que tiene todos los rangos
    expect(segmentos).toHaveProperty('economico'); // 0-100
    expect(segmentos).toHaveProperty('medioPrecio'); // 101-500
    expect(segmentos).toHaveProperty('premium'); // 501+

    // Verificar productos en cada segmento
    expect(segmentos.economico.productos.length).toBe(3); // 60, 75, 90
    expect(segmentos.medioPrecio.productos.length).toBe(5); // 120, 150, 280, 350, 420
    expect(segmentos.premium.productos.length).toBe(2); // 800, 1200

    // Verificar cálculos para un segmento
    expect(segmentos.economico).toHaveProperty('numeroProductos');
    expect(segmentos.economico).toHaveProperty('ratingPromedio');
    expect(segmentos.economico).toHaveProperty('categorias');
    expect(segmentos.economico).toHaveProperty('masBarato');
    expect(segmentos.economico).toHaveProperty('masCaro');

    expect(segmentos.economico.numeroProductos).toBe(3);
    expect(segmentos.economico.masBarato.precio).toBe(60);
    expect(segmentos.economico.masCaro.precio).toBe(90);
  });

  test('Reto 4: Transformación Recursiva', () => {
    if (!hasChallenges) return;

    const arbol = challenges.crearArbolCategorias(productos);

    // Verificar estructura jerárquica
    expect(arbol).toHaveProperty('Electrónica');
    expect(arbol.Electrónica).toHaveProperty('productos');
    expect(arbol.Electrónica).toHaveProperty('subcategorias');

    // Verificar subcategorías
    expect(arbol.Electrónica.subcategorias).toHaveProperty('Computadoras');
    expect(arbol.Electrónica.subcategorias).toHaveProperty('Móviles');
    expect(arbol.Electrónica.subcategorias).toHaveProperty('Tablets');

    // Verificar productos en una subcategoría
    expect(arbol.Electrónica.subcategorias.Computadoras.productos.length).toBe(1);
    expect(arbol.Electrónica.subcategorias.Computadoras.productos[0].nombre).toBe('Laptop Pro');
  });

  test('Reto 5: Pipeline de Procesamiento', () => {
    if (!hasChallenges) return;

    // Definir algunas transformaciones
    const transformaciones = [
      // Solo productos disponibles
      p => p.filter(item => item.stock > 0),
      // Solo campos básicos
      p => p.map(item => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio
      })),
      // Ordenar por precio
      p => p.sort((a, b) => a.precio - b.precio)
    ];

    const resultado = challenges.procesarProductos(productos, transformaciones);

    // Verificar que se aplicaron todas las transformaciones
    expect(resultado.length).toBe(8); // Productos disponibles

    // Verificar formato simplificado
    expect(Object.keys(resultado[0]).length).toBe(3);
    expect(resultado[0]).toHaveProperty('id');
    expect(resultado[0]).toHaveProperty('nombre');
    expect(resultado[0]).toHaveProperty('precio');

    // Verificar ordenación
    for (let i = 1; i < resultado.length; i++) {
      expect(resultado[i].precio).toBeGreaterThanOrEqual(resultado[i - 1].precio);
    }
  });
});
