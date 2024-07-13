import { Category } from './category';
import { Location } from './location';
import { Chat } from './chat.ts';
import { User } from './user.ts';

export type FoundReport = {
  id: string;
  title: string;
  description: string;
  isFinished: boolean;
  imagePath: string;
  category: Category;
  foundDate: string;
  foundLocation: Location;
  currentLocation: Location;
  myChats: Chat[];
  finder: User;
};

export type NewFoundReport = Omit<FoundReport, 'id'>;
