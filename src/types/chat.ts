import {Message} from './message';

export type Chat = {
  id: string;
  title: string;
  isOpen: boolean;
  updatedAt: Date;
  createdAt: Date;
  messages: Array<Message>;
  firstUserId: string;
  secondUserId: string;
};
