import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SingleLostReportScreen from '../../../src/pages/lost/SingleLostReportScreen';
import {ChatProvider} from '../../../src/hooks/useChat';
import {FoundReportProvider} from '../../../src/hooks/useFoundReports';
import {LostReportProvider} from '../../../src/hooks/useLostReports';
import {UserProvider} from '../../../src/hooks/useUser';
import {describe, expect, it} from '@jest/globals';
import {NavigationContainer} from '@react-navigation/native';
import LostReportNavStack from '../../../src/pages/lost/LostReportNavStack';

describe('SingleLostReportScreen', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(
            <UserProvider>
                <LostReportProvider>
                    <FoundReportProvider>
                        <ChatProvider>
                            <NavigationContainer>
                                <LostReportNavStack />
                            </NavigationContainer>
                        </ChatProvider>
                    </FoundReportProvider>
                </LostReportProvider>
            </UserProvider>
        );

        expect(getByTestId('lost-report-screen')).toBeTruthy();

        // check if the text is rendered correctly
        expect(screen.getByText('Gesucht in deinem Umkreis')).toBeTruthy();});

});
