# Layouts Responsivos

Um layout responsivo mantem o conteudo usavel quando a tela muda. Ele nao e apenas uma tarefa de decoracao visual, nem apenas sobre celulares. Um projeto de aula pode ser visto em notebook, monitor de laboratorio, projetor ou telefone pequeno no caminho para casa. O mesmo conteudo de aprendizagem deve continuar legivel, navegavel e compreensivel nessas situacoes. Se a pagina tecnicamente contem tudo, mas exige rolagem lateral ou esconde a acao principal, o design falhou em um teste importante de usabilidade.

Pensamento responsivo comeca pela prioridade do conteudo. Pergunte o que o estudante precisa primeiro. Em uma pagina de trilhas de aprendizagem, ele precisa do titulo da pagina, de uma explicacao curta e das trilhas disponiveis. Em uma pagina de topico, precisa do titulo do topico, do contexto e de uma forma de continuar ou voltar. Uma tela larga pode mostrar cartoes de trilha em colunas porque ha espaco para compara-los lado a lado. Uma tela estreita pode empilhar os mesmos cartoes em uma coluna para que cada um seja lido sem compressao.

| Decisao de layout | Opcao em tela larga | Opcao em tela estreita |
| --- | --- | --- |
| Visao geral de trilhas | Tres colunas para comparacao | Uma coluna na ordem de leitura |
| Navegacao | Links horizontais | Links quebrados ou agrupamento compacto |
| Interface do construtor | Barra lateral mais trilha atual | Arvore e trilha atual empilhadas |
| Texto longo | Largura maxima confortavel | Largura cheia com bom espacamento |

Unidades flexiveis ajudam. Uma largura fixa de 1200 pixels pode parecer boa em um notebook e quebrar em um celular. Uma largura maxima com padding flexivel costuma ser mais segura. Layouts com grid e flex podem permitir que o conteudo quebre linha em vez de transbordar. O [guia da MDN sobre design responsivo](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) explica as ideias principais, e o [guia da MDN sobre media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) mostra como estilos respondem a condicoes da tela.

Ainda assim, media queries nao resolvem tudo. Muitos problemas responsivos sao causados por conteudo que nao encolhe ou quebra linha. Rotulos longos, tabelas largas, cartoes fixos e imagens sem restricoes podem criar rolagem horizontal. Em paginas educacionais, texto legivel e especialmente importante. Linhas longas demais cansam; linhas curtas demais ficam picadas. Use uma largura maxima confortavel para secoes longas de estudo e permita que paineis de interface mais curtos usem layouts mais densos.

Layout responsivo tambem afeta usuarios de teclado. Se a ordem visual muda entre tamanhos de tela, a ordem de foco ainda deve fazer sentido. Um estudante nao deve tabular por uma secao oculta ou distante antes de chegar a acao primaria visivel. Ao empilhar uma barra lateral acima do conteudo principal no mobile, considere se o estudante deve encontrar primeiro as trilhas disponiveis ou a trilha atual. A resposta depende do fluxo de trabalho, mas deve ser intencional.

Imagens tambem precisam de cuidado. Uma imagem hero pode apoiar a identidade, mas nao deve empurrar o objetivo principal para fora da primeira tela em todos os dispositivos. Imagens informativas precisam de texto alternativo significativo. Imagens decorativas podem ser ocultadas de tecnologias assistivas. Se uma imagem e cortada, garanta que ainda comunique o assunto correto. Uma imagem de Diogenes deve mostrar o professor claramente, nao virar um fundo abstrato que compete com o texto.

Testar responsividade deve ser pratico. Redimensione o navegador. Use uma viewport mobile. Aumente o zoom. Experimente um titulo longo de trilha ou um rotulo traduzido. Procure texto sobreposto, botoes cortados, alvos de toque pequenos e rolagem horizontal. Depois teste o fluxo real: o estudante consegue entrar na pagina, encontrar a acao principal, ler a proxima secao e seguir em frente?

## Rotina de pratica

Esboce a mesma pagina duas vezes: uma como visualizacao desktop larga e outra como visualizacao mobile estreita. Numere os blocos de conteudo na ordem em que um estudante deveria encontra-los. Se a ordem mobile parecer confusa, revise a arquitetura da informacao antes de polir estilos.

## O que fazer depois

Abra a pagina de trilhas de aprendizagem em uma viewport estreita. Verifique se todo titulo de trilha, resumo e link de topico continua legivel sem rolagem lateral. Depois repita a mesma verificacao em uma pagina de topico com conteudo longo em Markdown.
