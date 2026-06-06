# Variáveis e Fluxo

Uma variável é um nome para um valor em um momento específico de um programa. Essa última parte é importante: em um momento específico. Iniciantes muitas vezes leem código como se todas as linhas estivessem visíveis ao mesmo tempo e cada variável tivesse um significado permanente. Um programa em execução é diferente. Ele passa por instruções em ordem, escolhe caminhos, repete laços e muda valores armazenados. Aprender a acompanhar esse movimento é uma das habilidades mais úteis no início da programação.

Imagine um objetivo simples: contar de 1 a 5 e manter um total acumulado. A variável `count` pode começar em 1, enquanto `total` começa em 0. Depois da primeira passagem, `total` vira 1. Depois da segunda, `count` vira 2 e `total` vira 3. Os nomes continuam iguais, mas os valores mudam. Se o estudante apenas lê a descrição do laço, o resultado pode parecer misterioso. Se rastreia os valores, o laço vira uma sequência visível.

| Passo | count | total | O que aconteceu |
| --- | --- | --- | --- |
| Início | 1 | 0 | Valores iniciais |
| Passagem 1 | 1 | 1 | Soma count ao total |
| Passagem 2 | 2 | 3 | Aumenta count e soma de novo |
| Passagem 3 | 3 | 6 | Continua enquanto a regra é verdadeira |
| Passagem 4 | 4 | 10 | Total cresce |
| Passagem 5 | 5 | 15 | Último valor permitido |

Esse tipo de tabela se chama rastreamento. Ele parece lento no começo, mas ensina como o fluxo do programa realmente funciona. Você não precisa de uma ferramenta especial para começar. Um caderno, um arquivo de texto ou comentários ao lado do código podem servir. O objetivo é registrar valores importantes depois de cada linha significativa ou passagem do laço. Quando um resultado está errado, o rastreamento normalmente mostra o primeiro momento em que a realidade se separou da expectativa.

Condições são a segunda parte do fluxo. Uma condição é uma pergunta de sim ou não que o programa responde enquanto roda. "A média é maior ou igual a sete?" é uma condição. "O contador chegou a cinco?" também. Boas condições devem ser lidas como perguntas, não como pontuação. Se a resposta for sim, um caminho roda. Se for não, outro caminho roda ou o bloco atual é ignorado.

Laços adicionam repetição. Um laço precisa de três ideias: onde começa, o que muda a cada vez e por que para. Esquecer qualquer uma delas cria erros comuns de iniciantes. Se o valor inicial estiver errado, o laço pode pular trabalho útil. Se nada mudar, talvez nunca pare. Se a regra de parada estiver errada, pode rodar uma vez a mais ou a menos. Esses erros não são sinais de fracasso; eles são exatamente o motivo pelo qual rastrear é útil.

O [tutorial de Python sobre fluxo de controle](https://docs.python.org/3/tutorial/controlflow.html) traz exemplos legíveis de condições e laços, mesmo que sua disciplina use outra linguagem. O [guia da MDN sobre laços e iteração em JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) ajuda a ver as mesmas ideias em uma linguagem da web. A sintaxe muda, mas o padrão de raciocínio é compartilhado: valores mudam, condições escolhem, laços repetem.

Ao ler um programa, pare em cada atribuição e pergunte: "Que valor este nome guarda agora?" Pare em cada condição e pergunte: "Qual ramo roda para o meu exemplo?" Pare em cada laço e pergunte: "O que mudou, e a regra de parada está mais perto?" Se não conseguir responder, escreva uma tabela de rastreamento. Não espere o programa quebrar. Rastrear antes de rodar código é uma forma forte de prever comportamento.

Isso também ajuda quando o código usa funções. Uma chamada de função pode ser tratada como um fluxo menor: recebe argumentos, cria valores locais, segue condições ou laços e devolve um resultado. Iniciantes às vezes se perdem porque a função esconde detalhes atrás de um nome. Anote os argumentos que entram e o valor que sai. Esse pequeno hábito transforma a função de caixa-preta em uma parte previsível do programa.

## Rotina de prática

Escolha um laço com duas variáveis. Antes de rodá-lo, crie uma tabela com uma linha para cada passagem esperada. Preencha os valores à mão. Depois rode o programa e compare a saída real. Se a saída for diferente, marque a primeira linha em que sua previsão e o programa discordam.

## O que fazer depois

Rastreie um laço curto de contagem, depois altere o valor inicial ou a regra de parada. Preveja o novo resultado antes de rodar. Isso constrói confiança de que você entende o fluxo, não apenas o exemplo original.
