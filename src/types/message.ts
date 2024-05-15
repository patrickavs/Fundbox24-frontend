export type Message = {
  id: string;
  type: string;
  content: string;
  createdAt: Date;
  userId: string;
  chatId: string;
};

export type NewMessage = Omit<Message, 'id' | 'createdAt'>;
