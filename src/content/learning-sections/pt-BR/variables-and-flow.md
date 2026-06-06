# Variaveis e Fluxo

Uma variavel e um nome para um valor em um momento especifico de um programa. Essa ultima parte e importante: em um momento especifico. Iniciantes muitas vezes leem codigo como se todas as linhas estivessem visiveis ao mesmo tempo e cada variavel tivesse um significado permanente. Um programa em execucao e diferente. Ele passa por instrucoes em ordem, escolhe caminhos, repete lacos e muda valores armazenados. Aprender a acompanhar esse movimento e uma das habilidades mais uteis no inicio da programacao.

Imagine um objetivo simples: contar de 1 a 5 e manter um total acumulado. A variavel `count` pode comecar em 1, enquanto `total` comeca em 0. Depois da primeira passagem, `total` vira 1. Depois da segunda, `count` vira 2 e `total` vira 3. Os nomes continuam iguais, mas os valores mudam. Se o estudante apenas le a descricao do laco, o resultado pode parecer misterioso. Se rastreia os valores, o laco vira uma sequencia visivel.

| Passo | count | total | O que aconteceu |
| --- | --- | --- | --- |
| Inicio | 1 | 0 | Valores iniciais |
| Passagem 1 | 1 | 1 | Soma count ao total |
| Passagem 2 | 2 | 3 | Aumenta count e soma de novo |
| Passagem 3 | 3 | 6 | Continua enquanto a regra e verdadeira |
| Passagem 4 | 4 | 10 | Total cresce |
| Passagem 5 | 5 | 15 | Ultimo valor permitido |

Esse tipo de tabela se chama rastreamento. Ele parece lento no comeco, mas ensina como o fluxo do programa realmente funciona. Voce nao precisa de uma ferramenta especial para comecar. Um caderno, um arquivo de texto ou comentarios ao lado do codigo podem servir. O objetivo e registrar valores importantes depois de cada linha significativa ou passagem do laco. Quando um resultado esta errado, o rastreamento normalmente mostra o primeiro momento em que a realidade se separou da expectativa.

Condicoes sao a segunda parte do fluxo. Uma condicao e uma pergunta de sim ou nao que o programa responde enquanto roda. "A media e maior ou igual a sete?" e uma condicao. "O contador chegou a cinco?" tambem. Boas condicoes devem ser lidas como perguntas, nao como pontuacao. Se a resposta for sim, um caminho roda. Se for nao, outro caminho roda ou o bloco atual e ignorado.

Lacos adicionam repeticao. Um laco precisa de tres ideias: onde comeca, o que muda a cada vez e por que para. Esquecer qualquer uma delas cria erros comuns de iniciantes. Se o valor inicial estiver errado, o laco pode pular trabalho util. Se nada mudar, talvez nunca pare. Se a regra de parada estiver errada, pode rodar uma vez a mais ou a menos. Esses erros nao sao sinais de fracasso; eles sao exatamente o motivo pelo qual rastrear e util.

O [tutorial de Python sobre fluxo de controle](https://docs.python.org/3/tutorial/controlflow.html) traz exemplos legiveis de condicoes e lacos, mesmo que sua disciplina use outra linguagem. O [guia da MDN sobre lacos e iteracao em JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) ajuda a ver as mesmas ideias em uma linguagem da web. A sintaxe muda, mas o padrao de raciocinio e compartilhado: valores mudam, condicoes escolhem, lacos repetem.

Ao ler um programa, pare em cada atribuicao e pergunte: "Que valor este nome guarda agora?" Pare em cada condicao e pergunte: "Qual ramo roda para o meu exemplo?" Pare em cada laco e pergunte: "O que mudou, e a regra de parada esta mais perto?" Se nao conseguir responder, escreva uma tabela de rastreamento. Nao espere o programa quebrar. Rastrear antes de rodar codigo e uma forma forte de prever comportamento.

Isso tambem ajuda quando o codigo usa funcoes. Uma chamada de funcao pode ser tratada como um fluxo menor: recebe argumentos, cria valores locais, segue condicoes ou lacos e devolve um resultado. Iniciantes as vezes se perdem porque a funcao esconde detalhes atras de um nome. Anote os argumentos que entram e o valor que sai. Esse pequeno habito transforma a funcao de caixa-preta em uma parte previsivel do programa.

## Rotina de pratica

Escolha um laco com duas variaveis. Antes de roda-lo, crie uma tabela com uma linha para cada passagem esperada. Preencha os valores a mao. Depois rode o programa e compare a saida real. Se a saida for diferente, marque a primeira linha em que sua previsao e o programa discordam.

## O que fazer depois

Rastreie um laco curto de contagem, depois altere o valor inicial ou a regra de parada. Preveja o novo resultado antes de rodar. Isso constroi confianca de que voce entende o fluxo, nao apenas o exemplo original.
