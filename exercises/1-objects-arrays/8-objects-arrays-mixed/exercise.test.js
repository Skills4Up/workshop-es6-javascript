/**
 * Tests para ejercicios de objetos y arrays mixtos
 */
const {
  arrayObjetosAMapa,
  mapaAArrayObjetos,
  agruparObjetosPorPropiedad,
  extraerPropiedadesAnidadas,
  fusionarArraysDeObjetos,
  crearIndiceInvertido,
  procesarVentasAnidadas
} = require('./exercise');

describe('Ejercicios de Objetos y Arrays Mixtos', () => {

  describe('Ejercicio 1: Transformación de estructuras', () => {
    test('arrayObjetosAMapa debe convertir correctamente', () => {
      const objetos = [
        { id: 1, nombre: 'Ana' },
        { id: 2, nombre: 'Luis' }
      ];

      const mapa = arrayObjetosAMapa(objetos, 'id');

      expect(mapa).toBeInstanceOf(Map);
      expect(mapa.size).toBe(2);
      expect(mapa.get(1)).toEqual({ id: 1, nombre: 'Ana' });
      expect(mapa.get(2)).toEqual({ id: 2, nombre: 'Luis' });
    });

    test('mapaAArrayObjetos debe convertir correctamente', () => {
      const mapa = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]);

      const array = mapaAArrayObjetos(mapa);

      expect(array).toHaveLength(3);
      expect(array[0]).toEqual({ clave: 'a', valor: 1 });
      expect(array[1]).toEqual({ clave: 'b', valor: 2 });
      expect(array[2]).toEqual({ clave: 'c', valor: 3 });
    });

    test('agruparObjetosPorPropiedad debe agrupar correctamente', () => {
      const objetos = [
        { categoria: 'A', valor: 1 },
        { categoria: 'B', valor: 2 },
        { categoria: 'A', valor: 3 }
      ];

      const grupos = agruparObjetosPorPropiedad(objetos, 'categoria');

      expect(grupos.A).toHaveLength(2);
      expect(grupos.B).toHaveLength(1);
      expect(grupos.A[0].valor).toBe(1);
      expect(grupos.A[1].valor).toBe(3);
    });
  });

  describe('Ejercicio 2: Datos anidados', () => {
    test('extraerPropiedadesAnidadas debe extraer correctamente', () => {
      const objetos = [
        { usuario: { perfil: { nombre: 'Ana' } } },
        { usuario: { perfil: { nombre: 'Luis' } } },
        { usuario: { perfil: {} } }
      ];

      const nombres = extraerPropiedadesAnidadas(objetos, 'usuario.perfil.nombre');

      expect(nombres).toEqual(['Ana', 'Luis', undefined]);
    });

    test('fusionarArraysDeObjetos debe fusionar correctamente', () => {
      const usuarios = [
        { id: 1, nombre: 'Ana' },
        { id: 2, nombre: 'Luis' }
      ];

      const perfiles = [
        { id: 1, edad: 25 },
        { id: 2, edad: 30 }
      ];

      const fusionado = fusionarArraysDeObjetos(usuarios, perfiles, 'id');

      expect(fusionado).toHaveLength(2);
      expect(fusionado[0]).toEqual({ id: 1, nombre: 'Ana', edad: 25 });
      expect(fusionado[1]).toEqual({ id: 2, nombre: 'Luis', edad: 30 });
    });
  });

  describe('Ejercicio 3: Operaciones avanzadas', () => {
    test('crearIndiceInvertido debe crear índice correctamente', () => {
      const documentos = [
        { id: 1, texto: 'hola mundo' },
        { id: 2, texto: 'mundo feliz' },
        { id: 3, texto: 'Hola amigo' }
      ];

      const indice = crearIndiceInvertido(documentos);

      expect(indice).toBeInstanceOf(Map);
      expect(indice.get('hola')).toEqual([1, 3]);
      expect(indice.get('mundo')).toEqual([1, 2]);
      expect(indice.get('feliz')).toEqual([2]);
      expect(indice.get('amigo')).toEqual([3]);
    });

    test('procesarVentasAnidadas debe procesar correctamente', () => {
      const ventas = {
        norte: [
          { producto: 'A', cantidad: 10 },
          { producto: 'B', cantidad: 5 }
        ],
        sur: [
          { producto: 'A', cantidad: 8 },
          { producto: 'C', cantidad: 12 }
        ]
      };

      const resultado = procesarVentasAnidadas(ventas);

      expect(resultado.totalGeneral).toBe(35);
      expect(resultado.ventasPorRegion.norte).toBe(15);
      expect(resultado.ventasPorRegion.sur).toBe(20);
      expect(resultado.productoMasVendido).toBe('A'); // 10 + 8 = 18
      expect(resultado.regionMasActiva).toBe('sur'); // 20 > 15
    });
  });
});
