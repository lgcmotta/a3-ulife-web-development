import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const portugueseMessageDirectory = path.join(process.cwd(), "src/i18n/messages/pt-BR");
const portugueseMarkdownDirectory = path.join(
  process.cwd(),
  "src/content/learning-sections/pt-BR",
);

const asciiPortugueseRegressions = [
  "acao",
  "acoes",
  "acessivel",
  "acessiveis",
  "alguem",
  "area",
  "ate",
  "cabecalho",
  "calculo",
  "ciencia",
  "codigo",
  "computacao",
  "condicao",
  "condicoes",
  "conteudo",
  "depuracao",
  "descricao",
  "descricoes",
  "dialogo",
  "dialogos",
  "dificil",
  "divisao",
  "exercicio",
  "exercicios",
  "funcao",
  "funcoes",
  "historia",
  "inicio",
  "introducao",
  "laco",
  "lacos",
  "logica",
  "navegacao",
  "nao",
  "pagina",
  "paginas",
  "pratica",
  "praticas",
  "programacao",
  "proxima",
  "proximo",
  "raciocinio",
  "regiao",
  "regioes",
  "restricoes",
  "secao",
  "secoes",
  "tecnica",
  "tecnicas",
  "tecnico",
  "tecnicos",
  "titulo",
  "titulos",
  "topico",
  "topicos",
  "util",
  "uteis",
  "variavel",
  "variaveis",
  "visao",
  "visivel",
  "visiveis",
  "voce",
];

const contextRegressions = [
  /\besta\s+(claro|clara|errado|errada|preso|presa|inseguro|insegura|vazio|vazia|travado|travada|disponivel)\b/gi,
  /\ba mao\b/gi,
  /\bas vezes\b/gi,
  /\bmédia queries\b/gi,
];

type JsonNode = string | number | boolean | null | JsonNode[] | { [key: string]: JsonNode };

function listFiles(directory: string, extension: string): string[] {
  return readdirSync(directory)
    .flatMap((entry) => {
      const filePath = path.join(directory, entry);
      return statSync(filePath).isDirectory() ? listFiles(filePath, extension) : [filePath];
    })
    .filter((filePath) => filePath.endsWith(extension))
    .toSorted();
}

function collectJsonValues(node: JsonNode): string[] {
  if (typeof node === "string") {
    return [node];
  }

  if (Array.isArray(node)) {
    return node.flatMap(collectJsonValues);
  }

  if (node && typeof node === "object") {
    return Object.values(node).flatMap(collectJsonValues);
  }

  return [];
}

function stripNonProseMarkdown(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/https?:\/\/\S+/g, " ");
}

function findAsciiRegressions(source: string) {
  const wordMatches = asciiPortugueseRegressions.flatMap((word) => {
    const pattern = new RegExp(`\\b${word}\\b`, "gi");
    return Array.from(source.matchAll(pattern), (match) => match[0]);
  });
  const contextMatches = contextRegressions.flatMap((pattern) =>
    Array.from(source.matchAll(pattern), (match) => match[0]),
  );

  return [...wordMatches, ...contextMatches].toSorted();
}

describe("Portuguese copy quality", () => {
  it("keeps pt-BR message values accented", () => {
    const regressions = listFiles(portugueseMessageDirectory, ".json").flatMap((filePath) => {
      const messages = JSON.parse(readFileSync(filePath, "utf8")) as JsonNode;
      return collectJsonValues(messages).flatMap((value) =>
        findAsciiRegressions(value).map((match) => `${path.basename(filePath)}: ${match}`),
      );
    });

    expect(regressions).toEqual([]);
  });

  it("keeps pt-BR markdown prose accented", () => {
    const regressions = listFiles(portugueseMarkdownDirectory, ".md").flatMap((filePath) => {
      const prose = stripNonProseMarkdown(readFileSync(filePath, "utf8"));
      return findAsciiRegressions(prose).map((match) => `${path.basename(filePath)}: ${match}`);
    });

    expect(regressions).toEqual([]);
  });
});
