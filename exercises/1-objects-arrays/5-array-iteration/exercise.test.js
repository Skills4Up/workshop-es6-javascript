/**
 * Tests para ejercicios de iteración de arrays
 */
const {
  procesarUsuarios,
  extraerEmails,
  filtrarProductosDisponibles,
  buscarPorCriterios,
  calcularEstadisticasVentas,
  agruparPorPropiedad
} = require('./exercise');

describe('Ejercicios de Iteración de Arrays', () => {

  describe('Ejercicio 1: map()', () => {
    test('procesarUsuarios debe transformar correctamente', () => {
      const usuarios = [
        { nombre: 'ana', edad: 25, activo: true },
        { nombre: 'luis', edad: 30, activo: false }
      ];

      const resultado = procesarUsuarios(usuarios);

      expect(resultado[0].nombre).toBe('ANA');
      expect(resultado[0].edad).toBe(300); // 25 * 12
      expect(resultado[0].status).toBe('activo');
      expect(resultado[0]).toHaveProperty('id');

      expect(resultado[1].status).toBe('inactivo');
    });

    test('extraerEmails debe extraer solo emails', () => {
      const usuarios = [
        { nombre: 'Ana', email: 'ana@test.com' },
        { nombre: 'Luis', email: 'luis@test.com' }
      ];

      const emails = extraerEmails(usuarios);
      expect(emails).toEqual(['ana@test.com', 'luis@test.com']);
    });
  });

  describe('Ejercicio 2: filter()', () => {
    test('filtrarProductosDisponibles debe filtrar correctamente', () => {
      const productos = [
        { nombre: 'A', stock: 5, activo: true },
        { nombre: 'B', stock: 0, activo: true },
        { nombre: 'C', stock: 3, activo: false },
        { nombre: 'D', stock: 2, activo: true }
      ];

      const disponibles = filtrarProductosDisponibles(productos);
      expect(disponibles).toHaveLength(2);
      expect(disponibles.map(p => p.nombre)).toEqual(['A', 'D']);
    });

    test('buscarPorCriterios debe filtrar por múltiples criterios', () => {
      const items = [
        { categoria: 'libro', precio: 30, autor: 'Smith' },
        { categoria: 'libro', precio: 60, autor: 'Jones' },
        { categoria: 'revista', precio: 20, autor: 'Smith' }
      ];

      const criterios = {
        categoria: 'libro',
        precio: precio => precio < 50
      };

      const resultado = buscarPorCriterios(items, criterios);
      expect(resultado).toHaveLength(1);
      expect(resultado[0].precio).toBe(30);
    });
  });

  describe('Ejercicio 3: reduce()', () => {
    test('calcularEstadisticasVentas debe calcular correctamente', () => {
      const ventas = [
        { monto: 100, fecha: '2024-01-15', cliente: 'Ana' },
        { monto: 200, fecha: '2024-01-20', cliente: 'Luis' },
        { monto: 150, fecha: '2024-02-10', cliente: 'Carlos' }
      ];

      const stats = calcularEstadisticasVentas(ventas);

      expect(stats.total).toBe(450);
      expect(stats.promedio).toBe(150);
      expect(stats.ventaMayor.monto).toBe(200);
      expect(stats.ventasPorMes).toHaveProperty('2024-01');
      expect(stats.ventasPorMes).toHaveProperty('2024-02');
    });

    test('agruparPorPropiedad debe agrupar correctamente', () => {
      const datos = [
        { tipo: 'A', valor: 1 },
        { tipo: 'B', valor: 2 },
        { tipo: 'A', valor: 3 }
      ];

      const grupos = agruparPorPropiedad(datos, 'tipo');

      expect(grupos.A).toHaveLength(2);
      expect(grupos.B).toHaveLength(1);
      expect(grupos.A[0].valor).toBe(1);
      expect(grupos.A[1].valor).toBe(3);
    });
  });
});
