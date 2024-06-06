import {Category} from './category';
import {Location} from './location.ts';
import {Chat} from './chat.ts';

export type LostReport = {
  id: string;
  title: string;
  description: string;
  lastSeenDate: string;
  lastSeenLocation: Location;
  lostLocation: Location;
  lostRadius: number;
  category: Category;
  placeOfDiscovery: string;
  placeOfDelivery?: string;
  myChats: Chat[];
};

export type NewLostReport = Omit<LostReport, 'id'>;
