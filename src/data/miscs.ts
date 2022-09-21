import { Misc } from '../types'

const miscs: Array<Misc> = [
  {
    name: 'Kit de Perícia',
    tag: 'Acessórios',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Um conjunto de ferramentas necessárias para algumas perícias ou usos de perícias. Sem o kit, você sofre –5 no teste. Existe um kit de perícia para cada perícia que exige este item.</p>'
  },
  {
    name: 'Utensílio',
    tag: 'Acessórios',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Um item comum que tenha uma utilidade específica, como um canivete, uma lupa, um smartphone ou um notebook. Um utensílio concede +2 em um teste de uma perícia a sua escolha (exceto Luta e Pontaria), definida quando o item é adquirido. Por exemplo, um smartphone pode ser usado para acessar a internet e fornecer bônus em Ciências, enquanto um notebook pode ser preparado para invadir sistemas e fornecer bônus em Tecnologia. Você pode inventar itens menos realistas, como um “detector de mentiras portátil” que fornece +2 em Intuição, mas o mestre tem a palavra final se o utensílio é apropriado ou não. Utensílios sempre ocupam 1 espaço e precisam ser empunhados para que o bônus seja aplicado.</p>'
  },
  {
    name: 'Vestimenta',
    tag: 'Acessórios',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Uma peça de vestuário que fornece um bônus em uma perícia específica (exceto Luta ou Pontaria). Por exemplo, um par de botas militares pode fornecer +2 em Atletismo, enquanto um terno ou vestido elegante pode fornecer +2 em Diplomacia. Assim como utensílios, o benef ício de cada vestimenta deve ser aprovado pelo mestre. Você pode receber os bônus de no máximo duas vestimentas ao mesmo tempo. Vestir ou despir uma vestimenta é uma ação completa.</p>'
  },
  {
    name: 'Granada de Atordoamento',
    tag: 'Explosivos',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Para usar uma granada, você precisa empunhá-la e então gastar uma ação padrão para arremessá-la em um ponto à sua escolha em alcance médio. A granada afeta um raio de 6m a partir do ponto de impacto. O efeito que ela causa varia conforme o tipo de granada.</p><p>Também chamadas de flash-bang, por criarem um estouro barulhento e luminoso. Seres na área ficam atordoados por 1 rodada (Fortitude DT Agi reduz para ofuscado e surdo por uma rodada).</p>'
  },
  {
    name: 'Granada de Fragmentação',
    tag: 'Explosivos',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Para usar uma granada, você precisa empunhá-la e então gastar uma ação padrão para arremessá-la em um ponto à sua escolha em alcance médio. A granada afeta um raio de 6m a partir do ponto de impacto. O efeito que ela causa varia conforme o tipo de granada.</p><p>Espalha fragmentos perfurantes. Seres na área sofrem 8d6 pontos de dano de perfuração (Reflexos DT Agi reduz à metade).</p>'
  },
  {
    name: 'Granada de Fumaça',
    tag: 'Explosivos',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Para usar uma granada, você precisa empunhá-la e então gastar uma ação padrão para arremessá-la em um ponto à sua escolha em alcance médio. A granada afeta um raio de 6m a partir do ponto de impacto. O efeito que ela causa varia conforme o tipo de granada.</p><p>Produz uma fumaça espessa e escura. Seres na área ficam cegos e sob camuflagem total. A fumaça dura 2 rodadas.</p>'
  },
  {
    name: 'Granada Incendiária',
    tag: 'Explosivos',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Para usar uma granada, você precisa empunhá-la e então gastar uma ação padrão para arremessá-la em um ponto à sua escolha em alcance médio. A granada afeta um raio de 6m a partir do ponto de impacto. O efeito que ela causa varia conforme o tipo de granada.</p><p>Espalha labaredas incandescentes. Seres na área sofrem 6d6 pontos de dano de fogo e ficam em chamas (Reflexos DT Agi reduz o dano à metade e evita a condição em chamas).</p>'
  },
  {
    name: 'Mina Antipessoal',
    tag: 'Explosivos',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Esta mina é ativada por controle remoto. Se você estiver a até alcance longo dela, pode gastar uma ação padrão para detoná-la. Ao explodir, a mina dispara centenas de bolas de aço em um cone de 6m, causando 12d6 pontos de dano de perfuração em todos os seres na área (Reflexos DT Int reduz à metade). Você define a direção do cone quando posiciona a mina no chão. Instalar a mina exige uma ação completa e um teste de Tática contra DT 15. Caso falhe, você gasta a mina, mas não ela não funciona. Encontrar uma mina instalada exige um teste de Percepção (DT igual ao resultado do seu teste para instalá-la).</p>'
  },
  {
    name: 'Algemas',
    tag: 'Itens Operacionais',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Algemas. Um par de algemas de aço. Para prender uma pessoa que não esteja indefesa você precisa empunhar a algema, agarrar a pessoa e então vencer um novo teste de agarrar contra ela. Você pode prender os dois pulsos da pessoa (–5 em testes que exijam o uso das mãos, impede conjuração) ou um dos pulsos dela em um objeto imóvel adjacente, caso haja, para impedir que ela se mova. Escapar das algemas exige um teste de Acrobacia contra DT 30 (ou ter as chaves...).</p>'
  },
  {
    name: 'Arpéu',
    tag: 'Itens Operacionais',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Um gancho de aço amarrado na ponta de uma corda para se fixar em muros, janelas, parapeitos de prédios... Prender um arpéu exige um teste de Pontaria (DT 15). Subir um muro com a ajuda de uma corda fornece +5 no teste de Atletismo.</p>'
  },
  {
    name: 'Bandoleira',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Um cinto com bolsos e alças. Uma vez por rodada, você pode sacar ou guardar um item em seu inventário como uma ação livre.</p>'
  },
  {
    name: 'Binóculos',
    tag: 'Itens Operacionais',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Estes binóculos militares fornecem +5 em testes de Percepção para observar coisas distantes.</p>'
  },
  {
    name: 'Bloqueador de Sinal',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Este dispositivo compacto emite ondas que “poluem” a frequência de rádio usada por celulares, impedindo que qualquer aparelho desse tipo em alcance médio se conecte.</p>'
  },
  {
    name: 'Cicatrizante',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Um spray contendo um remédio com potente efeito cicatrizante. Você pode gastar uma ação padrão e este item para curar 2d8+2 PV em você ou em um ser adjacente.</p>'
  },
  {
    name: 'Corda',
    tag: 'Itens Operacionais',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Um rolo com 10 metros de corda resistente. Possui diversas utilidades: pode ajudar a descer um buraco ou prédio (+5 em testes de Atletismo nessas situações), amarrar pessoas inconscientes etc.</p>'
  },
  {
    name: 'Equipamento de Sobrevivência',
    tag: 'Itens Operacionais',
    category: '0',
    slots: 2,
    itemType: 'misc',
    description: '<p>Uma mochila com saco de dormir, panelas, GPS e outros itens úteis para sobreviver no mato. Fornece +5 em testes de Sobrevivência para acampar e orientar-se e permite que você faça esses testes sem treinamento.</p>'
  },
  {
    name: 'Lanterna Tática',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Ilumina lugares escuros. Além disso, você pode gastar uma ação de movimento para mirar a luz nos olhos de um ser em alcance curto. Ele fica ofuscado por 1 rodada, mas imune à lanterna pelo resto da cena.</p>'
  },
  {
    name: 'Máscara de Gás',
    tag: 'Itens Operacionais',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Uma máscara com filtro que cobre o rosto inteiro. Fornece +10 em testes de Fortitude contra efeitos que dependam de respiração.</p>'
  },
  {
    name: 'Mochila Militar',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: '*',
    itemType: 'misc',
    description: '<p>Uma mochila leve e de alta qualidade. Ela não usa nenhum espaço e aumenta sua capacidade de carga em 2 espaços.</p>'
  },
  {
    name: 'Óculos de Visão Térmica',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Estes óculos eliminam a penalidade em testes por camuflagem.</p>'
  },
  {
    name: 'Pé de Cabra',
    tag: 'Itens Operacionais',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Esta barra de ferro fornece +5 em testes de Força para arrombar portas. Pode ser usada em combate como um bastão.</p>'
  },
  {
    name: 'Pistola de Dardos',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Esta arma dispara dardos com um poderoso sonífero. Para disparar em um ser, faça um ataque à distância contra ele. Se acertá-lo, ele fica inconsciente até o fim da cena (Fortitude DT Agi reduz para desprevenida e lenta por uma rodada). A pistola vem com 2 dardos. Uma caixa adicional com 2 dardos é um item de categoria 0 que ocupa 1 espaço.</p>'
  },
  {
    name: 'Pistola Sinalizadora',
    tag: 'Itens Operacionais',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Esta pistola dispara um sinalizador luminoso, útil para chamar outras pessoas para sua localização. Pode ser usada uma vez como uma arma de disparo leve com alcance curto que causa 2d6 pontos de dano de fogo.</p>'
  },
  {
    name: 'Soqueira',
    tag: 'Itens Operacionais',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Esta peça de metal e usada entre os dedos e permite socos mais perigosos — fornece +1 em rolagens de dano desarmado. Uma soqueira pode receber modificações de armas corpo a corpo e aplica os efeitos de suas modificações em seus ataques desarmados.</p>'
  },
  {
    name: 'Spray de Pimenta',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Este spray dispara um composto químico que causa dor e lacrimejo. Você pode gastar uma ação padrão para atingir um ser adjacente. O ser fica cego por 1d4 rodadas (Fortitude DT Agi evita). A carga do spray dura dois usos.</p>'
  },
  {
    name: 'Taser',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: 1,
    itemType: 'misc',
    description: '<p>Um dispositivo de eletrochoque capaz de atordoar ou até incapacitar um alvo. Você pode gastar uma ação padrão para atingir um ser adjacente. O alvo sofre 1d6 pontos de dano de eletricidade e fica atordoado por uma rodada (Fortitude DT Agi evita). A bateria do taser dura dois usos.</p>'
  },
  {
    name: 'Traje Hazmat',
    tag: 'Itens Operacionais',
    category: 'I',
    slots: 2,
    itemType: 'misc',
    description: '<p>Uma roupa impermeável e que cobre o corpo inteiro, usada para impedir o contato do usuário com materiais tóxicos. Fornece +5 em testes de resistência contra efeitos ambientais e resistência a químico 10.</p>'
  },
  {
    name: 'Amarras de (Elemento)',
    tag: 'Itens Paranormais',
    category: 'II',
    slots: 1,
    itemType: 'misc',
    description: '<p>Cordas ou correntes feitas de um elemento Paranormal específico. As amarras são preparadas para imobilizar criaturas do Outro Lado que sejam vulneráveis ao elemento que as compõem e podem ser usadas de duas formas.</p><p><span>Armadilha.</span> Você gasta as amarras, uma ação completa e 2 PE e prepara uma armadilha de 3x3m. Uma criatura que atravesse o espaço pela primeira vez em seu turno precisa fazer um teste de de Reflexos (DT Int); se falhar, fica imóvel até o final da cena. Mesmo se passar, considera o espaço ocupado pela armadilha como terreno difícil.</p><p><span>Laçar.</span> Você gasta uma ação padrão e 1 PE e escolhe uma criatura em alcance curto. Se falhar num teste de Vontade (DT Agi), a criatura fica paralisada até o início de seu próximo turno, quando pode repetir o teste. Manter a criatura enlaçada requer o gasto de 1 PE por rodada.</p>'
  },
  {
    name: 'Câmera de Aura Paranormal',
    tag: 'Itens Paranormais',
    category: 'II',
    slots: 1,
    itemType: 'misc',
    description: '<p>Esta câmera amaldiçoada com Energia possui sigilos de Conhecimento para capturar auras paranormais. Tirar uma foto gasta uma ação padrão e 1 PE. As fotos são instantâneas e revelam a presença de auras paranormais em pessoas e objetos. As auras são da cor associada ao elemento.</p>'
  },
  {
    name: 'Componentes Ritualísticos de (Elemento)',
    tag: 'Itens Paranormais',
    category: '0',
    slots: 1,
    itemType: 'misc',
    description: '<p>Um conjunto de objetos utilizados em rituais de um elemento entre Sangue, Morte, Conhecimento ou Energia (não existem componentes ritualísticos de Medo). Componentes ritualísticos são necessários para a conjuração de rituais do elemento em questão.</p><p><span>Energia:</span> eletricidade, dispositivos tecnológicos (celulares, computadores etc.), circuitos eletrônicos, fontes de calor e luz, pilhas, baterias, cabos de cobre e prata, pólvora, moedas, dados, ímãs...</p><p><span>Sangue:</span> órgãos, carne, sangue, animais vivos (para sacrifício), navalhas, agulhas, arame farpado, correntes, metal enferrujado, fluídos corporais...</p><p><span>Morte:</span> ossos, dentes, cinzas, fios de cabelo, cristais pretos, relógios, galhos secos, folhas secas, plantas mortas, raízes, areia, poeira, Lodo...</p><p><span>Conhecimento:</span> escrituras, papéis, livros, pergaminhos, pedras preciosas, ouro, cordas, tecido, cristais brancos, vidro, máscaras, instrumentos de escrita (lápis, caneta, tinta, giz etc.)...</p>'
  },
  {
    name: 'Emissor de Pulsos Paranormais',
    tag: 'Itens Paranormais',
    category: 'II',
    slots: 1,
    itemType: 'misc',
    description: '<p>Esta pequena caixa coberta de sigilos foi desenvolvida para servir como uma “isca” de criaturas paranormais. Ativar a caixa gasta uma ação completa e 1 PE. A caixa emite um pulso de um elemento definido pelo ativador, que atrai criaturas do mesmo elemento e afasta criaturas do elemento oposto. As criaturas afetadas têm direito a um teste de Vontade (DT Pre) para evitar o efeito.</p>'
  },
  {
    name: 'Escuta de Ruídos Paranormais',
    tag: 'Itens Paranormais',
    category: 'II',
    slots: 1,
    itemType: 'misc',
    description: '<p>Este microfone funciona como um aparato espião, com a diferença que consegue captar ruídos paranormais. Ativar a escuta gasta uma ação completa e 2 PE e faz com que ela grave ruídos por até 24 horas. Ouvir a escuta fornece +5 em testes de Ocultismo para identificar criatura.</p>'
  },
  {
    name: 'Medidor de Estabilidade da Membrana',
    tag: 'Itens Paranormais',
    category: 'II',
    slots: 1,
    itemType: 'misc',
    description: '<p>Um dispositivo complexo, composto por diversos medidores — de temperatura, campo magnético, dilatação temporal... Um agente treinado em Ocultismo pode usar o medidor para avaliar o estado da Membrana em uma área, o que indica a chance de uma entidade se manifestar nela. Um ambiente com valores racionais e constantes ao longo de algumas horas dificilmente originará uma criatura ou manifestação perigosa. Porém, se as leituras apresentarem dados inexplicáveis ou com grandes variações, o lugar poderá conter uma entidade. Apesar de ser um bom indicativo, o medidor não fornece respostas definitivas, já que um ambiente com a Membrana danificada ainda pode não ter sido afetado por manifestações, assim como um lugar com a Membrana protegida por conter uma criatura poderosa vinda de outro lugar.</p>'
  },
  {
    name: 'Scanner de Manifestação Paranormal de (Elemento)',
    tag: 'Itens Paranormais',
    category: 'II',
    slots: 1,
    itemType: 'misc',
    description: '<p>Este item é composto por um dispositivo conectado a pequenos objetos amaldiçoados de uma entidade específica e adornado com uma série de sigilos. Ativar o scanner é uma ação padrão. Quando ativado, o scanner consome 1 PE por rodada do usuário, que sempre sabe a direção de todas as manifestações paranormais ativas (rituais, criaturas, itens amaldiçoados etc.) do elemento escolhido em alcance longo. Se o elemento principal de uma criatura for outro, mas ela tiver como complemento o elemento escolhido do scanner, também será detectada.</p>'
  },
]

export default miscs