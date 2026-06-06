# Hábitos de Depuração

Depurar não é punição por escrever código imperfeito. É trabalho normal de programação. Todo programador, de um estudante do primeiro semestre a uma pessoa experiente, passa tempo comparando o que esperava com o que aconteceu de fato. A diferença é que programadores experientes geralmente seguem uma rotina. Eles não mudam cinco coisas ao acaso esperando que o problema desapareça. Eles desaceleram, coletam evidências e testam uma ideia por vez.

O primeiro hábito é reproduzir o problema. Se um programa falha apenas às vezes, anote a entrada, a ação ou o estado da página que causa a falha. "Quebrou ontem" é difícil de investigar. "Quebra quando a lista de notas está vazia" é útil. A reprodução cria um ponto de partida estável. Sem ela, você pode achar que uma mudança corrigiu o erro quando apenas não conseguiu disparar o problema novamente.

O segundo hábito é escrever a expectativa. Um erro não é apenas "saída ruim"; é uma diferença entre comportamento esperado e comportamento real. Por exemplo: "Eu esperava que a média de 8, 7 e 6 fosse 7, mas o programa imprimiu 21." Essa frase já aponta para a divisão ausente. Se a frase for "Eu esperava que o estudante fosse aprovado, mas o programa imprimiu reprovado", a área provável é a condição ou o limite. Expectativas claras tornam pistas mais fáceis de enxergar.

| Passo de depuração | Pergunta | Exemplo de nota |
| --- | --- | --- |
| Reproduzir | Qual ação exata causa o problema? | Inserir notas 8, 7, 6 |
| Esperar | O que deveria acontecer? | A média deveria ser 7 |
| Observar | O que aconteceu de fato? | O programa imprime 21 |
| Levantar hipótese | O que pode explicar a diferença? | A soma não foi dividida por 3 |
| Testar | Que única mudança verifica a ideia? | Dividir antes de imprimir |

O terceiro hábito é ler mensagens com cuidado. Mensagens de erro frequentemente incluem arquivo, linha e tipo de problema. Elas podem parecer intimidantes, mas costumam ser mais específicas do que parecem. Um erro de sintaxe diz que o programa não entendeu o código. Um erro de referência diz que um nome foi usado incorretamente ou cedo demais. Um erro de tipo diz que um valor foi usado de uma forma que não combina com o que ele é. A [referência de erros JavaScript da MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) é útil para aprender padrões comuns de mensagens, e a documentação da linguagem da sua disciplina terá referências semelhantes.

O quarto hábito é mudar uma coisa por vez. Se você renomeia uma variável, muda uma condição, move um laço e adiciona um `print` ao mesmo tempo, não saberá qual mudança importou. Uma mudança única e focada pode parecer mais lenta, mas protege o entendimento. Depois de cada mudança, rode o mesmo caso de reprodução. Se o resultado mudar, registre o que mudou. Se não mudar, desfaça ou revise a hipótese.

Prints, logs e depuradores são ferramentas para observar estado. Um `print` simples pode mostrar o valor de uma variável em um ponto importante. Um depurador pode pausar a execução e permitir inspeção passo a passo. A ferramenta importa menos do que a pergunta que você faz com ela. "Qual é o valor de `total` depois do laço?" é uma boa pergunta. "Talvez algo esteja errado em algum lugar" é amplo demais. O [guia de depuração do Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/) mostra como a inspeção passo a passo funciona em JavaScript no navegador, e a mesma ideia existe em muitos editores.

Mantenha um registro curto quando estiver travado. Ele pode ser tão simples quanto três colunas: observação, hipótese, resultado. Isso evita voltar à mesma ideia que já falhou e fornece material para pedir ajuda. Um professor ou monitor responde muito mais rápido quando vê o que você tentou e o que aconteceu.

Por fim, confirme a correção. Rode novamente o caso que falhava. Depois rode um caso próximo que ainda deveria funcionar. Se corrigiu um cálculo de média, teste um caso normal de aprovação e um de reprovação. Erros podem se esconder quando uma mudança conserta uma entrada e quebra outra.

## Rotina de prática

Pegue um programa pequeno quebrado e resista a editá-lo imediatamente. Escreva o resultado esperado, o resultado real e uma hipótese. Adicione apenas uma ferramenta de observação, como um `print` ou ponto de parada. Depois de testar, decida se a evidência apoia a hipótese.

## O que fazer depois

No próximo exercício de programação, mantenha um registro de depuração mesmo se o erro for pequeno. O objetivo não é produzir um relatório formal. O objetivo é praticar pensamento baseado em evidências antes que a frustração assuma.
