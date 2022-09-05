import { Ammunition } from './dataInterfaces'

const ammunitions: Array<Ammunition> = [
  {
    name: 'Balas curtas',
    category: '0',
    slots: 1,
    description: '<p>Munição básica, usada em pistolas, revólveres e submetralhadoras. Um pacote de balas curtas dura duas cenas.</p>'
  },
  {
    name: 'Balas longas',
    category: 'I',
    slots: 1,
    description: '<p>Maior e mais potente, esta municação é usada em fuzis e metralhadoras. Um pacote de balas longas dura uma cena.</p>'
  },
  {
    name: 'Cartuchos',
    category: 'I',
    slots: 1,
    description: '<p>Usados em espingardas, esses cartuchos são carregados com esferas de chumbo. Um pacote de cartuchos dura uma cena.</p>'
  },
  {
    name: 'Combustível',
    category: 'I',
    slots: 1,
    description: '<p>Um tanque de combustível para lança-chamas. Dura uma cena.</p>'
  },
  {
    name: 'Flechas',
    category: '0',
    slots: 1,
    description: '<p>Usadas em arcos e bestas, flechas podem ser reaproveitadas após cada combate. Por isso, um pacote de flechas dura uma missão inteira.</p>'
  },
  {
    name: 'Foguete',
    category: 'I',
    slots: 1,
    description: '<p>Disparado por bazucas. Ao contrário de outras munições, cada foguete dura um único disparo, não uma cena. Para fazer vários ataques, você precisará carregar vários foguetes.</p>'
  },
]

export default ammunitions
