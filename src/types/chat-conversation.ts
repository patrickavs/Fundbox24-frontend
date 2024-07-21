import { Message } from './message.ts';

export type ChatConversation = {
  id: string,

  // username of other user
  otherUser: string,

  messages: Message[],
}
