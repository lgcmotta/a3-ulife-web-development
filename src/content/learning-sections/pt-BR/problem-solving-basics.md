# Bases da Resolução de Problemas

Iniciantes em programação muitas vezes acreditam que a parte difícil começa quando a primeira linha de código é escrita. Diogenes discordaria. A dificuldade costuma aparecer alguns minutos antes, quando o exercício ainda é uma pequena história em linguagem natural e o estudante ainda não decidiu o que o programa recebe, o que deve produzir e quais passos ligam esses dois pontos. Um plano claro não torna a sintaxe desnecessária, mas dá à sintaxe um trabalho definido.

Comece lendo o exercício como se fosse explicá-lo a um colega. Não procure imediatamente laços, variáveis ou funções. Primeiro pergunte: que informação chega de fora do programa? Qual resposta final o programa deve mostrar ou devolver? Quais regras limitam essa resposta? Uma calculadora de média de notas, por exemplo, pode receber três notas, calcular a média aritmética e imprimir uma mensagem como "aprovado" apenas quando a média alcança o limite exigido. Antes de existir código, o estudante já pode descrever entradas, saída, cálculo e regra de decisão.

| Pergunta de planejamento | O que anotar | Exemplo para média de notas |
| --- | --- | --- |
| O que entra? | Valores que o programa precisa receber | Três notas numéricas |
| O que sai? | Resultado que usuário ou chamada precisam | Média e mensagem de aprovação |
| Quais regras se aplicam? | Restrições, limites ou casos especiais | Média para passar e 7.0 |
| O que posso testar a mão? | Um exemplo pequeno com resultado esperado | 8, 7, 6 produz média 7 |

Depois disso, escreva um plano curto em passos ordenados. Mantenha os passos simples: "ler as três notas", "somar as notas", "dividir por três", "comparar a média com sete", "mostrar o resultado". Esse plano ainda não é pseudocódigo. Ele é uma ponte entre o enunciado e o código. Se um passo parecer vago, isso é evidência útil. "Processar a nota" é vago porque esconde se o programa deve somar, dividir, comparar, arredondar ou exibir.

Uma rotina útil para iniciantes é o padrão entrada-saída-passos-exemplo:

1. Nomeie as entradas.
2. Nomeie a saída.
3. Liste os passos em ordem.
4. Resolva um exemplo à mão.
5. Só então escolha a sintaxe.

O exemplo à mão importa porque cria um alvo. Se você calcula que 8, 7 e 6 devem produzir 7.0 e "aprovado", seu programa tem algo concreto para comparar. Quando o programa produz 21, você sabe que a soma aconteceu, mas a divisão não. Quando produz "aprovado" para média 5, a regra de comparação está errada. Isso transforma depuração em comparação, não em chute.

Esse hábito também melhora a comunicação. Se você pede ajuda dizendo "minhas entradas são três notas, minha média esperada é 7, mas meu programa imprime 21", a pessoa pode focar na operação que falta. Se você diz apenas "meu código não funciona", a pessoa precisa reconstruir o problema inteiro antes de ajudar. Boas perguntas costumam começar com bons planos.

Para praticar mais, a [introdução da Khan Academy a algoritmos](https://www.khanacademy.org/computing/computer-science/algorithms) mostra como procedimentos passo a passo podem ser descritos antes da implementação. O [glossário da MDN sobre algoritmo](https://developer.mozilla.org/en-US/docs/Glossary/Algorithm) também lembra que um programa é construído ao redor de um conjunto finito de instruções para resolver um problema.

Quando os exercícios ficarem maiores, mantenha a mesma estrutura e divida o trabalho em partes menores. Um carrinho de compras pode precisar de subtotal, regra de desconto, regra de imposto e mensagem final. Cada parte pode ter suas próprias entradas, saída e exemplo conferido à mão. Você não está tentando projetar um sistema perfeito logo no início. Está tornando a próxima linha de raciocínio visível o bastante para confiar nela.

## Rotina de prática

Escolha um exercício pequeno e não programe por cinco minutos. Escreva entrada, saída, regras e um exemplo. Depois mostre o plano a um colega ou leia em voz alta. Se o plano puder ser entendido sem o texto do enunciado, provavelmente está claro o suficiente para começar a codificar. Se não, revise o plano antes de abrir o editor.

## O que fazer depois

Pegue a calculadora de média de notas e escreva dois exemplos: um de aprovação e um de reprovação. Mantenha-os ao lado enquanto programa. Quando o programa rodar, compare a saída com esses exemplos antes de mudar qualquer outra coisa.
