# Habitos de Depuracao

Depurar nao e punicao por escrever codigo imperfeito. E trabalho normal de programacao. Todo programador, de um estudante do primeiro semestre a uma pessoa experiente, passa tempo comparando o que esperava com o que aconteceu de fato. A diferenca e que programadores experientes geralmente seguem uma rotina. Eles nao mudam cinco coisas ao acaso esperando que o problema desapareca. Eles desaceleram, coletam evidencias e testam uma ideia por vez.

O primeiro habito e reproduzir o problema. Se um programa falha apenas as vezes, anote a entrada, a acao ou o estado da pagina que causa a falha. "Quebrou ontem" e dificil de investigar. "Quebra quando a lista de notas esta vazia" e util. A reproducao cria um ponto de partida estavel. Sem ela, voce pode achar que uma mudanca corrigiu o erro quando apenas nao conseguiu disparar o problema novamente.

O segundo habito e escrever a expectativa. Um erro nao e apenas "saida ruim"; e uma diferenca entre comportamento esperado e comportamento real. Por exemplo: "Eu esperava que a media de 8, 7 e 6 fosse 7, mas o programa imprimiu 21." Essa frase ja aponta para a divisao ausente. Se a frase for "Eu esperava que o estudante fosse aprovado, mas o programa imprimiu reprovado", a area provavel e a condicao ou o limite. Expectativas claras tornam pistas mais faceis de enxergar.

| Passo de depuracao | Pergunta | Exemplo de nota |
| --- | --- | --- |
| Reproduzir | Qual acao exata causa o problema? | Inserir notas 8, 7, 6 |
| Esperar | O que deveria acontecer? | A media deveria ser 7 |
| Observar | O que aconteceu de fato? | O programa imprime 21 |
| Levantar hipotese | O que pode explicar a diferenca? | A soma nao foi dividida por 3 |
| Testar | Que unica mudanca verifica a ideia? | Dividir antes de imprimir |

O terceiro habito e ler mensagens com cuidado. Mensagens de erro frequentemente incluem arquivo, linha e tipo de problema. Elas podem parecer intimidantes, mas costumam ser mais especificas do que parecem. Um erro de sintaxe diz que o programa nao entendeu o codigo. Um erro de referencia diz que um nome foi usado incorretamente ou cedo demais. Um erro de tipo diz que um valor foi usado de uma forma que nao combina com o que ele e. A [referencia de erros JavaScript da MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) e util para aprender padroes comuns de mensagens, e a documentacao da linguagem da sua disciplina tera referencias semelhantes.

O quarto habito e mudar uma coisa por vez. Se voce renomeia uma variavel, muda uma condicao, move um laco e adiciona um `print` ao mesmo tempo, nao sabera qual mudanca importou. Uma mudanca unica e focada pode parecer mais lenta, mas protege o entendimento. Depois de cada mudanca, rode o mesmo caso de reproducao. Se o resultado mudar, registre o que mudou. Se nao mudar, desfaça ou revise a hipotese.

Prints, logs e depuradores sao ferramentas para observar estado. Um `print` simples pode mostrar o valor de uma variavel em um ponto importante. Um depurador pode pausar a execucao e permitir inspeção passo a passo. A ferramenta importa menos do que a pergunta que voce faz com ela. "Qual e o valor de `total` depois do laco?" e uma boa pergunta. "Talvez algo esteja errado em algum lugar" e amplo demais. O [guia de depuracao do Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/) mostra como a inspecao passo a passo funciona em JavaScript no navegador, e a mesma ideia existe em muitos editores.

Mantenha um registro curto quando estiver travado. Ele pode ser tao simples quanto tres colunas: observacao, hipotese, resultado. Isso evita voltar a mesma ideia que ja falhou e fornece material para pedir ajuda. Um professor ou monitor responde muito mais rapido quando ve o que voce tentou e o que aconteceu.

Por fim, confirme a correcao. Rode novamente o caso que falhava. Depois rode um caso proximo que ainda deveria funcionar. Se corrigiu um calculo de media, teste um caso normal de aprovacao e um de reprovacao. Erros podem se esconder quando uma mudanca conserta uma entrada e quebra outra.

## Rotina de pratica

Pegue um programa pequeno quebrado e resista a edita-lo imediatamente. Escreva o resultado esperado, o resultado real e uma hipotese. Adicione apenas uma ferramenta de observacao, como um `print` ou ponto de parada. Depois de testar, decida se a evidencia apoia a hipotese.

## O que fazer depois

No proximo exercicio de programacao, mantenha um registro de depuracao mesmo se o erro for pequeno. O objetivo nao e produzir um relatorio formal. O objetivo e praticar pensamento baseado em evidencias antes que a frustracao assuma.
