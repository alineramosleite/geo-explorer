import fs from 'fs';
import path from 'path';
import { Trilha, Modulo } from '../types';

const DATA_PATH = path.resolve(__dirname, '../../data/trilhas.json');

/**
 * Carrega todas as trilhas do arquivo JSON.
 * @returns Lista de trilhas
 */
export function carregarTrilhas(): Trilha[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw) as Trilha[];
}

/**
 * Busca uma trilha pelo nome da tecnologia (case-insensitive, parcial).
 * @param tecnologia - Nome ou parte do nome da tecnologia
 * @returns Trilha encontrada ou undefined
 */
export function buscarTrilha(tecnologia: string): Trilha | undefined {
  const trilhas = carregarTrilhas();
  return trilhas.find((t) =>
    t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase())
  );
}

/**
 * Retorna o módulo de uma trilha para o nível informado.
 * @param trilha - Trilha
 * @param nivel - Nível desejado
 * @returns Módulo encontrado ou undefined
 */
export function buscarModulo(trilha: Trilha, nivel: string): Modulo | undefined {
  return trilha.modulos.find(
    (m) => m.nivel.toLowerCase() === nivel.toLowerCase()
  );
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
