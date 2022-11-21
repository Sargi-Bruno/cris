import { Protection } from '../types'

const protections: Array<Protection> = [
  {
    name: 'Proteção Leve',
    defense: 5,
    category: 'I',
    slots: 2,
    itemType: 'protection',
    description: '<p>Jaqueta de couro pesada ou um colete de kevlar. Essa proteção é tipicamente usada por seguranças e policiais.</p>'
  },
  {
    name: 'Proteção Pesada',
    defense: 10,
    category: 'II',
    slots: 5,
    itemType: 'protection',
    description: '<p>Equipamento usado por forças especiais da polícia e pelo exército. Consiste de capacete, ombreiras, joelheiras e caneleiras, além de um colete com várias camadas de kevlar. Fornece resistência a balístico, corte, impacto e perfuração 2. No entanto, por ser desconfortável e volumosa, impõe –5 em testes de perícias que sofrem penalidade de carga.</p>'
  },
  {
    name: 'Escudo',
    defense: 2,
    category: 'I',
    slots: 2,
    itemType: 'protection',
    description: '<p>Um escudo medieval ou moderno, como aqueles usados por tropas de choque. Para efeitos de proficiência, conta como proteção pesada. Precisa ser empunhado em uma mão e fornece Defesa +2.</p>'
  }
]

export default protections
