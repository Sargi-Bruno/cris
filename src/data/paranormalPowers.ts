import { ParanormalPower } from '../types'

const paranormalPowers: Array<ParanormalPower> = [
  {
    name: 'Aprender Ritual',
    element: 'Varia',
    description: '<p>Através de uma conexão com as memórias de ocultistas do passado e os segredos das entidades, você aprende e pode conjurar um ritual de 1º círculo à sua escolha. Além disso, você pode substituir um ritual que já conhece por outro. A partir de 45% de NEX, quando escolhe este poder, você aprende um ritual de até 2º círculo e, a partir de 75% de NEX, aprende um ritual de até 3º círculo. Você pode escolher esse poder quantas vezes quiser, mas está sujeito ao limite de rituais conhecidos. <em>Este poder conta como um poder do elemento do ritual escolhido.</em></p>'
  },
  {
    name: 'Resistir a <Elemento>',
    element: 'Varia',
    description: '<p>Escolha entre Conhecimento, Energia, Morte ou Sangue. Você recebe resistência 10 contra esse elemento. <em>Este poder conta como um poder do elemento escolhido.</em></p><p><span>Afinidade:</span> aumenta a resistência para 20.</p>'
  },
  {
    name: 'Expansão de Conhecimento',
    element: 'Conhecimento',
    description: '<p>Você se conecta com o Conhecimento do Outro Lado, rompendo os limites de sua compreensão. Você aprende um poder de classe que não pertença à sua classe (caso o poder possua pré-requisitos, você precisa preenchê-los). <em>Pré-requisito:</em> Conhecimento 1.</p><p><span>Afinidade:</span> você aprende um segundo poder de classe que não pertença à sua classe.</p>'
  },
  {
    name: 'Percepção Paranormal',
    element: 'Conhecimento',
    description: '<p>O Conhecimento sussurra em sua mente. Em cenas de investigação, sempre que fizer um teste para procurar pistas, você pode rolar novamente um dado com resultado menor que 10. Você deve aceitar a segunda rolagem, mesmo que seja menor que a primeira.</p><p><span>Afinidade:</span> você pode rolar novamente até dois dados com resultado menor que 10.</p>'
  },
  {
    name: 'Precognição',
    element: 'Conhecimento',
    description: '<p>Você possui um “sexto sentido” que o avisa do perigo antes que ele aconteça. Você recebe +2 em Defesa e em testes de resistência. <em>Pré-requisito:</em> Conhecimento 1.</p><p><span>Afinidade:</span> você fica imune à condição desprevenido.</p>'
  },
  {
    name: 'Sensitivo',
    element: 'Conhecimento',
    description: '<p>Você consegue sentir as emoções e intenções de outros personagens, como medo, raiva ou malícia, recebendo +5 em testes de Diplomacia, Intimidação e Intuição.</p><p><span>Afinidade:</span> quando você faz um teste oposto usando uma dessas perícias, o oponente sofre –1d20.</p>'
  },
  {
    name: 'Visão do Oculto',
    element: 'Conhecimento',
    description: '<p>Você não enxerga mais pelos olhos, mas sim pela percepção do Conhecimento em sua mente. Você recebe +5 em testes de Percepção e enxerga no escuro.</p><p><span>Afinidade:</span> você ignora camuflagem.</p>'
  },
  {
    name: 'Afortunado',
    element: 'Energia',
    description: '<p>A Energia considera resultados medíocres entediantes. Uma vez por rolagem, você pode rolar novamente um resultado 1 em qualquer dado que não seja d20.</p><p><span>Afinidade:</span> além disso, uma vez por teste, você pode rolar novamente um resultado 1 em d20.</p>'
  },
  {
    name: 'Campo Protetor',
    element: 'Energia',
    description: '<p>Você consegue gerar um campo de Energia que o protege de perigos. Quando usa a ação esquiva, você recebe +5 em Defesa. <em>Pré-requisito:</em> Energia 1.</p><p><span>Afinidade:</span> você recebe +5 em Reflexo e, quando passa em um teste de Reflexo que reduziria o dano à metade, em vez disso não sofre nenhum dano.</p>'
  },
  {
    name: 'Causalidade Fortuita',
    element: 'Energia',
    description: '<p>A Energia o conduz rumo à descobertas. Em cenas de investigação, a DT para procurar pistas diminui em –5 para você até você encontrar uma pista.</p><p><span>Afinidade:</span> a DT para procurar pistas sempre diminui em –5 para você.</p>'
  },
  {
    name: 'Golpe de Sorte',
    element: 'Energia',
    description: '<p>Seus ataques recebem +1 na margem de ameaça. <em>Pré-requisito:</em> Energia 1.</p><p><span>Afinidade:</span> seus ataques recebem +1 no multiplicador de crítico.</p>'
  },
  {
    name: 'Manipular Entropia',
    element: 'Energia',
    description: '<p>Nada diverte mais a Energia do que a possibilidade de um desastre ainda maior. Você pode gastar 2 PE para fazer um alvo em alcance curto (exceto você mesmo) rolar novamente um dos dados em um teste de perícia. <em>Pré-requisito:</em> Energia 1.</p><p><span>Afinidade:</span> o alvo rola novamente todos os dados que você escolher.</p>'
  },
  {
    name: 'Encarar a Morte',
    element: 'Morte',
    description: '<p>A sua conexão com a Morte o tornou apático diante da possibilidade do fim, fazendo com que você não hesite em situações de perigo. Durante cenas de ação, seu limite de gasto de PE aumenta em +1.</p><p><span>Afinidade:</span> durante cenas de ação, seu limite de gasto de PE aumenta em +2 (para um total de +3).</p>'
  },
  {
    name: 'Escapar da Morte',
    element: 'Morte',
    description: '<p>A Morte tem um interesse especial em sua caminhada. Uma vez por cena, quando receber dano que o deixaria com 0 PV, você fica com 1 PV. Não funciona em caso de dano massivo. <em>Pré-requisito:</em> Morte 1.</p><p><span>Afinidade:</span> em vez do normal, você evita completamente o dano. Em caso de dano massivo, você fica com 1 PV.</p>'
  },
  {
    name: 'Potencial Aprimorado',
    element: 'Morte',
    description: '<p>A Morte lhe concede potencial latente de momentos roubados de outro lugar. Você recebe +1 ponto de esforço por NEX. Quando sobe de NEX, os PE que recebe por este poder aumentam de acordo. Por exemplo, se escolher este poder em NEX 30%, recebe 6 PE. Quando subir para NEX 35%, recebe +1 PE adicional, e assim por diante.</p><p><span>Afinidade:</span> você recebe +1 PE adicional por NEX (para um total de +2 PE por NEX).</p>'
  },
  {
    name: 'Potencial Reaproveitado',
    element: 'Morte',
    description: '<p>Você absorve os momentos desperdiçados de outros seres. Uma vez por rodada, quando passa num teste de resistência, você ganha 1 ponto de esforço temporário. Os pontos desaparecem no final da cena.</p><p><span>Afinidade:</span> você ganha 2 pontos de esforço temporários, em vez de 1.</p>'
  },
  {
    name: 'Surto Temporal',
    element: 'Morte',
    description: '<p>A sua percepção temporal se torna distorcida e espiralizada, fazendo com que a noção de passagem do tempo nunca mais seja a mesma para você. Uma vez por cena, durante seu turno, você pode gastar 3 PE para realizar uma ação padrão adicional. <em>Pré-requisito:</em> Morte 2.</p><p><span>Afinidade:</span> em vez de uma vez por cena, você pode usar este poder uma vez por turno.</p>'
  },
  {
    name: 'Anatomia Insana',
    element: 'Sangue',
    description: '<p>O seu corpo é transfigurado e parece desenvolver um instinto próprio separado da sua consciência. Você tem 50% de chance (resultado par em 1d4) de ignorar o dano adicional de um acerto crítico ou ataque furtivo. <em>Pré-requisito:</em> Sangue 1.</p><p><span>Afinidade:</span> você é imune aos efeitos de acertos críticos e ataques furtivos.</p>'
  },
  {
    name: 'Arma de Sangue',
    element: 'Sangue',
    description: '<p>O Sangue devora parte de seu corpo e se manifesta como parte de você. Você pode gastar uma ação de movimento e 2 PE para produzir garras, chifres ou uma lâmina de sangue cristalizado que brota de seu antebraço. Qualquer que seja sua escolha, é considerada uma arma simples leve que você não precisa empunhar e causa 1d6 pontos de dano de Sangue. Uma vez por turno, quando você usa a ação agredir, pode gastar 1 PE para fazer um ataque corpo a corpo adicional com essa arma. A arma dura até o final da cena, e então se desfaz numa poça de sangue coagulado.</p><p><span>Afinidade:</span> a arma se torna permanentemente parte de você e causa dano de Sangue.</p>'
  },
  {
    name: 'Sangue de Ferro',
    element: 'Sangue',
    description: '<p>O seu sangue flui de forma paranormal e agressiva, concedendo vigor não natural. Você recebe +2 pontos de vida por NEX. Quando sobe de NEX, os PV que recebe por este poder aumentam de acordo. Por exemplo, se escolher este poder em NEX 50%, recebe 20 PV. Quando subir para NEX 55%, recebe +2 PV, e assim por diante.</p><p><span>Afinidade:</span> você recebe +5 em Fortitude e se torna imune a venenos e doenças.</p>'
  },
  {
    name: 'Sangue Fervente',
    element: 'Sangue',
    description: '<p>A intensidade da dor desperta em você sentimentos bestiais e prazerosos que você nem imaginava que existiam. Enquanto estiver machucado, você recebe +1 em Agilidade ou Força, à sua escolha (escolha sempre que este efeito for ativado). <em>Pré-requisito:</em> Sangue 2.</p><p><span>Afinidade:</span> o bônus que você recebe em Agilidade ou Força aumenta para +2.</p>'
  },
  {
    name: 'Sangue Vivo',
    element: 'Sangue',
    description: '<p>A carnificina não pode parar, o Sangue precisa continuar fluindo. Na primeira vez que ficar machucado durante uma cena, você recebe cura acelerada 2. Esse efeito nunca cura você acima da metade dos PV máximos (ou seja, você nunca deixa de estar machucado) e termina no fim da cena ou caso você perca a condição machucado. <em>Pré-requisito:</em> Sangue 1.</p><p><span>Afinidade:</span> a cura acelerada aumenta para 5.</p>'
  },
]

export default paranormalPowers
