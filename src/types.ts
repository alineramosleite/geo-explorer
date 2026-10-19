export interface Desafio {
  titulo: string;
  descricao: string;
  dica: string;
}

export interface Modulo {
  nivel: string;
  titulo: string;
  topicos: string[];
  desafios: Desafio[];
}

export interface Trilha {
  id: string;
  tecnologia: string;
  descricao: string;
  niveis: string[];
  modulos: Modulo[];
}

export interface Certificado {
  titulo: string;
  nome: string;
  tecnologia: string;
  nivel: string;
  topicos: string[];
  dataEmissao: string;
  codigo: string;
  mensagem: string;
}
