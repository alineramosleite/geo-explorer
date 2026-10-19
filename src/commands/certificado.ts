import { buscarTrilha, buscarModulo, listarTrilhas, isNivel } from '../services/trilhaService';
import { montarCertificado } from '../services/certificadoService';

/**
 * Gera e exibe um certificado fictício de conclusão.
 * @param nome - Nome do usuário
 * @param tecnologia - Nome da tecnologia concluída
 * @param nivel - Nível concluído
 */
export function certificadoCommand(nome: string, tecnologia: string, nivel: string): void {
  if (!nome || nome.trim() === '') {
    console.error('\n❌ Informe seu nome para gerar o certificado.');
    console.log('   Uso: certificado <nome> <tecnologia> <nivel>');
    return;
  }

  if (!isNivel(nivel)) {
    console.error(`\n❌ Nível "${nivel}" inválido.`);
    console.log('   Níveis aceitos: iniciante | intermediario | avancado');
    return;
  }

  const trilha = buscarTrilha(tecnologia);

  if (!trilha) {
    console.error(`\n❌ Trilha "${tecnologia}" não encontrada.`);
    console.log('\n📋 Trilhas disponíveis:');
    listarTrilhas().forEach((t) => console.log(`  • [${t.id}] ${t.tecnologia}`));
    return;
  }

  const modulo = buscarModulo(trilha, nivel);

  if (!modulo) {
    console.error(`\n❌ Nível "${nivel}" não disponível para ${trilha.tecnologia}.`);
    console.log(`   Níveis disponíveis: ${trilha.niveis.join(' | ')}`);
    return;
  }

  const cert = montarCertificado(nome, trilha, modulo);

  console.log('\n' + '★'.repeat(60));
  console.log(`\n       ${cert.titulo}`);
  console.log('\n' + '─'.repeat(60));
  console.log(`\n  Certificamos que`);
  console.log(`\n        ✨ ${cert.nome.toUpperCase()} ✨`);
  console.log(`\n  concluiu com êxito o nível ${cert.nivel.toUpperCase()}`);
  console.log(`  da trilha de ${cert.tecnologia}.`);
  console.log('\n  Tópicos dominados:');
  cert.topicos.forEach((t) => console.log(`    ✔ ${t}`));
  console.log(`\n  Data de emissão: ${cert.dataEmissao}`);
  console.log(`  Código de verificação: ${cert.codigo}`);
  console.log(`\n  "${cert.mensagem}"`);
  console.log('\n' + '★'.repeat(60) + '\n');
}
