import { buscarTrilha, buscarModulo, listarTrilhas } from '../services/trilhaService';

/**
 * Exibe o plano de estudos completo de uma trilha para o nível informado.
 * @param tecnologia - Nome da tecnologia
 * @param nivel - Nível desejado (iniciante | intermediario | avancado)
 */
export function trilhaCommand(tecnologia: string, nivel: string): void {
  const trilha = buscarTrilha(tecnologia);

  if (!trilha) {
    console.error(`\n❌ Trilha "${tecnologia}" não encontrada.`);
    console.log('\n📋 Trilhas disponíveis:');
    listarTrilhas().forEach((t) => console.log(`  • [${t.id}] ${t.tecnologia}`));
    return;
  }

  const modulo = buscarModulo(trilha, nivel);

  if (!modulo) {
    console.error(`\n❌ Nível "${nivel}" não encontrado para a trilha de ${trilha.tecnologia}.`);
    console.log(`   Níveis disponíveis: ${trilha.niveis.join(' | ')}`);
    return;
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`📚 TRILHA: ${trilha.tecnologia}`);
  console.log('═'.repeat(60));
  console.log(`\n📝 Descrição: ${trilha.descricao}`);
  console.log(`\n🎯 Nível: ${modulo.nivel.toUpperCase()} — ${modulo.titulo}`);
  console.log('\n📖 Tópicos:');
  modulo.topicos.forEach((topico, i) => console.log(`  ${i + 1}. ${topico}`));

  if (modulo.desafios.length > 0) {
    const desafio = modulo.desafios[0];
    console.log('\n🏆 Desafio Prático:');
    console.log(`  📌 ${desafio.titulo}`);
    console.log(`  ${desafio.descricao}`);
    console.log(`  💡 Dica: ${desafio.dica}`);
  }

  console.log('\n' + '═'.repeat(60) + '\n');
}
