export type Message = {
  id: 1,
  isImage: true,
  content: string,
  sentAt: string,
  sender: {
    id: number,
    username: string
  }
};

export type NewMessage = Omit<
  Message,
  'id'
>;
