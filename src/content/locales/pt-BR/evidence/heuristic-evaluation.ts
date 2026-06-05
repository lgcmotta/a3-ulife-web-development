import type { HeuristicEvaluationFinding } from "@/content/types";

export const heuristicFindings: HeuristicEvaluationFinding[] = [
  {
    heuristic: "Visibilidade do status do sistema",
    finding:
      "Estudantes precisam saber em qual area principal estao ao se mover entre Inicio, Trilhas e Ajuda de acessibilidade.",
    severity: "medium",
    decision: "addressed-now",
    iterationNote:
      "A navegacao principal inclui estado de pagina atual, e paginas de topico incluem navegacao de retorno.",
  },
  {
    heuristic: "Reconhecimento em vez de memorizacao",
    finding:
      "Opcoes de trilha devem explicar seu objetivo sem exigir que estudantes lembrem terminologia da disciplina.",
    severity: "medium",
    decision: "addressed-now",
    iterationNote:
      "Cada trilha inclui resumo amigavel para iniciantes, descricao e indicacao de recomendacao.",
  },
  {
    heuristic: "Acessibilidade e flexibilidade de uso",
    finding:
      "Estudantes precisam de navegacao por teclado e opcao de alto contraste para usar a base de forma independente.",
    severity: "high",
    decision: "addressed-now",
    iterationNote:
      "A base inclui link de pular, estados de foco, regioes semanticas e alternancia de alto contraste.",
  },
  {
    heuristic: "Controle e liberdade do usuario",
    finding:
      "Estudantes podem fazer edicoes significativas na trilha e precisam evitar perder ou aplicar mudancas por acidente.",
    severity: "high",
    decision: "addressed-now",
    iterationNote:
      "O construtor separa Salvar de Continuar aprendizagem, desativa acoes invalidas e exige confirmacao para descartar e limpar.",
  },
  {
    heuristic: "Compatibilidade entre sistema e mundo real",
    finding:
      "O construtor deve preservar a hierarquia das trilhas para que estudantes nao vejam topicos separados de seu contexto de estudo.",
    severity: "medium",
    decision: "addressed-now",
    iterationNote:
      "A trilha atual agrupa topicos selecionados sob a trilha pai e permite reordenar topicos apenas dentro desse grupo.",
  },
  {
    heuristic: "Prevencao de erros",
    finding:
      "Estudantes podem tentar continuar aprendendo com edicoes nao salvas ou salvar uma trilha vazia.",
    severity: "high",
    decision: "addressed-now",
    iterationNote:
      "A barra de acoes desativa acoes invalidas, e acoes de servidor retornam feedback amigavel para bloqueios.",
  },
  {
    heuristic: "Acessibilidade e flexibilidade de uso",
    finding:
      "O construtor personalizado introduz abas, controles em arvore, menus de contexto, dialogos, avisos e paginas longas de leitura.",
    severity: "high",
    decision: "addressed-now",
    iterationNote:
      "Abas da area do estudante expõem estado selecionado, controles tem rotulos legiveis, dialogos destrutivos sao explicitos e secoes de aprendizagem colocam Concluir topico antes do conteudo longo.",
  },
];
