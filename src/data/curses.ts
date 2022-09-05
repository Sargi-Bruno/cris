import { Curse } from './dataInterfaces'

export const weaponCurses: Array<Curse> = [
  {
    name: 'Antielemento',
    description: '<p>A arma é letal contra criaturas de um elemento. Quando ataca uma criatura desse elemento, você pode gastar 2 PE. Se fizer isso e acertar o ataque, causa +4d8 pontos de dano. Para determinar o elemento aleatoriamente, role 1d4: 1) Conhecimento; 2) Energia; 3) Morte; 4) Sangue.</p>',
    element: 'Conhecimento',
    itemType: 'weapon'
  },
  {
    name: 'Ritualística',
    description: '<p>Você pode armazenar na arma um ritual que tenha como alvo um ser ou que afete uma área, gastando os PE como se tivesse conjurado o ritual normalmente. O ritual não gera efeito na hora; em vez disso, fica guardado no item. Quando acerta um ataque com a arma, você pode descarregar o ritual armazenado como uma ação livre. O alvo do ritual, ou o centro da área dele, é o ser atingido. Uma vez que o ritual seja descarregado, outro pode ser armazenado.</p>',
    element: 'Conhecimento',
    itemType: 'weapon'
  },
  {
    name: 'Senciente',
    description: '<p>Você pode gastar uma ação de movimento e 2 PE para imbuir a arma com uma fagulha de sua consciência. A arma flutua ao seu lado e, uma vez por rodada, ataca um ser em alcance curto (ou no alcance da arma, o que for maior) a sua escolha, com as mesmas estatísticas que teria se você a estivesse empunhando. Você pode gastar 1 PE no início de cada um de seus turnos para manter esse efeito. Se não o fizer, a arma cai no chão. Você pode usar uma ação de movimento para apanhar a arma no ar caso precise. Soltar a arma para que volte a flutuar para ativar a maldição é uma ação livre.</p>',
    element: 'Conhecimento',
    itemType: 'weapon'
  },
  {
    name: 'Empuxo',
    description: '<p>Com a capacidade de gerar uma descarga momentânea de Energia, a arma ganha a capacidade de ser arremessada em alcance curto (se já podia ser arremessada, seu alcance aumenta em uma categoria) e causa mais um dado de dano do mesmo tipo quando usada dessa forma. Após efetuar um ataque à distância com a arma, ela volta voando para você no mesmo turno. Pegar a arma é uma reação. Somente armas corpo a corpo podem receber essa maldição.</p>',
    element: 'Energia',
    itemType: 'weapon'
  },
  {
    name: 'Energética',
    description: '<p>Você pode gastar 2 PE para transformar a arma (exceto seu cabo ou empunhadura) ou a munição disparada pela arma em Energia pura. Até o final da cena, a arma fornece +5 em testes de ataque, ignora resistência a dano e converte todo o dano causado para Energia. Armas de corpo a corpo emanam luz como uma lâmpada; munição toma uma forma plasmática iluminada como feixes de luz.</p>',
    element: 'Energia',
    itemType: 'weapon'
  },
  {
    name: 'Vibrante',
    description: '<p>A arma vibra constantemente com um fluxo de Energia. Você recebe a habilidade Ataque Extra, da trilha operações especiais, do combatente. Se já a possui, em vez disso o custo para usá-la diminui em –1 PE.</p>',
    element: 'Energia',
    itemType: 'weapon'
  },
  {
    name: 'Consumidora',
    description: '<p>A arma drena a entropia de seres, deixando alvos atingidos lentos até o final da cena. Quando ataca, você pode gastar 2 PE. Se fizer isso e acertar o ataque, o alvo fica imóvel por uma rodada.</p>',
    element: 'Morte',
    itemType: 'weapon'
  },
  {
    name: 'Erosiva',
    description: '<p>A arma acelera o envelhecimento dos alvos, causando +1d8 pontos de dano de Morte. Quando ataca, você pode gastar 2 PE. Se fizer isso e acertar o ataque, a vítima sofre 2d4 pontos de dano de Morte no início de seus turnos pelas próximas duas rodadas.</p>',
    element: 'Morte',
    itemType: 'weapon'
  },
  {
    name: 'Repulsora',
    description: '<p>A arma gera uma aura similar a uma fumaça espiralada que desacelera ataques vindos em sua direção, fornecendo +2 de Defesa enquanto estiver empunhada. Quando você faz um bloqueio, pode gastar 2 PE. Se fizer isso, recebe um bônus adicional de +5 em Defesa.</p>',
    element: 'Morte',
    itemType: 'weapon'
  },
  {
    name: 'Lancinante',
    description: '<p>A arma inflige ferimentos terríveis, causando +1d8 de dano de Sangue. Este dado é multiplicado em acertos críticos. Por exemplo, se a arma possuir crítico x3, em um acerto crítico o dano adicional de lancinante vira +3d8.</p>',
    element: 'Sangue',
    itemType: 'weapon'
  },
  {
    name: 'Predadora',
    description: '<p>A arma tem sede de sangue e persegue seus alvos, anulando penalidades por camuflagem e cobertura (mas não cobertura total). Caso a arma seja de ataque à distância, seu alcance também aumenta em uma categoria. Além disso, a margem de ameaça da arma duplica. Por exemplo, um fuzil de caça predador tem margem de ameaça 17. Efeitos que duplicam a margem de ameaça são aplicados antes de quaisquer efeitos que a aumentem.</p>',
    element: 'Sangue',
    itemType: 'weapon'
  },
  {
    name: 'Sanguinária',
    description: '<p>Os ferimentos causados pela arma se rasgam além da área acertada. Um ser atingido fica sangrando. Sangramento causado pela arma é cumulativo — um ser atingido duas vezes sofre 2d6 pontos de dano de sangramento por rodada. Além disso, quando você faz um acerto crítico com a arma ela drena o sangue derramado, o que deixa o alvo fraco e concede a você 2d10 pontos de vida temporários.</p>',
    element: 'Sangue',
    itemType: 'weapon'
  },
]

export const protectionCurses: Array<Curse> = [
  {
    name: 'Abascanta',
    description: '<p>Você recebe +5 em testes de resistência contra rituais. Uma vez por rodada, quando você é alvo de um ritual, pode gastar uma reação e PE igual ao custo dele para refleti-lo de volta ao conjurador. As características do ritual (efeitos, DT...) se mantêm, mas você toma qualquer decisão exigida por ele.</p>',
    element: 'Conhecimento',
    itemType: 'protection'
  },
  {
    name: 'Profética',
    description: '<p>A proteção concede vislumbres de um possível futuro imediato. Você recebe resistência a Conhecimento 10 e pode gastar 2 PE para rolar novamente um teste de resistência uma vez.</p>',
    element: 'Conhecimento',
    itemType: 'protection'
  },
  {
    name: 'Sombria',
    description: '<p>A proteção confunde os sentidos. Você recebe +5 em Furtividade e ignora a penalidade de carga em testes dessa perícia. Além disso, você pode gastar uma ação de movimento e 1 PE para fazer o item adquirir a aparência de uma roupa comum, mas mantendo suas propriedades (bônus na Defesa, penalidade de armadura...).</p>',
    element: 'Conhecimento',
    itemType: 'protection'
  },
  {
    name: 'Cinética',
    description: '<p>A proteção produz uma barreira invisível que desvia ataques, concedendo +2 em Defesa e resistência a dano 2 (para proteção leve) ou 5 (para proteção pesada).</p>',
    element: 'Energia',
    itemType: 'protection'
  },
  {
    name: 'Lépida',
    description: '<p>A proteção amplifica sua mobilidade, concedendo +10 em testes de Atletismo e +3m de deslocamento. Você pode gastar 2 PE para se mover de forma sobrenatural. Até o final do turno, você ignora terreno difícil, recebe deslocamento de escalada igual a seu deslocamento terrestre e fica imune a dano por queda de até 9m.</p>',
    element: 'Energia',
    itemType: 'protection'
  },
  {
    name: 'Voltaica',
    description: '<p>Você recebe resistência a Energia 10 e pode gastar uma ação de movimento e 2 PE para fazer a proteção emitir arcos de Energia até o fim da cena. Se fizer isso, no fim de cada um de seus turnos você causa 1d6 pontos de dano de Energia em todas os seres adjacentes.</p>',
    element: 'Energia',
    itemType: 'protection'
  },
  {
    name: 'Letárgica',
    description: '<p>A proteção desacelera ataques perigosos, concedendo +2 em Defesa. Além disso, você recebe 25% de chance (para proteção leve) e 50% de chance (para pesada) de ignorar o dano extra de acertos críticos e ataques furtivos.</p>',
    element: 'Morte',
    itemType: 'protection'
  },
  {
    name: 'Repulsiva',
    description: '<p>Você recebe resistência a morte 10 e pode gastar uma ação de movimento e 2 PE para cobrir seu corpo com uma camada de lodo escuro até o final da cena. Se fizer isso, qualquer ser que o ataque em corpo a corpo sofre 2d8 pontos de dano de Morte.</p>',
    element: 'Morte',
    itemType: 'protection'
  },
  {
    name: 'Regenerativa',
    description: '<p>A proteção melhora sua capacidade de resistência e regeneração. Você recebe resistência a Sangue 10 e pode gastar uma ação de movimento e 1 PE para recuperar 1d12 pontos de vida.</p>',
    element: 'Sangue',
    itemType: 'protection'
  },
  {
    name: 'Sádica',
    description: '<p>No início de seu turno, você recebe +1 em testes de ataque e rolagens de dano para cada 10 pontos de dano que sofreu desde o fim de seu último turno. Por exemplo, se tiver sofrido 45 pontos de dano, recebe +4 em testes de ataque e rolagens de dano.</p>',
    element: 'Sangue',
    itemType: 'protection'
  },
]

export const miscCurses: Array<Curse> = [
  {
    name: 'Carisma',
    description: '<p>O acessório gera uma aura que torna você mais carismático e autoconfiante. Você recebe +1 em Presença (este aumento não fornece PE adicionais).</p>',
    element: 'Conhecimento',
    itemType: 'misc'
  },
  {
    name: 'Conjuração',
    description: '<p>Esse acessório tem um ritual de 1º círculo vinculado. Se estiver empunhando o item, você pode conjurar o ritual como se o conhecesse. Caso conheça o ritual, seu custo diminui em –1 PE.</p>',
    element: 'Conhecimento',
    itemType: 'misc'
  },
  {
    name: 'Escudo Mental',
    description: '<p>O acessório gera uma barreira psíquica. Você recebe resistência mental 10.</p>',
    element: 'Conhecimento',
    itemType: 'misc'
  },
  {
    name: 'Reflexão',
    description: '<p>Quando você é alvo de um ritual, pode gastar PE igual ao custo dele para refleti-lo de volta ao seu conjurador. As características do ritual (efeitos, DT...) se mantêm, mas você toma qualquer decisão exigida por ele.</p>',
    element: 'Conhecimento',
    itemType: 'misc'
  },
  {
    name: 'Sagacidade',
    description: '<p>Sua mente é acelerada pelas forças do Conhecimento, fornecendo a você +1 em Intelecto (este aumento não fornece perícias treinadas extras).</p>',
    element: 'Conhecimento',
    itemType: 'misc'
  },
  {
    name: 'Defesa',
    description: '<p>Uma barreira de energia protetora invisível gerada por este acessório fornece +5 de Defesa.</p>',
    element: 'Energia',
    itemType: 'misc'
  },
  {
    name: 'Destreza',
    description: '<p>Este acessório aprimora sua coordenação e velocidade, fornecendo +1 em Agilidade.</p>',
    element: 'Energia',
    itemType: 'misc'
  },
  {
    name: 'Esforço Adicional',
    description: '<p>Este acessório concede +5 PE. Este efeito só se ativa após um dia de uso.</p>',
    element: 'Morte',
    itemType: 'misc'
  },
  {
    name: 'Disposição',
    description: '<p>Valendo-se do poder do Sangue, você recebe +1 em Vigor.</p>',
    element: 'Sangue',
    itemType: 'misc'
  },
  {
    name: 'Pujança',
    description: '<p>O acessório aumenta sua potência muscular, fornecendo +1 em Força.</p>',
    element: 'Sangue',
    itemType: 'misc'
  },
  {
    name: 'Vitalidade',
    description: '<p>Você recebe +15 PV. Os efeitos do anel só se ativam após um dia de uso.</p>',
    element: 'Sangue',
    itemType: 'misc'
  },
  {
    name: 'Proteção Elemental',
    description: '<p>Você recebe resistência 10 contra um elemento. Este acessório conta como um item do elemento contra o qual fornece resistência (por exemplo, um utensilio de proteção elemental contra Energia é um item de Energia).</p>',
    element: 'Varia',
    itemType: 'misc'
  },
]
