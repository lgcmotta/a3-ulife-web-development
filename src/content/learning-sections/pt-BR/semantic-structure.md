# Estrutura Semântica

Estrutura semântica significa usar elementos de página por seu significado, não apenas por sua aparência. Um título deve introduzir uma seção. A navegação deve conter links para se mover pelo site. Um botão deve executar uma ação. Um rótulo deve explicar um controle. Quando estrutura e objetivo combinam, a página fica mais fácil de entender para todo mundo. Ela também fica muito mais usável para pessoas que dependem de leitores de tela, navegação por teclado ou recursos do navegador que resumem regiões da página.

Iniciantes às vezes constroem uma página escolhendo caixas visuais primeiro: um bloco grande de texto aqui, uma linha de links ali, uma área colorida no rodapé. Planejamento visual é útil, mas deve vir acompanhado de um contorno. Se o contorno é confuso, a página provavelmente também será. Um contorno forte começa com um único título principal e usa títulos menores para dividir o conteúdo. Esses títulos devem fazer sentido quando lidos como lista. Por exemplo, uma página de tópico pode ter "Bases da Resolução de Problemas" como título principal e depois "Por que isso importa", "Rotina de prática" e "O que fazer depois" como títulos de seção.

| Parte da página | Objetivo semântico | Pergunta útil |
| --- | --- | --- |
| Cabeçalho | Identifica o site ou a seção | O estudante sabe onde está? |
| Navegação | Lista opções de movimento | Os destinos dos links estão claros? |
| Conteúdo principal | Guarda o conteúdo único da página | O título principal nomeia a página? |
| Títulos de seção | Dividem conteúdo em pontos de leitura | O contorno explica o conteúdo? |
| Rótulos | Nomeiam controles e entradas | O controle faria sentido sem o layout? |

Usuários de leitor de tela frequentemente navegam por títulos, marcos e links. Se todo título é escolhido apenas por tamanho de fonte, a lista de títulos pode pular níveis ou repetir frases vagas. Se links dizem apenas "clique aqui", uma lista de links se torna inútil. A [página da W3C Web Accessibility Initiative sobre estrutura de página](https://www.w3.org/WAI/tutorials/page-structure/) explica como títulos e regiões apoiam a navegação. O [guia da MDN sobre semântica HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) oferece uma visão breve de por que o significado dos elementos importa.

Estrutura semântica também ajuda usuários que enxergam a página. Títulos claros apoiam leitura rápida. Links significativos reduzem hesitação. Um estado visível de página atual ajuda estudantes a saber onde estão. Um formulário com rótulos é mais fácil de revisar antes de enviar. Acessibilidade e usabilidade não são preocupações separadas aqui; são duas visões da mesma qualidade de design.

Uma forma prática de testar estrutura é remover da imaginação quase toda a decoração visual. Pergunte se a página ainda faz sentido como um contorno simples. Se o primeiro título diz "Bem-vindo", mas a página é na verdade um construtor de trilha de aprendizagem, o título não está fazendo o suficiente. Se três botões diferentes dizem "Continuar" mas levam a resultados diferentes, seus rótulos precisam de mais contexto. Se um cartão de tópico contém título, resumo, resultado esperado e lista de links, essa ordem deve continuar lógica mesmo em uma tela estreita.

Estrutura semântica não deve virar algo pesado ou acadêmico. Você não precisa de uma nova região para cada frase. Use estrutura onde ela ajuda pessoas a se mover, entender ou agir. Uma página educacional pequena pode precisar de cabeçalho, navegação principal, conteúdo principal, algumas seções e links claros. Isso basta. Marcos demais ou títulos repetidos podem se tornar ruído.

Ao construir com componentes, mantenha a mesma disciplina. Um cartão reutilizável ainda pode receber um nível real de título. Um botão customizado ainda deve renderizar um botão quando executa uma ação. Uma aba deve expor estado selecionado, não apenas uma mudança de cor. Se um componente esconde responsabilidade semântica, toda página que o usa herda o problema.

## Rotina de prática

Escolha uma página desta plataforma e escreva seu contorno no papel. Inclua título principal, títulos de seção, região de navegação e ação primária. Depois pergunte se um estudante conseguiria prever o objetivo da página usando apenas esse contorno. Se não, revise rótulos e títulos antes de mudar o estilo visual.

## O que fazer depois

Abra uma página de tópico e inspecione todo rótulo de link. Substitua rótulos vagos por texto que nomeia o destino ou resultado. Depois verifique se a página tem um título principal claro e uma sequência lógica de seções.
