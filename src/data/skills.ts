import { Skill } from '../types'

const Skills: Array<Skill> = [
  {
    name: 'Acrobacia',
    attribute: 'AGI',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: true,
    description: '<p>Você consegue fazer proezas acrobáticas.</p><p><span>Amortecer Queda (Veterano, DT 15).</span> Quando cai, você pode gastar uma reação e fazer um teste de Acrobacia para reduzir o dano. Se passar, reduz o dano da queda em 1d6, mais 1d6 para cada 5 pontos pelos quais o resultado do teste exceder a DT. Se reduzir o dano a zero, você cai de pé.</p><p><span>Equilíbrio.</span> Se estiver andando por superfícies precárias, você precisa fazer testes de Acrobacia para não cair. Cada ação de movimento exige um teste. Se passar, você avança metade do seu deslocamento. Se falhar, não avança. Se falhar por 5 ou mais, cai. A DT é 10 para piso escorregadio, 15 para uma superfície estreita (como o topo de um muro) e 20 para uma superfície muito estreita (como uma corda esticada). Você pode sofrer –5 no teste para avançar seu deslocamento total. Quando está se equilibrando você fica desprevenido e, se sofrer dano, deve fazer um novo teste de Acrobacia; se falhar, cai.</p><p><span>Escapar.</span> Você pode escapar de amarras. A DT é igual ao resultado do teste de Agilidade de quem o amarrou +10, se você estiver preso por cordas, ou 30, se você estiver preso por algemas. Este uso gasta uma ação completa.</p><p><span>Levantar-se Rapidamente (Treinado, DT 20).</span> Se estiver caído, você pode fazer um teste de Acrobacia para ficar de pé. Você precisa ter uma ação de movimento disponível. Se passar no teste, se levanta como uma ação livre. Se falhar, gasta sua ação de movimento, mas continua caído.</p><p><span>Passar por Espaço Apertado (Treinado, DT 25).</span> Você pode se espremer por lugares estreitos, por onde apenas sua cabeça normalmente passaria. Você gasta uma ação completa e avança metade do deslocamento.</p><p><span>Passar por Inimigo.</span> Você pode atravessar um espaço ocupado por um inimigo como parte de seu movimento. Faça um teste de Acrobacia oposto ao teste de Acrobacia, Iniciativa ou Luta do oponente (o que for melhor). Se você passar, atravessa o espaço; se falhar, não atravessa e sua ação de movimento termina. Um espaço ocupado por um inimigo conta como terreno difícil.</p>'
  },
  {
    name: 'Adestramento',
    attribute: 'PRE',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: false,
    description: '<p>Você sabe lidar com animais.</p><p><span>Acalmar Animal (DT 25).</span> Você acalma um animal nervoso ou agressivo. Isso permite a você controlar um touro furioso ou convencer um cão de guarda a não atacá-lo. Este uso gasta uma ação completa.</p><p><span>Cavalgar.</span> Você pode andar à cavalo. Montar exige uma ação de movimento, mas você pode montar como uma ação livre com um teste de Adestramento contra DT 20 (porém, se falhar por 5 ou mais, cai no chão).</p><p>Andar em terreno plano não exige testes, mas passar por obstáculos ou andar em terreno acidentado, sim. A DT é 15 para obstáculos pequenos ou terreno ruim (estrada esburacada) e 20 para obstáculos grandes ou terreno muito ruim (floresta à noite). Se você falhar, cai da montaria e sofre 1d6 pontos de dano. Cavalgar é parte de seu movimento e não exige uma ação.</p><p>Se estiver à cavalo, você pode galopar. Gaste uma ação completa e faça um teste de Adestramento. Você avança um número de quadrados de 1,5m igual ao seu deslocamento (modificado pela montaria) mais o resultado do teste. Você só pode galopar em linha reta e não pode galopar em terreno difícil.</p><p><span>Manejar Animal (DT 15).</span> Você faz um animal realizar uma tarefa para a qual foi treinado. Isso permite usar Adestramento como Pilotagem para veículos de tração animal, como carroças. Este uso gasta uma ação de movimento.</p>'
  },
  {
    name: 'Artes',
    attribute: 'PRE',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: false,
    description: '<p>Você sabe se expressar com diversas formas de arte, como música, dança, escrita, pintura, atuação e outras.</p><p><span>Impressionar.</span> Faça um teste de Artes oposto pelo teste de Vontade de quem você está tentando impressionar. Se você passar, recebe +2 em testes de perícia baseadas em Presença contra essa pessoa no mesmo dia. Se falhar, sofre –2 nesses testes, e não pode tentar de novo no mesmo dia. Se estiver tentando impressionar mais de uma pessoa, o mestre faz apenas um teste pela plateia toda, usando o melhor bônus. Este uso leva de alguns minutos (música ou dança) até algumas horas (apresentação de teatro).</p>'
  },
  {
    name: 'Atletismo',
    attribute: 'FOR',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você pode realizar façanhas atléticas.</p><p><span>Corrida.</span> Gaste uma ação completa e faça um teste de Atletismo. Você avança um número de quadrados de 1,5m igual ao seu deslocamento mais o resultado do teste. Por exemplo, se você tem deslocamento 9m (6 quadrados) e tira 15 no teste, avança 21 quadrados. Você só pode correr em linha reta e não pode correr em terreno difícil. Você pode correr por um número de rodadas igual ao seu Vigor. Após isso, deve fazer um teste de Fortitude por rodada (DT 5 + 5 por teste anterior). Se falhar, fica fatigado.</p><p><span>Escalar.</span> Gaste uma ação de movimento e faça um teste de Atletismo. Se passar, você avança metade do seu deslocamento. Se falhar, não avança. Se falhar por 5 ou mais, você cai. A DT é 10 para superfícies com apoios para os pés e mãos (como um barranco com raízes), 15 para um portão ou árvore, 20 para um muro ou parede com reentrâncias e 25 para um muro ou parede liso (como um prédio). Você pode sofrer –5 no teste para avançar seu deslocamento total. Quando está escalando você fica desprevenido e, se sofrer dano, deve fazer um novo teste de Atletismo; se falhar, você cai. Se um personagem adjacente a você estiver escalando e cair, você pode tentar pegá-lo. Faça um teste de Atletismo contra a DT da superfície +5. Se passar, você segura o personagem. Se falhar por 5 ou mais, você também cai!</p><p><span>Natação.</span> Se estiver na água, você precisa gastar uma ação de movimento e fazer um teste de Atletismo por rodada para não afundar. A DT é 10 para água calma, 15 para agitada e 20 ou mais para tempestuosa. Se passar, você pode avançar metade de seu deslocamento. Se falhar, consegue boiar, mas não avançar. Se falhar por 5 ou mais, você afunda. Se quiser avançar mais, você pode gastar uma segunda ação de movimento na mesma rodada para outro teste de Atletismo. Se você estiver submerso (seja por ter falhado no teste de Atletismo, seja por ter mergulhado de propósito), deve prender a respiração. Você pode prender a respiração por um número de rodadas igual ao seu Vigor. Após isso, deve fazer um teste de Fortitude por rodada (DT 5 + 5 por teste anterior). Se falhar, se afoga (é reduzido a 0 pontos de vida) e poderá morrer. Você sofre penalidade de carga em testes de natação.</p><p><span>Saltar.</span> Você pode pular sobre buracos ou obstáculos ou alcançar algo elevado. Para um salto longo, a DT é 5 por quadrado de 1,5m (DT 10 para 3m, 15 para 4,5m, 20 para 6m e assim por diante). Para um salto em altura, a DT é 15 por quadrado de 1,5m (30 para 3m). Você deve ter pelo menos 6m para correr e pegar impulso (sem esse espaço, a DT aumenta em +5). Saltar é parte de seu movimento e não exige uma ação.</p>'
  },
  {
    name: 'Atualidades',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você é um conhecedor de assuntos gerais, como política, esporte e entretenimento, e pode responder dúvidas relativas a esses assuntos. A DT é 15 para informações comuns, como o nome do autor de um livro, 20 para informações específicas, como a história do fundador de uma empresa, e 25 para informações quase desconhecidas, como uma lenda urbana já esquecida.</p>'
  },
  {
    name: 'Ciências',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: false,
    description: '<p>Você estudou diversos campos científicos, como matemática, física, química e biologia, e pode responder dúvidas relativas a esses assuntos. Questões simples, como a composição química de uma substância conhecida, não exigem teste. Questões complexas, como detalhes sobre o funcionamento de um procedimento científico específico, exigem um teste contra DT 20. Por fim, questões envolvendo campos experimentais, como avaliar a capacidade de proteção de uma liga metálica recém-criada, exigem um teste contra DT 30.</p>'
  },
  {
    name: 'Crime',
    attribute: 'AGI',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: true,
    description: '<p>Você sabe exercer atividades ilícitas.</p><p><span>Arrombar.</span> Você abre uma fechadura trancada. A DT é 20 para fechaduras comuns (porta de um apartamento), 25 para fechaduras reforçadas (porta de uma loja) e 30 para fechaduras avançadas (cofre de um banco). Este uso gasta uma ação completa.</p><p><span>Furto (DT 20).</span> Você pega um objeto de outra pessoa (ou planta um objeto nas posses dela). Gaste uma ação padrão e faça um teste de Crime. Se passar, você pega (ou coloca) o que queria. A vítima tem direito a um teste de Percepção (DT igual ao resultado de seu teste de Crime). Se passar, ela percebe sua tentativa, tenha você conseguido ou não</p><p><span>Ocultar.</span> Você esconde um objeto em você mesmo. Gaste uma ação padrão e faça um teste de Crime oposto pelo teste de Percepção de qualquer um que possa vê-lo. Se uma pessoa revistar você, recebe +10 no teste de Percepção.</p><p><span>Sabotar (Veterano).</span> Você desabilita um dispositivo. Uma ação simples, como desativar um alarme, tem DT 20. Uma ação complexa, como sabotar uma pistola para que exploda quando disparada, tem DT 30. Se você falhar por 5 ou mais, algo sai errado (o alarme dispara, você acha que a arma está sabotada, mas na verdade ainda funciona...). Este uso gasta 1d4+1 ações completas. Você pode sofrer uma penalidade de –5 em seu teste para fazê-lo como uma ação completa.</p><p>Os usos arrombar e sabotar exigem um kit de ladrão. Sem ele, você sofre –5 no teste.</p>'
  },
  {
    name: 'Diplomacia',
    attribute: 'PRE',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você convence pessoas com lábia e argumentação.</p><p><span>Acalmar (treinado, DT 20).</span> Você estabiliza um personagem adjacente que esteja enlouquecendo, fazendo com que ele fique com Sanidade 1. A DT aumenta em +5 para cada vez que ele tiver sido acalmado na cena. Este uso gasta uma ação padrão.</p><p><span>Mudar Atitude.</span> Você muda a categoria de atitude de um NPC em relação a você ou a outra pessoa (veja a página ao lado para a explicação das categorias de atitude). Faça um teste de Diplomacia oposto pelo teste de Vontade do alvo. Se você passar, muda a atitude dele em uma categoria para cima ou para baixo, à sua escolha. Se passar por 10 ou mais, muda a atitude em até duas categorias. Se falhar por 5 ou mais, a atitude do alvo muda uma categoria na direção oposta. Este uso gasta um minuto. Você pode sofrer –10 no teste para fazê-lo como uma ação completa (para evitar uma briga, por exemplo). Você só pode mudar a atitude de uma mesma pessoa uma vez por dia.</p><p><span>Persuasão (DT 20).</span> Você convence uma pessoa a fazer alguma coisa, como responder a uma pergunta ou prestar um favor. Se essa coisa for custosa (como emprestar um carro) você sofre –5 em seu teste. Se for perigosa (como cometer um crime) você sofre –10 ou falha automaticamente. De acordo com o mestre, seu teste pode ser oposto ao teste de Vontade da pessoa. Este uso gasta um minuto ou mais, de acordo com o mestre.</p>'
  },
  {
    name: 'Enganação',
    attribute: 'PRE',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você manipula pessoas com blefes e trapaças.</p><p><span>Disfarce (Treinado).</span> Você muda sua aparência ou a de outra pessoa. Faça um teste de Enganação oposto pelo teste de Percepção de quem prestar atenção no disfarçado. Se você passar, a pessoa acredita no disfarce; caso contrário, percebe que há algo errado. Se o disfarce é de uma pessoa específica, aqueles que conhecem essa pessoa recebem +10 no teste de Percepção. Um disfarce exige pelo menos dez minutos e um kit de disfarces. Sem ele, você sofre –5 no teste.</p><p><span>Falsificação (Veterano).</span> Você falsifica um documento. Faça um teste de Enganação oposto pelo teste de Percepção de quem examinar o documento. Se você passar, a pessoa acredita que ele é válido; caso contrário, percebe que é falso. Se o documento é muito complexo, ou inclui uma assinatura ou carimbo específico, você sofre –10 no teste.</p><p><span>Fintar (Treinado).</span> Você pode gastar uma ação padrão e fazer um teste de Enganação oposto a um teste de Reflexos de um ser em alcance curto. Se você passar, ele fica desprevenido contra seu próximo ataque, se realizado até o fim de seu próximo turno.</p><p><span>Insinuação (DT 20).</span> Você fala algo para alguém sem que outras pessoas entendam do que você está falando. Se você passar, o receptor entende sua mensagem. Se falhar por 5 ou mais, entende algo diferente do que você queria. Outras pessoas podem fazer um teste de Intuição oposto ao seu teste de Enganação. Se passarem, entendem o que você está dizendo.</p><p><span>Intriga (DT 20).</span> Você espalha uma fofoca. Por exemplo, pode dizer que o dono do bar está aguando a cerveja para enfurecer o povo contra ele. Intrigas muito improváveis (convencer o povo que o delegado é um ET que está abduzindo as pessoas) têm DT 30. Este uso exige pelo menos um dia, mas pode levar mais tempo, de acordo com o mestre. Uma pessoa pode investigar a fonte da fofoca e chegar até você. Isso exige um teste de Investigação por parte dela, com DT igual ao resultado do seu teste para a intriga.</p><p><span>Mentir.</span> Você faz uma pessoa acreditar em algo que não é verdade. Seu teste é oposto pelo teste de Intuição da vítima. Mentiras muito implausíveis impõem uma penalidade de –10 em seu teste (“Por que estou com o crachá do chefe de segurança? Ora, porque ele deixou cair e estou indo devolver!”).</p>'
  },
  {
    name: 'Fortitude',
    attribute: 'VIG',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você usa esta perícia para testes de resistência contra efeitos que exigem vitalidade, como doenças e venenos. A DT é determina pelo efeito. Você também usa Fortitude para manter seu fôlego quando está correndo ou sem respirar. A DT é 5 +5 por teste anterior (veja a perícia Atletismo para mais detalhes).</p>'
  },
  {
    name: 'Furtividade',
    attribute: 'AGI',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: true,
    description: '<p>Você sabe ser discreto e sorrateiro.</p><p><span>Esconder-se.</span> Faça um teste de Furtividade oposto pelos testes de Percepção de qualquer um que possa notá-lo. Todos que falharem não conseguem percebê-lo (você tem camuflagem total contra eles). Esconder-se é uma ação livre que você só pode fazer no final do seu turno e apenas se terminar seu turno em um lugar onde seja possível se esconder (atrás de uma porta, num quarto escuro, numa mata densa, no meio de uma multidão...). Se tiver se movido durante o turno, você sofre –1d20 no teste (você pode se mover à metade do deslocamento normal para não sofrer essa penalidade). Se tiver atacado ou feito outra ação muito chamativa, sofre –3d20.</p><p><span>Seguir.</span> Faça um teste de Furtividade oposto ao teste de Percepção da pessoa sendo seguida. Você sofre –5 se estiver em um lugar sem esconderijos ou sem movimento, como um descampado ou rua deserta. A vítima recebe +5 em seu teste de Percepção se estiver tomando precauções para não ser seguida (como olhar para trás de vez em quando). Se você passar, segue a pessoa até ela chegar ao seu destino. Se falhar, a pessoa o percebe na metade do caminho.</p>'
  },
  {
    name: 'Iniciativa',
    attribute: 'AGI',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Esta perícia determina sua velocidade de reação. Quando uma cena de ação começa, cada personagem envolvido faz um teste de Iniciativa. Eles então agem em ordem decrescente dos resultados.</p>'
  },
  {
    name: 'Intimidação',
    attribute: 'PRE',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você pode assustar ou coagir outras pessoas. Todos os usos de Intimidação são efeitos de medo.</p><p><span>Assustar (treinado).</span> Gaste uma ação padrão e faça um teste de Intimidação oposto pelo teste de Vontade de um ser em alcance curto. Se você passar, ele fica abalado pelo resto da cena (não cumulativo). Se você passar por 10 ou mais, ele fica apavorado por uma rodada e então abalado pelo resto da cena.</p><p><span>Coagir.</span> Faça um teste de Intimidação oposto pelo teste de Vontade de uma pessoa adjacente. Se você passar, ela obedece uma ordem sua (como fazer uma pequena tarefa, deixar que você passe por um lugar que ele estava protegendo etc.). Se você mandar a pessoa fazer algo perigoso ou que vá contra a natureza dela, ela recebe +5 no teste ou passa automaticamente. Este uso gasta um minuto ou mais, de acordo com o mestre, e deixa a pessoa hostil contra você.</p>'
  },
  {
    name: 'Intuição',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Esta perícia mede sua empatia e “sexto sentido”.</p><p><span>Perceber Mentira.</span> Você descobre se alguém está mentindo (veja a perícia Enganação).</p><p><span>Pressentimento (treinado, DT 20).</span> Você analisa uma pessoa, para ter uma ideia de sua índole ou caráter, ou uma situação, para perceber qualquer fato estranho (por exemplo, se os habitantes de uma cidadezinha estão agindo de forma esquisita). Este uso apenas indica se há algo anormal; para descobrir a causa, veja a perícia Investigação.</p>'
  },
  {
    name: 'Investigação',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você sabe como descobrir pistas e informações.</p><p><span>Interrogar.</span> Você descobre informações perguntando ou indo para um lugar movimentado e mantendo os ouvidos atentos. Informações gerais (“Quem é o dono desse restaurante?”) não exigem teste. Informações restritas, que poucas pessoas conhecem (“Quem é o delegado encarregado desse caso?”), têm DT 20. Informações confidenciais, ou que podem colocar em risco quem falar sobre elas, têm DT 30. Este uso gasta desde uma hora até um dia, a critério do mestre.</p><p><span>Procurar.</span> Você examina um local. A DT varia: 15 para um item discreto ou no meio de uma bagunça, mas não necessariamente escondido; 20 para um item escondido (cofre atrás de um quadro, documento no fundo falso de uma gaveta); 30 para um item muito bem escondido (passagem secreta ativada por um botão, documento escrito com tinta invisível). Este uso gasta desde uma ação completa (examinar uma escrivaninha) até um dia (pesquisar uma biblioteca).</p>'
  },
  {
    name: 'Luta',
    attribute: 'FOR',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você usa Luta para fazer ataques corpo a corpo. A DT é a Defesa do alvo. Se você acertar, causa dano de acordo com a arma utilizada.</p>'
  },
  {
    name: 'Medicina',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você sabe tratar ferimentos, doenças e venenos.</p><p><span>Primeiros Socorros (DT 20).</span> Um personagem adjacente que esteja morrendo e inconsciente perde essas condições e fica com 1 PV. A DT aumenta em +5 para cada vez que ele tiver sido estabilizado na cena. Este uso gasta uma ação padrão.</p><p><span>Cuidados Prolongados (Veterano, DT 20).</span> Você trata até uma pessoa por ponto de Intelecto para que elas se recuperem mais rapidamente. Se passar, elas recuperam o dobro dos PV por descanso nesse dia. Este uso leva uma hora.</p><p><span>Necropsia (Treinado, DT 20).</span> Você examina um cadáver para determinar a causa e o momento aproximado da morte. Causas raras ou extraordinárias, como um veneno exótico ou uma maldição, possuem DT +10. Este uso leva dez minutos.</p><p><span>Tratamento (Treinado).</span> Você ajuda a vítima de uma doença ou veneno com efeito contínuo. Gaste uma ação completa e faça um teste contra a DT da doença ou veneno. Se você passar, o paciente recebe +5 em seu próximo teste de Fortitude contra esse efeito.</p><p>Esta perícia exige um kit de medicina. Sem ele, você sofre –5 no teste. Você pode usar a perícia Medicina em si mesmo, mas sofre –5 no teste.</p>'
  },
  {
    name: 'Ocultismo',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: false,
    description: '<p>Você estudou o Paranormal.</p><p><span>Identificar Criatura (DT 20).</span> Você gasta uma ação completa para analisar uma criatura paranormal que possa ver. Se passar, descobre uma característica da criatura, como um poder ou vulnerabilidade. Para cada 5 pontos pelos quais o resultado do teste superar a DT, você descobre outra característica. Se falhar por 5 ou mais, tira uma conclusão errada (por exemplo, acredita que uma criatura é vulnerável à Morte, quando na verdade é vulnerável a Energia).</p><p><span>Identificar Item Amaldiçoado.</span> Você pode gastar uma hora para estudar um item amaldiçoado e identificar seus poderes ou qual ritual o objeto contém. A DT é 20 para itens menores, 25 para médios e 30 para itens maiores. Você pode sofrer –10 no teste para fazê-lo como uma ação completa.</p><p><span>Identificar Ritual (DT 10 +5 por círculo do ritual).</span> Quando alguém lança um ritual, você pode descobrir qual é observando seus gestos, palavras e componentes. Este uso é uma reação.</p><p><span>Informação.</span> Você responde dúvidas relativas ao Outro Lado, objetos amaldiçoados, fenômenos paranormais, runas, profecias,etc. Questões simples não exigem teste. Questões complexas exigem um teste contra DT 20. Por fim, mistérios e enigmas exigem um teste contra DT 30.</p>'
  },
  {
    name: 'Percepção',
    attribute: 'PRE',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você nota coisas usando os sentidos.</p><p><span>Observar.</span> Você vê coisas discretas ou escondidas. A DT varia de 15, para coisas dif íceis de serem vistas (um livro específico em uma estante) a 30, para coisas quase invisíveis (uma gota de sangue em uma folha no meio de uma floresta à noite). Para pessoas ou coisas escondidas, a DT é o resultado do teste de Furtividade ou Crime feito para esconder a pessoa ou ocultar o item. Você também pode perceber disfarces e falsificações (veja a perícia Enganação) e ler lábios (DT 20).</p><p><span>Ouvir.</span> Você escuta barulhos sutis. Uma conversa casual próxima tem DT 0 — ou seja, a menos que exista alguma penalidade, você passa automaticamente. Ouvir pessoas sussurrando tem DT 15. Ouvir do outro lado de uma porta aumenta a DT em +5. Você pode fazer testes de Percepção para ouvir mesmo que esteja dormindo, mas sofre –10 no teste; um sucesso faz você acordar. Perceber seres que não possam ser vistos tem DT 20, ou +10 no teste de Furtividade do ser, o que for maior. Mesmo que você passe no teste, ainda sofre penalidades normais por lutar sem ver o inimigo.</p>'
  },
  {
    name: 'Pilotagem',
    attribute: 'AGI',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: false,
    description: '<p>Você sabe operar veículos terrestres e aquáticos, como motos, carros e lanchas. Pilotar um veículo gasta uma ação de movimento por turno. Situações comuns (dirigir em uma estrada, velejar em clima tranquilo) não exigem teste. Situações ruins (dirigir em uma estrada de chão e sem iluminação, velejar em chuva ou ventania) exigem um teste por turno contra DT 15. Situações terríveis (dirigir em terreno acidentado, velejar durante uma tempestade) exigem um teste por turno contra DT 25. Se você possuir grau de treinamento veterano nesta perícia, pode pilotar veículos aéreos, como aviões e helicópteros.</p>'
  },
  {
    name: 'Pontaria',
    attribute: 'AGI',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você usa Pontaria para fazer ataques à distância. A DT é a Defesa do alvo. Se você acertar, causa dano de acordo com a arma utilizada.</p>'
  },
  {
    name: 'Profissão',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: false,
    description: '<p>Você sabe exercer uma profissão específica, como advogado, engenheiro, jornalista ou publicitário. Converse com o mestre para definir os detalhes de sua profissão e que tipos de testes você pode fazer com ela. Por exemplo, um advogado pode fazer um teste de Profissão para argumentar com a polícia, enquanto um administrador pode usar esta perícia para investigar os documentos de uma corporação.</p><p>Um personagem treinado nesta perícia possui seus próprios rendimentos ou, caso não trabalhe mais, uma reserva de capital. Isso permite que você comece cada missão com um item adicional, além daqueles fornecidos pela Ordem. O item é de categoria I se você for treinado, de categoria II se você for veterano e de categoria III se você for expert.</p>'
  },
  {
    name: 'Reflexos',
    attribute: 'AGI',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você usa esta perícia para testes de resistência contra efeitos que exigem reação rápida, como armadilhas e explosões. A DT é determina pelo efeito. Você também usa Reflexos para evitar fintas.</p>'
  },
  {
    name: 'Religião',
    attribute: 'PRE',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: false,
    description: '<p>Você possui conhecimento sobre teologia e as diversas religiões do mundo.</p><p><span>Acalmar (DT 20).</span> Você pode usar Religião como Diplomacia para acalmar um personagem que esteja enlouquecendo.</p><p><span>Informação.</span> Você pode responder dúvidas relativas a mitos, profecias, relíquias sagradas etc. A DT é 10 para questões simples, 20 para questões complexas e 30 para mistérios e enigmas.</p><p><span>Rito (Veterano, DT 20).</span> Você realiza uma cerimônia religiosa (batizado, casamento, funeral...).</p>'
  },
  {
    name: 'Sobrevivência',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você pode se guiar em regiões selvagens e evitar perigos da natureza.</p><p><span>Acampamento (Treinado).</span> Você pode conseguir abrigo e alimento nos ermos, caçando, pescando, colhendo frutos, etc. A DT depende do tipo de terreno: 15 para campo aberto, 20 para mata fechada e 25 para regiões extremas, como desertos, pântanos ou montanhas. Regiões especialmente áridas ou estéreis e clima ruim (neve, tempestade etc.) impõem uma penalidade de –5 (cumulativa). Se passar, você e seu grupo podem usar as ações alimentar-se e dormir mesmo estando ao relento.</p><p><span>Identificar Animal (Treinado, DT 20).</span> Com uma ação completa, você pode identificar um animal exótico. Veja a perícia Ocultismo.</p><p><span>Orientar-se.</span> Um personagem viajando em regiões selvagens precisa fazer um teste de Sobrevivência por dia para avançar. A DT depende do tipo de terreno (veja acima). Se passar, você avança seu deslocamento normal. Se falhar, avança metade. Se falhar por 5 ou mais, se perde e não avança pelo dia inteiro. Num grupo, um personagem deve ser escolhido como guia. Personagens treinados em Sobrevivência podem fazer testes para ajudá-lo. Entretanto, se mais de um personagem quiser fazer o teste por si só, todos deverão rolar os dados em segredo. Os jogadores devem decidir qual guia seguir antes de verem o resultado!</p><p><span>Rastrear (Treinado).</span> Você pode identificar e seguir rastros. A DT varia: 15 para rastrear um grupo grande, ou um único ser em solo macio, como lama ou neve; 20 para um ser em solo comum (grama, terra); 25 para um ser em solo duro (estrada, piso de interiores). Visibilidade precária ou clima ruim (noite, chuva, neblina) impõem –5 no teste. Você precisa fazer um teste por dia de perseguição. Enquanto rastreia, seu deslocamento é reduzido à metade. Se falhar, pode tentar novamente gastando mais um dia. Porém, a cada dia desde a criação dos rastros, a DT aumenta em +1.</p>'
  },
  {
    name: 'Tática',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: false,
    description: '<p>Você recebeu educação militar.</p><p><span>Analisar Terreno (DT 20).</span> Como uma ação de movimento, você pode observar o campo de batalha. Se passar, descobre uma vantagem, como cobertura, camuflagem ou terreno elevado, se houver.</p><p><span>Plano de Ação (Veterano, DT 20).</span> Como uma ação padrão, você orienta um aliado em alcance médio. Se passar, fornece +5 na Iniciativa dele. Se isso fizer com que um aliado que ainda não tenha agido nesta rodada fique com uma Iniciativa maior do que a sua, ele age imediatamente após seu turno. Nas próximas rodadas, ele age de acordo com a nova ordem.</p>'
  },
  {
    name: 'Tecnologia',
    attribute: 'INT',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: true,
    loadPenalty: false,
    description: '<p>Você possui conhecimentos avançados de eletrônica e informática. Usos cotidianos, como mexer em um computador ou celular, não exigem treinamento nesta perícia ou testes. Esta perícia serve para usos avançados, como reprogramar um sistema de vigilância ou invadir um servidor seguro.</p><p><span>Falsificação (Veterano).</span> Como o uso de Enganação, mas apenas para documentos eletrônicos.</p><p><span>Hackear.</span> Você invade um computador protegido. A DT é 15 para computadores pessoais, 20 para redes profissionais e 25 para grandes servidores corporativos, governamentais ou militares. Este uso gasta 1d4+1 ações completas. Você pode sofrer uma penalidade de –5 em seu teste para fazê-lo como uma ação completa. Se você falhar no teste, não pode tentar novamente até ter alguma informação nova que o ajude na invasão, como um nome de usuário ou senha. Se falhar por 5 ou mais, pode ser rastreado pelos administradores do sistema que tentou invadir.</p><p>Uma vez que invada o sistema, você pode fazer o que veio fazer. Para procurar uma informação específica, veja o uso localizar arquivo, abaixo. Outras ações, como alterar ou deletar arquivos, corromper ou desativar aplicativos ou bloquear o acesso de outros usuários, podem exigir novos testes de Tecnologia, à critério do mestre.</p><p><span>Localizar Arquivo.</span> Você procura um arquivo específico em um computador ou rede que possa acessar (se você não tiver acesso ao sistema, precisará primeiro invadi-lo; veja o uso hackear, acima). O tempo exigido e a DT do teste variam de acordo com o tamanho do sistema no qual você está pesquisando: uma ação completa e DT 15 para um computador pessoal, 1d4+1 ações completas e DT 20 para uma rede pequena e 1d6+2 ações completas e DT 25 para uma rede corporativa ou governamental. Este uso se refere apenas a localizar arquivos em sistemas privados que você não conhece. Para procurar informações públicas, na internet, use a perícia Investigação.</p><p><span>Operar Dispositivo.</span> Você opera um dispositivo eletrônico complexo. Isso permite que você acesse câmeras remotamente, destrave fechaduras eletrônicas, ative ou desative alarmes, etc. A DT é 15 para aparelhos comuns, 20 para equipamento profissional e 25 para sistemas protegidos. Este uso gasta 1d4+1 ações completas e exige um kit de eletrônica. Você pode sofrer uma penalidade de –5 em seu teste para fazê-lo como uma ação completa. Sem o kit, você sofre –5 nos testes de operar dispositivo.</p>'
  },
  {
    name: 'Vontade',
    attribute: 'PRE',
    bonus: 0,
    otherBonus: 0,
    trainingDegree: '0',
    onlyTrained: false,
    loadPenalty: false,
    description: '<p>Você usa esta perícia para testes de resistência contra efeitos que exigem determinação, como intimidação e rituais que afetam a mente. A DT é determina pelo efeito. Você também usa Vontade para conjurar rituais em condições adversas.</p>'
  }
]

export default Skills
