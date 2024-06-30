import { Chat } from '../types/chat';
import { Message, NewMessage } from '../types/message';
import {
  useContext,
  createContext,
  useState,
  useTransition,
  useEffect,
  useCallback,
} from 'react';
import { CHAT_URL, MESSAGE_URL } from '../routes';

type ChatContextType = {
  chats: Array<Chat>;
  setChats: React.Dispatch<React.SetStateAction<Array<Chat>>>;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  startTransition: React.TransitionStartFunction;
  isPending: boolean;
  createChat: (
    userToken: string,
    contactedUser: string,
    message: NewMessage,
  ) => void;
  addMessage: (userToken: string, chatId: string, message: NewMessage) => void;
  removeChat: (userToken: string, chatId: string) => void;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const useChat = (userToken: string) => {
  const context = useContext(ChatContext);
  const {
    startTransition,
    isPending,
    setChats,
    error,
    setError,
    chats,
    createChat,
    removeChat,
    addMessage,
  } = context;

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  useEffect(() => {
    startTransition(() => {
      // fetch({ method: 'get', url: CHAT_URL }).then(response => {
      //   if (response.success) {
      //     setChats(response.data);
      //   } else {
      //     setError(response.error);
      //   }
      // });
    });
  }, []);

  return { isPending, error, chats, createChat, removeChat, addMessage }; // Der returned wichtige Daten und Funktionen
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Array<Chat>>([]);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const createChat = useCallback(
    async (
      userToken: string,
      contactedUser: string,
      initialMessage: NewMessage,
    ) => {
      startTransition(() => {
        // fetch({
        //   method: 'post',
        //   url: CHAT_URL,
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${userToken}`,
        //   },
        //   data: {
        //     contactedUser,
        //     initialMessage,
        //   },
        // }).then(response => {
        //   if (response.success) {
        //     setChats(prev => [...prev, response.data as Chat]);
        //   } else {
        //     setError(response.error);
        //   }
        // });
      });
    },
    [],
  );

  const addMessage = useCallback(
    async () => (userToken: string, chatId: string, message: NewMessage) => {
      startTransition(() => {
        // fetch({
        //   method: 'post',
        //   url: MESSAGE_URL(chatId),
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${userToken}`,
        //   },
        //   data: message,
        // }).then(response => {
        //   if (response.success) {
        //     chats
        //       .filter(chat => chat.id === chatId)[0]
        //       ?.messages.push(response.data);
        //     // Force reload
        //     setChats(prev => [...prev]);
        //   } else {
        //     setError(response.error);
        //   }
        // });
      });
    },
    [],
  );

  const removeChat = useCallback(async (userToken: string, chatId: string) => {
    startTransition(() => {
      // fetch({
      //   method: 'delete',
      //   url: CHAT_URL,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${userToken}`,
      //   },
      // })
      //   .then(response => {
      //     if (response.success) {
      //       setChats(prev => prev.filter(chat => chat.id === chatId));
      //     } else {
      //       setError(response.error);
      //     }
      //   })
      //   .catch(error => setError(JSON.stringify(error)));
    });
  }, []);

  return (
    <ChatContext.Provider
      value={{
        error,
        setError,
        chats,
        setChats,
        startTransition,
        isPending,
        createChat,
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
