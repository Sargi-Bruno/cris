import { Class } from '../types'

const classes: Array<Class> = [
  {
    name: 'Combatente',
    shortDescription: 'Treinado para lutar com todo tipo de armas, e com a força e a coragem para encarar os perigos de frente, É o tipo de agente que prefere abordagens mais diretas e costuma atirar primeiro e perguntar depois.',
    description: '<p>Do mercenário especialista em armas de fogo até o perito em espadas, combatentes apresentam uma gama enorme de habilidades e técnicas especiais que aprimoram sua eficiência no campo de batalha, tornando-os membros essenciais em qualquer missão de extermínio.</p><p>Além de treinar seu corpo, o combatente também é perito em liderar seus aliados em batalha e cuidar de seu equipamento de combate, sempre preparado para assumir a linha de frente quando a coisa fica feia.</p><p><span>Combatentes Famosos: </span>Senhor Veríssimo, Joui Jouki, Gal, Antônio “Balu” Pontevedra, Tristan Monteiro e Ryder Staten.</p>',
    initialPv: 20,
    levelPv: 4,
    initialPe: 2,
    levelPe: 2,
    initialSan: 12,
    levelSan: 3,
    trainedSkills: {
      skills: [],
      optionSkils: [['Luta', 'Pontaria'], ['Fortitude', 'Reflexos']],
      quantity: 1
    },
    proficiencies: ['Armas simples', 'Armas táticas', 'Proteções leves'],
    proficienciesGradeQuantity: 1,
    abilities: [
      {
        name: 'Ataque Especial',
        description: 'Quando faz um ataque, você pode gastar 2 PE para receber +5 no teste de ataque ou na rolagem de dano. Conforme avança de NEX, você pode gastar +1 PE para receber mais bônus de +5. Você pode aplicar cada bônus de +5 em ataque ou dano. Por exemplo, em NEX 55%, você pode gastar 4 PE para receber +5 no teste de ataque e +10 na rolagem de dano.'
      }
    ],
    powers: [
      {
        name: 'Armamento Pesado',
        description: '<p>Você recebe proficiência com armas pesadas. <em>Pré-requisito:</em> For 2.</p>'
      },
      {
        name: 'Artista Marcial',
        description: '<p>Seus ataques desarmados causam 1d6 pontos de dano, podem causar dano letal e contam como armas ágeis. Em NEX 35%, o dano aumenta para 1d8 e, em NEX 70%, para 1d10.</p>'
      },
      {
        name: 'Ataque de Oportunidade',
        description: '<p>Sempre que um ser sair voluntariamente de um espaço adjacente ao seu, você pode gastar uma reação e 1 PE para fazer um ataque corpo a corpo contra ele.</p>'
      },
      {
        name: 'Combater com Duas Armas',
        description: '<p>Se estiver usando duas armas (e pelo menos uma for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre –1d20 em todos os testes de ataque até o seu próximo turno. <em>Pré-requisitos:</em> Agi 3, treinado em Luta ou Pontaria.</p>'
      },
      {
        name: 'Combate Defensivo',
        description: '<p>Quando usa a ação agredir, você pode combater defensivamente. Se fizer isso, até seu próximo turno, sofre –1d20 em todos os testes de ataque, mas recebe +5 na Defesa. <em>Pré-requisito:</em> Int 2.</p>'
      },
      {
        name: 'Golpe Demolidor',
        description: '<p>Quando usa a manobra quebrar ou ataca um objeto, você pode gastar 1 PE para causar dois dados de dano extra do mesmo tipo de sua arma. <em>Pré-requisitos:</em> For +2, treinado em Luta.</p>'
      },
      {
        name: 'Golpe Pesado',
        description: '<p>O dano de suas armas corpo a corpo aumenta em mais um dado do mesmo tipo.</p>'
      },
      {
        name: 'Incansável',
        description: '<p>Uma vez por cena, você pode gastar 2 PE para fazer uma ação de investigação adicional, mas deve usar Força ou Agilidade como atributo-base do teste.</p>'
      },
      {
        name: 'Presteza Atlética',
        description: '<p>Quando faz um teste de facilitar a investigação, você pode gastar 1 PE para usar Força ou Agilidade no lugar do atributo-base da perícia. Se passar no teste, o próximo aliado que usar seu bônus também recebe +1d20 no teste.</p>'
      },
      {
        name: 'Proteção Pesada',
        description: '<p>Você recebe proficiência com Proteções Pesadas. <em>Pré-requisito:</em> NEX 30%.</p>'
      },
      {
        name: 'Reflexos Defensivos',
        description: '<p>Você recebe +2 em Defesa e em testes de resistência. <em>Pré-requisitos:</em> Agi 2.</p>'
      },
      {
        name: 'Saque Rápido',
        description: '<p>Você pode sacar ou guardar itens como uma ação livre (em vez de ação de movimento). Além disso, a ação que você gasta para recarregar uma arma de disparo diminui em uma categoria (ação completa para padrão, padrão para movimento, movimento para livre). <em>Pré-requisito:</em> treinado em Iniciativa.</p>'
      },
      {
        name: 'Segurar o Gatilho',
        description: '<p>Sempre que acerta um ataque com uma arma de fogo, pode fazer outro ataque com a mesma arma contra o mesmo alvo, pagando 2 PE por cada ataque já realizado no turno. Ou seja, pode fazer o primeiro ataque extra gastando 2 PE e, se acertar, pode fazer um segundo ataque extra gastando mais 4 PE e assim por diante, até errar um ataque ou atingir o limite de seus PE por rodada. <em>Pré-requisito:</em> NEX 60%.</p>'
      },
      {
        name: 'Sentido Tático',
        description: '<p>Você pode gastar uma ação de movimento e 2 PE para analisar o ambiente. Se fizer isso, recebe um bônus em Defesa e em testes de resistência igual ao seu Intelecto até o final da cena. <em>Pré-requisitos:</em> treinado em Percepção e Tática.</p>'
      },
      {
        name: 'Tanque de Guerra',
        description: '<p>Se estiver usando uma proteção pesada, a Defesa e a resistência a dano que ela fornece aumentam em +2. <em>Pré-requisito:</em> Proteção Pesada.</p>'
      },
      {
        name: 'Tiro Certeiro',
        description: '<p>Se estiver usando uma arma de disparo, você soma sua Agilidade nas rolagens de dano e ignora a penalidade contra alvos envolvidos em combate corpo a corpo (mesmo se não usar a ação mirar). <em>Pré-requisito:</em> treinado em Pontaria.</p>'
      },
      {
        name: 'Tiro de Cobertura',
        description: '<p>Você pode gastar uma ação padrão e 1 PE para disparar uma arma de fogo na direção de um personagem no alcance da arma apenas para forçá-lo a se proteger. Faça um teste de Pontaria contra a Vontade do alvo. Se vencer, até o início do seu próximo turno o alvo não pode sair do lugar onde está e sofre –5 em testes de ataque. A critério do mestre, o alvo recebe +5 no teste de Vontade se estiver em um lugar extremamente perigoso, como uma casa em chamas ou um barco afundando. Este é um efeito de medo.</p>'
      },
      {
        name: 'Transcender',
        description: '<p>Escolha um poder paranormal. Você recebe o poder escolhido, mas não ganha Sanidade neste aumento de NEX. Você pode escolher este poder várias vezes.</p>'
      },
      {
        name: 'Treinamento em Perícia',
        description: '<p>Escolha duas perícias. Você se torna treinado nessas perícias. A partir de NEX 35%, você pode escolher perícias nas quais já é treinado para se tornar veterano. A partir de NEX 70%, pode escolher perícias nas quais já é veterano para se tornar expert. Você pode escolher este poder várias vezes.</p>'
      },
    ],
    paths: [
      {
        name: 'Aniquilador',
        description: '<p>Você é treinado para abater alvos com eficiência e velocidade. Suas armas são suas melhores amigas e você cuida tão bem delas quanto de seus companheiros de equipe. Talvez até melhor.</p>',
        abilities: [
          {
            name: 'NEX 10% - A Favorita',
            description: '<p>Escolha uma arma para ser sua favorita, como katana ou fuzil de assalto. A categoria da arma escolhida é reduzida em I.</p>'
          },
          {
            name: 'NEX 40% - Técnica Secreta',
            description: '<p>A categoria da arma favorita passa a ser reduzida em II. Quando faz um ataque com ela, você pode gastar 2 PE para executar um dos efeitos abaixo como parte do ataque. Você pode adicionar mais efeitos gastando +2 PE por efeito adicional.</p><p><span><em>Amplo.</em></span> O ataque pode atingir um alvo adicional em seu alcance e adjacente ao original (use o mesmo teste de ataque para ambos).</p><p><span><em>Destruidor.</em></span> Aumenta o multiplicador de crítico da arma em +1.</p>'
          },
          {
            name: 'NEX 65% - Técnica Sublime',
            description: '<p>A categoria da arma favorita passa a ser reduzida em III e você adiciona os seguintes efeitos à lista de sua Técnica Secreta:</p><p><span>Letal.</span> Aumenta a margem de ameaça em +2. Você pode escolher este efeito duas vezes para aumentar a margem de ameaça em +5.</p><p><span><em>Perfurante.</em></span> Ignora até 5 pontos de resistência a dano de qualquer tipo do alvo.</p>'
          },
          {
            name: 'NEX 99% - Máquina de Matar',
            description: '<p>A categoria da arma favorita passa a ser reduzida em III, ela recebe +2 na margem de ameaça e seu dano aumenta em um dado do mesmo tipo.</p>'
          },
        ]
      },
      {
        name: 'Comandante de Campo',
        description: '<p>Sem um oficial uma batalha não passa de uma briga de bar. Você é treinado para coordenar e auxiliar seus companheiros em combate, tomando decisões rápidas e tirando melhor proveito da situação e do talento de seus aliados.</p>',
        abilities: [
          {
            name: 'NEX 10% - Inspirar Confiança',
            description: '<p>Sua liderança inspira seus aliados. Você pode gastar uma reação e 2 PE para fazer um aliado em alcance curto rolar novamente um teste recém realizado.</p>'
          },
          {
            name: 'NEX 40% - Estrategista',
            description: '<p>Você pode direcionar aliados em alcance curto. Gaste uma ação padrão e 1 PE por aliado que quiser direcionar (limitado pelo seu Intelecto). No próximo turno dos aliados afetados, eles ganham uma ação de movimento adicional.</p>'
          },
          {
            name: 'NEX 65% - Brecha na Guarda',
            description: '<p>Uma vez por rodada, quando um aliado causar dano em um inimigo que esteja em seu alcance curto, você pode gastar uma reação e 2 PE para que você ou outro aliado em alcance curto faça um ataque adicional contra o mesmo inimigo. Além disso, o alcance de inspirar confiança e estrategista aumenta para médio.</p>'
          },
          {
            name: 'NEX 99% - Oficial Comandante',
            description: '<p>Você pode gastar uma ação padrão e 5 PE para que cada aliado que você possa ver em alcance médio receba uma ação padrão adicional no próximo turno dele.</p>'
          },
        ]
      },
      {
        name: 'Guerreiro',
        description: '<p>Você treinou sua musculatura e movimentos a ponto de transformar seu corpo em uma verdadeira arma. Com golpes corpo a corpo tão poderosos quanto uma bala, você encara os perigos de frente.</p>',
        abilities: [
          {
            name: 'NEX 10% - Técnica Letal',
            description: '<p>Você recebe um aumento de +2 na margem de ameaça com todos os seus ataques corpo a corpo.</p>'
          },
          {
            name: 'NEX 40% - Revidar',
            description: '<p>Sempre que bloquear um ataque, você pode gastar uma reação e 2 PE para fazer um ataque corpo a corpo no inimigo que o atacou.</p>'
          },
          {
            name: 'NEX 65% - Força Opressora',
            description: '<p>Quando acerta um ataque corpo a corpo, você pode gastar 1 PE para realizar uma manobra derrubar ou empurrar contra o alvo do ataque como ação livre. Se escolher empurrar, recebe um bônus de +5 para cada 10 pontos de dano que causou no alvo. Se escolher derrubar e vencer no teste oposto, você pode gastar 1 PE para fazer um ataque adicional contra o alvo caído.</p>'
          },
          {
            name: 'NEX 99% - Potência Máxima',
            description: '<p>Quando usa seu Ataque Especial com armas corpo a corpo, todos os bônus numéricos são dobrados. Por exemplo, se usar 5 PE para receber +5 no ataque e +15 no dano, você recebe +10 no ataque e +30 no dano.</p>'
          },
        ]
      },
      {
        name: 'Operações Especiais',
        description: '<p>Você é um combatente eficaz, e suas ações são calculadas e otimizadas, sempre antevendo os movimentos inimigos e se posicionando da maneira mais inteligente no campo de batalha.</p>',
        abilities: [
          {
            name: 'NEX 10% - Iniciativa Aprimorada',
            description: '<p>Você recebe +5 em Iniciativa e recebe uma ação de movimento adicional na primeira rodada.</p>'
          },
          {
            name: 'NEX 40% - Ataque Extra',
            description: '<p>Uma vez por rodada, quando faz um ataque, você pode gastar 2 PE para fazer um ataque adicional.</p>'
          },
          {
            name: 'NEX 65% - Surto de Adrenalina',
            description: '<p>Uma vez por rodada, você pode gastar 5 PE para realizar uma ação padrão ou de movimento adicional.</p>'
          },
          {
            name: 'NEX 99% - Sempre Alerta',
            description: '<p>Você recebe uma ação padrão adicional no início de cada cena de combate.</p>'
          },
        ]
      },
      {
        name: 'Tropa de Choque',
        description: '<p>Você é duro na queda. Treinou seu corpo para resistir a traumas f ísicos, tornando-o praticamente inquebrável, e por isso não teme se colocar entre seus aliados e o perigo.</p>',
        abilities: [
          {
            name: 'NEX 10% - Casca Grossa',
            description: '<p>Você recebe +1 PV para cada 5% de NEX e, quando faz um bloqueio, soma seu Vigor na resistência a dano recebida.</p>'
          },
          {
            name: 'NEX 40% - Cai Dentro',
            description: '<p>Sempre que um oponente em alcance curto ataca um de seus aliados, você pode gastar uma reação e 1 PE para fazer com que esse oponente faça um teste de Vontade (DT Vig). Se falhar, o oponente deve atacar você em vez de seu aliado. Este poder só funciona se você puder ser efetivamente atacado e estiver no alcance do ataque (por exemplo, adjacente a um oponente atacando em corpo a corpo ou dentro do alcance de uma arma de ataque à distância). Um oponente que passe no teste de Vontade não pode ser afetado por seu poder Cai Dentro até o final da cena.</p>'
          },
          {
            name: 'NEX 65% - Duro de Matar',
            description: '<p>Ao sofrer dano não paranormal, você pode gastar uma reação e 2 PE para reduzir esse dano à metade. Em NEX 85%, você pode usar esta habilidade para reduzir dano paranormal.</p>'
          },
          {
            name: 'NEX 99% - Inquebrável',
            description: '<p>Enquanto estiver machucado, você recebe +5 na Defesa e resistência a dano 5. Enquanto estiver morrendo, em vez do normal, você não fica indefeso e ainda pode realizar ações. Você ainda segue as regras de morte normalmente.</p>'
          },
        ]
      },
    ],
    table: [
      'Ataque especial (2 PE, +5)',
      'Habilidade de trilha',
      'Poder de combatente',
      'Aumento de atributo',
      'Ataque especial (3 PE, +10)',
      'Poder de combatente',
      'Grau de treinamento',
      'Habilidade de trilha',
      'Poder de combatente',
      'Aumento de atributo, versatilidade',
      'Ataque especial (4 PE, +15)',
      'Poder de combatente',
      'Habilidade de trilha',
      'Grau de treinamento',
      'Poder de combatente',
      'Aumento de atributo',
      'Ataque especial (5 PE, +20)',
      'Poder de combatente',
      'Aumento de atributo',
      'Habilidade de trilha',
    ]
  },
  {
    name: 'Especialista',
    shortDescription: 'Um agente que confia mais em esperteza do que em força bruta. Um especialista se vale de conhecimento técnico, raciocínio rápido ou mesmo lábia para resolver mistérios e enfrentar o paranormal.',
    description: '<p>Cientistas, inventores, pesquisadores e técnicos de vários tipos são exemplos de especialistas, que são tão variados quanto as áreas do conhecimento e da tecnologia. Alguns ainda preferem estudar engenharia social e se tornam excelentes espiões infiltrados, ou mesmo estudam técnicas especiais de combate como artes marciais e tiro a distância, aliando conhecimento técnico e habilidade.</p><p>O que une todos os especialistas é sua incrível capacidade de aprender e improvisar usando seu intelecto e conhecimento avançado, que pode tirar o grupo todo dos mais diversos tipos de enrascadas.</p><p><span>Especialistas Famosos: </span>Aaron, Arthur Cervero, Rubens Naluti, Elizabeth Webber, Samuel Norte, Chizue Akechi.</p>',
    initialPv: 16,
    levelPv: 3,
    initialPe: 3,
    levelPe: 3,
    initialSan: 16,
    levelSan: 4,
    trainedSkills: {
      skills: [],
      optionSkils: [],
      quantity: 7
    },
    proficiencies: ['Armas simples', 'Proteções leves'],
    proficienciesGradeQuantity: 5,
    abilities: [
      {
        name: 'Eclético',
        description: 'Quando faz um teste de uma perícia, você pode gastar 2 PE para receber os benefícios de ser treinado nesta perícia.'
      },
      {
        name: 'Perito',
        description: 'Escolha duas perícias nas quais você é treinado (exceto Luta e Pontaria). Quando faz um teste de uma dessas perícias, você pode gastar 2 PE para somar +1d6 no resultado do teste. Conforme avança de NEX, você pode gastar +1 PE para aumentar o dado de bônus. Por exemplo, em NEX 55%, pode gastar 4 PE para receber +1d12 no teste.'
      },
    ],
    powers: [
      {
        name: 'Artista Marcial',
        description: '<p>Seus ataques desarmados causam 1d6 pontos de dano, podem causar dano letal e contam como armas ágeis. Em NEX 35%, o dano aumenta para 1d8 e, em NEX 70%, para 1d10.</p>'
      },
      {
        name: 'Balística Avançada',
        description: '<p>Você recebe proficiência com armas táticas de fogo e +2 em rolagens de dano com essas armas.</p>'
      },
      {
        name: 'Conhecimento Aplicado',
        description: '<p>Quando faz um teste de perícia (exceto Luta e Pontaria), você pode gastar 2 PE para mudar o atributo-base da perícia para Int. <em>Pré-requisito:</em> Int 2.</p>'
      },
      {
        name: 'Engenhosidade',
        description: 'Em NEX 40%, quando usa sua habilidade Eclético, você pode gastar 2 PE adicionais para receber os benefícios de ser veterano na perícia. Em NEX 75%, pode gastar 4 PE adicionais para receber os benefícios de ser expert na perícia.'
      },
      {
        name: 'Hacker',
        description: '<p>Você recebe +5 em testes de Tecnologia para invadir sistemas e diminui o tempo necessário para hackear qualquer sistema para uma ação completa. <em>Pré-requisito:</em> treinado em Tecnologia.</p>'
      },
      {
        name: 'Mãos Rápidas',
        description: '<p>Ao fazer um teste de Crime, você pode pagar 1 PE para fazê-lo como uma ação livre. <em>Pré-requisitos:</em> Agi 3, treinado em Crime.</p>'
      },
      {
        name: 'Mochila de Utilidades',
        description: '<p>Um item a sua escolha (exceto armas) conta como uma categoria abaixo e ocupa 1 espaço a menos.</p>'
      },
      {
        name: 'Movimento Tático',
        description: '<p>Você pode gastar 1 PE para ignorar a penalidade em deslocamento por terreno difícil e por escalar até o final do turno. <em>Pré-requisito:</em> treinado em Atletismo.</p>'
      },
      {
        name: 'Na Trilha Certa',
        description: '<p>Sempre que tiver sucesso em um teste para procurar pistas, você pode gastar 1 PE para receber +1d20 no próximo teste. Os custos e os bônus são cumulativos (se passar num segundo teste, pode pagar 2 PE para receber um total de +2d20 no próximo teste, e assim por diante).</p>'
      },
      {
        name: 'Nerd',
        description: '<p>Você é um repositório de conhecimento útil (e inútil). Uma vez por cena, pode gastar 2 PE para fazer um teste de Atualidades (DT 20). Se passar, recebe uma informação útil para essa cena (se for uma investigação, uma dica para uma pista; se for um combate, uma fraqueza de um inimigo, e assim por diante). A fonte da informação pode ser desde um livro antigo que você leu na biblioteca até um episódio de sua série de ficção favorita.</p>'
      },
      {
        name: 'Ninja Urbano',
        description: '<p>Você recebe proficiência com armas táticas de ataque corpo a corpo e de disparo (exceto de fogo) +2 em rolagens de dano com essas armas.</p>'
      },
      {
        name: 'Pensamento Ágil',
        description: '<p>Uma vez por rodada, durante uma cena de investigação, você pode gastar 2 PE para fazer uma ação de procurar pistas adicional.</p>'
      },
      {
        name: 'Perito em Explosivos',
        description: '<p>Você soma seu Intelecto na DT para resistir aos seus explosivos e pode excluir dos efeitos da explosão um número de alvos igual ao seu valor de Intelecto.</p>'
      },
      {
        name: 'Primeira Impressão',
        description: '<p>Você recebe +2d20 no primeiro teste de Diplomacia, Enganação, Intimidação ou Intuição que fizer em uma cena.</p>'
      },
      {
        name: 'Transcender',
        description: '<p>Escolha um poder paranormal. Você recebe o poder escolhido, mas não ganha Sanidade neste aumento de NEX. Você pode escolher este poder várias vezes.</p>'
      },
      {
        name: 'Treinamento em Perícia',
        description: '<p>Escolha duas perícias. Você se torna treinado nessas perícias. A partir de NEX 35%, você pode escolher perícias nas quais já é treinado para se tornar veterano. A partir de NEX 70%, pode escolher perícias nas quais já é veterano para se tornar expert. Você pode escolher este poder várias vezes.</p>'
      },
    ],
    paths: [
      {
        name: 'Atirador de Elite',
        description: '<p>Um tiro, uma morte. Ao contrário dos combatentes, você é perito em neutralizar ameaças de longe, terminando uma briga antes mesmo que ela comece. Você trata sua arma como uma ferramenta de precisão, sendo capaz de executar façanhas incríveis.</p>',
        abilities: [
          {
            name: 'NEX 10% - Mira de Elite',
            description: '<p>Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto em rolagens de dano com essas armas.</p>'
          },
          {
            name: 'NEX 40% - Disparo Letal',
            description: '<p>Quando faz a ação mirar você pode gastar 1 PE para aumentar em +2 a margem de ameaça do próximo ataque que fizer até o final de seu próximo turno.</p>'
          },
          {
            name: 'NEX 65% - Disparo Impactante',
            description: '<p>Se estiver usando uma arma de fogo com calibre grosso você pode gastar 2 PE para fazer as manobras derrubar, desarmar, empurrar e quebrar usando um ataque a distância.</p>'
          },
          {
            name: 'NEX 99% - Atirar para Matar',
            description: '<p>Quando faz um acerto crítico com uma arma de fogo, você causa dano máximo, sem precisar rolar dados.</p>'
          },
        ]
      },
      {
        name: 'Infiltrador',
        description: '<p>Você é um perito em infiltração e sabe neutralizar alvos desprevenidos sem causar alarde. Combinando talento acrobático, destreza manual e conhecimento técnico você é capaz de superar qualquer barreira de defesa, mesmo quando a missão parece impossível.</p>',
        abilities: [
          {
            name: 'NEX 10% - Ataque Furtivo',
            description: '<p>Você sabe atingir os pontos vitais de um inimigo distraído. Uma vez por rodada, quando atinge um alvo desprevenido com um ataque corpo a corpo ou em alcance curto, ou um alvo que você esteja flanqueando, você pode gastar 1 PE para causar +1d6 pontos de dano do mesmo tipo da arma. Em NEX 40% o dano adicional aumenta para +2d6, em NEX 65% aumenta para +3d6 e em NEX 99% aumenta para +4d6.</p>'
          },
          {
            name: 'NEX 40% - Gatuno',
            description: '<p>Você recebe +5 em Atletismo e Crime e pode percorrer seu deslocamento normal quando e se esconder sem penalidade (veja a perícia Furtividade).</p>'
          },
          {
            name: 'NEX 65% - Assassinar',
            description: '<p>Você pode gastar uma ação de movimento e 3 PE para analisar um alvo em alcance curto. Até o fim de seu próximo turno, seu primeiro Ataque Furtivo que causar dano a ele tem seus dados de dano extras dessa habilidade dobrados. Além disso, se sofrer dano de seu ataque, o alvo fica inconsciente ou morrendo, à sua escolha (Fortitude DT Agi evita).</p>'
          },
          {
            name: 'NEX 99% - Sombra Fugaz',
            description: '<p>Quando faz um teste de Furtividade após atacar ou fazer outra ação chamativa, você pode gastar 3 PE para não sofrer a penalidade de –15 no teste.</p>'
          },
        ]
      },
      {
        name: 'Médico de Campo',
        description: '<p>Você é treinado em técnicas de primeiros socorros e tratamento de emergência, o que torna você um membro valioso para qualquer grupo de agentes. Ao contrário dos profissionais de saúde convencionais, você está acostumado com o campo de batalha e sabe tomar decisões rápidas no meio do caos.</p><p><span>Especial: </span>para escolher esta trilha, você precisa ser treinado em Medicina. Para usar as habilidades desta trilha, você precisa possuir um kit de medicina.</p>',
        abilities: [
          {
            name: 'NEX 10% - Paramédico',
            description: '<p>Você pode usar uma ação padrão e 2 PE para curar 2d10 pontos de vida de um aliado adjacente. Você pode curar +1d10 PV respectivamente em NEX 40%, 65% e 99%, gastando +1 PE por dado adicional de cura.</p>'
          },
          {
            name: 'NEX 40% - Equipe de Trauma',
            description: '<p>Você pode usar uma ação padrão e 2 PE para remover uma condição negativa (exceto morrendo) de um aliado adjacente.</p>'
          },
          {
            name: 'NEX 65% - Resgate',
            description: '<p>Uma vez por rodada, se estiver em alcance curto de um aliado machucado ou morrendo, você pode se aproximar do aliado com uma ação livre (desde que seja capaz de fazê-lo usando seu deslocamento normal). Além disso, sempre que curar PV ou remover condições do aliado, você e o aliado recebem +5 na Defesa até o início de seu próximo turno. Por fim, para você, o total de espaços ocupados por carregar um personagem é reduzido pela metade.</p>'
          },
          {
            name: 'NEX 99% - Reanimação',
            description: '<p>Uma vez por cena, você pode gastar uma ação completa e 10 PE para trazer de volta a vida um personagem que tenha morrido na mesma cena (exceto morte por dano massivo).</p>'
          },
        ]
      },
      {
        name: 'Negociador',
        description: '<p>Você é um diplomata habilidoso e consegue influenciar outras pessoas, seja por lábia ou intimidação. Sua capacidade de avaliar situações com rapidez e eficiência pode tirar o grupo de apuros que nem a mais poderosa das armas poderia resolver.</p>',
        abilities: [
          {
            name: 'NEX 10% - Eloquência',
            description: '<p>Você pode usar uma ação completa e 1 PE por alvo em alcance curto para afetar outros personagens com sua fala. Faça um teste de Diplomacia, Enganação ou Intimidação contra a Vontade dos alvos. Se você vencer, os alvos ficam fascinados enquanto você se concentrar (uma ação padrão por rodada). Um alvo hostil ou que esteja envolvido em combate recebe +5 em seu teste de resistência e tem direito a um novo teste por rodada, sempre que você se concentrar Um personagem que passar no teste fica imune a este efeito por um dia.</p>'
          },
          {
            name: 'NEX 40% - Discurso Motivador',
            description: '<p>Você pode gastar uma ação padrão e 4 PE para inspirar seus aliados com suas palavras. Você e todos os seus aliados em alcance curto ganham +1d20 em testes de perícia até o fim da cena. A partir de NEX 65%, você pode gastar 8 PE para fornecer um bônus total de +2d20.</p>'
          },
          {
            name: 'NEX 65% - Eu Conheço um Cara',
            description: '<p>Uma vez por missão, você pode ativar sua rede de contatos para pedir um favor, como por exemplo trocar todo o equipamento do seu grupo (como se tivesse uma segunda fase de preparação de missão), conseguir um local de descanso ou mesmo ser resgatado de uma cena. O mestre tem a palavra final de quando é possível usar essa habilidade e quais favores podem ser obtidos.</p>'
          },
          {
            name: 'NEX 99% - Truque de Mestre',
            description: '<p>Acostumado a uma vida de fingimento e manipulação, você pode gastar 5 PE para simular o efeito de qualquer habilidade que você tenha visto um de seus aliados usar durante a cena. Você ignora os pré-requisitos da habilidade, mas ainda precisa pagar todos os seus custos, incluindo ações, PE e materiais, e ela usa os seus parâmetros de jogo, como se você estivesse usando a habilidade em questão.</p>'
          },
        ]
      },
      {
        name: 'Técnico',
        description: '<p>Sua principal habilidade é a manutenção e reparo do valioso equipamento que seu time carrega em missão. Seu conhecimento técnico também permite que improvise ferramentas com o que tiver à disposição e sabote os itens usados por seus inimigos.</p>',
        abilities: [
          {
            name: 'NEX 10% - Inventário Otimizado',
            description: '<p>Você soma seu Intelecto à sua Força para calcular seu valor de inventário. Por exemplo, se você tem Força 1 e Intelecto 3, seu inventário tem 20 espaços.</p>'
          },
          {
            name: 'NEX 40% - Remendão',
            description: '<p>Você pode gastar uma ação completa e 1 PE para remover a condição quebrado de um equipamento adjacente até o final da cena. Além disso, qualquer equipamento de investigação tem sua categoria reduzida em I para você.</p>'
          },
          {
            name: 'NEX 65% - Improvisar',
            description: '<p>Você pode improvisar equipamentos com materiais ao seu redor. Escolha um equipamento de investigação e gaste uma ação completa e 2 PE, mais 2 PE por categoria do item escolhido. Você cria uma versão funcional do equipamento, que segue suas regras de espaço e categoria como normal. Ao final da cena, seu equipamento improvisado se torna inútil.</p>'
          },
          {
            name: 'NEX 99% - Preparado para Tudo',
            description: '<p>Você sempre tem o que precisa para qualquer situação. Sempre que precisar de um item qualquer (exceto armas), pode gastar uma ação de movimento e 3 PE por categoria do item para lembrar que colocou ele no fundo da bolsa! Depois de encontrado, o item segue normalmente as regras de inventário.</p>'
          },
        ]
      },
    ],
    table: [
      'Eclético, perito (2 PE, +1d6)',
      'Habilidade de trilha',
      'Poder de especialista',
      'Aumento de atributo',
      'Perito (3 PE, +1d8)',
      'Poder de especialista',
      'Grau de treinamento',
      'Engenhosidade (veterano), habilidade de trilha',
      'Poder de especialista',
      'Aumento de atributo, versatilidade',
      'Perito (4 PE, +1d10)',
      'Poder de especialista',
      'Habilidade de trilha',
      'Grau de treinamento',
      'Engenhosidade (expert), poder de especialista',
      'Aumento de atributo',
      'Perito (5 PE, +1d12)',
      'Poder de especialista',
      'Aumento de atributo',
      'Habilidade de trilha',
    ]
  },
  {
    name: 'Ocultista',
    shortDescription: 'O Outro Lado é misterioso, perigoso e, de certa forma, cativante. Muitos estudiosos das entidades se perdem em seus reinos obscuros em busca de poder, mas existem aqueles que visam compreender e dominar os mistérios paranormais para usá-los para combater o próprio Outro Lado. Esse tipo de agente não é apenas um conhecedor do oculto, como também possui talento para se conectar com elementos paranormais.',
    description: '<p>Ao contrário da crendice popular, ocultistas não são intrinsecamente malignos. Seria como dizer que o cientista que inventou a pólvora é culpado pelo assassino que disparou o revólver. Para a Ordem, o Paranormal é uma força que pode ser usada para os mais diversos propósitos, de acordo com a intenção de seu usuário.</p><p>Ocultistas aplicam seu conhecimento acadêmico e suas capacidades de conjuração de rituais em missões para investigar e combater o Paranormal em todas as suas formas, principalmente quando munição convencional não é o suficiente para lidar com a tarefa.</p><p><span>Ocultistas Famosos:</span> Agatha Volkomenn, Dante, Arnaldo Fritz, Marc Menet, Kian.</p>',
    initialPv: 12,
    levelPv: 2,
    initialPe: 4,
    levelPe: 4,
    initialSan: 20,
    levelSan: 5,
    trainedSkills: {
      skills: ['Ocultismo','Vontade'],
      optionSkils: [],
      quantity: 3
    },
    proficiencies: ['Armas simples'],
    proficienciesGradeQuantity: 3,
    abilities: [
      {
        name: 'Escolhido pelo Outro Lado',
        description: 'Você teve uma experiência paranormal e foi marcado pelo Outro Lado, absorvendo o conhecimento e poder necessários para realizar rituais. Você pode lançar rituais de 1º círculo. À medida que aumenta seu NEX, pode lançar rituais de círculos maiores (2º círculo em NEX 25%, 3º círculo em NEX 55% e 4º círculo em NEX 85%). Você começa com três rituais de 1º círculo. Sempre que avança de NEX, aprende um ritual de qualquer círculo que possa lançar. Esses rituais não contam no seu limite de rituais conhecidos.'
      },
    ],
    powers: [
      {
        name: 'Camuflar Ocultismo',
        description: '<p>Você pode gastar uma ação livre para esconder símbolos e sigilos que estejam desenhados ou gravados em objetos ou em sua pele, tornando-os invisíveis para outras pessoas além de você mesmo. Além disso, quando lança um ritual, pode gastar +2 PE para lançá-lo sem usar componentes ritualísticos e sem gesticular (o que permite conjurar um ritual com as mãos presas), usando apenas concentração. Outros seres só perceberão que você lançou uma ritual se passarem num teste de Ocultismo (DT 25).</p>'
      },
      {
        name: 'Criar Selo',
        description: '<p>Você sabe fabricar selos paranormais de rituais que conheça. Fabricar um selo gasta uma ação de interlúdio e um número de PE iguais ao custo de conjurar o ritual. Você pode ter um número máximo de selos criados a qualquer momento igual à sua Presença.</p>'
      },
      {
        name: 'Envolto em Mistério',
        description: '<p>Sua aparência e postura assombrosas o permitem manipular e assustar pessoas ignorantes ou supersticiosas. O mestre define o que exatamente você pode fazer e quem se encaixa nessa descrição. Como regra geral, você recebe +5 em Enganação e Intimidação contra pessoas não treinadas em Ocultismo.</p>'
      },
      {
        name: 'Especialista em Elemento',
        description: '<p>Escolha um elemento. A DT para resistir aos seus rituais desse elemento aumenta em +2.</p>'
      },
      {
        name: 'Ferramentas Paranormais',
        description: '<p>Você reduz a categoria de um item paranormal em I e pode ativar itens paranormais sem pagar seu custo em PE.</p>'
      },
      {
        name: 'Fluxo de Poder',
        description: '<p>Você pode manter dois efeitos sustentados de rituais ativos simultaneamente com apenas uma ação livre, pagando o custo de cada efeito separadamente. <em>Pré-requisito:</em> NEX 60%.</p>'
      },
      {
        name: 'Guiado pelo Paranormal',
        description: '<p>Uma vez por cena, você pode gastar 2 PE para fazer uma ação de investigação adicional.</p>'
      },
      {
        name: 'Identificação Paranormal',
        description: '<p>Você recebe +10 em testes de Ocultismo para identificar criaturas, objetos ou rituais.</p>'
      },
      {
        name: 'Improvisar Componentes',
        description: '<p>Uma vez por cena, você pode gastar uma ação completa para fazer um teste de Investigação (DT 15). Se passar, encontra objetos que podem servir como componentes ritualísticos de um elemento à sua escolha. O mestre define se é possível usar esse poder na cena atual.</p>'
      },
      {
        name: 'Intuição Paranormal',
        description: '<p>Sempre que usa a ação facilitar investigação, você soma seu Intelecto ou Presença no teste (à sua escolha).</p>'
      },
      {
        name: 'Mestre em Elemento',
        description: '<p>Escolha um elemento. O custo para lançar rituais desse elemento diminui em –1 PE. <em>Pré-requisitos:</em> Especialista em Elemento no elemento escolhido, NEX 45%.</p>'
      },
      {
        name: 'Ritual Potente',
        description: '<p>Você soma seu Intelecto nas rolagens de dano ou nos efeitos de cura de seus rituais. <em>Pré-requisito:</em> Int 2.</p>'
      },
      {
        name: 'Ritual Predileto',
        description: '<p>Escolha um ritual que você conhece. Você reduz em –1 PE o custo do ritual. Essa redução se acumula com reduções fornecidas por outras fontes.</p>'
      },
      {
        name: 'Tatuagem Ritualística',
        description: '<p>Símbolos marcados em sua pele reduzem em –1 PE o custo de rituais de alcance pessoal que têm você como alvo.</p>'
      },
      {
        name: 'Transcender',
        description: '<p>Escolha um poder paranormal. Você recebe o poder escolhido, mas não ganha Sanidade neste aumento de NEX. Você pode escolher este poder várias vezes.</p>'
      },
      {
        name: 'Treinamento em Perícia',
        description: '<p>Escolha duas perícias. Você se torna treinado nessas perícias. A partir de NEX 35%, você pode escolher perícias nas quais já é treinado para se tornar veterano. A partir de NEX 70%, pode escolher perícias nas quais já é veterano para se tornar expert. Você pode escolher este poder várias vezes.</p>'
      },
    ],
    paths: [
      {
        name: 'Conduíte',
        description: '<p>Você domina os aspectos fundamentais da conjuração de rituais e é capaz de aumentar o alcance e velocidade de suas conjurações. Conforme sua conexão com as entidades paranormais aumenta você se torna capaz de interferir com os rituais de outros ocultistas.</p>',
        abilities: [
          {
            name: 'NEX 10% - Ampliar Ritual',
            description: '<p>Quando lança um ritual, você pode gastar +2 PE para aumentar seu alcance em um passo (de curto para médio, de médio para longo ou de longo para extremo) ou dobrar sua área de efeito.</p>'
          },
          {
            name: 'NEX 40% - Acelerar Ritual',
            description: '<p>Uma vez por rodada, você pode aumentar o custo de um ritual em 4 PE para conjurá-lo como uma ação livre.</p>'
          },
          {
            name: 'NEX 65% - Anular Ritual',
            description: '<p>Quando for alvo de um ritual, você pode gastar uma quantidade de PE igual ao custo pago por esse ritual e fazer um teste oposto de Ocultismo contra o conjurador. Se vencer, você anula o ritual, cancelando todos os seus efeitos.</p>'
          },
          {
            name: 'NEX 99% - Canalizar o Medo',
            description: '<p>Você aprende o ritual Canalizar o Medo.</p>'
          },
        ]
      },
      {
        name: 'Flagelador',
        description: '<p>Dor é um poderoso catalisador Paranormal e você aprendeu a transformá-la em poder para seus rituais. Quando se torna especialmente poderoso, consegue usar a dor e o sofrimento de seus inimigos como instrumento de seus rituais ocultistas.</p>',
        abilities: [
          {
            name: 'NEX 10% - Poder do Flagelo',
            description: '<p>Ao conjurar um ritual, você pode gastar seus próprios pontos de vida para pagar o custo em pontos de esforço, à taxa de 2 PV por PE pago. Pontos de vida gastos dessa forma só podem ser recuperados com descanso.</p>'
          },
          {
            name: 'NEX 40% - Abraçar a Dor',
            description: '<p>Sempre que sofrer dano não paranormal, você pode gastar uma reação e 2 PE para reduzir esse dano à metade.</p>'
          },
          {
            name: 'NEX 65% - Absorver Agonia',
            description: '<p>Sempre que reduz um ou mais inimigos a 0 PV com um ritual, você recebe uma quantidade de PE temporários igual ao círculo do ritual utilizado. Por exemplo, se ativar esse poder com um ritual de 2º círculo, receberá 2 PE.</p>'
          },
          {
            name: 'NEX 99% - Medo Tangível',
            description: '<p>Você aprende o ritual Medo Tangível.</p>'
          },
        ]
      },
      {
        name: 'Graduado',
        description: '<p>Você foca seus estudos em se tornar um conjurador versátil e poderoso, conhecendo mais rituais que os outros ocultistas e sendo capaz de torná-los mais difíceis de serem resistidos. Seu objetivo é desvendar e dominar os segredos do Outro Lado a fundo, custe o que custar</p>',
        abilities: [
          {
            name: 'NEX 10% - Saber Ampliado',
            description: '<p>Você aprende um ritual de 1º círculo. Toda vez que ganha acesso a um novo círculo, aprende um ritual adicional daquele círculo. Esses rituais não contam no seu limite de rituais.</p>'
          },
          {
            name: 'NEX 40% - Grimório Ritualístico',
            description: '<p>Você cria um grimório especial, que armazena rituais que sua mente não seria capaz de guardar. Você aprende uma quantidade de rituais de 1º ou 2º círculos igual ao seu Intelecto. Quando ganha acesso a um novo círculo, pode incluir um novo ritual desse círculo em seu grimório. Esses rituais não contam em seu limite de rituais conhecidos. Para conjurar um ritual armazenado em seu grimório, você precisa antes gastar uma ação completa folheando o grimório e relembrando o ritual. O grimório ocupa 1 espaço em seu inventário. Se perdê-lo, você pode replicá-lo com uma semana de trabalho.</p>'
          },
          {
            name: 'NEX 65% - Rituais Eficientes',
            description: '<p>A DT para resistir a todos os seus rituais aumenta em +5.</p>'
          },
          {
            name: 'NEX 99% - Conhecendo o Medo',
            description: '<p>Você aprende o ritual Conhecendo o Medo.</p>'
          },
        ]
      },
      {
        name: 'Intuitivo',
        description: '<p>Assim como combatentes treinam seus corpos para resistir a traumas físicos, você preparou sua mente para resistir aos efeitos do Outro Lado. Seu foco e força de vontade fazem com que você expanda os limites de suas capacidades paranormais.</p>',
        abilities: [
          {
            name: 'NEX 10% - Mente Sã',
            description: '<p>Você compreende melhor as entidades do Outro Lado, e passa a ser menos abalado por seus efeitos. Você recebe resistência paranormal +5 (+5 em testes de resistência contra efeitos paranormais).</p>'
          },
          {
            name: 'NEX 40% - Presença Poderosa',
            description: '<p>Sua resiliência mental faz com que você possa extrair mais do Outro Lado. Você adiciona sua Presença ao seu limite de PE por turno, mas apenas para conjurar rituais (não para DT).</p>'
          },
          {
            name: 'NEX 65% - Inabalável',
            description: '<p>Você recebe resistência a dano mental e paranormal 10. Além disso, quando é alvo de um efeito paranormal que permite um teste de Vontade para reduzir o dano à metade, você não sofre dano algum se passar.</p>'
          },
          {
            name: 'NEX 99% - Presença do Medo',
            description: '<p>Você aprende o ritual Presença do Medo.</p>'
          },
        ]
      },
      {
        name: 'Lâmina Paranormal',
        description: '<p>Alguns ocultistas preferem ficar fechados em suas bibliotecas estudando livros e rituais. Outros preferem investigar fenômenos paranormais em sua fonte. Já você, prefere usar o paranormal como uma arma. Você aprendeu e dominou técnicas de luta mesclando suas habilidades de conjuração com suas capacidades de combate. Apesar do nome, membros dessa trilha podem utilizar tanto armas corpo a corpo quanto de ataque à distância.</p>',
        abilities: [
          {
            name: 'NEX 10% - Lâmina Maldita',
            description: '<p>Você aprende o ritual Amaldiçoar Arma. Se já o conhece, seu custo é reduzido em –1 PE. Além disso, quando conjura esse ritual, você pode usar Ocultismo, em vez de Luta ou Pontaria, para testes de ataque com a arma amaldiçoada.</p>'
          },
          {
            name: 'NEX 40% - Gladiador Paranormal',
            description: '<p>Sempre que acerta um ataque corpo a corpo em um inimigo, você recebe 2 PE temporários. Você pode ganhar um máximo de PE temporários por cena igual ao seu limite de PE. PE temporários desaparecem no final da cena.</p>'
          },
          {
            name: 'NEX 65% - Conjuração Marcial',
            description: '<p>Uma vez por rodada, quando você lança um ritual com execução de uma ação padrão, pode gastar 2 PE para fazer um ataque corpo a corpo como uma ação livre.</p>'
          },
          {
            name: 'NEX 99% - Lâmina do Medo',
            description: '<p>Você aprende o ritual Lâmina do Medo.</p>'
          },
        ]
      },
    ],
    table: [
      'Escolhido pelo Outro Lado (1º círculo)',
      'Habilidade de trilha',
      'Poder de ocultista',
      'Aumento de atributo',
      'Escolhido pelo Outro Lado (2º círculo)',
      'Poder de ocultista',
      'Grau de treinamento',
      'Habilidade de trilha',
      'Poder de ocultista',
      'Aumento de atributo, versatilidade',
      'Escolhido pelo Outro Lado (3º círculo)',
      'Poder de ocultista',
      'Habilidade de trilha',
      'Grau de treinamento',
      'Poder de ocultista',
      'Aumento de atributo',
      'Escolhido pelo Outro Lado (4º círculo)',
      'Poder de ocultista',
      'Aumento de atributo',
      'Habilidade de trilha',
    ]
  },
]

export default classes
