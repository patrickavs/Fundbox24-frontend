import {Category} from '../types/category.ts';

export const category: Category[] = [
  {
    id: '1',
    value: 'HIGH',
    name: 'Schmuck',
    image: require('../assets/images/categories/schmuck.png'),
  },
  {
    id: '2',
    value: 'HIGH',
    name: 'Gerät',
    image: require('../assets/images/categories/gerate.png'),
  },
  {
    id: '3',
    value: 'LOW',
    name: 'Tasche',
    image: require('../assets/images/categories/rucksack.png'),
  },
  {
    id: '4',
    value: 'LOW',
    name: 'Kleidung',
    image: require('../assets/images/categories/pajamas.png'),
  },
  {
    id: '5',
    value: 'HIGH',
    name: 'Schlüssel',
    image: require('../assets/images/categories/key-chain.png'),
  },
  {
    id: '6',
    value: 'HIGH',
    name: 'Geldbörse',
    image: require('../assets/images/categories/wallet.png'),
  },
  {
    id: '7',
    value: 'LOW',
    name: 'Spielzeug',
    image: require('../assets/images/categories/teddy-bear.png'),
  },
  {
    id: '8',
    value: 'LOW',
    name: 'Sonstiges',
    image: require('../assets/images/categories/mystery.png'),
  },
];
