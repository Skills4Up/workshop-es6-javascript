/**
 * Tests para ejercicios de verificación de arrays
 */
const {
  esArrayValido,
  clasificarTiposDatos,
  validarArrayUsuarios,
  verificarArrayHomogeneo,
  analizarArrayAnidado,
  validarMatriz
} = require('./exercise');

describe('Ejercicios de Verificación de Arrays', () => {

  describe('Ejercicio 1: Array.isArray() y tipos', () => {
    test('esArrayValido debe verificar arrays correctamente', () => {
      expect(esArrayValido([1, 2, 3])).toEqual({
        esArray: true,
        esValido: true,
        longitud: 3
      });

      expect(esArrayValido([])).toEqual({
        esArray: true,
        esValido: false,
        longitud: 0
      });

      expect(esArrayValido('no es array')).toEqual({
        esArray: false,
        esValido: false,
        longitud: 0
      });
    });

    test('clasificarTiposDatos debe contar tipos correctamente', () => {
      const elementos = [
        'texto', 42, true, {}, [], null, undefined, 'otro'
      ];

      const clasificacion = clasificarTiposDatos(elementos);

      expect(clasificacion.strings).toBe(2);
      expect(clasificacion.numbers).toBe(1);
      expect(clasificacion.booleans).toBe(1);
      expect(clasificacion.objects).toBe(1);
      expect(clasificacion.arrays).toBe(1);
      expect(clasificacion.null).toBe(1);
      expect(clasificacion.undefined).toBe(1);
    });
  });

  describe('Ejercicio 2: Validación de estructura', () => {
    test('validarArrayUsuarios debe validar estructura', () => {
      const usuariosValidos = [
        { nombre: 'Ana', email: 'ana@test.com', edad: 25 },
        { nombre: 'Luis', email: 'luis@test.com', edad: 30 }
      ];

      const resultado = validarArrayUsuarios(usuariosValidos);
      expect(resultado.valido).toBe(true);
      expect(resultado.usuariosValidos).toBe(2);
      expect(resultado.errores).toHaveLength(0);
    });

    test('validarArrayUsuarios debe detectar errores', () => {
      const usuariosInvalidos = [
        { nombre: 'Ana', email: 'ana@test.com', edad: 25 },
        { nombre: 123, email: 'luis@test.com', edad: 'treinta' },
        { email: 'sin-nombre@test.com', edad: 40 }
      ];

      const resultado = validarArrayUsuarios(usuariosInvalidos);
      expect(resultado.valido).toBe(false);
      expect(resultado.usuariosValidos).toBe(1);
      expect(resultado.errores.length).toBeGreaterThan(0);
    });

    test('verificarArrayHomogeneo debe verificar homogeneidad', () => {
      const arrayHomogeneo = ['a', 'b', 'c'];
      const resultado = verificarArrayHomogeneo(arrayHomogeneo, 'string');

      expect(resultado.homogeneo).toBe(true);
      expect(resultado.tiposDiferentes).toHaveLength(0);
      expect(resultado.indicesInvalidos).toHaveLength(0);
    });
  });

  describe('Ejercicio 3: Verificaciones complejas', () => {
    test('analizarArrayAnidado debe analizar correctamente', () => {
      const arrayAnidado = [1, [2, 3], 4, [5, [6, 7]]];
      const analisis = analizarArrayAnidado(arrayAnidado);

      expect(analisis.esArrayAnidado).toBe(true);
      expect(analisis.profundidadMaxima).toBe(2);
      expect(analisis.totalElementos).toBe(7);
      expect(analisis.estructuraPlana).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('validarMatriz debe validar matriz rectangular', () => {
      const matrizValida = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];

      const resultado = validarMatriz(matrizValida, 3, 3);
      expect(resultado.valida).toBe(true);
      expect(resultado.errores).toHaveLength(0);
      expect(resultado.dimensiones).toEqual([3, 3]);
    });

    test('validarMatriz debe detectar matriz inválida', () => {
      const matrizInvalida = [
        [1, 2, 3],
        [4, 5],  // Fila incompleta
        [7, 8, 9]
      ];

      const resultado = validarMatriz(matrizInvalida, 3, 3);
      expect(resultado.valida).toBe(false);
      expect(resultado.errores.length).toBeGreaterThan(0);
    });
  });
});
