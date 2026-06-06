# Navegacao Acessivel

A navegacao e o mapa do estudante em uma aplicacao web. Se esse mapa so funciona com mouse, comunica apenas por cor ou usa nomes vagos para links, muitos estudantes vao hesitar ou se perder. Navegacao acessivel significa que links, botoes, ordem de foco, local atual e feedback podem ser entendidos por usuarios de teclado, usuarios de leitor de tela, pessoas com baixa visao e estudantes que estao apenas cansados ou chegando agora ao material.

Acesso por teclado e o primeiro teste pratico. Um estudante deve conseguir pressionar Tab e passar pelos elementos interativos em uma ordem logica. Todo item em foco deve mostrar indicador de foco visivel. O estudante deve conseguir acionar links e botoes usando o teclado. Se houver menu, aba, dialogo ou menu de contexto, ele nao deve prender o estudante inesperadamente e deve restaurar o foco ao fechar. A [orientacao de compatibilidade com teclado da W3C WAI](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) explica por que operacao por teclado e requisito central de acessibilidade.

Texto de link importa. Um link chamado "Leia mais" pode ser compreensivel dentro de um cartao, mas fica pouco claro quando lido fora de contexto. "Abrir Bases da Resolucao de Problemas" e mais forte porque nomeia o destino. Botoes devem nomear a acao: "Salvar", "Descartar alteracoes", "Concluir topico" ou "Voltar ao construtor". Quando dois controles fazem coisas diferentes, nao devem ter rotulos identicos a menos que o contexto ao redor seja programaticamente claro.

| Sinal de navegacao | Versao fraca | Versao mais forte |
| --- | --- | --- |
| Rotulo de link | Clique aqui | Abrir Navegacao Acessivel |
| Pagina atual | Apenas cor verde | Texto, sublinhado e `aria-current` |
| Foco | Sem mudanca visivel | Contorno claro ao redor do item em foco |
| Acao desativada | Apenas cor apagada | Estado desativado mais feedback explicativo |

Cor nao pode ser o unico sinal. Uma aba selecionada pode usar uma cor diferente, mas tambem deve expor estado selecionado e usar outra pista visivel, como sublinhado ou borda. Um topico concluido pode usar um selo ou rotulo textual, nao apenas verde. Um aviso de erro deve incluir palavras que expliquem o problema, nao apenas estilo vermelho. Isso ajuda usuarios daltonicos e qualquer pessoa usando tema de alto contraste.

Usuarios de leitor de tela se beneficiam de marcos e estados. Regioes de navegacao devem ter nomes acessiveis quando houver mais de uma. Links da pagina atual podem usar `aria-current`. Abas devem expor estado selecionado. Dialogos devem ter titulos e descricoes. Avisos ou mudancas de status importantes devem ser anunciados por uma regiao ativa. O [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) e uma referencia util para widgets complexos, embora iniciantes devam preferir elementos HTML nativos sempre que possivel.

Navegacao acessivel tambem envolve previsibilidade. A mesma navegacao principal deve aparecer no mesmo lugar. Um botao "Comecar aprendizagem" deve levar a mesma area do estudante a partir de Inicio e de Trilhas de aprendizagem. As abas de historico e construtor devem atualizar a URL para que estudantes retornem ao mesmo lugar. Um link Voltar ao construtor em toda secao de aprendizagem oferece uma saida confiavel quando e preciso ajustar a trilha.

Testar nao exige ferramentas caras. Use apenas o teclado. Comece na barra de endereco do navegador e pressione Tab pela pagina. Diga em voz alta os nomes dos controles em foco. Se um nome nao explica o resultado, melhore-o. Tente Shift+Tab para voltar. Abra e feche dialogos. Acione um menu de contexto. Se perder o foco ou nao souber onde esta, a navegacao precisa de trabalho.

## Rotina de pratica

Escolha uma pagina e complete seu fluxo principal sem tocar no mouse. Mantenha notas em tres colunas: foco esta claro, rotulo esta claro, resultado esta claro. Qualquer linha marcada como "nao" vira uma tarefa concreta de melhoria.

## O que fazer depois

Teste as abas da area do estudante usando apenas o teclado. Confirme que consegue chegar a Historico, Construtor, Salvar, Descartar alteracoes e Voltar ao construtor, e confirme que o local atual e comunicado com mais do que cor.
