import {Category} from './category';
import {Location} from './location';
import {Chat} from './chat.ts';

export type FoundReport = {
  id: string;
  title: string;
  description: string;
  isFinished: boolean;
  category: Category;
  foundDate: string;
  foundLocation: Location;
  currentLocation: Location;
  myChats: Chat[];
};

export type NewFoundReport = Omit<FoundReport, 'id'>;
