/** Níveis disponíveis nas trilhas de aprendizagem */
export type Nivel = 'iniciante' | 'intermediario' | 'avancado';

/** Desafio prático de uma trilha */
export interface Desafio {
  titulo: string;
  descricao: string;
  dica: string;
}

/** Módulo de uma trilha, agrupado por nível */
export interface Modulo {
  nivel: Nivel;
  titulo: string;
  topicos: string[];
  desafios: Desafio[];
}

/** Trilha de aprendizagem */
export interface Trilha {
  id: string;
  tecnologia: string;
  descricao: string;
  niveis: Nivel[];
  modulos: Modulo[];
}

/** Certificado fictício de conclusão */
export interface Certificado {
  titulo: string;
  nome: string;
  tecnologia: string;
  nivel: Nivel;
  topicos: string[];
  dataEmissao: string;
  codigo: string;
  mensagem: string;
}
