import { expect, it, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react-native'
import StartScreen from "../../../src/pages/home/StartScreen.tsx";
import {LostReportProvider} from "../../../src/hooks/useLostReports.tsx";
import {UserProvider} from "../../../src/hooks/useUser.tsx";
import React from "react";
import {FoundReportProvider} from "../../../src/hooks/useFoundReports.tsx";
import {ChatProvider} from "../../../src/hooks/useChat.tsx";
import ChatList from "../../../src/components/chat/ChatList.tsx";

describe('App', () => {
    it('should display three ChatItems"', () => {
        render(
            <UserProvider>
                <LostReportProvider >
                    <FoundReportProvider>
                        <ChatProvider>
                            <ChatList />
                        </ChatProvider>
                    </FoundReportProvider>
                </LostReportProvider>
            </UserProvider>
        );

        const chatItems = screen.queryAllByTestId('chat');
        expect(chatItems.length).toBe(3);
    });
});