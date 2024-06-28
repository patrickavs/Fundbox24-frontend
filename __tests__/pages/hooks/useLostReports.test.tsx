import 'react-native';
import { act, renderHook } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import { LostReportProvider, useLostReports } from '../../../src/hooks/useLostReports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LostReport } from '../../../src/types/report-lost';

const lostReportMockupData: LostReport = {
    id: '1',
    title: 'Test',
    description: 'Super duper Sache',
    lastSeenDate: new Date().toLocaleDateString(),
    lastSeenLocation: {
        longitude: 23,
        latitude: 34
    },
    lostLocation: {
        longitude: 293,
        latitude: 34
    },
    lostRadius: 20,
    category: {
        id: "",
        value: "",
        name: "SDFDSF",
        image: "/url/bild"
    },
    placeOfDiscovery: "Man langsam nervts",
    placeOfDelivery: "kndsf",
    myChats: []
}

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn((key: string) => {
        if (key === 'basicAuthCredentials') {
            return Promise.resolve('dXNlcjpwYXNz');
        }
        return Promise.resolve(null);
    }),
    setItem: jest.fn((key: string, value: string) => Promise.resolve()),
    removeItem: jest.fn((key: string) => Promise.resolve(null)),
}));

describe('LostReport-Hook', () => {
    it('should fetch the relevant data the first time it is called', async () => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve([lostReportMockupData]),
                ok: true,
                status: 200
            }) as Promise<Response>
        );

        const { result } = renderHook(useLostReports, {
            wrapper: LostReportProvider,
        });

        // TODO: Is this best practice to wait on useEffect?
        await act(() => { })


        expect(result.current.lostReports).toMatchObject([lostReportMockupData])
    });

    it('should create a new lost report', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve([lostReportMockupData]),
                ok: true,
                status: 200
            }) as Promise<Response>
        ).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve(lostReportMockupData),
            ok: true,
            status: 201
        }) as Promise<Response>);

        const { result } = renderHook(useLostReports, {
            wrapper: LostReportProvider,
        });

        // TODO: Is this best practice to wait on useEffect?
        await act(() => {

        })

        await act(() => {
            result.current.createLostReport('dXNlcjpwYXNz', lostReportMockupData);
        });


        expect(result.current.lostReports).toMatchObject([lostReportMockupData, lostReportMockupData])
    });

    it('should edit an existing lost report', async () => {
        const titleChange = "New Title"

        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve([lostReportMockupData]),
                ok: true,
                status: 200
            }) as Promise<Response>
        ).mockImplementationOnce(() => Promise.resolve({
            json: () => Promise.resolve({ ...lostReportMockupData, title: titleChange }),
            ok: true,
            status: 201
        }) as Promise<Response>);

        const { result } = renderHook(useLostReports, {
            wrapper: LostReportProvider,
        });

        // TODO: Is this best practice to wait on useEffect?
        await act(() => {

        })

        await act(() => {
            result.current.editLostReport('dXNlcjpwYXNz', { ...lostReportMockupData, title: titleChange });
        });


        expect(result.current.lostReports).toMatchObject([{ ...lostReportMockupData, title: titleChange }])
    });
});
