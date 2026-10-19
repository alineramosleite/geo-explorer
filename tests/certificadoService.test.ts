import { gerarCodigo, montarCertificado } from '../src/services/certificadoService';
import { buscarTrilha, buscarModulo } from '../src/services/trilhaService';

describe('certificadoService', () => {
  describe('gerarCodigo()', () => {
    it('deve gerar um código no formato GEO-XXXX-XXXX', () => {
      const codigo = gerarCodigo('Ana Lima', 'TypeScript');
      expect(codigo).toMatch(/^GEO-[A-F0-9]{4}-[A-F0-9]{4}$/);
    });

    it('deve gerar códigos diferentes para usuários diferentes', () => {
      const codigo1 = gerarCodigo('Ana Lima', 'TypeScript');
      const codigo2 = gerarCodigo('João Silva', 'TypeScript');
      expect(codigo1).not.toBe(codigo2);
    });
  });

  describe('montarCertificado()', () => {
    it('deve montar um certificado com todos os campos obrigatórios', () => {
      const trilha = buscarTrilha('TypeScript')!;
      const modulo = buscarModulo(trilha, 'iniciante')!;
      const cert = montarCertificado('Ana Lima', trilha, modulo);

      expect(cert.titulo).toBe('Certificado de Conclusão — Geo-Explorer');
      expect(cert.nome).toBe('Ana Lima');
      expect(cert.tecnologia).toBe('TypeScript');
      expect(cert.nivel).toBe('iniciante');
      expect(cert.topicos).toEqual(modulo.topicos);
      expect(cert.dataEmissao).toBeTruthy();
      expect(cert.codigo).toMatch(/^GEO-[A-F0-9]{4}-[A-F0-9]{4}$/);
      expect(cert.mensagem).toContain('Ana Lima');
      expect(cert.mensagem).toContain('TypeScript');
    });

    it('a mensagem deve conter o nível e a tecnologia', () => {
      const trilha = buscarTrilha('Node.js')!;
      const modulo = buscarModulo(trilha, 'avancado')!;
      const cert = montarCertificado('Carlos', trilha, modulo);

      expect(cert.mensagem).toContain('avancado');
      expect(cert.mensagem).toContain('Node.js');
    });
  });
});
