import { Modification } from './dataInterfaces'

export const weaponModifications: Array<Modification> = [
  {
    name: 'Alongada',
    description: '<p>Com um cano mais longo, que aumenta a precisão dos disparos, a arma fornece +2 nos testes de ataque.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Calibre Grosso',
    description: '<p>A arma é modificada para disparar munição de maior calibre, aumentando seu dano em mais um dado do mesmo tipo. Por exemplo, um revolver de calibre grosso causa 3d6 pontos de dano, enquanto um fuzil de precisão causa 3d10. Armas com esta modificação precisam usar munição específica de calibre grosso. Munição de calibre grosso possui o mesmo custo em categoria de munição normal, mas não pode ser usada em armas normais.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Certeira',
    description: '<p>A arma é modificada para disparar munição de maior calibre, aumentando seu dano em mais um dado do mesmo tipo. Por exemplo, um revolver de calibre grosso causa 3d6 pontos de dano, enquanto um fuzil de precisão causa 3d10. Armas com esta modificação precisam usar munição específica de calibre grosso. Munição de calibre grosso possui o mesmo custo em categoria de munição normal, mas não pode ser usada em armas normais.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Compensador',
    description: '<p>Apenas para armas automáticas. Um sistema de amortecimento reduz o coice da arma, anulando a penalidade em testes de ataque por disparar rajadas.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Cruel',
    description: '<p>A arma possui lâmina especialmente afiada ou foi fabricada com materiais mais densos. Fornece um bônus de +2 nas rolagens de dano.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Discreta',
    description: '<p>A arma possui modificações para ocupar menos espaço e chamar menos atenção. Se for uma arma de fogo, pode ser desmontável, se for um bastão pode ser retrátil, se for uma espada, pode ter a lâmina dobrável e assim por diante. Reduz o número de espaços ocupados em 1, fornece +5 em testes de Crime para ser ocultada e permite que você faça esse teste mesmo que não seja treinado na perícia.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Dum Dum',
    description: '<p>Estas balas são feitas para se expandir durante o impacto, produzindo ferimentos terríveis. Esta modificação só pode ser aplicada em balas curtas e longas e aumenta o multiplicador de crítico em +2.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Explosiva',
    description: '<p>Estas munições possuem uma gota de mercúrio ou glicerina, que fazem a bala explodir ao atingir o alvo. Esta modificação só pode ser aplicada em balas curtas e longas e aumenta o dano causado em +2d6.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Ferrolho Automático',
    description: '<p>O mecanismo de ação da arma é modificado para disparar várias vezes em sequência. A arma se torna automática.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Mira Laser',
    description: '<p>Um laser interno cria um reflexo vermelho num retículo luminoso, que é visto pelo atirador e ajuda-o a realizar disparos mais letais. Aumenta a margem de ameaça em +2.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Mira Telescópica',
    description: '<p>A arma possui uma luneta com marcações de medidas, ideal para disparos precisos de longa distância. Aumenta o alcance da arma em uma categoria (de curto para médio, de médio para longo, de longo para extremo) e permite que a habilidade Ataque Furtivo seja usada em qualquer alcance.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Perigosa',
    description: '<p>A arma possui lâmina afiada como uma navalha ou foi fabricada com materiais maciços. Seja como for, seus golpes possuem impacto terrível. Aumenta a margem de ameaça em +2.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Silenciador',
    description: '<p>Um silenciador reduz em –10 a penalidade em Furtividade para se esconder no mesmo turno em que atacou com a arma de fogo.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Tática',
    description: '<p>A arma possui cabo texturizado, bandoleira e outros acessórios que facilitam seu manuseio. Você pode sacar a arma como uma ação livre.</p>',
    itemType: 'weapon'
  },
  {
    name: 'Visão de Calor',
    description: '<p>A mira tem um sistema eletrônico que sobrepõe imagens visíveis e imagens em infravermelho, criando um contraste entre zonas frias e quentes. Ao disparar com a arma, você ignora qualquer camuflagem do alvo.</p>',
    itemType: 'weapon'
  }
]

export const protectionsModifications: Array<Modification> = [
  {
    name: 'Antibombas',
    description: '<p>Quimicamente tratada para resistir ao calor e revestida de preenchimentos para amortecer estilhaços. Acompanha um capacete com viseira para proteger da luz e barulho de explosões. Fornece +5 em testes de resistência contra efeitos de área. Só pode ser aplicada em proteções pesadas.</p>',
    itemType: 'protection'
  },
  {
    name: 'Blindada',
    description: '<p>Reforçada com placas de aço e cerâmica costuradas dentro das camadas de kevlar. Aumenta a resistência a dano para 5 e o espaço ocupado em +1. Só pode ser aplicada em proteções pesadas.</p>',
    itemType: 'protection'
  },
  {
    name: 'Discreta',
    description: '<p>Colete compacto feito com kevlar denso para reduzir o volume. Reduz o número de espaços ocupados em 1, fornece +5 em testes de Crime para ser ocultada e permite que você faça esse teste mesmo que não seja treinado na perícia. Só pode ser aplicada em proteções leves.</p>',
    itemType: 'protection'
  },
  {
    name: 'Reforçada',
    description: '<p>Aumenta a Defesa fornecida em +2 e o espaço ocupado em +1. Uma proteção não pode ser reforçada e discreta ao mesmo tempo.</p>',
    itemType: 'protection'
  },
]

export const miscModifications: Array<Modification> = [
  {
    name: 'Aprimorado',
    description: '<p>O bônus em perícia concedido pelo acessório aumenta para +5. Se o item tiver função adicional, esta modificação poderá ser escolhida uma segunda vez para esta função.</p>',
    itemType: 'misc'
  },
  {
    name: 'Discreto',
    description: '<p>O item é miniaturizado ou disfarçado como outro item inócuo (como um relógio). Reduz o número de espaços ocupados em 1, fornece +5 em testes de Crime para ser ocultado e permite que você faça esse teste mesmo que não seja treinado na perícia.</p>',
    itemType: 'misc'
  },
  {
    name: 'Função Adicional',
    description: '<p>O acessório fornece +2 em uma perícia adicional à sua escolha, sujeita à aprovação do mestre.</p>',
    itemType: 'misc'
  },
  {
    name: 'Instrumental',
    description: '<p>O acessório pode ser usado como um kit de perícia específico (escolhido ao aplicar esta modificação).</p>',
    itemType: 'misc'
  },
]
