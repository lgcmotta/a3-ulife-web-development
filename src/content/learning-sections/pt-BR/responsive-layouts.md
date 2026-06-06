# Layouts Responsivos

Um layout responsivo mantém o conteúdo usável quando a tela muda. Ele não é apenas uma tarefa de decoração visual, nem apenas sobre celulares. Um projeto de aula pode ser visto em notebook, monitor de laboratório, projetor ou telefone pequeno no caminho para casa. O mesmo conteúdo de aprendizagem deve continuar legível, navegável e compreensível nessas situações. Se a página tecnicamente contém tudo, mas exige rolagem lateral ou esconde a ação principal, o design falhou em um teste importante de usabilidade.

Pensamento responsivo começa pela prioridade do conteúdo. Pergunte o que o estudante precisa primeiro. Em uma página de trilhas de aprendizagem, ele precisa do título da página, de uma explicação curta e das trilhas disponíveis. Em uma página de tópico, precisa do título do tópico, do contexto e de uma forma de continuar ou voltar. Uma tela larga pode mostrar cartões de trilha em colunas porque há espaço para compará-los lado a lado. Uma tela estreita pode empilhar os mesmos cartões em uma coluna para que cada um seja lido sem compressão.

| Decisão de layout | Opção em tela larga | Opção em tela estreita |
| --- | --- | --- |
| Visão geral de trilhas | Três colunas para comparação | Uma coluna na ordem de leitura |
| Navegação | Links horizontais | Links quebrados ou agrupamento compacto |
| Interface do construtor | Barra lateral mais trilha atual | Árvore e trilha atual empilhadas |
| Texto longo | Largura máxima confortável | Largura cheia com bom espaçamento |

Unidades flexíveis ajudam. Uma largura fixa de 1200 pixels pode parecer boa em um notebook e quebrar em um celular. Uma largura máxima com padding flexível costuma ser mais segura. Layouts com grid e flex podem permitir que o conteúdo quebre linha em vez de transbordar. O [guia da MDN sobre design responsivo](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) explica as ideias principais, e o [guia da MDN sobre media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) mostra como estilos respondem a condições da tela.

Ainda assim, media queries não resolvem tudo. Muitos problemas responsivos são causados por conteúdo que não encolhe ou quebra linha. Rótulos longos, tabelas largas, cartões fixos e imagens sem restrições podem criar rolagem horizontal. Em páginas educacionais, texto legível é especialmente importante. Linhas longas demais cansam; linhas curtas demais ficam picadas. Use uma largura máxima confortável para seções longas de estudo e permita que painéis de interface mais curtos usem layouts mais densos.

Layout responsivo também afeta usuários de teclado. Se a ordem visual muda entre tamanhos de tela, a ordem de foco ainda deve fazer sentido. Um estudante não deve tabular por uma seção oculta ou distante antes de chegar à ação primária visível. Ao empilhar uma barra lateral acima do conteúdo principal no mobile, considere se o estudante deve encontrar primeiro as trilhas disponíveis ou a trilha atual. A resposta depende do fluxo de trabalho, mas deve ser intencional.

Imagens também precisam de cuidado. Uma imagem hero pode apoiar a identidade, mas não deve empurrar o objetivo principal para fora da primeira tela em todos os dispositivos. Imagens informativas precisam de texto alternativo significativo. Imagens decorativas podem ser ocultadas de tecnologias assistivas. Se uma imagem é cortada, garanta que ainda comunique o assunto correto. Uma imagem de Diogenes deve mostrar o professor claramente, não virar um fundo abstrato que compete com o texto.

Testar responsividade deve ser prático. Redimensione o navegador. Use uma viewport mobile. Aumente o zoom. Experimente um título longo de trilha ou um rótulo traduzido. Procure texto sobreposto, botões cortados, alvos de toque pequenos e rolagem horizontal. Depois teste o fluxo real: o estudante consegue entrar na página, encontrar a ação principal, ler a próxima seção e seguir em frente?

## Rotina de prática

Esboce a mesma página duas vezes: uma como visualização desktop larga e outra como visualização mobile estreita. Numere os blocos de conteúdo na ordem em que um estudante deveria encontrá-los. Se a ordem mobile parecer confusa, revise a arquitetura da informação antes de polir estilos.

## O que fazer depois

Abra a página de trilhas de aprendizagem em uma viewport estreita. Verifique se todo título de trilha, resumo e link de tópico continua legível sem rolagem lateral. Depois repita a mesma verificação em uma página de tópico com conteúdo longo em Markdown.
