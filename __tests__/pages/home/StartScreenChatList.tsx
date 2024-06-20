import { expect, it, describe } from '@jest/globals';
import { render, screen } from '@testing-library/react-native'
import StartScreen from "../../../src/pages/home/StartScreen.tsx";
import {LostReportProvider} from "../../../src/hooks/useLostReports.tsx";
import {UserProvider} from "../../../src/hooks/useUser.tsx";
import React from "react";
import {FoundReportProvider} from "../../../src/hooks/useFoundReports.tsx";
import {ChatProvider} from "../../../src/hooks/useChat.tsx";

describe('App', () => {
    it('should display a ItemList', () => {
        render(
            <UserProvider>
                <LostReportProvider >
                    <FoundReportProvider>
                        <ChatProvider>
                            <StartScreen />
                        </ChatProvider>
                    </FoundReportProvider>
                </LostReportProvider>
            </UserProvider>
        );

        const chatList = screen.queryAllByTestId('chat-list');
        expect(chatList).toBeTruthy();
    });
});