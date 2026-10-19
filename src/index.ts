import { trilhaCommand } from './commands/trilha';
import { desafioCommand } from './commands/desafio';
import { certificadoCommand } from './commands/certificado';
import { listarTrilhas } from './services/trilhaService';

const args = process.argv.slice(2);
const comando = args[0];

function mostrarAjuda(): void {
  console.log('\n🌍 Geo-Explorer — Trilhas de Aprendizagem');
  console.log('━'.repeat(45));
  console.log('\nUso: npx ts-node src/index.ts <comando> [opções]\n');
  console.log('Comandos disponíveis:');
  console.log('  trilha      <tecnologia> <nivel>         Exibe o plano de estudos');
  console.log('  desafio     <tecnologia> <nivel>         Gera um desafio de código');
  console.log('  certificado <nome> <tecnologia> <nivel>  Gera um certificado de conclusão');
  console.log('  listar                                   Lista todas as trilhas');
  console.log('  ajuda                                    Exibe esta mensagem\n');
  console.log('Níveis: iniciante | intermediario | avancado\n');
  console.log('Exemplos:');
  console.log('  npx ts-node src/index.ts trilha TypeScript iniciante');
  console.log('  npx ts-node src/index.ts desafio "IBM Bob" avancado');
  console.log('  npx ts-node src/index.ts certificado "Ana Lima" TypeScript intermediario');
  console.log('');
}

function listarCommand(): void {
  const trilhas = listarTrilhas();
  console.log('\n🗺️  Trilhas disponíveis no Geo-Explorer:\n');
  trilhas.forEach((t) => {
    console.log(`  [${t.id.padStart(2, '0')}] ${t.tecnologia}`);
    console.log(`       ${t.descricao.slice(0, 70)}...`);
    console.log(`       Níveis: ${t.niveis.join(' | ')}\n`);
  });
  console.log(`Total: ${trilhas.length} trilhas\n`);
}

switch (comando) {
  case 'trilha':
    trilhaCommand(args[1], args[2]);
    break;

  case 'desafio':
    desafioCommand(args[1], args[2]);
    break;

  case 'certificado':
    certificadoCommand(args[1], args[2], args[3]);
    break;

  case 'listar':
    listarCommand();
    break;

  case 'ajuda':
  case '--help':
  case '-h':
    mostrarAjuda();
    break;

  default:
    if (!comando) {
      mostrarAjuda();
    } else {
      console.error(`\n❌ Comando "${comando}" desconhecido.`);
      mostrarAjuda();
    }
    break;
}
