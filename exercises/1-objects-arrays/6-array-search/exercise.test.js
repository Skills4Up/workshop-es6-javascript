/**
 * Tests para ejercicios de búsqueda en arrays
 */
const {
  buscarUsuarioPorEmail,
  obtenerIndiceProducto,
  buscarPrimerDisponible,
  verificarPermisosUsuario,
  encontrarPosicionesElemento,
  validarFormulario,
  analizarCalificaciones
} = require('./exercise');

describe('Ejercicios de Búsqueda en Arrays', () => {

  describe('Ejercicio 1: find() y findIndex()', () => {
    test('buscarUsuarioPorEmail debe encontrar usuario case-insensitive', () => {
      const usuarios = [
        { nombre: 'Ana', email: 'ANA@TEST.COM' },
        { nombre: 'Luis', email: 'luis@test.com' }
      ];

      const usuario = buscarUsuarioPorEmail(usuarios, 'ana@test.com');
      expect(usuario.nombre).toBe('Ana');

      const noExiste = buscarUsuarioPorEmail(usuarios, 'inexistente@test.com');
      expect(noExiste).toBeNull();
    });

    test('obtenerIndiceProducto debe retornar índice correcto', () => {
      const productos = [
        { codigo: 'A001', nombre: 'Laptop' },
        { codigo: 'B002', nombre: 'Mouse' },
        { codigo: 'C003', nombre: 'Teclado' }
      ];

      expect(obtenerIndiceProducto(productos, 'B002')).toBe(1);
      expect(obtenerIndiceProducto(productos, 'Z999')).toBe(-1);
    });

    test('buscarPrimerDisponible debe encontrar primer disponible', () => {
      const items = [
        { nombre: 'A', disponible: false, stock: 5 },
        { nombre: 'B', disponible: true, stock: 0 },
        { nombre: 'C', disponible: true, stock: 3 },
        { nombre: 'D', disponible: true, stock: 1 }
      ];

      const disponible = buscarPrimerDisponible(items);
      expect(disponible.nombre).toBe('C');
    });
  });

  describe('Ejercicio 2: includes() e indexOf()', () => {
    test('verificarPermisosUsuario debe verificar todos los permisos', () => {
      const usuario = {
        nombre: 'Ana',
        permisos: ['leer', 'escribir', 'admin']
      };

      expect(verificarPermisosUsuario(usuario, ['leer', 'escribir'])).toBe(true);
      expect(verificarPermisosUsuario(usuario, ['leer', 'eliminar'])).toBe(false);
      expect(verificarPermisosUsuario(usuario, [])).toBe(true);
    });

    test('encontrarPosicionesElemento debe encontrar todas las posiciones', () => {
      const array = [1, 2, 3, 2, 4, 2, 5];
      const posiciones = encontrarPosicionesElemento(array, 2);

      expect(posiciones).toEqual([1, 3, 5]);

      const noExiste = encontrarPosicionesElemento(array, 9);
      expect(noExiste).toEqual([]);
    });
  });

  describe('Ejercicio 3: some() y every()', () => {
    test('validarFormulario debe validar correctamente', () => {
      const campos = [
        { nombre: 'email', valor: 'test@test.com', requerido: true, valido: true },
        { nombre: 'nombre', valor: '', requerido: true, valido: false },
        { nombre: 'telefono', valor: '123456789', requerido: false, valido: true }
      ];

      const resultado = validarFormulario(campos);

      expect(resultado.todosCompletos).toBe(false);
      expect(resultado.algunoInvalido).toBe(true);
      expect(resultado.camposVacios).toEqual(['nombre']);
    });

    test('analizarCalificaciones debe analizar correctamente', () => {
      const estudiantes = [
        { nombre: 'Ana', calificacion: 95 },
        { nombre: 'Luis', calificacion: 78 },
        { nombre: 'Carlos', calificacion: 85 }
      ];

      const analisis = analizarCalificaciones(estudiantes);

      expect(analisis.todosAprobados).toBe(true);
      expect(analisis.algunoExcelente).toBe(true);
      expect(analisis.ningunReprobado).toBe(true);
    });

    test('analizarCalificaciones con reprobados', () => {
      const estudiantes = [
        { nombre: 'Ana', calificacion: 45 },
        { nombre: 'Luis', calificacion: 78 }
      ];

      const analisis = analizarCalificaciones(estudiantes);

      expect(analisis.todosAprobados).toBe(false);
      expect(analisis.ningunReprobado).toBe(false);
    });
  });
});
