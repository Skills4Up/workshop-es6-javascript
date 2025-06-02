/**
 * Tests para ejercicios de utilidades de objetos
 */
const {
  clonadoSuperficial,
  clonadoProfundo,
  compararObjetosSuperficial,
  compararObjetosProfundo,
  limpiarObjeto,
  aplanarObjeto,
  reconstruirObjetoAplanado
} = require('./exercise');

describe('Ejercicios de Utilidades de Objetos', () => {

  describe('Ejercicio 1: Clonado', () => {
    test('clonadoSuperficial debe crear copias superficiales', () => {
      const original = { a: 1, b: { c: 2 } };
      const resultado = clonadoSuperficial(original);

      // Verificar que las copias superficiales funcionan
      expect(resultado.objectAssign).not.toBe(original);
      expect(resultado.spread).not.toBe(original);
      expect(resultado.original).toBe(original);

      // Verificar que las referencias internas se mantienen (superficial)
      expect(resultado.objectAssign.b).toBe(original.b);
      expect(resultado.spread.b).toBe(original.b);

      // Verificar valores
      expect(resultado.objectAssign).toEqual(original);
      expect(resultado.spread).toEqual(original);
    });

    test('clonadoProfundo debe crear copia completamente independiente', () => {
      const original = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4, { e: 5 }]
        },
        f: null,
        g: undefined
      };

      const copia = clonadoProfundo(original);

      // Verificar que no es la misma referencia
      expect(copia).not.toBe(original);
      expect(copia.b).not.toBe(original.b);
      expect(copia.b.d).not.toBe(original.b.d);
      expect(copia.b.d[2]).not.toBe(original.b.d[2]);

      // Verificar que los valores son iguales
      expect(copia).toEqual(original);

      // Verificar que modificar la copia no afecta el original
      copia.b.c = 999;
      copia.b.d[0] = 888;
      copia.b.d[2].e = 777;

      expect(original.b.c).toBe(2);
      expect(original.b.d[0]).toBe(3);
      expect(original.b.d[2].e).toBe(5);
    });
  });

  describe('Ejercicio 2: Comparación', () => {
    test('compararObjetosSuperficial debe comparar primer nivel', () => {
      const obj1 = { a: 1, b: 2, c: { d: 3 } };
      const obj2 = { a: 1, b: 2, c: { d: 3 } };
      const obj3 = { a: 1, b: 2 };

      expect(compararObjetosSuperficial(obj1, obj2)).toBe(false); // Objetos anidados son referencias diferentes
      expect(compararObjetosSuperficial(obj1, obj3)).toBe(false); // Diferentes propiedades
      expect(compararObjetosSuperficial({ a: 1 }, { a: 1 })).toBe(true);
    });

    test('compararObjetosProfundo debe comparar recursivamente', () => {
      const obj1 = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4, { e: 5 }]
        }
      };

      const obj2 = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4, { e: 5 }]
        }
      };

      const obj3 = {
        a: 1,
        b: {
          c: 2,
          d: [3, 4, { e: 6 }] // Diferente valor profundo
        }
      };

      expect(compararObjetosProfundo(obj1, obj2)).toBe(true);
      expect(compararObjetosProfundo(obj1, obj3)).toBe(false);
    });
  });

  describe('Ejercicio 3: Manipulación avanzada', () => {
    test('limpiarObjeto debe eliminar valores específicos', () => {
      const objeto = {
        a: 1,
        b: null,
        c: '',
        d: 0,
        e: undefined,
        f: {
          g: 2,
          h: null,
          i: ''
        }
      };

      const limpio = limpiarObjeto(objeto);

      expect(limpio).toEqual({
        a: 1,
        f: {
          g: 2
        }
      });

      // Verificar que no modifica el original
      expect(objeto.b).toBe(null);
    });

    test('aplanarObjeto debe aplanar correctamente', () => {
      const anidado = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3
          }
        },
        f: 4
      };

      const aplanado = aplanarObjeto(anidado);

      expect(aplanado).toEqual({
        'a': 1,
        'b.c': 2,
        'b.d.e': 3,
        'f': 4
      });
    });

    test('reconstruirObjetoAplanado debe reconstruir correctamente', () => {
      const aplanado = {
        'a': 1,
        'b.c': 2,
        'b.d.e': 3,
        'f': 4
      };

      const reconstruido = reconstruirObjetoAplanado(aplanado);

      expect(reconstruido).toEqual({
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3
          }
        },
        f: 4
      });
    });

    test('aplanar y reconstruir debe ser operación reversible', () => {
      const original = {
        usuario: {
          perfil: {
            nombre: 'Ana',
            configuracion: {
              tema: 'oscuro',
              idioma: 'es'
            }
          },
          activo: true
        }
      };

      const aplanado = aplanarObjeto(original);
      const reconstruido = reconstruirObjetoAplanado(aplanado);

      expect(reconstruido).toEqual(original);
    });
  });
});
