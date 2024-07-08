import {Location} from './location';
import {Chat} from './chat.ts';

export type FoundReportRequest = {
  title: string;
  description: string;
  isFinished: boolean;
  imagePath: string;
  categoryId: number;
  foundDate: string;
  foundLocation: Location;
  currentLocation: Location;
  myChats: Chat[];
};
