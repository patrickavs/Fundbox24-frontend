import {Message} from './message';

export type Chat = {
  id: string;
  messages: Array<Message>,
  reportId: number,
  reportTitle: string,
  reportVisitor: {
    id: number,
    username: string
  },
  reportCreator: {
    id: number,
    username: string
  }
}
