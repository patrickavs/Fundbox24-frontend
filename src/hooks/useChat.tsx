import { CHAT_SERVER, CHAT_URL } from '../routes';
import { Chat } from '../types/chat';
import { Message, NewMessage } from '../types/message';
import React, {
  useContext,
  createContext,
  useState,
  useTransition,
  useEffect,
  useCallback,
} from 'react';
import { io } from 'socket.io-client';
import { User } from '../types/user';

type ChatContextType = {
  chats: Array<Chat>;
  setChats: React.Dispatch<React.SetStateAction<Array<Chat>>>;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  startTransition: React.TransitionStartFunction;
  isPending: boolean;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const socket = io(CHAT_SERVER);

// use it only for one chat or to create one chat
export const useChat = (user: User, reportId: string | undefined) => {
  const context = useContext(ChatContext);
  const {
    startTransition,
    isPending,
    setChats,
    error,
    setError,
    chats,
  } = context;

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  useEffect(() => {
    startTransition(() => {
      // TODO: Fetch the messages from the rest-api
      // TODO: Connect to the chatserver and join the chat
      if (reportId) {
        socket.emit("chat status", { chatId: reportId, action: "join" });
      }
    });

    socket.on("chat status", (response) => {
      if (response?.status === "approved") {
        console.log(response?.message ?? "You joined the chat.")
      } else if (response?.status === "denied") {
        // TODO: Retry again
      }
    })

    socket.on("chat message", (message: Message) => {
      setChats(chats => {
        const chat = chats.find(({id}) => id === message)
        if(!chat) {
          throw new Error("You received a message you shouldn't receive");
        }
        chat.messages = [...chat.messages, message];
        return [...chats];
      })
    });
  }, []);

  const createChat = useCallback(
    async (
      basicAuthCredentials: string,
      reportId: string
    ) => {
      startTransition(() => {
        fetch(CHAT_SERVER, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${basicAuthCredentials}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({reportId})
        })
      });
    },
    [],
  );

  const addMessage = useCallback(
    async () => (basicAuthCredentials: string, message: NewMessage) => {
      socket.emit("channel message", { basicAuthCredentials, message })
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

  return { isPending, error, chats, createChat, removeChat, addMessage }; // Der returned wichtige Daten und Funktionen
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Array<Chat>>([]);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  return (
    <ChatContext.Provider
      value={{
        error,
        setError,
        chats,
        setChats,
        startTransition,
        isPending,
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
