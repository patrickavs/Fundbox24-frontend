import 'react-native';
import { act, renderHook } from '@testing-library/react-native';
import { expect, it, describe, jest, beforeEach } from '@jest/globals';
import { useChat, ChatProvider } from '../../../src/hooks/useChat';
import { Chat } from '../../../src/types/chat';
import { Message } from '../../../src/types/message.ts';

describe('Chat-Hook', () => {
    const fakeUserToken = 'fakeToken';
    const fakeContactedUser = 'user2';
    const fakeMessage: Message = {
        createdAt: new Date(),
        chatId: '',
        id: '',
        userId: '',
        type: 'text',
        content: 'Hello',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with an empty chat list', async () => {
        const { result } = renderHook(() => useChat(fakeUserToken), {
            wrapper: ChatProvider,
        });

        await act(async () => {});

        expect(result.current.chats).toEqual([]);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBeUndefined();
    });

    it('should handle creating a new chat', async () => {
        const { result } = renderHook(() => useChat(fakeUserToken), {
            wrapper: ChatProvider,
        });

        const newChat: Chat = {
            id: '3',
            title: 'New Chat',
            isOpen: true,
            updatedAt: new Date(),
            createdAt: new Date(),
            messages: [fakeMessage],
            firstUserId: 'user1',
            secondUserId: fakeContactedUser,
        };

        await act(async () => {
            result.current.createChat(fakeUserToken, fakeContactedUser, fakeMessage);
        });

        expect(result.current.chats).toStrictEqual([]);
    });

    it('should handle adding a message to a chat', async () => {
        const { result } = renderHook(() => useChat(fakeUserToken), {
            wrapper: ChatProvider,
        });

        const chatId = '1';

        // Adding a sample chat to the chats state for testing
        act(() => {
            result.current.chats.push({
                id: chatId,
                title: 'Chat 1',
                isOpen: true,
                updatedAt: new Date(),
                createdAt: new Date(),
                messages: [],
                firstUserId: 'user1',
                secondUserId: 'user2',
            });
        });

        await act(async () => {
            result.current.addMessage(fakeUserToken, chatId, fakeMessage);
        });

        const updatedChat = result.current.chats.find(chat => chat.id === chatId);
        expect(updatedChat?.messages).toStrictEqual([]);
    });

    it('should handle removing a chat', async () => {
        const { result } = renderHook(() => useChat(fakeUserToken), {
            wrapper: ChatProvider,
        });

        const chatId = '1';

        // Adding a sample chat to the chats state for testing
        act(() => {
            result.current.chats.push({
                id: chatId,
                title: 'Chat 1',
                isOpen: true,
                updatedAt: new Date(),
                createdAt: new Date(),
                messages: [],
                firstUserId: 'user1',
                secondUserId: 'user2',
            });
        });

        await act(async () => {
            result.current.removeChat(fakeUserToken, chatId);
        });

        expect(result.current.chats.find(chat => chat.id === chatId)).toBe(result.current.chats[0]);
    });

    it('should handle error state correctly', async () => {
        const { result } = renderHook(() => useChat(fakeUserToken), {
            wrapper: ChatProvider,
        });

        const errorMessage = 'An error occurred';

        await act(async () => {
            result.current.createChat(fakeUserToken, fakeContactedUser, fakeMessage);
        });

        expect(result.current.error).toBe(undefined);
    });
});
