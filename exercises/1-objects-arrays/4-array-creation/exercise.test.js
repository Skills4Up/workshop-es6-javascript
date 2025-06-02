/**
 * Tests para ejercicios de creación de arrays
 */
const {
  convertirTextoAArray,
  crearRangoNumeros,
  convertirMapAArray,
  crearArraySeguro,
  compararCreacionArrays,
  combinarArrays,
  clonarYModificar,
  insertarEnPosicion
} = require('./exercise');

describe('Ejercicios de Creación de Arrays', () => {

  describe('Ejercicio 1: Array.from()', () => {
    test('convertirTextoAArray debe manejar strings correctamente', () => {
      expect(convertirTextoAArray('hola')).toEqual(['h', 'o', 'l', 'a']);
      expect(convertirTextoAArray('🚀🌟')).toEqual(['🚀', '🌟']);
      expect(convertirTextoAArray('')).toEqual([]);
    });

    test('crearRangoNumeros debe crear rangos correctos', () => {
      expect(crearRangoNumeros(1, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(crearRangoNumeros(0, 3)).toEqual([0, 1, 2, 3]);
      expect(crearRangoNumeros(5, 5)).toEqual([5]);
    });

    test('convertirMapAArray debe convertir Map correctamente', () => {
      const mapa = new Map([['a', 1], ['b', 2], ['c', 3]]);
      const resultado = convertirMapAArray(mapa);

      expect(resultado).toEqual([['a', 1], ['b', 2], ['c', 3]]);
      expect(Array.isArray(resultado)).toBe(true);
    });
  });

  describe('Ejercicio 2: Array.of()', () => {
    test('crearArraySeguro debe usar Array.of()', () => {
      expect(crearArraySeguro(5)).toEqual([5]);
      expect(crearArraySeguro('texto')).toEqual(['texto']);
      expect(crearArraySeguro(undefined)).toEqual([undefined]);
    });

    test('compararCreacionArrays debe mostrar diferencias', () => {
      const resultado = compararCreacionArrays(5);

      expect(resultado.arrayOf).toEqual([5]);
      expect(resultado.arrayConstructor).toHaveLength(5);
      expect(resultado.arrayConstructor[0]).toBeUndefined();
    });
  });

  describe('Ejercicio 3: Spread operator', () => {
    test('combinarArrays debe combinar y deduplicar', () => {
      const resultado = combinarArrays([1, 2], [2, 3], [3, 4]);
      expect(resultado).toEqual([1, 2, 3, 4]);
    });

    test('clonarYModificar no debe afectar original', () => {
      const original = [1, 2, 3];
      const resultado = clonarYModificar(original, 4);

      expect(resultado).toEqual([1, 2, 3, 4]);
      expect(original).toEqual([1, 2, 3]);
    });

    test('insertarEnPosicion debe insertar correctamente', () => {
      const array = [1, 2, 4, 5];
      const resultado = insertarEnPosicion(array, 2, 3);

      expect(resultado).toEqual([1, 2, 3, 4, 5]);
      expect(array).toEqual([1, 2, 4, 5]); // Original sin cambios
    });
  });
});
