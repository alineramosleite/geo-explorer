import { carregarTrilhas, buscarTrilha, buscarModulo, listarTrilhas, invalidarCache, isNivel } from '../src/services/trilhaService';
import { Nivel } from '../src/types';

describe('trilhaService', () => {
  beforeEach(() => {
    invalidarCache();
  });

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

    it('deve retornar undefined para nível não cadastrado na trilha', () => {
      // Cria uma trilha sem módulo avancado para testar o undefined
      const trilha = buscarTrilha('TypeScript')!;
      const modulosSemAvancado = trilha.modulos.filter((m) => m.nivel !== 'avancado');
      const trilhaReduzida = { ...trilha, modulos: modulosSemAvancado };
      const modulo = buscarModulo(trilhaReduzida, 'avancado');
      expect(modulo).toBeUndefined();
    });

    it('isNivel deve retornar false para string inválida', () => {
      expect(isNivel('nivel-inexistente')).toBe(false);
      expect(isNivel('AVANCADO')).toBe(false);
      expect(isNivel('expert')).toBe(false);
    });

    it('isNivel deve retornar true para níveis válidos', () => {
      const niveis: Nivel[] = ['iniciante', 'intermediario', 'avancado'];
      niveis.forEach((n) => expect(isNivel(n)).toBe(true));
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
