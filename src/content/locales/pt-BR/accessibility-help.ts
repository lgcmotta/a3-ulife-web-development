import type { AccessibilityHelpSection } from "@/content/types";

export const accessibilityHelpSections: AccessibilityHelpSection[] = [
  {
    title: "Comece pela navegacao principal",
    content:
      "Use os links do cabecalho para se mover entre Inicio, Trilhas de aprendizagem e Ajuda de acessibilidade. Paginas de topicos incluem um link para voltar as trilhas de aprendizagem, para que voce retorne a visao geral sem refazer todos os passos anteriores.",
    appliesTo: "Areas principais",
    order: 1,
  },
  {
    title: "Percorra os controles com o teclado",
    content:
      "Pressione Tab para avancar por links, cartoes de topico, o seletor de tema base, o seletor de alto contraste e o seletor de idioma. Pressione Shift+Tab para voltar, e use Enter ou Espaco para acionar o item em foco. O link de pular leva o foco direto ao conteudo principal.",
    appliesTo: "Navegacao por teclado",
    order: 2,
  },
  {
    title: "Use titulos e marcos como mapa da pagina",
    content:
      "Cada pagina tem uma regiao de navegacao principal, uma regiao de conteudo principal e titulos claros para a area atual. Usuarios de leitor de tela podem navegar por titulos para comparar trilhas, encontrar secoes de topicos e chegar a proxima acao de estudo.",
    appliesTo: "Estrutura para leitores de tela",
    order: 3,
  },
  {
    title: "Alterne para contraste visual mais forte",
    content:
      "Use o seletor de tema base para alternar entre tema claro e escuro, depois ative ou desative o alto contraste de forma independente. O modo de alto contraste reforca texto, bordas, contornos de foco e contraste dos botoes sem mudar a ordem do conteudo. O estado atual da navegacao tambem aparece com texto e sublinhado, nao apenas com cor.",
    appliesTo: "Acessibilidade visual",
    order: 4,
  },
];
