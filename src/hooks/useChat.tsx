import { Chat } from "../types/chat";
import { Message, NewMessage } from "../types/message";
import { useContext, createContext, useState, useTransition, useEffect } from "react";

type ChatContextType = {
    chats: Array<Chat>;
    isPending: boolean;
    addChat: (contactedUser: string) => void;
    addMessage: (chatId: string, message: Message) => void;
    removeChat: (chatId: string) => void;
};

const ChatContext = createContext<ChatContextType>({
    chats: [],
    isPending: false,
    addChat: () => { },
    addMessage: () => { },
    removeChat: () => { },
});

export const useChat = () => {
    return useContext(ChatContext);
};

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [chats, setChats] = useState<Array<Chat>>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            // TODO: Change to fetch call
            // TODO: Use an userId here
            setChats(sampleChatData);
        });
    }, [])

    // TODO: useCallback or useMemo to prevent unnecessary rerenders
    const addChat = (contactedUser: string) => {
        startTransition(() => {
            // TODO: Fetch call to api
            // setChats([...chats, ]);
        });
    }

    const addMessage = (chatId: string, message: NewMessage) => {
        startTransition(() => {
            // TODO: Fetch call to api
        });
    }

    const removeChat = (chatId: string) => {
        startTransition(() => {
            // TODO: Fetch call to api
            setChats(chats.filter((chat) => chat.id !== chatId));
        });
    }

    return (
        <ChatContext.Provider value={{ chats, isPending, addChat, addMessage, removeChat }}>
            {children}
        </ChatContext.Provider>
    );
}

const sampleChatData: Array<Chat> = [
    {
        id: "1",
        title: "Chat 1",
        updatedAt: new Date(),
        createdAt: new Date(),
        messages: [
            {
                id: "1",
                type: "text",
                content: "Hello",
                createdAt: new Date(),
                userId: "1",
                chatId: "1",
            },
            {
                id: "2",
                type: "text",
                content: "Hi",
                createdAt: new Date(),
                userId: "2",
                chatId: "1",
            },
        ],
        firstUserId: "1",
        secondUserId: "2",
    },
    {
        id: "2",
        title: "Chat 2",
        updatedAt: new Date(),
        createdAt: new Date(),
        messages: [],
        firstUserId: "1",
        secondUserId: "3",
    },
]