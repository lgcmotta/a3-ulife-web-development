# Estrutura Semantica

Estrutura semantica significa usar elementos de pagina por seu significado, nao apenas por sua aparencia. Um titulo deve introduzir uma secao. A navegacao deve conter links para se mover pelo site. Um botao deve executar uma acao. Um rotulo deve explicar um controle. Quando estrutura e objetivo combinam, a pagina fica mais facil de entender para todo mundo. Ela tambem fica muito mais usavel para pessoas que dependem de leitores de tela, navegacao por teclado ou recursos do navegador que resumem regioes da pagina.

Iniciantes as vezes constroem uma pagina escolhendo caixas visuais primeiro: um bloco grande de texto aqui, uma linha de links ali, uma area colorida no rodape. Planejamento visual e util, mas deve vir acompanhado de um contorno. Se o contorno e confuso, a pagina provavelmente tambem sera. Um contorno forte comeca com um unico titulo principal e usa titulos menores para dividir o conteudo. Esses titulos devem fazer sentido quando lidos como lista. Por exemplo, uma pagina de topico pode ter "Bases da Resolucao de Problemas" como titulo principal e depois "Por que isso importa", "Rotina de pratica" e "O que fazer depois" como titulos de secao.

| Parte da pagina | Objetivo semantico | Pergunta util |
| --- | --- | --- |
| Cabecalho | Identifica o site ou a secao | O estudante sabe onde esta? |
| Navegacao | Lista opcoes de movimento | Os destinos dos links estao claros? |
| Conteudo principal | Guarda o conteudo unico da pagina | O titulo principal nomeia a pagina? |
| Titulos de secao | Dividem conteudo em pontos de leitura | O contorno explica o conteudo? |
| Rotulos | Nomeiam controles e entradas | O controle faria sentido sem o layout? |

Usuarios de leitor de tela frequentemente navegam por titulos, marcos e links. Se todo titulo e escolhido apenas por tamanho de fonte, a lista de titulos pode pular niveis ou repetir frases vagas. Se links dizem apenas "clique aqui", uma lista de links se torna inutil. A [pagina da W3C Web Accessibility Initiative sobre estrutura de pagina](https://www.w3.org/WAI/tutorials/page-structure/) explica como titulos e regioes apoiam a navegacao. O [guia da MDN sobre semantica HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) oferece uma visao breve de por que o significado dos elementos importa.

Estrutura semantica tambem ajuda usuarios que enxergam a pagina. Titulos claros apoiam leitura rapida. Links significativos reduzem hesitacao. Um estado visivel de pagina atual ajuda estudantes a saber onde estao. Um formulario com rotulos e mais facil de revisar antes de enviar. Acessibilidade e usabilidade nao sao preocupacoes separadas aqui; sao duas visoes da mesma qualidade de design.

Uma forma pratica de testar estrutura e remover da imaginacao quase toda a decoracao visual. Pergunte se a pagina ainda faz sentido como um contorno simples. Se o primeiro titulo diz "Bem-vindo", mas a pagina e na verdade um construtor de trilha de aprendizagem, o titulo nao esta fazendo o suficiente. Se tres botoes diferentes dizem "Continuar" mas levam a resultados diferentes, seus rotulos precisam de mais contexto. Se um cartao de topico contem titulo, resumo, resultado esperado e lista de links, essa ordem deve continuar logica mesmo em uma tela estreita.

Estrutura semantica nao deve virar algo pesado ou academico. Voce nao precisa de uma nova regiao para cada frase. Use estrutura onde ela ajuda pessoas a se mover, entender ou agir. Uma pagina educacional pequena pode precisar de cabecalho, navegacao principal, conteudo principal, algumas secoes e links claros. Isso basta. Marcos demais ou titulos repetidos podem se tornar ruido.

Ao construir com componentes, mantenha a mesma disciplina. Um cartao reutilizavel ainda pode receber um nivel real de titulo. Um botao customizado ainda deve renderizar um botao quando executa uma acao. Uma aba deve expor estado selecionado, nao apenas uma mudanca de cor. Se um componente esconde responsabilidade semantica, toda pagina que o usa herda o problema.

## Rotina de pratica

Escolha uma pagina desta plataforma e escreva seu contorno no papel. Inclua titulo principal, titulos de secao, regiao de navegacao e acao primaria. Depois pergunte se um estudante conseguiria prever o objetivo da pagina usando apenas esse contorno. Se nao, revise rotulos e titulos antes de mudar o estilo visual.

## O que fazer depois

Abra uma pagina de topico e inspecione todo rotulo de link. Substitua rotulos vagos por texto que nomeia o destino ou resultado. Depois verifique se a pagina tem um titulo principal claro e uma sequencia logica de secoes.
