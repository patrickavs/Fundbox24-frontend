import {LostReport} from '../../types/report-lost.ts';

const lostReports: LostReport[] = [
  {
    id: 'b',
    object: 'Schlüsselbund',
    description:
      'Ein Schlüsselbund mit 3 Schlüsseln und einem roten Schlüsselanhänger',
    status: 'lost',
    timeOfDiscovery: new Date(),
    placeOfDiscovery: 'Im Parkhaus auf Ebene 3',
    category: {
      id: '2',
      value: 'keys',
      name: 'Schlüssel',
      requiresAction: false,
    },
  },
  {
    id: 'c',
    object: 'Sonnenbrille',
    description: 'Eine schwarze Sonnenbrille der Marke Ray-Ban',
    status: 'lost',
    timeOfDiscovery: new Date(),
    placeOfDiscovery: 'Auf der Bank am See',
    category: {
      id: '3',
      value: 'sunglasses',
      name: 'Sonnenbrille',
      requiresAction: false,
    },
  },
  {
    id: 'd',
    object: 'Rucksack',
    description: 'Ein blauer Rucksack mit einem Laptop und Büchern',
    status: 'lost',
    timeOfDiscovery: new Date(),
    placeOfDiscovery: 'Im Bus Linie 42',
    category: {
      id: '4',
      value: 'backpack',
      name: 'Rucksack',
      requiresAction: true,
    },
  },
  {
    id: 'e',
    object: 'Geldbörse',
    description: 'Eine braune Leder-Geldbörse mit diversen Karten und Bargeld',
    status: 'lost',
    timeOfDiscovery: new Date(),
    placeOfDiscovery: 'Im Café an der Hauptstraße',
    category: {
      id: '5',
      value: 'wallet',
      name: 'Geldbörse',
      requiresAction: true,
    },
  },
  {
    id: 'f',
    object: 'Armbanduhr',
    description: 'Eine silberne Armbanduhr der Marke Casio',
    status: 'lost',
    timeOfDiscovery: new Date(),
    placeOfDiscovery: 'Im Fitnessstudio Umkleidekabine',
    category: {
      id: '6',
      value: 'watch',
      name: 'Armbanduhr',
      requiresAction: false,
    },
  },
  {
    id: 'g',
    object: 'Handy',
    description: 'Ein schwarzes iPhone 12 mit einer blauen Hülle',
    status: 'lost',
    timeOfDiscovery: new Date(),
    placeOfDiscovery: 'Auf dem Sitz im Bus Linie 42',
    category: {
      id: '7',
      value: 'phone',
      name: 'Handy',
      requiresAction: true,
    },
  },
];

export default lostReports;
