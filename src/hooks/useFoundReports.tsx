import { FoundReport, NewFoundReport } from '../types/report-found';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { ALL_FOUND_REPORTS_URL, CREATE_FOUNDREPORT_URL, FOUNDREPORT_URL } from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FoundReportsContextType = {
  isPending: boolean;
  foundReports: Array<FoundReport>;
  setFoundReports: React.Dispatch<React.SetStateAction<Array<FoundReport>>>;
  refresh: () => void,
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
  const context = useContext(FoundReportsContext);
  const {
    isPending,
    startTransition,
    createFoundReport,
    setFoundReports,
    refresh,
    setError,
    foundReports,
    error,
    editFoundReport,
  } = context;

  if (!context) {
    throw new Error(
      'useFoundReports must be used within a FoundReportProvider',
    );
  }

  // Only loads data when the hook is called the first time
  useEffect(() => {
    startTransition(() => {
      AsyncStorage?.getItem('basicAuthCredentials').then(
        basicAuthCredentials => {
          if (!basicAuthCredentials) {
            throw 'No Basic Auth Credentials! Please login.';
          }

          fetch(ALL_FOUND_REPORTS_URL, {
            method: 'GET',
            headers: {
              Authorization: `Basic ${basicAuthCredentials}`,
            },
          })
            .then(async response => {
              const data = await response.json();
              if (response.status === 200) {
                setFoundReports(data);
              } else {
                setError(data);
              }
            })
            .catch(fetchError => {
              console.log(fetchError);
            });
        },
      );
    });
  }, [startTransition, setFoundReports, setError]);

  return { isPending, error, foundReports, createFoundReport, editFoundReport, refresh };
}

export function FoundReportProvider({ children }: { children: React.ReactNode }) {
  const [foundReports, setFoundReports] = useState<Array<FoundReport>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const refresh = useCallback(() => {
    startTransition(() => {
      AsyncStorage?.getItem('basicAuthCredentials').then(
        basicAuthCredentials => {
          if (!basicAuthCredentials) {
            throw 'No Basic Auth Credentials! Please login.';
          }

          fetch(ALL_FOUND_REPORTS_URL, {
            method: 'GET',
            headers: {
              Authorization: `Basic ${basicAuthCredentials}`,
            },
          })
            .then(async response => {
              const data = await response.json();
              if (response.status === 200) {
                setFoundReports(data);
              } else {
                setError(data);
              }
            })
            .catch(fetchError => {
              console.log(fetchError);
            });
        },
      );
    });
  }, []);

  const createFoundReport = useCallback(
    (userToken: string, report: NewFoundReport) => {
      fetch(CREATE_FOUNDREPORT_URL(), {
        method: 'POST',
        body: JSON.stringify(report),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${userToken}`,
        },
      })
        .then(async response => {
          const data = await response.json();
          if (response.status === 201) {
            setFoundReports(prev => [...prev, data as FoundReport]);
          } else {
            setError(data);
          }
        })
        .catch(error => setError(JSON.stringify(error)));
    },
    [],
  );

  const editFoundReport = useCallback(
    (userToken: string, report: FoundReport) => {
      fetch(FOUNDREPORT_URL(report.id), {
        method: 'PUT',
        body: JSON.stringify(report),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${userToken}`,
        },
      })
        .then(async response => {
          const data = await response.json();
          if (response.status === 200) {
            setFoundReports(prev => [
              ...prev.filter(({ id }) => id !== report.id),
              data as FoundReport,
            ]);
          } else {
            setError(data);
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
        refresh,
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
