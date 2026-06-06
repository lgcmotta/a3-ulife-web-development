# Navegação Acessível

A navegação é o mapa do estudante em uma aplicação web. Se esse mapa só funciona com mouse, comunica apenas por cor ou usa nomes vagos para links, muitos estudantes vão hesitar ou se perder. Navegação acessível significa que links, botões, ordem de foco, local atual e feedback podem ser entendidos por usuários de teclado, usuários de leitor de tela, pessoas com baixa visão e estudantes que estão apenas cansados ou chegando agora ao material.

Acesso por teclado é o primeiro teste prático. Um estudante deve conseguir pressionar Tab e passar pelos elementos interativos em uma ordem lógica. Todo item em foco deve mostrar indicador de foco visível. O estudante deve conseguir acionar links e botões usando o teclado. Se houver menu, aba, diálogo ou menu de contexto, ele não deve prender o estudante inesperadamente e deve restaurar o foco ao fechar. A [orientação de compatibilidade com teclado da W3C WAI](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) explica por que operação por teclado é requisito central de acessibilidade.

Texto de link importa. Um link chamado "Leia mais" pode ser compreensível dentro de um cartão, mas fica pouco claro quando lido fora de contexto. "Abrir Bases da Resolução de Problemas" é mais forte porque nomeia o destino. Botões devem nomear a ação: "Salvar", "Descartar alterações", "Concluir tópico" ou "Voltar ao construtor". Quando dois controles fazem coisas diferentes, não devem ter rótulos idênticos a menos que o contexto ao redor seja programaticamente claro.

| Sinal de navegação | Versão fraca | Versão mais forte |
| --- | --- | --- |
| Rótulo de link | Clique aqui | Abrir Navegação Acessível |
| Página atual | Apenas cor verde | Texto, sublinhado e `aria-current` |
| Foco | Sem mudança visível | Contorno claro ao redor do item em foco |
| Ação desativada | Apenas cor apagada | Estado desativado mais feedback explicativo |

Cor não pode ser o único sinal. Uma aba selecionada pode usar uma cor diferente, mas também deve expor estado selecionado e usar outra pista visível, como sublinhado ou borda. Um tópico concluído pode usar um selo ou rótulo textual, não apenas verde. Um aviso de erro deve incluir palavras que expliquem o problema, não apenas estilo vermelho. Isso ajuda usuários daltônicos e qualquer pessoa usando tema de alto contraste.

Usuários de leitor de tela se beneficiam de marcos e estados. Regiões de navegação devem ter nomes acessíveis quando houver mais de uma. Links da página atual podem usar `aria-current`. Abas devem expor estado selecionado. Diálogos devem ter títulos e descrições. Avisos ou mudanças de status importantes devem ser anunciados por uma região ativa. O [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) é uma referência útil para widgets complexos, embora iniciantes devam preferir elementos HTML nativos sempre que possível.

Navegação acessível também envolve previsibilidade. A mesma navegação principal deve aparecer no mesmo lugar. Um botão "Começar aprendizagem" deve levar à mesma área do estudante a partir de Início e de Trilhas de aprendizagem. As abas de histórico e construtor devem atualizar a URL para que estudantes retornem ao mesmo lugar. Um link Voltar ao construtor em toda seção de aprendizagem oferece uma saída confiável quando é preciso ajustar a trilha.

Testar não exige ferramentas caras. Use apenas o teclado. Comece na barra de endereço do navegador e pressione Tab pela página. Diga em voz alta os nomes dos controles em foco. Se um nome não explica o resultado, melhore-o. Tente Shift+Tab para voltar. Abra e feche diálogos. Acione um menu de contexto. Se perder o foco ou não souber onde está, a navegação precisa de trabalho.

## Rotina de prática

Escolha uma página e complete seu fluxo principal sem tocar no mouse. Mantenha notas em três colunas: foco está claro, rótulo está claro, resultado está claro. Qualquer linha marcada como "não" vira uma tarefa concreta de melhoria.

## O que fazer depois

Teste as abas da área do estudante usando apenas o teclado. Confirme que consegue chegar a Histórico, Construtor, Salvar, Descartar alterações e Voltar ao construtor, e confirme que o local atual é comunicado com mais do que cor.
