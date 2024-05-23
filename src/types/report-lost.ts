import {Category} from './category';

export type LostReport = {
  id: string;
  title: string;
  description: string;
  status: 'found' | 'lost';
  timeOfDiscovery: Date;
  category: Category;
  placeOfDiscovery: string;
  placeOfDelivery?: string;
};

export type NewLostReport = Omit<LostReport, 'id'>;
