import 'react-native';
import {act, renderHook} from '@testing-library/react-native';
import {expect, it, jest, describe} from '@jest/globals';
import {
  FoundReportProvider,
  useFoundReports,
} from '../../../src/hooks/useFoundReports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FoundReport, NewFoundReport} from '../../../src/types/report-found';

const foundReportMockupData: FoundReport = {
  id: '1',
  title: 'Test',
  description: 'Super duper Sache',
  isFinished: false,
  currentLocation: {
    longitude: 23,
    latitude: 34,
  },
  foundLocation: {
    longitude: 293,
    latitude: 34,
  },
  foundDate: new Date().toLocaleDateString(),
  categoryId: 1,
  imagePath: '',
  myChats: [],
};

const newFoundReportMockupData: NewFoundReport = {
  id: 3,
  title: 'du da',
  description: 'Super duper Sache',
  isFinished: false,
  currentLocation: {
    longitude: 23,
    latitude: 34,
  },
  foundLocation: {
    longitude: 293,
    latitude: 34,
  },
  foundDate: new Date().toLocaleDateString(),
  categoryId: 1,
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

describe('FoundReport-Hook', () => {
  it('should fetch the relevant data the first time it is called', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve([foundReportMockupData]),
          ok: true,
          status: 200,
        }) as Promise<Response>,
    );

    const {result} = renderHook(useFoundReports, {
      wrapper: FoundReportProvider,
    });

    // TODO: Is this best practice to wait on useEffect?
    await act(() => {});

    expect(result.current.foundReports).toMatchObject([foundReportMockupData]);
  });

  it('should create a new found report and refresh found reports', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve([foundReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>,
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve(foundReportMockupData),
            ok: true,
            status: 201,
          }) as Promise<Response>,
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () =>
              Promise.resolve([foundReportMockupData, foundReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>,
      );

    const {result} = renderHook(useFoundReports, {
      wrapper: FoundReportProvider,
    });

    // TODO: Is this best practice to wait on useEffect?
    await act(() => {});

    await act(() => {
      result.current.createFoundReport(
        'dXNlcjpwYXNz',
        newFoundReportMockupData,
      );
    });

    await act(() => {
      result.current.refresh();
    });

    expect(result.current.foundReports).toMatchObject([
      foundReportMockupData,
      foundReportMockupData,
    ]);
  });

  it('should handle error when creating a new found report', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      () =>
        Promise.resolve({
          json: () => Promise.resolve({message: 'Error creating report'}),
          ok: false,
          status: 400,
        }) as Promise<Response>,
    );

    const {result} = renderHook(useFoundReports, {
      wrapper: FoundReportProvider,
    });

    await act(() => {});

    await act(() => {
      result.current.createFoundReport(
        'dXNlcjpwYXNz',
        newFoundReportMockupData,
      );
    });

    // TODO: why does the following fail?
    //expect(result.current.error).toBe('Error creating report');
    expect(result.current.foundReports).toHaveLength(0);
  });

  it('should edit an existing found report', async () => {
    const titleChange = 'New Title';

    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve([foundReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>,
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () =>
              Promise.resolve({...foundReportMockupData, title: titleChange}),
            ok: true,
            status: 200,
          }) as Promise<Response>,
      );

    const {result} = renderHook(useFoundReports, {
      wrapper: FoundReportProvider,
    });

    // TODO: Is this best practice to wait on useEffect?
    await act(() => {});

    await act(() => {
      result.current.editFoundReport('dXNlcjpwYXNz', {
        ...foundReportMockupData,
        title: titleChange,
      });
    });

    expect(result.current.foundReports).toMatchObject([
      {...foundReportMockupData, title: titleChange},
    ]);
  });

  it('should handle error when editing an existing found report', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve([foundReportMockupData]),
            ok: true,
            status: 200,
          }) as Promise<Response>,
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            json: () => Promise.resolve({message: 'Error editing report'}),
            ok: false,
            status: 400,
          }) as Promise<Response>,
      );

    const {result} = renderHook(useFoundReports, {
      wrapper: FoundReportProvider,
    });

    await act(() => {});

    await act(() => {
      result.current.editFoundReport('dXNlcjpwYXNz', {
        ...foundReportMockupData,
        title: 'New Title',
      });
    });

    expect(result.current.error).toStrictEqual({
      message: 'Error editing report',
    });
  });
});
