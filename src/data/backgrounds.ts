import { Background } from './dataInterfaces'

const backgrounds: Array<Background> = [
  {
    name: 'Acadêmico',
    description: '<p>Você era um pesquisador ou professor universitário. De forma proposital ou não, seus estudos tocaram em assuntos misteriosos e chamaram a atenção da Ordo Realitas.</p>',
    skills: ['Ciências', 'Investigação'],
    power: {
      name: 'Saber é Poder',
      description: '<p>Quando faz um teste usando Intelecto, você pode gastar 2 PE para receber +5 nesse teste.</p>'
    }
  },
  {
    name: 'Agente de Saúde',
    description: '<p>Você era um profissional da saúde como um enfermeiro, farmacêutico, médico, psicólogo ou socorrista, treinado no atendimento e cuidado de pessoas. Você pode ter sido surpreendido por um evento paranormal durante o trabalho ou mesmo cuidado de um agente da Ordem em uma emergência, que ficou surpreso com o quão bem você lidou com a situação.</p>',
    skills: ['Intuição', 'Medicina'],
    power: {
      name: 'Técnica Medicinal',
      description: '<p>Sempre que cura um personagem, você adiciona seu Intelecto no total de PV curados.</p>'
    }
  },
  {
    name: 'Amnésico',
    description: '<p>Você perdeu a maior parte da memória. Sabe apenas o próprio nome, ou nem isso. Sua amnésia pode ser resultado de um trauma paranormal ou mesmo de um ritual. Talvez você tenha sido vítima de cultistas? Talvez você tenha sido um cultista? Seja como for, hoje a Ordem é a única família que conhece. Quem sabe, cumprindo missões, você descubra algo sobre seu passado.</p>',
    skills: [],
    power: {
      name: 'Vislumbres do Passado',
      description: '<p>Uma vez por missão, você pode fazer um teste de Intelecto (DT 10) para reconhecer pessoas ou lugares familiares, que tenha encontrado antes de perder a memória. Se passar, recebe 1d4 PE temporários e, a critério do mestre, uma informação útil.</p>'
    }
  },
  {
    name: 'Artista',
    description: '<p>Você era um ator, músico, escritor, dançarino, influenciador... Seu trabalho pode ter sido inspirado por uma experiência paranormal do passado e o que o público acha que é pura criatividade, a Ordem sabe que tem um lado mais sombrio.</p>',
    skills: ['Artes', 'Enganação'],
    power: {
      name: 'Magnum Opus',
      description: '<p>Você é famoso por uma de suas obras. Uma vez por missão, pode determinar que um personagem envolvido em uma cena de interação o reconheça. Você recebe +5 em testes de Presença e de perícias baseadas em Presença contra aquele personagem. A critério do mestre, pode receber esses bônus em outras situações nas quais seria reconhecido.</p>'
    }
  },
  {
    name: 'Atleta',
    description: '<p>Você competia em um esporte individual ou por equipe, como natação ou futebol. Seu alto desempenho pode ser fruto de alguma influência paranormal que nem mesmo você conhecia ou você pode ter se envolvido em algum evento paranormal em uma de suas competições.</p>',
    skills: ['Acrobacia', 'Atletismo'],
    power: {
      name: '110%',
      description: '<p>Quando faz um teste de perícia usando Força ou Agilidade (exceto Luta e Pontaria) você pode gastar 2 PE para receber +5 nesse teste.</p>'
    }
  },
  {
    name: 'Chef',
    description: '<p>Você é um cozinheiro amador ou profissional. Talvez trabalhasse em um restaurante, talvez simplesmente gostasse de cozinhar para a família e amigos. Como sua comida fez com que você se envolvesse com o paranormal? Ninguém sabe. Mas os outros agentes adoram quando você vai para a missão!</p>',
    skills: ['Fortitude', 'Profissão (cozinheiro)'],
    power: {
      name: 'Ingrediente Secreto',
      description: '<p>Em cenas de interlúdio, você pode gastar uma ação para cozinhar um prato gostoso. Cada membro do grupo (incluindo você) que gastar uma ação para se alimentar recebe o benefício de dois pratos (caso o mesmo benefício seja escolhido duas vezes, seus efeitos se acumulam).</p>'
    }
  },
  {
    name: 'Chef',
    description: '<p>Você é um cozinheiro amador ou profissional. Talvez trabalhasse em um restaurante, talvez simplesmente gostasse de cozinhar para a família e amigos. Como sua comida fez com que você se envolvesse com o paranormal? Ninguém sabe. Mas os outros agentes adoram quando você vai para a missão!</p>',
    skills: ['Fortitude', 'Profissão (cozinheiro)'],
    power: {
      name: 'Ingrediente Secreto',
      description: '<p>Em cenas de interlúdio, você pode gastar uma ação para cozinhar um prato gostoso. Cada membro do grupo (incluindo você) que gastar uma ação para se alimentar recebe o benefício de dois pratos (caso o mesmo benefício seja escolhido duas vezes, seus efeitos se acumulam).</p>'
    }
  },
  {
    name: 'Criminoso',
    description: '<p>Você vivia uma vida fora da lei, seja como mero batedor de carteiras, seja como membro de uma facção criminosa. Em algum momento, você se envolveu em um assunto da Ordem — talvez tenha roubado um item amaldiçoado? A organização, por sua vez, achou melhor recrutar seus talentos do que ter você como um estorvo.</p>',
    skills: ['Crime', 'Furtividade'],
    power: {
      name: 'O Crime Compensa',
      description: '<p>No final de uma missão, escolha um item encontrado na missão. Em sua próxima missão, você pode incluir esse item em seu inventário sem que ele conte em seu limite de itens por patente.</p>'
    }
  },
  {
    name: 'Cultista Arrependido',
    description: '<p>Você fez parte de um culto paranormal. Talvez fossem ignorantes iludidos, que acreditavam estar contatando entidades benevolentes. Talvez soubessem exatamente o que estavam fazendo. Seja como for, algo abriu seus olhos e agora você luta pelo lado certo — embora carregue para sempre traços de sua vida pregressa. Outros membros da Ordem podem desconfiar de sua conversão e você sabe que precisará se esforçar para conquistar a confiança de todos.</p>',
    skills: ['Ocultismo', 'Religião'],
    power: {
      name: 'Traços do Outro Lado',
      description: '<p>Você possui um poder paranormal à sua escolha. Porém, começa o jogo com metade da Sanidade normal para sua classe.</p>'
    }
  },
  {
    name: 'Desgarrado',
    description: '<p>Você não vivia de acordo com as normas da sociedade. Podia ser um eremita, uma pessoa em situação de rua ou simplesmente alguém que descobriu o Paranormal e abandonou sua rotina — sabendo o quão frágil era a existência humana, não conseguia simplesmente continuar indo para o trabalho todo o dia. De qualquer forma, a vida sem os confortos modernos o deixou mais forte.</p>',
    skills: ['Fortitude', 'Sobrevivência'],
    power: {
      name: 'Calejado',
      description: '<p>Você recebe +1 PV para cada 5% de NEX.</p>'
    }
  },
  {
    name: 'Engenheiro',
    description: '<p>Enquanto os acadêmicos estão preocupados com teorias, você colocar a mão na massa, seja como engenheiro profissional, seja como inventor de garagem. Provavelmente você criou algum dispositivo paranormal que chamou a atenção da Ordem.</p>',
    skills: ['Profissão', 'Tecnologia'],
    power: {
      name: 'Ferramentas Favoritas',
      description: '<p>Um item a sua escolha (exceto armas) conta como uma categoria abaixo (por exemplo, um item de categoria II conta como categoria I para você).</p>'
    }
  },
  {
    name: 'Executivo',
    description: '<p>Você possuía um trabalho de escritório em uma grande empresa, banco ou corporação. Era um administrador, advogado, contador ou de qualquer outra profissão que lida com papelada e burocracia. Sua vida era bastante normal, até que você descobriu algo que não devia. Talvez o sucesso da empresa residisse em um ritual? Talvez toda a corporação fosse fachada para um culto e o presidente, um líder cultista envolvido com entidades paranormais? Após essa descoberta, você foi recrutado pela Ordem e trocou seu trabalho de escritório por missões de campo — hoje, sua vida é tudo, menos normal.</p>',
    skills: ['Diplomacia', 'Profissão'],
    power: {
      name: 'Processo Otimizado',
      description: '<p>Sempre que faz um teste de perícia durante um teste estendido, pode pagar 2 PE para receber +5 nesse teste.</p>'
    }
  },
  {
    name: 'Investigador',
    description: '<p>Você era um investigador do governo, como um perito forense ou policial federal, ou privado, como um detetive particular. Pode ter tido contato com o Paranormal em algum caso ou ter sido recrutado pela Ordem por suas habilidades de resolução de mistérios.</p>',
    skills: ['Investigação', 'Percepção'],
    power: {
      name: 'Faro para Pistas',
      description: '<p>Uma vez por cena, quando fizer um teste para procurar pistas, você pode gastar 1 PE para receber +5 nesse teste.</p>'
    }
  },
  {
    name: 'Lutador',
    description: '<p>Você pratica uma arte marcial ou esporte de luta, ou cresceu em um bairro perigoso onde aprendeu briga de rua. Já quebrou muitos ossos, tanto seus quanto dos outros. Pode ter conhecido a Ordem após um torneio secreto envolvendo entidades do Outro Lado ou ter sido recrutado pela sua capacidade de luta.</p>',
    skills: ['Luta', 'Reflexos'],
    power: {
      name: 'Mão Pesada',
      description: '<p>Você recebe +2 em rolagens de dano com ataques corpo a corpo.</p>'
    }
  },
  {
    name: 'Magnata',
    description: '<p>Você possui muito dinheiro ou patrimônio. Pode ser o herdeiro de uma família antiga ligada ao oculto, ter criado e vendido uma empresa e decidido usar sua riqueza para uma causa maior, ou ter ganho uma loteria após inadvertidamente escolher números amaldiçoados que formavam um ritual.</p>',
    skills: ['Diplomacia', 'Pilotagem'],
    power: {
      name: 'Patrocinador da Ordem',
      description: '<p>Seu limite de crédito é sempre considerado um acima do atual.</p>'
    }
  },
  {
    name: 'Mercenário',
    description: '<p>Você é um soldado de aluguel, que trabalha sozinho ou como parte de alguma organização que vende serviços militares. Escoltas e assassinatos fizeram parte de sua rotina por tempo o suficiente para você se envolver em alguma situação com o Paranormal.</p>',
    skills: ['Iniciativa', 'Intimidação'],
    power: {
      name: 'Posição de Combate',
      description: '<p>No primeiro turno de cada cena de ação, você pode gastar 2 PE para receber uma ação de movimento adicional.</p>'
    }
  },
  {
    name: 'Militar',
    description: '<p>Você serviu em uma força militar, como o exército ou a marinha. Passou muito tempo treinando com armas de fogo, até se tornar um perito no uso delas. Acostumado a obedecer ordens e partir em missões, está em casa na Ordo Realitas. O inimigo é diferente, mas um tiro bem dado continua resolvendo o problema.</p>',
    skills: ['Pontaria', 'Tática'],
    power: {
      name: 'Para Bellum',
      description: '<p>Você recebe +2 em rolagens de dano com armas de fogo.</p>'
    }
  },
  {
    name: 'Operário',
    description: '<p>Pedreiro, industriário, operador de máquinas em uma fábrica… Você passou uma parte de sua vida em um emprego braçal, desempenhando atividades práticas que lhe deram uma visão pragmática do mundo. Sua rotina mundana, entretanto, foi confrontada de alguma forma pelo paranormal, e você não consegue mais esquecer tudo que viu sobre os mistérios do mundo.</p>',
    skills: ['Fortitude', 'Profissão'],
    power: {
      name: 'Ferramenta de Trabalho',
      description: '<p>Escolha uma arma simples ou tática que, a critério do mestre, poderia ser usada como ferramenta em sua profissão (como uma marreta para um pedreiro). Você sabe usar a arma escolhida e recebe +1 em testes de ataque, rolagens de dano e margem de ameaça com ela.</p>'
    }
  },
  {
    name: 'Policial',
    description: '<p>Você fez parte de uma força de segurança pública, civil ou militar. Em alguma patrulha ou chamado se deparou com um caso paranormal e sobreviveu para contar a história.</p>',
    skills: ['Percepção', 'Pontaria'],
    power: {
      name: 'Patrulha',
      description: '<p>Você recebe +2 em Defesa.</p>'
    }
  },
  {
    name: 'Religioso',
    description: '<p>Você é devoto ou sacerdote de uma fé. Independentemente da religião que pratica, se dedica a auxiliar as pessoas com problemas espirituais. A partir disso, teve contato com o paranormal, o que fez com que fosse convocado pela Ordem.</p>',
    skills: ['Religião', 'Vontade'],
    power: {
      name: 'Acalentar',
      description: '<p>Você recebe +5 em testes de Religião para acalmar. Além disso, quando acalma uma pessoa, ela recebe um número de pontos de Sanidade igual a 1d6 + a sua Presença.</p>'
    }
  },
  {
    name: 'Servidor Público',
    description: '<p>Você possuía carreira em um órgão do governo, lidando com burocracia e atendendo pessoas. Sua rotina foi quebrada quando você viu que o prefeito era um cultista ou que a câmara de vereadores se reunia à noite para realizar rituais. Quando os próprios representantes do povo estão dispostos a sacrificá-lo para entidades malignas, onde reside nossa esperança? Hoje, você sabe a resposta para essa pergunta: na Ordo Realitas.</p>',
    skills: ['Intuição', 'Vontade'],
    power: {
      name: 'Espírito Cívico',
      description: '<p>Sempre que faz um teste para ajudar, você pode gastar 1 PE para aumentar o bônus concedido em +2.</p>'
    }
  },
  {
    name: 'Teórico da Conspiração',
    description: '<p>A humanidade nunca pisou na lua. Reptilianos ocupam importantes cargos públicos. A Terra é plana... E secretamente governada pelos Illuminati. Você sabe isso tudo, pois investigou a fundo esses importantes assuntos. Quando sua pesquisa esbarrou no Paranormal, você foi recrutado. Na Ordem, sua loucuradeterminação será usada para um bom propósito.</p>',
    skills: ['Investigação', 'Ocultismo'],
    power: {
      name: 'Eu Já Sabia',
      description: '<p>Você não se abala com entidades ou anomalias. Afinal, sempre soube que isso tudo existia. Você recebe resistência a dano mental igual ao seu Intelecto.</p>'
    }
  },
  {
    name: 'T.I.',
    description: '<p>Programador, engenheiro de software ou simplesmente “o cara da T.I.”, você tem treinamento e experiência para lidar com sistemas informatizados. Seu talento (ou curiosidade exagerada) chamou a atenção da Ordem.</p>',
    skills: ['Investigação', 'Tecnologia'],
    power: {
      name: 'Motor de Busca',
      description: '<p>A critério do Mestre, sempre que tiver acesso a internet, você pode gastar 2 PE para substituir um teste de perícia qualquer por um teste de Tecnologia.</p>'
    }
  },
  {
    name: 'Trabalhador Rural',
    description: '<p>Você trabalhava no campo ou em áreas isoladas, como fazendeiro, pescador, biólogo, veterinário... Você se acostumou com o convívio com a natureza e os animais e talvez tenha ouvido uma ou outra história de fantasmas ao redor da fogueira. Em algum momento da sua vida, porém, descobriu que muitas dessas histórias são verdadeiras.</p>',
    skills: ['Adestramento', 'Sobrevivência'],
    power: {
      name: 'Desbravador',
      description: '<p>Quando faz um teste de Adestramento ou Sobrevivência, você pode gastar 2 PE para receber +5 nesse teste. Além disso, você não sofre penalidade em deslocamento por terreno difícil.</p>'
    }
  },
  {
    name: 'Trambiqueiro',
    description: '<p>Uma vida digna exige muito trabalho, então é melhor nem tentar. Você vivia de pequenos golpes, jogatina ilegal e falcatruas. Certo dia, enganou a pessoa errada; no dia seguinte, se viu servindo à Ordem. Pelo menos agora tem a chance de usar sua lábia para o bem.</p>',
    skills: ['Crime', 'Enganação'],
    power: {
      name: 'Impostor',
      description: '<p>Uma vez por cena, você pode gastar 2 PE para substituir um teste de perícia qualquer por um teste de Enganação.</p>'
    }
  },
  {
    name: 'Universitário',
    description: '<p>Você era aluno de uma faculdade. Em sua rotina de estudos, provas e festas, acabou descobrindo algo — talvez um livro amaldiçoado na antiga biblioteca do campus? Por seu achado, foi convocado pela Ordem. Agora, estuda com mais afinco: nesse novo curso, ouviu dizer que as provas podem ser mortais.</p>',
    skills: ['Atualidades', 'Investigação'],
    power: {
      name: 'Dedicação',
      description: '<p>Você recebe +1 PE, e mais 1 PE adicional a cada NEX ímpar (15%, 25%...). Além disso, seu limite de PE por turno aumenta em 1 (em NEX 5% seu limite é 2, em NEX 10% é 3 e assim por diante).</p>'
    }
  },
  {
    name: 'Vítima',
    description: '<p>Em algum momento de sua vida — infância, juventude ou início da vida adulta — você encontrou o Paranormal... E a experiência não foi nada boa. Você viu os espíritos dos mortos, foi atacado por uma entidade ou mesmo foi sequestrado para ser sacrificado em um ritual impedido no último momento. A experiência foi traumática, mas você não se abateu; em vez disso, decidiu lutar para impedir que outros inocentes passem pelo mesmo. E, já tendo sendo vítima do Paranormal, se tornou habilidoso em evitar perigos.</p>',
    skills: ['Reflexos', 'Vontade'],
    power: {
      name: 'Cicatrizes Psicológicas',
      description: '<p>Você recebe +1 de Sanidade para cada 5% de NEX.</p>'
    }
  },
]

export default backgrounds
