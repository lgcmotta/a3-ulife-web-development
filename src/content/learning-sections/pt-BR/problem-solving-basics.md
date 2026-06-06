# Bases da Resolucao de Problemas

Iniciantes em programacao muitas vezes acreditam que a parte dificil comeca quando a primeira linha de codigo e escrita. Diogenes discordaria. A dificuldade costuma aparecer alguns minutos antes, quando o exercicio ainda e uma pequena historia em linguagem natural e o estudante ainda nao decidiu o que o programa recebe, o que deve produzir e quais passos ligam esses dois pontos. Um plano claro nao torna a sintaxe desnecessaria, mas da a sintaxe um trabalho definido.

Comece lendo o exercicio como se fosse explica-lo a um colega. Nao procure imediatamente lacos, variaveis ou funcoes. Primeiro pergunte: que informacao chega de fora do programa? Qual resposta final o programa deve mostrar ou devolver? Quais regras limitam essa resposta? Uma calculadora de media de notas, por exemplo, pode receber tres notas, calcular a media aritmetica e imprimir uma mensagem como "aprovado" apenas quando a media alcanca o limite exigido. Antes de existir codigo, o estudante ja pode descrever entradas, saida, calculo e regra de decisao.

| Pergunta de planejamento | O que anotar | Exemplo para media de notas |
| --- | --- | --- |
| O que entra? | Valores que o programa precisa receber | Tres notas numericas |
| O que sai? | Resultado que usuario ou chamada precisam | Media e mensagem de aprovacao |
| Quais regras se aplicam? | Restricoes, limites ou casos especiais | Media para passar e 7.0 |
| O que posso testar a mao? | Um exemplo pequeno com resultado esperado | 8, 7, 6 produz media 7 |

Depois disso, escreva um plano curto em passos ordenados. Mantenha os passos simples: "ler as tres notas", "somar as notas", "dividir por tres", "comparar a media com sete", "mostrar o resultado". Esse plano ainda nao e pseudocodigo. Ele e uma ponte entre o enunciado e o codigo. Se um passo parecer vago, isso e evidencia util. "Processar a nota" e vago porque esconde se o programa deve somar, dividir, comparar, arredondar ou exibir.

Uma rotina util para iniciantes e o padrao entrada-saida-passos-exemplo:

1. Nomeie as entradas.
2. Nomeie a saida.
3. Liste os passos em ordem.
4. Resolva um exemplo a mao.
5. So entao escolha a sintaxe.

O exemplo a mao importa porque cria um alvo. Se voce calcula que 8, 7 e 6 devem produzir 7.0 e "aprovado", seu programa tem algo concreto para comparar. Quando o programa produz 21, voce sabe que a soma aconteceu, mas a divisao nao. Quando produz "aprovado" para media 5, a regra de comparacao esta errada. Isso transforma depuracao em comparacao, nao em chute.

Esse habito tambem melhora a comunicacao. Se voce pede ajuda dizendo "minhas entradas sao tres notas, minha media esperada e 7, mas meu programa imprime 21", a pessoa pode focar na operacao que falta. Se voce diz apenas "meu codigo nao funciona", a pessoa precisa reconstruir o problema inteiro antes de ajudar. Boas perguntas costumam comecar com bons planos.

Para praticar mais, a [introducao da Khan Academy a algoritmos](https://www.khanacademy.org/computing/computer-science/algorithms) mostra como procedimentos passo a passo podem ser descritos antes da implementacao. O [glossario da MDN sobre algoritmo](https://developer.mozilla.org/en-US/docs/Glossary/Algorithm) tambem lembra que um programa e construido ao redor de um conjunto finito de instrucoes para resolver um problema.

Quando os exercicios ficarem maiores, mantenha a mesma estrutura e divida o trabalho em partes menores. Um carrinho de compras pode precisar de subtotal, regra de desconto, regra de imposto e mensagem final. Cada parte pode ter suas proprias entradas, saida e exemplo conferido a mao. Voce nao esta tentando projetar um sistema perfeito logo no inicio. Esta tornando a proxima linha de raciocinio visivel o bastante para confiar nela.

## Rotina de pratica

Escolha um exercicio pequeno e nao programe por cinco minutos. Escreva entrada, saida, regras e um exemplo. Depois mostre o plano a um colega ou leia em voz alta. Se o plano puder ser entendido sem o texto do enunciado, provavelmente esta claro o suficiente para comecar a codificar. Se nao, revise o plano antes de abrir o editor.

## O que fazer depois

Pegue a calculadora de media de notas e escreva dois exemplos: um de aprovacao e um de reprovacao. Mantenha-os ao lado enquanto programa. Quando o programa rodar, compare a saida com esses exemplos antes de mudar qualquer outra coisa.
