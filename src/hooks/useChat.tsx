import { CHAT_SERVER, CHAT_URL, CHAT_USER_URL } from '../routes';
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
  chat?: Chat;
  setChat: React.Dispatch<React.SetStateAction<Chat | undefined>>;
  error?: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  startTransition: React.TransitionStartFunction;
  isPending: boolean;
};

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

const socket = io(CHAT_SERVER);

// use it only for one chat or to create one chat
export const useChat = (basicAuthCredentials: string, user: User | null, reportId: number | undefined) => {
  const context = useContext(ChatContext);
  const {
    startTransition,
    isPending,
    setChat,
    error,
    setError,
    chat,
  } = context;

  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }

  useEffect(() => {
    socket.removeAllListeners();
    console.log('initializing useChat hook');

    startTransition(() => {
      // TODO: Fetch the messages from the rest-api
      fetch(CHAT_USER_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${basicAuthCredentials}`,
        },
      }).then(response => {
        if (!response.ok) {
          setError('Response failed');
        }

        return response.json();
      });
      // TODO: Connect to the chatserver and join the chat
      if (reportId) {
        socket.emit('chat status', { chatId: reportId, action: 'join' });
      }
    });

    socket.on('chat status', (response) => {
      if (response?.status === 'approved') {
        console.log(response?.message ?? 'You joined the chat.');
      } else if (response?.status === 'denied') {
        // TODO: Retry again
      }
    });

    socket.on('other chat message', (message: Message) => {
      setChat(chat => {
        if (!chat) {
          throw new Error('No chat is loaded.');
        }

        chat.messages = [...chat.messages, message];

        return { ...chat }; // Force rerender
      });
    });
  }, []);

  const createChat = useCallback(
    async (reportId: string) => {
      startTransition(() => {
        fetch(CHAT_URL(), {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${basicAuthCredentials}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reportId }),
        });
      });
    },
    []
  );

  const addMessage = useCallback(async (message: Message) => {
      socket.emit('new chat message', { basicAuthCredentials, message });
    },
    []
  );

  const removeChat = useCallback(async (userToken: string, chatId: string) => {
    startTransition(() => {
      // TODO:
    });
  }, []);

  return { isPending, error, chat, createChat, removeChat, addMessage }; // Der returned wichtige Daten und Funktionen
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const initialChat: Chat = {
    id: '1',
    messages: [],
    reportId: 1,
    reportCreator: { id: 1, username: 'Rüdiger' },
    reportTitle: 'Ich hab meine Cola verloren',
    reportVisitor: { id: 1, username: 'Wolfgang' },
  };

  const [chat, setChat] = useState<Chat | undefined>(initialChat);
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  return (
    <ChatContext.Provider
      value={{
        error,
        setError,
        chat,
        setChat,
        startTransition,
        isPending,
      }}>
      {children}
    </ChatContext.Provider>
  );
}
