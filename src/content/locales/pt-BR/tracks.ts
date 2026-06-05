import type { LearningTrack } from "@/content/types";

export const learningTracks: LearningTrack[] = [
  {
    slug: "programming-foundations",
    title: "Fundamentos de Programacao",
    summary: "Construa os habitos por tras de programas claros antes de focar apenas na sintaxe.",
    description:
      "Esta trilha ajuda iniciantes a desacelerar, descrever um problema, acompanhar como valores mudam e depurar com evidencias. Ela foi pensada para estudantes que se sentem inseguros sobre por onde comecar quando um exercicio aparece diante deles.",
    recommendedFor: "Estudantes escrevendo seus primeiros programas ou retornando depois de uma primeira disciplina dificil.",
    outcome:
      "Depois desta trilha, estudantes conseguem planejar um programa pequeno, rastrear seu comportamento e usar uma rotina repetivel de depuracao.",
    topics: [
      {
        slug: "problem-solving-basics",
        trackSlug: "programming-foundations",
        title: "Bases da Resolucao de Problemas",
        summary:
          "Aprenda a transformar um exercicio de programacao em entradas, saidas, restricoes e um plano curto antes de escrever codigo.",
        whyItMatters:
          "Muitos erros de iniciantes acontecem antes da primeira linha de codigo. Um estudante pode entender a sintaxe e ainda nao saber o que o programa deve receber, calcular ou devolver. Planejar o problema em linguagem simples torna o codigo mais facil de escrever, explicar e testar.",
        studyNext:
          "Escolha um exercicio pequeno, escreva a entrada e a saida em uma frase cada, depois liste tres passos que o programa deve seguir antes de codificar.",
        keyIdeas: [
          "Identificar as informacoes que o programa recebe",
          "Declarar o resultado que o programa deve produzir",
          "Dividir o trabalho em acoes ordenadas",
          "Verificar um exemplo a mao",
        ],
        practicePrompt:
          "Planeje uma calculadora de media de notas sem codigo: nomeie os valores de entrada, o calculo e a mensagem que o estudante deve ver no fim.",
        professorNote:
          "Diogenes pediria primeiro a historia da solucao. Se voce nao consegue explicar os passos para um colega, o computador nao os tornara mais claros.",
      },
      {
        slug: "variables-and-flow",
        trackSlug: "programming-foundations",
        title: "Variaveis e Fluxo",
        summary:
          "Entenda como valores armazenados, condicoes e repeticoes moldam o caminho que um programa segue.",
        whyItMatters:
          "Variaveis nao sao apenas nomes em uma pagina; elas sao a memoria do programa em um momento especifico. Condicoes e lacos decidem quais instrucoes rodam em seguida. Quando estudantes aprendem a rastrear essas mudancas, codigo confuso vira uma sequencia que pode ser inspecionada.",
        studyNext:
          "Rastreie um programa curto linha por linha e mantenha uma tabela mostrando o valor de cada variavel depois de cada passo importante.",
        keyIdeas: [
          "Acompanhar valores de variaveis como estado do programa",
          "Ler condicoes como decisoes de sim ou nao",
          "Descrever lacos pela regra de parada",
          "Usar rastreamento para encontrar onde expectativas mudam",
        ],
        practicePrompt:
          "Crie uma tabela de rastreamento para um laco que conta de 1 a 5 e registra o total acumulado depois de cada passagem.",
        professorNote:
          "Um laco e mais facil de confiar quando voce sabe quando ele comeca, o que muda a cada vez e por que ele finalmente para.",
      },
      {
        slug: "debugging-habits",
        trackSlug: "programming-foundations",
        title: "Habitos de Depuracao",
        summary:
          "Pratique encontrar erros reproduzindo o problema, lendo as evidencias e mudando uma coisa por vez.",
        whyItMatters:
          "Depurar e trabalho normal de programacao, nao sinal de fracasso. O risco e tentar mudancas aleatorias ate o erro desaparecer. Uma rotina calma ajuda estudantes a entender a causa, confirmar a correcao e evitar criar um novo problema.",
        studyNext:
          "Quando um erro aparecer, escreva o que voce esperava, o que aconteceu de fato e a unica mudanca focada que testara em seguida.",
        keyIdeas: [
          "Reproduzir o problema antes de mudar codigo",
          "Ler mensagens de erro em busca de local e causa",
          "Mudar uma variavel ou linha por vez",
          "Confirmar a correcao com a mesma entrada",
        ],
        practicePrompt:
          "Pegue um programa pequeno quebrado e mantenha um diario de depuracao com tres colunas: observacao, hipotese e resultado.",
        professorNote:
          "Diogenes trata uma mensagem de erro como uma pista de um examinador cuidadoso. Leia devagar antes de discutir com ela.",
      },
    ],
  },
  {
    slug: "web-and-accessibility",
    title: "Web e Acessibilidade",
    summary: "Aprenda como estrutura, layout e interacao inclusiva tornam paginas mais faceis de usar.",
    description:
      "Esta trilha conecta decisoes iniciais de interface web com usabilidade e acessibilidade. Estudantes estudam como titulos, marcos, layout responsivo, rotulos, ordem de foco e contraste visual afetam pessoas reais usando a mesma pagina de maneiras diferentes.",
    recommendedFor: "Estudantes criando seu primeiro trabalho web ou melhorando um prototipo de aula.",
    outcome:
      "Depois desta trilha, estudantes conseguem revisar uma pagina simples quanto a estrutura, leitura em telas pequenas, acesso por teclado e pistas que nao dependem so de cor.",
    topics: [
      {
        slug: "semantic-structure",
        trackSlug: "web-and-accessibility",
        title: "Estrutura Semantica",
        summary:
          "Use regioes de pagina, titulos, rotulos e ordem de leitura significativos para que pessoas e tecnologias assistivas entendam a pagina.",
        whyItMatters:
          "Uma pagina web e mais facil de usar quando sua estrutura corresponde ao seu objetivo. Titulos ajudam estudantes a escanear, marcos ajudam usuarios de leitor de tela a saltar entre regioes, e rotulos claros explicam o que cada link ou controle fara.",
        studyNext:
          "Revise uma pagina e liste seu titulo principal, regiao de navegacao, regiao de conteudo principal e cada link cujo objetivo nao esteja claro.",
        keyIdeas: [
          "Usar um titulo principal claro por pagina",
          "Agrupar navegacao e conteudo principal semanticamente",
          "Escrever rotulos que descrevem destino ou acao",
          "Manter ordem visual e ordem de leitura alinhadas",
        ],
        practicePrompt:
          "Esboce o contorno de uma pagina de topico usando apenas titulos e nomes de regioes, depois verifique se o contorno ainda explica a pagina.",
        professorNote:
          "Boa estrutura e silenciosa. A maioria das pessoas so percebe quando ela falta, mas tecnologias assistivas dependem dela desde o inicio.",
      },
      {
        slug: "responsive-layouts",
        trackSlug: "web-and-accessibility",
        title: "Layouts Responsivos",
        summary:
          "Planeje paginas que continuem legiveis e navegaveis em celulares, notebooks e telas de apresentacao.",
        whyItMatters:
          "Estudantes podem abrir um projeto de aula em um celular, notebook ou projetor. Se o texto fica apertado, links se movem de forma imprevisivel ou aparece rolagem horizontal, o conteudo pode estar tecnicamente presente, mas praticamente dificil de usar.",
        studyNext:
          "Esboce a mesma pagina em layout largo e estreito, depois marque qual titulo, navegacao e acao principal devem continuar faceis de encontrar primeiro.",
        keyIdeas: [
          "Usar secoes flexiveis em vez de layouts de largura fixa",
          "Manter comprimento de linha confortavel para leitura",
          "Evitar rolagem horizontal no conteudo principal",
          "Priorizar acoes importantes em telas estreitas",
        ],
        practicePrompt:
          "Compare uma visao geral de trilhas em tres colunas com uma versao mobile de uma coluna e decida qual ordem de conteudo apoia melhor a leitura rapida.",
        professorNote:
          "Design responsivo nao e decoracao. E a promessa de que a aula ainda funciona quando a tela muda.",
      },
      {
        slug: "accessible-navigation",
        trackSlug: "web-and-accessibility",
        title: "Navegacao Acessivel",
        summary:
          "Torne links, controles, foco e local atual compreensiveis sem depender apenas de cor ou passagem do mouse.",
        whyItMatters:
          "A navegacao e o mapa do estudante pela plataforma. Se o mapa so funciona visualmente, so funciona com mouse ou esconde a localizacao atual, estudantes usando teclado ou tecnologia assistiva perdem confianca rapidamente.",
        studyNext:
          "Use apenas o teclado para se mover por uma pagina e anote cada ponto em que foco, objetivo do link ou estado da pagina atual nao estiver claro.",
        keyIdeas: [
          "Manter a ordem do teclado proxima da ordem visual",
          "Mostrar foco visivel em todo item interativo",
          "Nomear links pelo destino ou resultado",
          "Indicar local atual com texto ou sublinhado",
        ],
        practicePrompt:
          "Teste um menu de navegacao com Tab e Shift+Tab, depois observe se cada item em foco pode ser identificado sem enxergar cor.",
        professorNote:
          "Se um estudante pode se perder na navegacao, o conteudo ainda nao foi realmente alcancado.",
      },
    ],
  },
  {
    slug: "study-methods",
    title: "Metodos de Estudo para Computacao",
    summary: "Use rotinas praticas para ler, planejar e pedir ajuda em Ciencia da Computacao.",
    description:
      "Esta trilha apoia os habitos ao redor da aprendizagem tecnica: ler com objetivo, planejar sessoes curtas de estudo e fazer perguntas que deem a professores, monitores e colegas contexto suficiente para ajudar.",
    recommendedFor: "Estudantes que sabem o que estudar, mas precisam de uma forma mais calma de continuar.",
    outcome:
      "Depois desta trilha, estudantes conseguem preparar uma sessao focada de estudo, resumir material tecnico e fazer perguntas especificas quando travam.",
    topics: [
      {
        slug: "reading-technical-texts",
        trackSlug: "study-methods",
        title: "Leitura de Textos Tecnicos",
        summary:
          "Leia definicoes, diagramas e exemplos de forma ativa, em vez de tentar memorizar cada frase.",
        whyItMatters:
          "Textos de Ciencia da Computacao frequentemente combinam vocabulario, diagramas, codigo e suposicoes em pouco espaco. Iniciantes aprendem mais quando separam o que um termo significa, como aparece em um exemplo e qual pergunta ainda permanece.",
        studyNext:
          "Escolha um artigo curto e marque uma definicao, um exemplo de codigo e uma pergunta para levar para a aula.",
        keyIdeas: [
          "Separar vocabulario de procedimento",
          "Conectar diagramas a explicacao escrita",
          "Resumir a ideia principal com suas proprias palavras",
          "Guardar perguntas em vez de pular a confusao",
        ],
        practicePrompt:
          "Leia uma explicacao curta sobre arrays e escreva tres notas: uma definicao, um caso de uso e um ponto que ainda parece confuso.",
        professorNote:
          "Nao meca leitura por paginas concluidas. Meca pelo que voce consegue explicar depois de fechar a pagina.",
      },
      {
        slug: "planning-study-sessions",
        trackSlug: "study-methods",
        title: "Planejamento de Sessoes de Estudo",
        summary:
          "Transforme um topico amplo em uma sessao pequena com objetivo, atividade de pratica e revisao rapida.",
        whyItMatters:
          "Um topico como algoritmos ou acessibilidade web pode parecer grande demais para comecar. Um plano curto reduz essa friccao ao nomear um conceito, uma atividade e uma forma de verificar o que foi aprendido.",
        studyNext:
          "Escreva um plano de 30 minutos com um conceito para revisar, um exercicio para tentar e uma nota para guardar para a proxima sessao.",
        keyIdeas: [
          "Escolher um objetivo pequeno de aprendizagem",
          "Combinar leitura com pratica ativa",
          "Reservar tempo para uma revisao curta",
          "Deixar a proxima sessao facil de retomar",
        ],
        practicePrompt:
          "Planeje uma sessao de 30 minutos para lacos: 10 minutos de leitura, 15 minutos resolvendo um exercicio e 5 minutos escrevendo o que mudou no seu entendimento.",
        professorNote:
          "Um bom plano de estudo e pequeno o bastante para comecar hoje e claro o bastante para continuar amanha.",
      },
      {
        slug: "asking-better-questions",
        trackSlug: "study-methods",
        title: "Fazendo Perguntas Melhores",
        summary:
          "Prepare perguntas que incluam contexto, o que voce tentou, o que aconteceu e o ponto exato em que ficou preso.",
        whyItMatters:
          "Professores e colegas ajudam mais rapido quando veem a tarefa, a tentativa e o bloqueio. Uma pergunta precisa tambem ajuda o estudante a perceber se o problema e vocabulario, logica, sintaxe ou depuracao.",
        studyNext:
          "Reescreva uma pergunta vaga adicionando a tarefa, sua tentativa, o resultado esperado e o ponto exato que confundiu.",
        keyIdeas: [
          "Declarar a tarefa ou conceito",
          "Mostrar a tentativa ou raciocinio ate aqui",
          "Nomear o bloqueio especifico",
          "Pedir o proximo passo, nao a resposta inteira",
        ],
        practicePrompt:
          "Transforme 'meu codigo nao funciona' em um pedido completo de ajuda com contexto, solucao tentada, resultado observado e uma pergunta focada.",
        professorNote:
          "Uma pergunta cuidadosa nao e confissao de fraqueza. E o caminho mais curto da confusao para um feedback util.",
      },
    ],
  },
];

export function getTrack(trackSlug: string) {
  return learningTracks.find((track) => track.slug === trackSlug);
}

export function getTopic(trackSlug: string, topicSlug: string) {
  return getTrack(trackSlug)?.topics.find((topic) => topic.slug === topicSlug);
}
