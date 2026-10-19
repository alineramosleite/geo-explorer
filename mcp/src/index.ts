#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import crypto from "crypto";

// Resolve o caminho do data/trilhas.json relativo ao servidor MCP
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_PATH = resolve(__dirname, "../../data/trilhas.json");

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Desafio {
  titulo: string;
  descricao: string;
  dica: string;
}

interface Modulo {
  nivel: string;
  titulo: string;
  topicos: string[];
  desafios: Desafio[];
}

interface Trilha {
  id: string;
  tecnologia: string;
  descricao: string;
  niveis: string[];
  modulos: Modulo[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function carregarTrilhas(): Trilha[] {
  const raw = readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Trilha[];
}

function buscarTrilha(tecnologia: string): Trilha | undefined {
  return carregarTrilhas().find((t) =>
    t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase())
  );
}

function buscarModulo(trilha: Trilha, nivel: string): Modulo | undefined {
  return trilha.modulos.find(
    (m) => m.nivel.toLowerCase() === nivel.toLowerCase()
  );
}

function gerarCodigo(nome: string, tecnologia: string): string {
  const hash = crypto
    .createHash("sha256")
    .update(`${nome}-${tecnologia}-${Date.now()}`)
    .digest("hex")
    .toUpperCase();
  return `GEO-${hash.slice(0, 4)}-${hash.slice(4, 8)}`;
}

// ─── Servidor MCP ─────────────────────────────────────────────────────────────

const server = new McpServer({
  name: "geo-explorer",
  version: "0.1.0",
});

// ─── Ferramenta: listar_trilhas ───────────────────────────────────────────────

server.registerTool(
  "listar_trilhas",
  {
    description:
      "Lista todas as trilhas de aprendizagem disponíveis no Geo-Explorer com id, tecnologia, descrição e níveis.",
    inputSchema: z.object({}),
  },
  async () => {
    try {
      const trilhas = carregarTrilhas().map(({ id, tecnologia, descricao, niveis }) => ({
        id,
        tecnologia,
        descricao,
        niveis,
      }));
      return {
        content: [{ type: "text" as const, text: JSON.stringify(trilhas, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Erro ao carregar trilhas: ${String(error)}` }],
        isError: true,
      };
    }
  }
);

// ─── Ferramenta: consultar_trilha ─────────────────────────────────────────────

server.registerTool(
  "consultar_trilha",
  {
    description:
      "Retorna o plano de estudos completo de uma trilha para o nível informado, incluindo tópicos e desafio prático.",
    inputSchema: z.object({
      tecnologia: z.string().describe("Nome ou parte do nome da tecnologia (ex: TypeScript, IBM Bob, MCP)"),
      nivel: z.enum(["iniciante", "intermediario", "avancado"]).describe("Nível desejado"),
    }),
  },
  async ({ tecnologia, nivel }) => {
    try {
      const trilha = buscarTrilha(tecnologia);
      if (!trilha) {
        const disponiveis = carregarTrilhas().map((t) => t.tecnologia).join(", ");
        return {
          content: [{ type: "text" as const, text: `Trilha "${tecnologia}" não encontrada. Disponíveis: ${disponiveis}` }],
          isError: true,
        };
      }

      const modulo = buscarModulo(trilha, nivel);
      if (!modulo) {
        return {
          content: [{ type: "text" as const, text: `Nível "${nivel}" não disponível para ${trilha.tecnologia}. Níveis: ${trilha.niveis.join(", ")}` }],
          isError: true,
        };
      }

      const resultado = {
        tecnologia: trilha.tecnologia,
        descricao: trilha.descricao,
        nivel: modulo.nivel,
        titulo: modulo.titulo,
        topicos: modulo.topicos,
        desafio: modulo.desafios[0] ?? null,
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(resultado, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Erro ao consultar trilha: ${String(error)}` }],
        isError: true,
      };
    }
  }
);

// ─── Ferramenta: gerar_desafio ────────────────────────────────────────────────

server.registerTool(
  "gerar_desafio",
  {
    description:
      "Gera um desafio de código para a tecnologia e nível informados, com título, descrição, critérios de aceite e dica.",
    inputSchema: z.object({
      tecnologia: z.string().describe("Nome da tecnologia (ex: Node.js, Git e GitHub)"),
      nivel: z.enum(["iniciante", "intermediario", "avancado"]).describe("Nível do desafio"),
    }),
  },
  async ({ tecnologia, nivel }) => {
    try {
      const trilha = buscarTrilha(tecnologia);
      if (!trilha) {
        return {
          content: [{ type: "text" as const, text: `Trilha "${tecnologia}" não encontrada.` }],
          isError: true,
        };
      }

      const modulo = buscarModulo(trilha, nivel);
      if (!modulo || modulo.desafios.length === 0) {
        return {
          content: [{ type: "text" as const, text: `Nenhum desafio disponível para ${trilha.tecnologia} no nível ${nivel}.` }],
          isError: true,
        };
      }

      const desafio = modulo.desafios[0];
      const resultado = {
        tecnologia: trilha.tecnologia,
        nivel,
        titulo: desafio.titulo,
        descricao: desafio.descricao,
        criterios: [
          "O código deve estar em TypeScript com tipos definidos",
          "Deve incluir pelo menos um teste automatizado",
          `Deve seguir as boas práticas da trilha de ${trilha.tecnologia}`,
        ],
        dica: desafio.dica,
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(resultado, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Erro ao gerar desafio: ${String(error)}` }],
        isError: true,
      };
    }
  }
);

// ─── Ferramenta: gerar_certificado ───────────────────────────────────────────

server.registerTool(
  "gerar_certificado",
  {
    description:
      "Gera um certificado fictício de conclusão para o usuário que completou uma trilha em um determinado nível.",
    inputSchema: z.object({
      nome: z.string().describe("Nome completo do usuário"),
      tecnologia: z.string().describe("Tecnologia da trilha concluída"),
      nivel: z.enum(["iniciante", "intermediario", "avancado"]).describe("Nível concluído"),
    }),
  },
  async ({ nome, tecnologia, nivel }) => {
    try {
      if (!nome.trim()) {
        return {
          content: [{ type: "text" as const, text: "O nome do usuário não pode ser vazio." }],
          isError: true,
        };
      }

      const trilha = buscarTrilha(tecnologia);
      if (!trilha) {
        return {
          content: [{ type: "text" as const, text: `Trilha "${tecnologia}" não encontrada.` }],
          isError: true,
        };
      }

      const modulo = buscarModulo(trilha, nivel);
      if (!modulo) {
        return {
          content: [{ type: "text" as const, text: `Nível "${nivel}" não disponível para ${trilha.tecnologia}.` }],
          isError: true,
        };
      }

      const certificado = {
        titulo: "Certificado de Conclusão — Geo-Explorer",
        nome,
        tecnologia: trilha.tecnologia,
        nivel: modulo.nivel,
        topicos: modulo.topicos,
        dataEmissao: new Date().toLocaleDateString("pt-BR"),
        codigo: gerarCodigo(nome, trilha.tecnologia),
        mensagem: `Parabéns, ${nome}! Você concluiu com sucesso o nível ${modulo.nivel} da trilha de ${trilha.tecnologia}. Continue explorando novos horizontes no universo da tecnologia!`,
      };

      return {
        content: [{ type: "text" as const, text: JSON.stringify(certificado, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text" as const, text: `Erro ao gerar certificado: ${String(error)}` }],
        isError: true,
      };
    }
  }
);

// ─── Inicialização ────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("geo-explorer MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
