import {Location} from './location.ts';
import {Chat} from './chat.ts';

export type LostReportRequest = {
  title: string;
  description: string;
  isFinished: boolean;
  imagePath: string;
  lastSeenDate: string;
  lastSeenLocation: Location;
  lostLocation: Location;
  lostRadius: number;
  categoryId: number;
  myChats: Chat[];
};
