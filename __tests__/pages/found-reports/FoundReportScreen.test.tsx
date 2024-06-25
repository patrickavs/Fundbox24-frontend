import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {ChatProvider} from '../../../src/hooks/useChat';
import {FoundReportProvider} from '../../../src/hooks/useFoundReports';
import {LostReportProvider} from '../../../src/hooks/useLostReports';
import {UserProvider} from '../../../src/hooks/useUser';
import {describe, expect, it} from '@jest/globals';
import {NavigationContainer} from '@react-navigation/native';
import LostReportNavStack from '../../../src/pages/lost/LostReportNavStack';
import FoundReportNavStack from '../../../src/pages/found/FoundReportNavStack';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
}));

describe('FoundReportScreen', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(
            <UserProvider>
                <LostReportProvider>
                    <FoundReportProvider>
                        <ChatProvider>
                            <NavigationContainer>
                                <FoundReportNavStack />
                            </NavigationContainer>
                        </ChatProvider>
                    </FoundReportProvider>
                </LostReportProvider>
            </UserProvider>
        );

        expect(getByTestId('found-report-screen')).toBeTruthy();

        // check if the text is rendered correctly
        expect(screen.getByText('Gefunden in deinem Umkreis')).toBeTruthy();});

});
