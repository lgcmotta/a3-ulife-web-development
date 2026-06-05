import type { InformationArchitectureArtifact } from "@/content/types";

export const informationArchitecture: InformationArchitectureArtifact = {
  mainAreas: [
    "Area inicial ou de introducao",
    "Visao geral das trilhas de aprendizagem",
    "Aba de historico da area do estudante",
    "Aba do construtor da area do estudante",
    "Area de detalhe do topico",
    "Area de secao personalizada de aprendizagem",
    "Area de ajuda de acessibilidade",
  ],
  navigationRelationships: [
    "Inicio apresenta o objetivo e leva para Comecar aprendizagem, Trilhas de aprendizagem e Ajuda de acessibilidade.",
    "Comecar aprendizagem em Inicio e Trilhas de aprendizagem abre a aba padrao da area do estudante em /tracks/history.",
    "Historico de trilhas de aprendizagem e Construtor de trilha de aprendizagem sao abas irmas com rotas proprias.",
    "Historico de trilhas de aprendizagem lista caminhos salvos e leva para /tracks/builder quando estudantes precisam criar uma nova trilha.",
    "Construtor de trilha de aprendizagem permite configurar a trilha atual e iniciar ou continuar a trilha salva.",
    "Trilhas salvas abrem secoes detalhadas de aprendizagem, e cada secao retorna ao construtor.",
    "Concluir o topico final abre uma tela de conclusao com rota de volta para /tracks/history.",
    "Trilhas de aprendizagem lista caminhos selecionados e leva para paginas de detalhe de topicos da base.",
    "Paginas de topicos explicam uma unidade de estudo e retornam para Trilhas de aprendizagem.",
    "Ajuda de acessibilidade fica acessivel a partir de todas as paginas principais pela navegacao primaria.",
  ],
  contentHierarchy: [
    "Cada pagina comeca com um titulo principal e um paragrafo curto de orientacao.",
    "Itens repetidos de trilha e topico usam rotulos e descricoes de apoio consistentes.",
    "A area do estudante separa revisao de historico de edicao no construtor para reduzir troca de tarefa.",
    "O construtor mantem o catalogo de origem em uma arvore lateral e a trilha atual em uma visao ordenada principal.",
    "Secoes de aprendizagem mantem as acoes Concluir topico e Voltar ao construtor antes do conteudo longo em Markdown.",
    "Acoes principais aparecem antes de detalhes secundarios tanto no desktop quanto no mobile.",
  ],
  wireframeNotes: [
    "No desktop, a pagina inicial usa uma imagem larga do professor com texto introdutorio sobreposto e uma previa visivel da proxima secao.",
    "No mobile, a pagina inicial apresenta a mesma introducao primeiro, depois empilha acoes e resumos de conteudo.",
    "A visao de trilhas usa cartoes repetidos com titulo, objetivo, recomendacao e links de topicos.",
    "O detalhe do topico usa uma coluna estreita de leitura com ideias-chave e uma proxima acao de estudo.",
    "O historico do estudante usa uma estrutura de abas, seguida por uma tabela acessivel ou um estado vazio com Adicionar nova trilha de aprendizagem.",
    "O construtor do estudante usa layout de duas colunas no desktop e empilha barra de acoes, arvore de catalogo e trilha atual no mobile.",
    "Paginas de secao de aprendizagem usam uma coluna de leitura limitada para manter tabelas, links e listas em Markdown legiveis.",
  ],
};
