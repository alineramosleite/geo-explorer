import { trilhaCommand } from '../src/commands/trilha';
import { desafioCommand } from '../src/commands/desafio';
import { certificadoCommand } from '../src/commands/certificado';
import { invalidarCache } from '../src/services/trilhaService';

// Captura o output do console para assertions
const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

beforeEach(() => {
  invalidarCache();
  logSpy.mockClear();
  errorSpy.mockClear();
});

afterAll(() => {
  logSpy.mockRestore();
  errorSpy.mockRestore();
});

// ─── trilhaCommand ────────────────────────────────────────────────────────────

describe('trilhaCommand()', () => {
  it('exibe o plano de estudos para trilha e nível válidos', () => {
    trilhaCommand('TypeScript', 'iniciante');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('TypeScript');
    expect(output).toContain('INICIANTE');
  });

  it('exibe erro quando tecnologia não é informada', () => {
    trilhaCommand('', 'iniciante');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Informe o nome'));
  });

  it('exibe erro quando nível é inválido', () => {
    trilhaCommand('TypeScript', 'expert');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('inválido'));
  });

  it('exibe erro quando trilha não é encontrada', () => {
    trilhaCommand('TecnologiaXYZ', 'iniciante');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('não encontrada'));
  });

  it('exibe lista de trilhas disponíveis quando tecnologia não encontrada', () => {
    trilhaCommand('TecnologiaXYZ', 'iniciante');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('Trilhas disponíveis');
  });

  it('funciona com busca parcial case-insensitive', () => {
    trilhaCommand('typescript', 'avancado');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('TypeScript');
    expect(output).toContain('AVANCADO');
  });
});

// ─── desafioCommand ───────────────────────────────────────────────────────────

describe('desafioCommand()', () => {
  it('exibe o desafio para trilha e nível válidos', () => {
    desafioCommand('Node.js', 'intermediario');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('DESAFIO');
    expect(output).toContain('INTERMEDIARIO');
  });

  it('exibe erro quando tecnologia não é informada', () => {
    desafioCommand('', 'iniciante');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Informe o nome'));
  });

  it('exibe erro quando nível é inválido', () => {
    desafioCommand('Node.js', 'basico');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('inválido'));
  });

  it('exibe erro quando trilha não é encontrada', () => {
    desafioCommand('TecnologiaXYZ', 'avancado');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('não encontrada'));
  });

  it('exibe critérios de aceite no desafio', () => {
    desafioCommand('TypeScript', 'iniciante');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('Critérios de aceite');
  });

  it('exibe a dica do desafio', () => {
    desafioCommand('Git e GitHub', 'iniciante');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('Dica');
  });
});

// ─── certificadoCommand ───────────────────────────────────────────────────────

describe('certificadoCommand()', () => {
  it('gera o certificado com dados válidos', () => {
    certificadoCommand('Ana Lima', 'TypeScript', 'intermediario');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('ANA LIMA');
    expect(output).toContain('TypeScript');
    expect(output).toContain('INTERMEDIARIO');
  });

  it('exibe código de verificação no formato GEO-XXXX-XXXX', () => {
    certificadoCommand('Carlos', 'IBM Bob', 'iniciante');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toMatch(/GEO-[A-F0-9]{4}-[A-F0-9]{4}/);
  });

  it('exibe erro quando nome é vazio', () => {
    certificadoCommand('', 'TypeScript', 'iniciante');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Informe seu nome'));
  });

  it('exibe erro quando nome é apenas espaços', () => {
    certificadoCommand('   ', 'TypeScript', 'iniciante');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Informe seu nome'));
  });

  it('exibe erro quando nível é inválido', () => {
    certificadoCommand('Ana Lima', 'TypeScript', 'master');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('inválido'));
  });

  it('exibe erro quando trilha não é encontrada', () => {
    certificadoCommand('Ana Lima', 'TecnologiaXYZ', 'avancado');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('não encontrada'));
  });

  it('exibe os tópicos dominados no certificado', () => {
    certificadoCommand('João Silva', 'TypeScript', 'iniciante');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('Tópicos dominados');
  });

  it('exibe a data de emissão', () => {
    certificadoCommand('Maria', 'MCP', 'avancado');
    const output = logSpy.mock.calls.map((c) => c[0]).join('\n');
    expect(output).toContain('Data de emissão');
  });
});
