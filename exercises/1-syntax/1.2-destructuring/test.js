const {
  extraerInfoProducto,
  extraerFabricante,
  extraerEspecificaciones,
  extraerDetallesAdicionales,
  extraerPerfilUsuario,
  crearMensajeBienvenida,
  separarProducto,
  separarCalificaciones
} = require('./start');

let challenges;
try {
  challenges = require('./challenges');
} catch (error) {
  challenges = {};
}

// Datos de prueba
const producto = {
  id: 'P001',
  nombre: 'Smartphone Galaxy X10',
  precio: 799.99,
  disponible: true,
  categoria: 'Electrónica',
  fabricante: {
    nombre: 'Samsung',
    pais: 'Corea del Sur',
    fundacion: 1938
  },
  especificaciones: ['6GB RAM', 'Pantalla 6.1"', '128GB', '5G'],
  calificaciones: [4.5, 4.8, 5.0, 4.2, 4.7]
};

const usuario = {
  id: 'U123',
  nombre: 'Ana García',
  email: 'ana.garcia@example.com',
  preferencias: {
    tema: 'oscuro',
    notificaciones: true,
    idioma: 'español'
  },
  carrito: [
    { id: 'P001', cantidad: 1 },
    { id: 'P034', cantidad: 2 }
  ],
  metodosPago: ['tarjeta', 'paypal']
};

// Datos para pruebas de desafíos
const datosAPI = {
  status: 'success',
  code: 200,
  data: {
    productos: [
      {
        id: 'P001',
        nombre: 'Smartphone Galaxy X10',
        precio: 799.99,
        stock: {
          disponible: 15,
          reservado: 5,
          ubicaciones: ['Almacén A', 'Tienda Central']
        },
        categorias: ['Electrónica', 'Móviles', 'Destacados'],
        reviews: { promedio: 4.7, total: 245 }
      },
      {
        id: 'P002',
        nombre: 'Laptop UltraBook Pro',
        precio: 1299.99,
        stock: {
          disponible: 8,
          reservado: 2,
          ubicaciones: ['Almacén B']
        },
        categorias: ['Electrónica', 'Computadoras', 'Profesional'],
        reviews: { promedio: 4.9, total: 189 }
      }
    ],
    metadata: {
      ultimaActualizacion: '2023-06-15T08:30:00Z',
      moneda: 'USD',
      filtros: ['disponibles', 'nuevos']
    }
  },
  pagination: {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 10
  }
};

// Tests para los ejercicios básicos
describe('Ejercicios básicos de destructuring', () => {
  test('Ejercicio 1: Destructuring básico de objetos', () => {
    const resultado = extraerInfoProducto(producto);
    const esperado = { id: 'P001', nombre: 'Smartphone Galaxy X10', precio: 799.99 };
    expect(resultado).toEqual(esperado);
  });

  test('Ejercicio 2: Destructuring con alias', () => {
    const resultado = extraerFabricante(producto);
    const esperado = { marcaProducto: 'Samsung', paisOrigen: 'Corea del Sur' };
    expect(resultado).toEqual(esperado);
  });

  test('Ejercicio 3: Destructuring de arrays', () => {
    const resultado = extraerEspecificaciones(producto);
    const esperado = {
      primeraEspec: '6GB RAM',
      terceraEspec: '128GB',
      ultimaEspec: '5G'
    };
    expect(resultado).toEqual(esperado);
  });

  test('Ejercicio 4: Valores por defecto', () => {
    const resultado = extraerDetallesAdicionales(producto);
    const esperado = { descuento: 0, garantia: '1 año' };
    expect(resultado).toEqual(esperado);
  });

  test('Ejercicio 5: Destructuring anidado', () => {
    const resultado = extraerPerfilUsuario(usuario);
    const esperado = {
      id: 'U123',
      idiomaUsuario: 'español',
      metodoPrincipal: 'tarjeta'
    };
    expect(resultado).toEqual(esperado);
  });

  test('Ejercicio 6: Destructuring en parámetros', () => {
    const mensajeEsperado = 'Bienvenido/a, Ana García. Usando tema: oscuro';
    const mensajeReal = crearMensajeBienvenida(usuario);

    expect(mensajeReal).toBe(mensajeEsperado);

    // Validamos que realmente usó destructuring en los parámetros
    const fnStr = crearMensajeBienvenida.toString();
    expect(fnStr).toMatch(/{.*}/s); // 's' flag para que el punto coincida con saltos de línea
  });

  test('Ejercicio 7: Rest en destructuring de objetos', () => {
    const resultado = separarProducto(producto);

    // Verificamos id y nombre
    expect(resultado.id).toBe('P001');
    expect(resultado.nombre).toBe('Smartphone Galaxy X10');

    // Verificamos que detalles tenga el resto de propiedades
    expect(resultado.detalles).toBeDefined();
    expect(resultado.detalles.id).toBeUndefined();
    expect(resultado.detalles.nombre).toBeUndefined();
    expect(resultado.detalles.precio).toBe(799.99);
    expect(resultado.detalles.fabricante).toBeDefined();
  });

  test('Ejercicio 8: Rest en destructuring de arrays', () => {
    const resultado = separarCalificaciones(producto);
    const esperado = {
      calificacionPrincipal: 4.5,
      calificacionesAdicionales: [4.8, 5.0, 4.2, 4.7]
    };
    expect(resultado).toEqual(esperado);
  });
});

// Tests para los desafíos avanzados (si están implementados)
describe('Desafíos avanzados de destructuring', () => {
  const hasChallenges =
    typeof challenges.extraerDatosComplejos === 'function' &&
    typeof challenges.procesarRespuestaAPI === 'function' &&
    typeof challenges.actualizarProducto === 'function' &&
    typeof challenges.procesarEntidad === 'function';

  beforeEach(() => {
    if (!hasChallenges) {
      console.log('⚠️ Los desafíos avanzados aún no han sido implementados');
    }
  });

  test('Desafío 1: Extracción multinivel con condiciones', () => {
    if (!hasChallenges) return;

    const resultado = challenges.extraerDatosComplejos(datosAPI);
    const esperado = {
      statusCode: 200,
      primerProducto: 'Smartphone Galaxy X10',
      stockDisponible: 15,
      ubicacionPrincipal: 'Almacén A',
      totalReviews: 245,
      divisa: 'USD',
      almacenPrincipal: true
    };
    expect(resultado).toEqual(esperado);
  });

  test('Desafío 2: Función procesadora de respuesta API', () => {
    if (!hasChallenges) return;

    const procesados = challenges.procesarRespuestaAPI(datosAPI);

    // Verificar que sea un array con el número correcto de productos
    expect(Array.isArray(procesados)).toBe(true);
    expect(procesados.length).toBe(2);

    // Verificar estructura del primer producto
    const primerProducto = procesados[0];
    const estructuraEsperada = ['id', 'nombre', 'precio', 'stockDisponible', 'moneda', 'stockTotal'];

    estructuraEsperada.forEach(prop => {
      expect(primerProducto).toHaveProperty(prop);
    });

    // Verificar valores específicos
    expect(primerProducto.stockTotal).toBe(20); // 15 disponible + 5 reservado
    expect(primerProducto.moneda).toBe('USD');
  });

  test('Desafío 3: Combinación de objetos con spread y destructuring', () => {
    if (!hasChallenges) return;

    const productoOriginal = {
      id: 'P005',
      nombre: 'Smartwatch',
      precio: 299.99,
      stock: { disponible: 10 },
      categorias: ['Electrónica', 'Accesorios']
    };

    const actualizacion = {
      id: 'NUEVO-ID', // No debería cambiar
      nombre: 'Smartwatch Pro',
      precio: 249.99, // Menor que el original, no debería cambiar
      stock: { disponible: 5 }, // Debería sumarse
      categorias: ['Wearables', 'Electrónica'] // Deberían combinarse sin duplicados
    };

    const resultado = challenges.actualizarProducto(productoOriginal, actualizacion);

    // Verificaciones
    expect(resultado.id).toBe('P005');
    expect(resultado.precio).toBe(299.99);
    expect(resultado.stock.disponible).toBe(15);
    expect(resultado.nombre).toBe('Smartwatch Pro');

    // Verificar categorías sin importar el orden
    expect(resultado.categorias).toHaveLength(3);
    expect(resultado.categorias).toEqual(expect.arrayContaining(['Electrónica', 'Accesorios', 'Wearables']));
  });

  test('Desafío 4: Pattern matching simulado', () => {
    if (!hasChallenges) return;

    // Probamos con un usuario
    const usuario = { type: 'USER', id: 'U1', nombre: 'Ana', email: 'ana@mail.com', extra: true };
    const usuarioProcesado = challenges.procesarEntidad(usuario);

    expect(usuarioProcesado).toMatchObject({
      type: 'USER',
      id: 'U1',
      nombre: 'Ana',
      email: 'ana@mail.com'
    });
    expect(usuarioProcesado.processedAt).toBeDefined();

    // Probamos con un producto
    const producto = { type: 'PRODUCT', id: 'P1', nombre: 'Laptop', precio: 999.99 };
    const productoProcesado = challenges.procesarEntidad(producto);

    expect(productoProcesado).toMatchObject({
      type: 'PRODUCT',
      id: 'P1',
      nombre: 'Laptop',
      precio: 999.99
    });
    expect(productoProcesado.processedAt).toBeDefined();

    // Probamos con una orden
    const orden = { type: 'ORDER', id: 'O1', userId: 'U1', productId: 'P1', status: 'pending' };
    const ordenProcesada = challenges.procesarEntidad(orden);

    expect(ordenProcesada).toMatchObject({
      type: 'ORDER',
      id: 'O1',
      userId: 'U1',
      productId: 'P1',
      status: 'pending'
    });
    expect(ordenProcesada.processedAt).toBeDefined();

    // Probamos con un tipo desconocido
    const desconocido = { foo: 'bar' };
    const desconocidoProcesado = challenges.procesarEntidad(desconocido);

    expect(desconocidoProcesado.type).toBe('UNKNOWN');
    expect(desconocidoProcesado.processedAt).toBeDefined();
  });
});
