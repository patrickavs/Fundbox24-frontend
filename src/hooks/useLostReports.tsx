import {LostReport, NewLostReport} from '../types/report-lost.ts';
import React, {
  useTransition,
  useEffect,
  useContext,
  useState,
  createContext,
  useCallback,
} from 'react';
import {fetchAdapter, FetchType} from '../mockups/fetching.ts';
import {LOSTREPORT_URL} from '../routes';

const fetch: FetchType = fetchAdapter;

type LostReportContextType = {
  isPending: boolean;
  lostReports: Array<LostReport>;
  setLostReports: React.Dispatch<React.SetStateAction<Array<LostReport>>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  createLostReport: (userToken: string, report: NewLostReport) => void;
  editLostReport: (userToken: string, report: LostReport) => void;
  startTransition: React.TransitionStartFunction;
};

const LostReportContext = createContext<LostReportContextType>(
  {} as LostReportContextType,
);

export function useLostReports() {
  const {
    isPending,
    startTransition,
    lostReports,
    setLostReports,
    setError,
    createLostReport,
    editLostReport,
    error,
  } = useContext(LostReportContext);

  // Only loads data when the hook is called the first time
  useEffect(() => {
    startTransition(() => {
      fetch({
        method: 'GET',
        url: LOSTREPORT_URL(),
      })
        .then(response => {
          if (response.success) {
            setLostReports(response.data);
          } else {
            setError(response.error);
          }
        })
        .catch(error => setError(JSON.stringify(error)));
    });
  }, [startTransition, setLostReports, setError]);

  return {isPending, lostReports, error, createLostReport, editLostReport};
}

export function FoundReportProvider({children}: {children: React.ReactNode}) {
  const [lostReports, setLostReports] = useState<Array<LostReport>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const createFoundReport = useCallback(
    (userToken: string, report: NewLostReport) => {
      fetch({
        method: 'POST',
        url: LOSTREPORT_URL(),
        data: report,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then(response => {
          if (response.success) {
            setLostReports(prev => [...prev, response.data as LostReport]);
          } else {
            setError(response.data);
          }
        })
        .catch(error => setError(JSON.stringify(error)));
    },
    [],
  );

  const editFoundReport = useCallback(
    (userToken: string, report: LostReport) => {
      fetch({
        method: 'POST',
        url: LOSTREPORT_URL(),
        data: report,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then(response => {
          if (response.success) {
            setLostReports(prev => [
              ...prev.filter(({id}) => id !== report.id),
              response.data as LostReport,
            ]);
          } else {
            setError(response.data);
          }
        })
        .catch(error => setError(JSON.stringify(error)));
    },
    [],
  );

  return (
    <LostReportContext.Provider
      value={{
        isPending,
        lostReports,
        setLostReports: setLostReports,
        error,
        setError,
        startTransition,
        createLostReport: createFoundReport,
        editLostReport: editFoundReport,
      }}>
      {children}
    </LostReportContext.Provider>
  );
}
