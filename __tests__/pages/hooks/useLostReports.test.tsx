import 'react-native';
import { act, renderHook } from '@testing-library/react-native';
import { expect, it, jest, describe } from '@jest/globals';
import {
  LostReportProvider,
  useLostReports,
} from '../../../src/hooks/useLostReports';
import { LostReport } from '../../../src/types/report-lost';
import { LostReportRequest } from '../../../src/types/report-lost-request.ts';

const lostReportMockupData: LostReport = {
  id: '1',
  title: 'Test',
  description: 'Super duper Sache',
  lastSeenDate: new Date().toLocaleDateString(),
  lastSeenLocation: {
    longitude: 23,
    latitude: 34,
  },
  lostLocation: {
    longitude: 293,
    latitude: 34,
  },
  lostRadius: 20,
  category: {
    id: 1,
    value: '',
    name: 'Schlüssel',
    image: '',
  },
  myChats: [],
  isFinished: false,
  imagePath: '',
};

const newLostReportMockupData: LostReportRequest = {
  title: 'Test',
  description: 'Super duper Sache',
  lastSeenDate: new Date().toLocaleDateString(),
  lastSeenLocation: {
    longitude: 23,
    latitude: 34,
  },
  lostLocation: {
    longitude: 293,
    latitude: 34,
  },
  lostRadius: 20,
  categoryId: 1,
  myChats: [],
  isFinished: false,
  imagePath: '',
};

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
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve([lostReportMockupData]),
          ok: true,
          status: 200,
        }) as Promise<Response>
    );

    const { result } = renderHook(useLostReports, {
      wrapper: LostReportProvider,
    });

    // TODO: Is this best practice to wait on useEffect?
    await act(async () => {
    });

    expect(result.current.lostReports).toMatchObject([lostReportMockupData]);
  });

  it('should create a new lost report and refresh lost reports', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve([lostReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve(lostReportMockupData),
            ok: true,
            status: 201,
          }) as Promise<Response>
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () =>
              Promise.resolve([lostReportMockupData, lostReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>
      );

    const { result } = renderHook(useLostReports, {
      wrapper: LostReportProvider,
    });

    // TODO: Is this best practice to wait on useEffect?
    await act(async () => {
    });

    await act(async () => {
      result.current.createLostReport('dXNlcjpwYXNz', newLostReportMockupData);
    });

    await act(async () => {
      result.current.refresh();
    });

    expect(result.current.lostReports).toMatchObject([
      lostReportMockupData,
      lostReportMockupData,
    ]);
  });

  it('should edit an existing lost report', async () => {
    const titleChange = 'New Title';

    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve([lostReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () =>
              Promise.resolve({ ...lostReportMockupData, title: titleChange }),
            ok: true,
            status: 201,
          }) as Promise<Response>
      );

    const { result } = renderHook(useLostReports, {
      wrapper: LostReportProvider,
    });

    // TODO: Is this best practice to wait on useEffect?
    await act(async () => {
    });

    await act(async () => {
      result.current.editLostReport(Number(lostReportMockupData.id), {
        ...newLostReportMockupData,
        title: titleChange,
      });
    });

    expect(result.current.lostReports).toMatchObject([
      { ...lostReportMockupData, title: titleChange },
    ]);
  });

  it('should handle error when creating a new lost report', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      () =>
        Promise.resolve({
          json: () => Promise.resolve('Error creating report'),
          ok: false,
          status: 400,
        }) as Promise<Response>
    );

    const { result } = renderHook(useLostReports, {
      wrapper: LostReportProvider,
    });

    await act(async () => {
    });

    await act(async () => {
      result.current.createLostReport('dXNlcjpwYXNz', newLostReportMockupData);
    });

    //expect(result.current.error).toBe('Error creating report');
    expect(result.current.lostReports).toHaveLength(0);
  });

  it('should handle error when editing an existing lost report', async () => {
    const titleChange = 'New Title';

    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve([lostReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve({ message: 'Error editing report' }),
            ok: false,
            status: 400,
          }) as Promise<Response>
      );

    const { result } = renderHook(useLostReports, {
      wrapper: LostReportProvider,
    });

    await act(async () => {
    });

    await act(async () => {
      result.current.editLostReport(Number(lostReportMockupData.id), {
        ...newLostReportMockupData,
        title: titleChange,
      });
    });

    expect(result.current.error).toStrictEqual({
      message: 'Error editing report',
    });
    expect(result.current.lostReports).toMatchObject([lostReportMockupData]);
  });

  it('should delete an existing lost report', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve([lostReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve(),
            ok: true,
            status: 200,
          }) as Promise<Response>
      );

    const { result } = renderHook(useLostReports, {
      wrapper: LostReportProvider,
    });

    await act(() => Promise.resolve());

    await act(() => {
      result.current.deleteLostReport(lostReportMockupData.id);
    });

    expect(result.current.lostReports).toHaveLength(0);
  });

  it('should handle error when deleting an existing lost report', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve([lostReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve({ message: 'Error deleting report' }),
            ok: false,
            status: 400,
          }) as Promise<Response>
      );

    const { result } = renderHook(useLostReports, {
      wrapper: LostReportProvider,
    });

    await act(() => Promise.resolve());

    await act(() => {
      result.current.deleteLostReport(lostReportMockupData.id);
    });

    expect(result.current.error).toStrictEqual({
      message: 'Error deleting report',
    });
    expect(result.current.lostReports).toMatchObject([lostReportMockupData]);
  });
});
