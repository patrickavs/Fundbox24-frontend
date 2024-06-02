import {FoundReport} from '../../types/report-found.ts';

const foundReports: FoundReport[] = [
  {
    id: 'a',
    object: 'Armbanduhr',
    description: 'Eine silberne Armbanduhr der Marke Casio',
    status: 'found',
    timeOfDiscovery: new Date(),
    category: {
      id: '6',
      value: 'watch',
      name: 'Armbanduhr',
      requiresAction: false,
    },
    placeOfDiscovery: 'Im Fitnessstudio Umkleidekabine',
    placeOfDelivery: 'Fundbüro der Stadt',
  },
  {
    id: 'b',
    object: 'Handy',
    description: 'Ein schwarzes iPhone 12 mit einer blauen Hülle',
    status: 'found',
    timeOfDiscovery: new Date(),
    category: {
      id: '7',
      value: 'phone',
      name: 'Handy',
      requiresAction: true,
    },
    placeOfDiscovery: 'Auf dem Sitz im Bus Linie 42',
    placeOfDelivery: 'Fundbüro der Verkehrsbetriebe',
  },
  {
    id: 'c',
    object: 'Portemonnaie',
    description:
      'Ein braunes Leder-Portemonnaie mit mehreren Karten und Bargeld',
    status: 'found',
    timeOfDiscovery: new Date(),
    category: {
      id: '8',
      value: 'wallet',
      name: 'Portemonnaie',
      requiresAction: true,
    },
    placeOfDiscovery: 'Im Café an der Hauptstraße',
    placeOfDelivery: 'Fundbüro der Stadt',
  },
  {
    id: 'd',
    object: 'Brille',
    description: 'Eine schwarze Lesebrille mit dünnem Rahmen',
    status: 'found',
    timeOfDiscovery: new Date(),
    category: {
      id: '9',
      value: 'glasses',
      name: 'Brille',
      requiresAction: false,
    },
    placeOfDiscovery: 'Auf dem Schreibtisch im Büro',
    placeOfDelivery: 'Empfang des Bürogebäudes',
  },
  {
    id: 'e',
    object: 'Laptop',
    description: 'Ein silberner MacBook Pro, 13 Zoll',
    status: 'found',
    timeOfDiscovery: new Date(),
    category: {
      id: '10',
      value: 'laptop',
      name: 'Laptop',
      requiresAction: true,
    },
    placeOfDiscovery: 'In der Bibliothek auf dem Lesetisch',
    placeOfDelivery: 'Fundbüro der Bibliothek',
  },
  {
    id: 'f',
    object: 'Schlüsselbund',
    description:
      'Ein Schlüsselbund mit fünf Schlüsseln und einem roten Anhänger',
    status: 'found',
    timeOfDiscovery: new Date(),
    category: {
      id: '11',
      value: 'keys',
      name: 'Schlüsselbund',
      requiresAction: false,
    },
    placeOfDiscovery: 'Vor dem Eingang des Supermarktes',
    placeOfDelivery: 'Kundendienst des Supermarktes',
  },
];

export default foundReports;
