import 'react-native';
import { act, renderHook } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import { FoundReportProvider, useFoundReports } from '../../../src/hooks/useFoundReports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoundReport } from '../../../src/types/report-found';
import { useChat, ChatProvider } from '../../../src/hooks/useChat';

describe('Chat-Hook', () => {
    it('should return the necessary stuff', async () => {
        const { result } = renderHook(useChat, {
            wrapper: ChatProvider,
        });

        // TODO: Is this best practice to wait on useEffect?
        await act(() => { })


        expect(result.current.chats).toMatchObject([])
    });
});
