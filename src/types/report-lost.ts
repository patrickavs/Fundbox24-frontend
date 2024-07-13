import { Category } from './category';
import { Location } from './location.ts';
import { Chat } from './chat.ts';
import { User } from './user.ts';

export type LostReport = {
  id: string;
  title: string;
  description: string;
  isFinished: boolean;
  imagePath: string;
  lastSeenDate: string;
  lastSeenLocation: Location;
  lostLocation: Location;
  lostRadius: number;
  category: Category;
  //placeOfDiscovery: string;
  //placeOfDelivery?: string;
  myChats: Chat[];
  owner: User;
};

export type NewLostReport = Omit<LostReport, 'id'>;
