import {Category} from './category';

export type FoundReport = {
  id: string;
  title: string;
  description: string;
  status: 'found' | 'lost';
  timeOfDiscovery: Date;
  category: Category;
  placeOfDiscovery: string;
  placeOfDelivery: string;
};

export type NewFoundReport = Omit<FoundReport, 'id'>;
