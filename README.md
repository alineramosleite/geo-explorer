# 🌍 Geo-Explorer

> Plataforma de trilhas de aprendizagem sobre **IA, IBM Bob e Programação** — desenvolvida como projeto de portfólio no desafio da DIO.

---

## 📖 O que é o Geo-Explorer

O Geo-Explorer é uma CLI (ferramenta de linha de comando) e um **Servidor MCP** que permite explorar trilhas de aprendizagem sobre tecnologias do universo de IA e desenvolvimento de software.

A pessoa usuária pode:
- **Consultar uma trilha** e ver o plano de estudos por nível
- **Receber um desafio de código** baseado na tecnologia e nível escolhidos
- **Gerar um certificado fictício** ao concluir uma trilha

O projeto foi construído com **TypeScript + Node.js** e integra-se ao **IBM Bob** via Servidor MCP e Slash Commands.

---

## 🗂️ Estrutura do Projeto

```
geo-explorer/
├── .bob/
│   └── commands/           # Slash commands do IBM Bob
│       ├── trilha.md
│       ├── desafio.md
│       ├── certificado.md
│       ├── listar-trilhas.md
│       ├── nova-trilha.md
│       ├── revisar.md
│       ├── testar.md
│       └── documentar.md
├── data/
│   └── trilhas.json        # Base com 15 trilhas de aprendizagem
├── mcp/
│   ├── src/
│   │   └── index.ts        # Servidor MCP (código-fonte)
│   ├── build/
│   │   └── index.js        # Servidor MCP (compilado)
│   ├── package.json
│   └── tsconfig.json
├── src/
│   ├── commands/
│   │   ├── trilha.ts       # Comando: exibe plano de estudos
│   │   ├── desafio.ts      # Comando: gera desafio de código
│   │   └── certificado.ts  # Comando: gera certificado fictício
│   ├── services/
│   │   ├── trilhaService.ts      # Serviço de leitura de trilhas
│   │   └── certificadoService.ts # Serviço de geração de certificados
│   ├── types.ts            # Interfaces TypeScript
│   └── index.ts            # Ponto de entrada da CLI
├── tests/
│   ├── trilhaService.test.ts
│   └── certificadoService.test.ts
├── docs/
├── .bobignore
├── .gitignore
├── mcp.json                # Configuração do Servidor MCP para o IBM Bob
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Instalação

**Pré-requisitos:** Node.js 18+ e npm

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/geo-explorer.git
cd geo-explorer

# Instale as dependências da CLI
npm install

# Instale e compile o Servidor MCP
cd mcp
npm install
npm run build
cd ..
```

---

## 🚀 Como usar a CLI

```bash
# Listar todas as trilhas disponíveis
npx ts-node src/index.ts listar

# Ver o plano de estudos de uma trilha
npx ts-node src/index.ts trilha "TypeScript" iniciante
npx ts-node src/index.ts trilha "IBM Bob" avancado
npx ts-node src/index.ts trilha "MCP" intermediario

# Receber um desafio de código
npx ts-node src/index.ts desafio "Node.js" intermediario
npx ts-node src/index.ts desafio "Clean Code e Boas Práticas" avancado

# Gerar um certificado fictício
npx ts-node src/index.ts certificado "Seu Nome" "TypeScript" iniciante
npx ts-node src/index.ts certificado "Ana Lima" "IBM Bob" avancado

# Ver a ajuda
npx ts-node src/index.ts ajuda
```

### Níveis disponíveis

| Nível | Descrição |
|---|---|
| `iniciante` | Conceitos fundamentais e primeiros passos |
| `intermediario` | Aprofundamento e boas práticas |
| `avancado` | Tópicos avançados e projetos complexos |

---

## 🗺️ Trilhas disponíveis

| # | Tecnologia |
|---|---|
| 01 | IBM Bob |
| 02 | Inteligência Artificial Generativa |
| 03 | TypeScript |
| 04 | MCP (Model Context Protocol) |
| 05 | Node.js |
| 06 | Git e GitHub |
| 07 | Testes Automatizados com Jest |
| 08 | APIs e Integrações |
| 09 | Docker e Contêineres |
| 10 | Banco de Dados com SQL |
| 11 | Clean Code e Boas Práticas |
| 12 | IBM Watson e watsonx |
| 13 | Linha de Comando (CLI) |
| 14 | Segurança em Aplicações |
| 15 | Documentação Técnica |

---

## 🧪 Como executar os testes

```bash
# Rodar todos os testes
npm test

# Rodar em modo watch (re-executa ao salvar)
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage
```

**Cobertura atual:** 13 testes passando em 2 suites.

---

## 🔌 Servidor MCP

O Geo-Explorer expõe um **Servidor MCP** que permite ao IBM Bob (e outras ferramentas compatíveis) acessar as funcionalidades diretamente via protocolo MCP.

### Ferramentas disponíveis

| Ferramenta | Parâmetros | Descrição |
|---|---|---|
| `listar_trilhas` | — | Lista todas as trilhas disponíveis |
| `consultar_trilha` | `tecnologia`, `nivel` | Retorna o plano de estudos completo |
| `gerar_desafio` | `tecnologia`, `nivel` | Gera um desafio com critérios de aceite |
| `gerar_certificado` | `nome`, `tecnologia`, `nivel` | Gera um certificado fictício de conclusão |

### Registrando no IBM Bob

Adicione o conteúdo do arquivo `mcp.json` nas configurações MCP do IBM Bob:

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": ["/caminho/absoluto/para/geo-explorer/mcp/build/index.js"]
    }
  }
}
```

> Substitua `/caminho/absoluto/para/` pelo caminho real no seu sistema.

---

## ⚡ Slash Commands no IBM Bob

O projeto inclui 8 slash commands prontos em `.bob/commands/`:

| Comando | Uso |
|---|---|
| `/trilha` | `/trilha <tecnologia> <nivel>` |
| `/desafio` | `/desafio <tecnologia> <nivel>` |
| `/certificado` | `/certificado <nome> <tecnologia> <nivel>` |
| `/listar-trilhas` | Lista todas as trilhas |
| `/nova-trilha` | `/nova-trilha <tecnologia>` |
| `/revisar` | `/revisar <arquivo>` |
| `/testar` | `/testar <arquivo>` |
| `/documentar` | `/documentar <arquivo>` |

---

## 🛠️ Melhorias realizadas

- **15 trilhas completas** cobrindo IA, IBM Bob, MCP, TypeScript, Node.js e mais
- **Servidor MCP** com 4 ferramentas integradas ao IBM Bob
- **8 Slash Commands** para agilizar o desenvolvimento com o Bob
- **`.bobignore`** configurado para proteger arquivos sensíveis e otimizar o contexto do Bob
- **Testes automatizados** com Jest cobrindo serviços e comandos principais
- **Tipagem TypeScript estrita** em toda a base de código
- **Certificado com código de verificação** gerado via SHA-256

---

## 📚 O que aprendi neste desafio

- Como estruturar um projeto TypeScript com Node.js do zero
- Como criar e registrar um **Servidor MCP** para integrar ferramentas ao IBM Bob
- Como usar o IBM Bob como assistente de desenvolvimento: modos, slash commands, skills e `.bobignore`
- Como escrever testes automatizados com Jest e ts-jest
- A importância de organizar dados em JSON com estrutura bem definida
- Como expor funcionalidades via CLI com uma interface amigável no terminal

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: adiciona nova trilha'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Desenvolvido com 💙 durante o desafio <strong>IBM Bob</strong> na <a href="https://dio.me">DIO</a>
</p>
