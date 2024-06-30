import {Category} from '../types/category.ts';

export const category: Category[] = [
  {
    id: 1007,
    value: 'HIGH',
    name: 'Schmuck',
    image: require('../assets/images/categories/schmuck.png'),
  },
  {
    id: 1006,
    value: 'HIGH',
    name: 'Gerät',
    image: require('../assets/images/categories/gerate.png'),
  },
  {
    id: 1005,
    value: 'LOW',
    name: 'Tasche',
    image: require('../assets/images/categories/rucksack.png'),
  },
  {
    id: 1004,
    value: 'LOW',
    name: 'Kleidung',
    image: require('../assets/images/categories/pajamas.png'),
  },
  {
    id: 1003,
    value: 'HIGH',
    name: 'Schlüssel',
    image: require('../assets/images/categories/key-chain.png'),
  },
  {
    id: 1002,
    value: 'HIGH',
    name: 'Geldbörse',
    image: require('../assets/images/categories/wallet.png'),
  },
  {
    id: 1008,
    value: 'LOW',
    name: 'Spielzeug',
    image: require('../assets/images/categories/teddy-bear.png'),
  },
  {
    id: 1009,
    value: 'LOW',
    name: 'Sonstiges',
    image: require('../assets/images/categories/mystery.png'),
  },
];
