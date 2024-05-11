import {Chat} from '../types/chat';
import {Message, NewMessage} from '../types/message';
import {
  useContext,
  createContext,
  useState,
  useTransition,
  useEffect,
  useCallback,
} from 'react';
import {CHAT_URL, MESSAGE_URL} from '../routes';

type ChatContextType = {
  chats: Array<Chat>;
  setChats: React.Dispatch<React.SetStateAction<Array<Chat>>>;
  startTransition: React.TransitionStartFunction;
  isPending: boolean;
  addChat: (userToken: string, contactedUser: string) => void;
  addMessage: (userToken: string, chatId: string, message: Message) => void;
  removeChat: (userToken: string, chatId: string) => void;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const useChat = (userToken: string) => {
  const {
    startTransition,
    isPending,
    setChats,
    chats,
    addChat,
    removeChat,
    addMessage,
  } = useContext(ChatContext);

  useEffect(() => {
    startTransition(() => {
      fetch(CHAT_URL)
        .then(response => setChats(sampleChatData))
        .catch(e => console.error(e));
    });
  }, []);

  return {isPending, chats, addChat, removeChat, addMessage}; // Der returned wichtige Daten und Funktionen
};

export function ChatProvider({children}: {children: React.ReactNode}) {
  const [chats, setChats] = useState<Array<Chat>>([]);
  const [isPending, startTransition] = useTransition();

  const addChat = useCallback(
    async (userToken: string, contactedUser: string) => {
      startTransition( () => {
        fetch(CHAT_URL, {
          method: 'POST',
          body: contactedUser,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        }).then((response: Response) => {
          if (!response.ok) {
            // TODO: Set error
            return;
          }
          const data = response.json();
          setChats(data);
        });
      });
    },
    [],
  );

  const addMessage = useCallback(
    async () => (userToken: string, chatId: string, message: NewMessage) => {
      startTransition(() => {
        fetch(MESSAGE_URL(chatId), {
          method: 'POST',
        }).then((response: Response) => {
          setChats(sampleChatData);
        });
      });
    },
    [],
  );

  const removeChat = useCallback(async (userToken: string, chatId: string) => {
    fetch(`${CHAT_URL}/${chatId}`, {method: 'DELETE'}).then(
      (response: Response) => {},
    );
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        startTransition,
        isPending,
        addChat,
        addMessage,
        removeChat,
      }}>
      {children}
    </ChatContext.Provider>
  );
}

const sampleChatData: Array<Chat> = [
  {
    id: '1',
    title: 'Chat 1',
    isOpen: true,
    updatedAt: new Date(),
    createdAt: new Date(),
    messages: [
      {
        id: '1',
        type: 'text',
        content: 'Hello',
        createdAt: new Date(),
        userId: '1',
        chatId: '1',
      },
      {
        id: '2',
        type: 'text',
        content: 'Hi',
        createdAt: new Date(),
        userId: '2',
        chatId: '1',
      },
    ],
    firstUserId: '1',
    secondUserId: '2',
  },
  {
    id: '2',
    title: 'Chat 2',
    isOpen: true,
    updatedAt: new Date(),
    createdAt: new Date(),
    messages: [],
    firstUserId: '1',
    secondUserId: '3',
  },
];
