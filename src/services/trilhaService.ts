import fs from 'fs';
import path from 'path';
import { Trilha, Modulo, Nivel } from '../types';

const DATA_PATH = path.resolve(__dirname, '../../data/trilhas.json');

/** Cache em memória das trilhas carregadas */
let cache: Trilha[] | null = null;

/**
 * Carrega todas as trilhas do arquivo JSON (com cache em memória).
 * @returns Lista de trilhas
 * @throws Error se o arquivo não for encontrado ou estiver corrompido
 */
export function carregarTrilhas(): Trilha[] {
  if (cache) return cache;
  try {
    const raw = fs.readFileSync(DATA_PATH, 'utf-8');
    cache = JSON.parse(raw) as Trilha[];
    return cache;
  } catch (err) {
    throw new Error(
      `Não foi possível carregar as trilhas. Verifique o arquivo data/trilhas.json.\nDetalhe: ${String(err)}`
    );
  }
}

/**
 * Invalida o cache (útil em testes ou ao atualizar trilhas.json em runtime).
 */
export function invalidarCache(): void {
  cache = null;
}

/**
 * Busca uma trilha pelo nome da tecnologia (case-insensitive, parcial).
 * @param tecnologia - Nome ou parte do nome da tecnologia
 * @returns Trilha encontrada ou undefined
 */
export function buscarTrilha(tecnologia: string): Trilha | undefined {
  return carregarTrilhas().find((t) =>
    t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase())
  );
}

/**
 * Retorna o módulo de uma trilha para o nível informado.
 * @param trilha - Trilha
 * @param nivel - Nível desejado
 * @returns Módulo encontrado ou undefined
 */
export function buscarModulo(trilha: Trilha, nivel: Nivel): Modulo | undefined {
  return trilha.modulos.find((m) => m.nivel === nivel);
}

/**
 * Lista todas as trilhas disponíveis com id, tecnologia e descrição.
 * @returns Lista resumida de trilhas
 */
export function listarTrilhas(): Pick<Trilha, 'id' | 'tecnologia' | 'descricao' | 'niveis'>[] {
  return carregarTrilhas().map(({ id, tecnologia, descricao, niveis }) => ({
    id,
    tecnologia,
    descricao,
    niveis,
  }));
}

/**
 * Verifica se uma string é um Nivel válido.
 * @param valor - String a verificar
 * @returns true se for um Nivel válido
 */
export function isNivel(valor: string): valor is Nivel {
  return ['iniciante', 'intermediario', 'avancado'].includes(valor);
}
