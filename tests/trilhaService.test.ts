import { carregarTrilhas, buscarTrilha, buscarModulo, listarTrilhas } from '../src/services/trilhaService';

describe('trilhaService', () => {
  describe('carregarTrilhas()', () => {
    it('deve retornar um array com 15 trilhas', () => {
      const trilhas = carregarTrilhas();
      expect(trilhas).toHaveLength(15);
    });

    it('cada trilha deve ter id, tecnologia, descricao, niveis e modulos', () => {
      const trilhas = carregarTrilhas();
      trilhas.forEach((t) => {
        expect(t).toHaveProperty('id');
        expect(t).toHaveProperty('tecnologia');
        expect(t).toHaveProperty('descricao');
        expect(t).toHaveProperty('niveis');
        expect(t).toHaveProperty('modulos');
      });
    });
  });

  describe('buscarTrilha()', () => {
    it('deve encontrar a trilha de TypeScript', () => {
      const trilha = buscarTrilha('TypeScript');
      expect(trilha).toBeDefined();
      expect(trilha?.tecnologia).toBe('TypeScript');
    });

    it('deve encontrar trilha por busca parcial (case-insensitive)', () => {
      const trilha = buscarTrilha('ibm bob');
      expect(trilha).toBeDefined();
      expect(trilha?.tecnologia).toBe('IBM Bob');
    });

    it('deve retornar undefined para tecnologia inexistente', () => {
      const trilha = buscarTrilha('Tecnologia Inexistente XYZ');
      expect(trilha).toBeUndefined();
    });
  });

  describe('buscarModulo()', () => {
    it('deve retornar o módulo iniciante de uma trilha', () => {
      const trilha = buscarTrilha('TypeScript')!;
      const modulo = buscarModulo(trilha, 'iniciante');
      expect(modulo).toBeDefined();
      expect(modulo?.nivel).toBe('iniciante');
    });

    it('deve retornar undefined para nível inexistente', () => {
      const trilha = buscarTrilha('TypeScript')!;
      const modulo = buscarModulo(trilha, 'nivel-inexistente');
      expect(modulo).toBeUndefined();
    });

    it('deve encontrar módulo com nível em maiúsculas (case-insensitive)', () => {
      const trilha = buscarTrilha('TypeScript')!;
      const modulo = buscarModulo(trilha, 'AVANCADO');
      expect(modulo).toBeDefined();
      expect(modulo?.nivel).toBe('avancado');
    });
  });

  describe('listarTrilhas()', () => {
    it('deve retornar apenas id, tecnologia, descricao e niveis', () => {
      const lista = listarTrilhas();
      expect(lista.length).toBe(15);
      lista.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('tecnologia');
        expect(item).toHaveProperty('descricao');
        expect(item).toHaveProperty('niveis');
        expect(item).not.toHaveProperty('modulos');
      });
    });
  });
});
