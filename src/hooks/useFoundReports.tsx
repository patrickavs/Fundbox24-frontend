import { FoundReport, NewFoundReport } from '../types/report-found';
import React, {
  useTransition,
  useEffect,
  useContext,
  useState,
  createContext,
  useCallback,
} from 'react';
import foundReports from '../assets/dummyData/foundReports.ts';
import { fetchAdapter, FetchType } from '../mockups/fetching.ts';
import { FOUNDREPORT_URL } from '../routes';

const fetch: FetchType = fetchAdapter;

type FoundReportsContextType = {
  isPending: boolean;
  foundReports: Array<FoundReport>;
  setFoundReports: React.Dispatch<React.SetStateAction<Array<FoundReport>>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  createFoundReport: (userToken: string, report: NewFoundReport) => void;
  editFoundReport: (userToken: string, report: FoundReport) => void;
  startTransition: React.TransitionStartFunction;
};

const FoundReportsContext = createContext<FoundReportsContextType>(
  {} as FoundReportsContextType,
);

export function useFoundReports() {
  const {
    isPending,
    startTransition,
    createFoundReport,
    setFoundReports,
    setError,
    foundReports,
    error,
    editFoundReport,
  } = useContext(FoundReportsContext);

  // Only loads data when the hook is called the first time
  useEffect(() => {
    startTransition(() => {
      fetch({
        method: 'GET',
        url: FOUNDREPORT_URL(),
      })
        .then(response => {
          if (response.success) {
            setFoundReports(response.data);
          } else {
            setError(response.error);
          }
        })
        .catch(error => setError(JSON.stringify(error)));
    });
  }, [startTransition, setFoundReports, setError]);

  return { isPending, error, foundReports, createFoundReport, editFoundReport };
}

export function FoundReportProvider({ children }: { children: React.ReactNode }) {
  const [foundReports, setFoundReports] = useState<Array<FoundReport>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const createFoundReport = useCallback(
    (userToken: string, report: NewFoundReport) => {
      fetch({
        method: 'POST',
        url: FOUNDREPORT_URL(),
        data: report,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then(response => {
          if (response.success) {
            setFoundReports(prev => [...prev, response.data as FoundReport]);
          } else {
            setError(response.data);
          }
        })
        .catch(error => setError(JSON.stringify(error)));
    },
    [],
  );

  const editFoundReport = useCallback(
    (userToken: string, report: FoundReport) => {
      fetch({
        method: 'POST',
        url: FOUNDREPORT_URL(),
        data: report,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then(response => {
          if (response.success) {
            setFoundReports(prev => [
              ...prev.filter(({ id }) => id !== report.id),
              response.data as FoundReport,
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
    <FoundReportsContext.Provider
      value={{
        isPending,
        foundReports,
        setFoundReports,
        error,
        setError,
        startTransition,
        createFoundReport,
        editFoundReport,
      }}>
      {children}
    </FoundReportsContext.Provider>
  );
}
