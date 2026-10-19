import { buscarTrilha, buscarModulo, listarTrilhas } from '../services/trilhaService';

/**
 * Exibe um desafio de código para a tecnologia e nível informados.
 * @param tecnologia - Nome da tecnologia
 * @param nivel - Nível desejado (iniciante | intermediario | avancado)
 */
export function desafioCommand(tecnologia: string, nivel: string): void {
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

  if (modulo.desafios.length === 0) {
    console.log(`\n⚠️  Nenhum desafio cadastrado para este nível ainda.`);
    return;
  }

  const desafio = modulo.desafios[0];

  console.log('\n' + '═'.repeat(60));
  console.log(`⚔️  DESAFIO: ${trilha.tecnologia} — ${modulo.nivel.toUpperCase()}`);
  console.log('═'.repeat(60));
  console.log(`\n🏆 ${desafio.titulo}`);
  console.log(`\n📋 Descrição:\n   ${desafio.descricao}`);
  console.log('\n✅ Critérios de aceite:');
  console.log(`   • O código deve estar em TypeScript com tipos definidos`);
  console.log(`   • Deve incluir pelo menos um teste automatizado`);
  console.log(`   • Deve seguir as boas práticas da trilha de ${trilha.tecnologia}`);
  console.log(`\n💡 Dica: ${desafio.dica}`);
  console.log('\n' + '═'.repeat(60) + '\n');
}
