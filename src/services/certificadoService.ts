import crypto from 'crypto';
import { Certificado, Trilha, Modulo } from '../types';

/**
 * Gera um código de verificação fictício único.
 * @param nome - Nome do usuário
 * @param tecnologia - Tecnologia da trilha
 * @returns Código no formato GEO-XXXX-XXXX
 */
export function gerarCodigo(nome: string, tecnologia: string): string {
  const hash = crypto
    .createHash('sha256')
    .update(`${nome}-${tecnologia}-${Date.now()}`)
    .digest('hex')
    .toUpperCase();
  return `GEO-${hash.slice(0, 4)}-${hash.slice(4, 8)}`;
}

/**
 * Monta o objeto Certificado com os dados da trilha e do usuário.
 * @param nome - Nome do usuário
 * @param trilha - Trilha concluída
 * @param modulo - Módulo (nível) concluído
 * @returns Objeto Certificado preenchido
 */
export function montarCertificado(
  nome: string,
  trilha: Trilha,
  modulo: Modulo
): Certificado {
  return {
    titulo: 'Certificado de Conclusão — Geo-Explorer',
    nome,
    tecnologia: trilha.tecnologia,
    nivel: modulo.nivel,
    topicos: modulo.topicos,
    dataEmissao: new Date().toLocaleDateString('pt-BR'),
    codigo: gerarCodigo(nome, trilha.tecnologia),
    mensagem: `Parabéns, ${nome}! Você concluiu com sucesso o nível ${modulo.nivel} da trilha de ${trilha.tecnologia}. Continue explorando novos horizontes no universo da tecnologia!`,
  };
}
