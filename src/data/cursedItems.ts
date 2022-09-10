import { CursedItem } from '../types'

const cursedItems: Array<CursedItem> = [
  {
    name: 'Coração Pulsante',
    element: 'Sangue',
    description: '<p><em>Um coração humano banhado em sangue, pulsando como se ainda estivesse dentro de um corpo.</em> Se estiver empunhando o <em>coração pulsante</em> e sofrer dano, você pode gastar uma reação para espremer o item e reduzir esse dano pela metade. Sempre que usa o coração, você deve fazer um teste de Fortitude (DT 15 + 5 por uso adicional no mesmo dia). Se falhar, o item é destruído. Como o coração continua pulsando incessantemente com Sangue, qualquer compartimento em que estiver deve ser drenado uma vez por dia, caso contrário o Sangue poderá escorrer e danificar outros objetos com os quais entrar em contato.</p>'
  },
  {
    name: 'Coroa de Espinhos',
    element: 'Sangue',
    description: '<p><em>Uma coroa, colar ou pulseira feita de um material que lembra os espinhos de uma roseira banhados em sangue.</em> Uma vez por rodada, você pode usar uma reação para transformar qualquer dano dano mental que fosse sofrer em dano de Sangue, mas não consegue mais recuperar sanidade por descanso enquanto estiver vestindo o item. É preciso vestir o item por uma semana para ativar seus efeitos.</p>'
  },
  {
    name: 'Frasco de Vitalidade',
    element: 'Sangue',
    description: '<p><em>Este pequeno recipiente de vidro possui uma tampa de metal gravada com um selo de Sangue.</em> Você pode gastar 1 minuto e sofrer até 20 pontos de dano para encher o <em>frasco</em> com seu próprio sangue. Enquanto estiver no recipiente, seu sangue se mantém fresco. Você pode gastar uma ação padrão para beber o conteúdo do frasco e recuperar a mesma quantidade de PV que armazenou nele, mas deve passar em um teste de Fortitude (DT 20) para não ficar enjoado por uma rodada.</p>'
  },
  {
    name: 'Pérola de Sangue',
    element: 'Sangue',
    description: '<p><em>Uma esfera de aproximadamente 2cm de diâmetro, lisa e reluzente como uma pérola, mas de cor vermelho-vivo.</em> Você pode gastar uma ação de movimento para forçar a <em>pérola de sangue</em> contra a sua pele e absorvê-la, recebendo uma injeção de adrenalina que fornece +5 em testes de Agilidade, Força e Vigor e testes baseados nesses atributos até o final da cena. Ao final da cena, você precisa fazer um teste de Fortitude (DT 20). Se falhar, fica fatigado até o final do dia. Se falhar por 5 ou mais, sofre uma parada cardíaca e fica morrendo. Se morrer dessa forma, você se torna uma criatura de sangue de DT similar ao seu NEX, à escolha do mestre.</p>'
  },
  {
    name: 'Punhos Enraivecidos',
    element: 'Sangue',
    description: '<p><em>Um par de soqueiras feitas de um metal vermelho vivo e gravado com vários símbolos de Sangue.</em> Seus ataques desarmados passam a causar 1d8 pontos de dano de Sangue. Sempre que acerta um ataque desarmado, pode fazer outro ataque desarmado contra o mesmo alvo, pagando 2 PE por cada ataque já realizado no turno. Ou seja, pode fazer o primeiro ataque extra gastando 2 PE, um segundo ataque extra gastando mais 4 PE e assim por diante, até errar um ataque ou não ter mais pontos de esforço.</p>'
  },
  {
    name: 'Seringa de Transfiguração',
    element: 'Sangue',
    description: '<p><em>Esta seringa é feita de um material estranho e de aparência orgânica, cheio de veias pulsantes.</em> Você pode gastar uma ação padrão para sugar o sangue de um alvo adjacente e encher a seringa (se o alvo não for voluntário, você precisa acertá-lo com um ataque corpo a corpo). Se houver sangue na seringa, você pode gastar uma ação padrão para injetá-lo em qualquer outra pessoa adjacente, que terá sua aparência transfigurada para a do dono do sangue, como se estivesse sob efeito do ritual <em>Distorcer Aparência</em>, com duração aumentada para um dia. Quando o efeito acabar, o alvo deve rolar 1d6. Em um resultado 1, o processo de voltar à sua aparência é especialmente traumático, danificando seus músculos e órgãos e fazendo com que ele perca 1 PV permanentemente.</p>'
  },
  {
    name: 'Amarras Mortais',
    element: 'Morte',
    description: '<p><em>Um par de correntes de ferro negro que se enrolam nos antebraços do usuário como um bracelete.</em> Uma vez por rodada, você pode gastar uma ação padrão e 2 PE para usar a manobra agarrar contra um alvo Grande ou menor em alcance curto, recebendo +10 em seu teste oposto. Você também pode usar uma ação de movimento para puxar um alvo agarrado para perto, deixando-o adjacente.</p>'
  },
  {
    name: 'Casaco de Lodo',
    element: 'Morte',
    description: '<p><em>Um sobretudo preto fosco que tem uma cor inexplicavelmente opaca, como se absorvesse a luz completamente.</em> Essa vestimenta é na verdade feita de Lodo ativo, protegendo o usuário contra ataques ao amortecer o impacto deles. O usuário recebe resistência a corte, impacto, Morte e perfuração 5, mas se torna vulnerável a dano balístico e de Energia.</p>'
  },
  {
    name: 'Coletora',
    element: 'Morte',
    description: '<p><em>Este punhal possui a lâmina completamente negra e a empunhadura em espiral.</em> Você pode gastar uma ação completa para apunhalar uma pessoa que esteja morrendo. Ao fazer isso, você mata o alvo morre e a <em>Coletora</em> absorve os resquícios do tempo de vida dela, armazenando 1d8 PE. O punhal pode armazenar um total de 20 PE, que você pode usar como se fossem seus desde que esteja portando a adaga a pelo menos uma semana. Enquanto portar a adaga, você é acometido por pesadelos sobre o sofrimento final de suas vítimas e sempre tem condições de descanso ruins, independentemente de onde ou como descansar.</p>'
  },
  {
    name: 'Crânio Espiral',
    element: 'Morte',
    description: '<p><em>Um crânio envelhecido, apodrecido e distorcido em um formato espiral. Lodo escorre de seus olhos vazios, como lágrimas negras.</em> Uma vez por rodada, se estiver empunhando o <em>crânio</em>, você pode gastar uma ação livre para ativá-lo. Quando faz isso, você recebe uma ação padrão adicional na rodada. Sempre que usa o <em>crânio</em>, você deve fazer um teste de Vontade (DT 15 + 5 por uso adicional no mesmo dia). Se falhar, você recebe os benef ícios do item, mas envelhece 1d4 anos e não pode mais usá-lo nesse dia.</p>'
  },
  {
    name: 'Frasco de Lodo',
    element: 'Morte',
    description: '<p><em>Um pequeno frasco contendo lodo de Morte.</em> Aplicar o conteúdo do frasco em um ferimento é uma ação padrão. Se aplicado em um ferimento recente (sofrido até uma rodada atrás) o lodo recupera 6d8+20 pontos de vida. Caso a ferida seja anterior à rodada passada, role um dado: em um resultado par, o lodo recupera 3d8+10 PV; em um resultado ímpar, a ferida infecciona, causando 3d8+10 pontos de dano de Morte. O frasco possui lodo para uma única ativação.</p>'
  },
  {
    name: 'Vislumbre do Fim',
    element: 'Morte',
    description: '<p><em>Um par de óculos escuros repleto de símbolos e espirais em sua armação metálica.</em> Um par de óculos escuros repleto de símbolos e espirais em sua armação metálica.</p>'
  },
  {
    name: 'Anéis do Elo Mental',
    element: 'Conhecimento',
    description: '<p><em>Um par de anéis dourados, cada um contendo um dos símbolos do ritual Ligação Telepática.</em>  Os anéis devem ser usados por duas pessoas por 24h para serem ativados. Após esse período, os dois são conectados por um ritual de <em>Invadir Mente</em> (ligação telepática) que dura enquanto estiverem usando os anéis. Enquanto a ligação estiver ativa, as duas pessoas fazem testes de Vontade usando a melhor quantidade de dados e bônus entre as duas. Porém, qualquer dano mental sofrido por uma delas será sofrido pela outra (ou seja, se numa rodada ambas sofrerem 10 pontos de dano mental, cada uma irá perder 20 pontos de sanidade) e qualquer condição mental ou de medo que afetar uma delas automaticamente afetará a outra.</p>'
  },
  {
    name: 'Lanterna Reveladora',
    element: 'Conhecimento',
    description: '<p><em>Uma lanterna dourada decorada com sigilos do Outro Lado.</em> Ativar a lanterna gasta uma ação padrão e 1 PE. Ela fica ligada por uma cena e emite luz com as propriedades do ritual <em>Terceiro Olho</em>. A luz da <em>lanterna</em> incomoda criaturas de Sangue. Se elas foram iluminadas pela luz dela, irão atacá-lo em detrimento de quaisquer outros alvos na mesma categoria de alcance.</p>'
  },
  {
    name: 'Máscara das Pessoas nas Sombras',
    element: 'Conhecimento',
    description: '<p>Principal ferramenta e marca registrada da Seita das Máscaras, esse item quando usado por alguém que não pertence à Seita ainda carrega grande poder. O usuário recebe resistência a Conhecimento 10 e pode gastar uma ação de movimento e 2 PE para “entrar” em uma sombra adjacente e se transportar instantaneamente para outra sombra que possa ver em alcance médio. Vestir a <em>Máscara</em> é como assinar um acordo e pode ter consequências severas se seu portador despertar o interesse da mente única das Máscaras...</p>'
  },
  {
    name: 'Munição Jurada',
    element: 'Conhecimento',
    description: '<p><em>Uma bala de arma de fogo com um sigilo gravado.</em> O usuário pode fazer um ritual de uma hora para vincular essa munição a um ser que conheça. Se usada contra esse ser, a bala fornece +10 no teste de ataque, dobra a margem de ameaça da arma e causa +6d12 pontos de dano de Conhecimento. Possuir uma <em>munição juramentada</em> deixa o usuário obcecado em abater seu alvo, impondo –2 em Defesa e em testes de ataque contra quaisquer outros alvos.</p>'
  },
  {
    name: 'Peitoral da Segunda Chance',
    element: 'Conhecimento',
    description: '<p><em>Um dispositivo que pode ser vestido como um pequeno colete que pode ser prendido ao redor do peito, contendo uma peça central em cima do coração formada por um amontoado de partes eletrônicas seguradas por fios metálicos entrelaçados, passando por baixo dos braços e levando até um fecho na parte das costas.</em> Se você for reduzido a 0 pontos de vida, o colete automaticamente gastará 5 PE seus para reanimá-lo com 4d10 PV através de um surto de Energia por todo o seu corpo. A reanimação falha se você não tiver PE suficiente. Cada vez que o item é ativado, existe uma chance (1 em 1d10) da descarga energética ser forte demais e matá-lo instantaneamente, transformando seu corpo e equipamento em plasma de Energia pura (exceto pelo colete).</p>'
  },
  {
    name: 'Pergaminho da Pertinácia',
    element: 'Conhecimento',
    description: '<p><em>Um pergaminho amarelado e antigo. Mesmo enrolado, é possível vislumbrar sigilos dourados brilhando na parte interior.</em> Você pode gastar uma ação padrão para encarar os sigilos do Outro Lado inscritos no pergaminho, recebendo 5 PE temporários até o fim da cena. Sempre que usa este item, você deve fazer um teste de Ocultismo (DT 15 + 5 por uso adicional no mesmo dia). Se falhar, o <em>pergaminho</em> se desfaz.</p>'
  },
  {
    name: 'Arcabuz dos Moretti',
    element: 'Energia',
    description: '<p><em>Uma arma muito antiga, reminiscente do século XV, mas que de alguma forma ainda se mantém funcionando perfeitamente, apesar das rachaduras que cercam toda a superfície do objeto e emitem uma suave luz rosada do interior de suas fissuras. Em seu cabo de madeira está gravado um selo contendo a letra M.</em>. O <em>arcabuz</em> é uma arma simples, de fogo e de uma mão que fornece +2 em testes de ataque. Sempre que dispara esta arma, o usuário deve rolar 1d6 junto com o teste de ataque. O resultado do d6 define qual o dano da arma nesse disparo: 1) 2d4, 2) 2d6, 3) 2d8, 4) 2d10, 5) 2d12, 6) 2d20. A arma tem alcance curto, crítico x3 e não precisa de munição.</p>'
  },
  {
    name: 'Bateria Reversa',
    element: 'Energia',
    description: '<p><em>Uma pequena bateria elétrica repleta de sigilos paranormais.</em> Você pode gastar uma ação padrão e 2 PE para fazer a bateria absorver a carga de qualquer dispositivo eletrônico em alcance curto — celular, notebook ou mesmo um automóvel —, fazendo-o ficar automaticamente descarregado. Se a bateria estiver cheia, você pode gastar uma ação padrão para transferir a carga dela para um dispositivo eletrônico descarregado em alcance curto, que é instantaneamente reenergizado. Sempre que usa a <em>bateria</em>, você deve fazer um teste de Ocultismo (DT 15 + 5 por uso adicional no mesmo dia). Se falhar, ela explode, causando 12d6 pontos de dano de Energia em todos os seres a até 3 metros.</p>'
  },
  {
    name: 'Relógio de Arnaldo',
    element: 'Energia',
    description: '<p><em>Um relógio de ouro, meio manchado e com um aspecto levemente queimado no exterior. Ao abrir, é possível enxergar a foto de um homem de barba e óculos ao lado de uma criança simpática, também segurando um relógio de ouro.</em> Uma vez por rodada, você pode gastar 1 PE para rolar novamente qualquer dado com o resultado 1. O custo para usar o <em>relógio</em> aumenta em +1 para cada vez que for ativado no mesmo dia.</p>'
  },
  {
    name: 'Talismã da Sorte',
    element: 'Energia',
    description: '<p><em>Uma figa, moeda, pé de coelho ou qualquer outro badulaque modificado por um ritual.</em> Sempre que você estiver vestindo o talismã e sofrer dano, pode gastar uma reação e 3 PE para rolar 1d4. Em um resultado 2 ou 3, você evita completamente o dano. Em um resultado 4, você evita o dano, mas o talismã queima e vira cinzas. Por fim, em um resultado 1, a sorte se reverte em azar: em vez de evitar o dano, você sofre o dobro do dano que sofreria e o talismã queima e vira cinzas.</p>'
  },
  {
    name: 'Teclado de Conexão Neural',
    element: 'Energia',
    description: '<p><em>Um teclado USB coberto de glifos de Energia.</em> Sempre que você plugar o <em>teclado</em> a um computador (uma ação de movimento), o item irá gerar ondas eletromagnéticas que enviam os sinais do sistema diretamente para as sinapses de seu cérebro, efetivamente conectando a sua mente com a máquina. Você pode usar o computador sem nenhum impedimento tecnológico ou de idioma, recebe +10 em testes para hackear e gasta metade do tempo normal para localizar arquivos. Porém, devido ao estresse que seu cérebro sofre por se conectar diretamente a um sistema digital, você sofre 1d6 pontos de dano mental por rodada que usar o <em>teclado</em>.</p>'
  },
  {
    name: 'Tela do Pesadelo',
    element: 'Energia',
    description: '<p><em>Este dispositivo com tela (celular, tablet, TV...) contém diversos sigilos minúsculos em suas bordas.</em> Você pode gastar uma ação padrão e 2 PE para ativar a <em>tela</em>  A próxima pessoa que tocá-la verá uma imagem horrível saindo da tela e avançando contra ela. A imagem é apenas uma ilusão, mas os traumas que ela causa são reais! A pessoa deve fazer um teste de Vontade (DT determinada pelo usuário da tela +5). Se falhar, fica atordoada, sofre 4d6 pontos de dano mental e precisa repetir o teste na próxima rodada. O efeito continua até a pessoa passar no teste ou enlouquecer (ou outra pessoa destruir a <em>tela</em>). Uma vez que gere esse efeito, a <em>tela</em> fica inerte até você ativá-la novamente.</p>'
  },
  {
    name: 'Veículo Energizado',
    element: 'Energia',
    description: '<p>O motor deste veículo foi modificado paranormalmente para não precisar de combustível. Além disso, um motorista pode gastar uma reação e fazer um teste de Pilotagem (DT 25) para fazer o carro e seus ocupantes assumirem uma forma de energia pura por um instante, suficiente para evitar colidir com um objeto, atravessando-o como se fossem incorpóreos.</p>'
  },
  {
    name: 'Jaqueta de Veríssimo',
    element: 'Medo',
    description: '<p><em>Uma jaqueta de estilo aviador feita de couro marrom com a gola forrada de pele branca.</em> Esta vestimenta de aparência comum já foi usada por vários agentes importantes e experientes da Ordem, e presenciou inúmeras batalhas e sacrif ícios. Ao longo de sua história, a <em>jaqueta</em> foi passada de um agente para o outro como presente ou herança diversas vezes. Você recebe resistência a dano paranormal 15. Além disso, sempre que um aliado adjacente for sofrer dano de qualquer tipo, você pode gastar uma reação e 2 PE para se tornar o alvo do dano no lugar.</p>'
  },
  {
    name: 'Dedo Decepado',
    element: 'Varia',
    description: '<p><em>Este item grotesco é um dedo decepado e seco de alguém com alto nível de exposição paranormal.</em> Você recebe um poder paranormal que o dono do dedo possuía. O elemento do poder define o elemento da maldição. Sempre que usar as ações dormir ou relaxar em um interlúdio, role 1d4. Em um resultado 1, você é assombrado por memórias do dono do dedo e não recupera nenhum PV, PE ou sanidade. Além disso, ser visto usando esse item causa uma penalidade de –10 em testes de Diplomacia e pode causar reações severas de NPCs, a critério do mestre. Você precisa vestir o item por uma semana para que seu efeito comece a funcionar.</p>'
  },
  {
    name: 'Selos Paranormais',
    element: 'Varia',
    description: '<p><em>Um conjunto de sigilos gravados em um objeto pequeno, como um pergaminho, moeda, pedra preciosa, osso humano...</em> Cada selo contém um ritual. Para ativar um selo, você deve empunhá-lo e ler os sigilos em voz alta. Isso exige uma ação padrão ou a ação necessária para conjurar o ritual, o que for maior. Você também deve conhecer o ritual inscrito nele ou passar em um teste de Ocultismo (CD 20 + custo em PE do ritual).</p><p>Quando o selo é ativado, o ritual é conjurado e o selo se desfaz em cinzas. Você toma quaisquer decisões exigidas pelo ritual, como se o tivesse conjurado você mesmo. Caso conheça o ritual, você pode aplicar quaisquer habilidades que possua que se aplicariam aos seus próprios rituais, e pode usar versões avançadas dele, pagando o custo adicional em pontos de esforço (e apenas o custo adicional). Você não precisa de componentes ritualísticos para ativar um selo, o que o torna um objeto bastante útil para ocultistas em certas situações.</p><p>A categoria de um selo é igual ao círculo do ritual contido nele: categoria I para rituais de 1º círculo, categoria II para rituais de 2º círculo, e assim por diante.</p>'
  },
]

export default cursedItems
