import {LostReport, NewLostReport} from '../types/report-lost.ts';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import {ALL_LOST_REPORTS_URL, LOSTREPORT_URL} from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      AsyncStorage.getItem('basicAuthCredentials').then(
        basicAuthCredentials => {
          if (!basicAuthCredentials) {
            throw 'No Basic Auth Header! Please login.';
          }

          fetch(ALL_LOST_REPORTS_URL, {
            method: 'GET',
            headers: {
              Authorization: `Basic ${basicAuthCredentials}`,
            },
          })
            .then(async response => {
              const data = await response.json();
              if (response.status === 200) {
                setLostReports(data);
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
  }, [startTransition, setLostReports, setError]);

  return {isPending, lostReports, error, createLostReport, editLostReport};
}

export function LostReportProvider({children}: {children: React.ReactNode}) {
  const [lostReports, setLostReports] = useState<Array<LostReport>>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const createLostReport = useCallback(
    (userToken: string, report: NewLostReport) => {
      fetch(LOSTREPORT_URL(), {
        method: 'POST',
        body: JSON.stringify(report),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then(async response => {
          const data = await response.json();
          if (response.status === 201) {
            setLostReports(prev => [...prev, data as LostReport]);
          } else {
            setError(data);
          }
        })
        .catch(error => setError(JSON.stringify(error)));
    },
    [],
  );

  const editFoundReport = useCallback(
    (userToken: string, report: LostReport) => {
      fetch(LOSTREPORT_URL(), {
        method: 'POST',
        body: JSON.stringify(report),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then(async response => {
          const data = await response.json();
          if (response.ok) {
            setLostReports(prev => [
              ...prev.filter(({id}) => id !== report.id),
              data as LostReport,
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
    <LostReportContext.Provider
      value={{
        isPending,
        lostReports,
        setLostReports: setLostReports,
        error,
        setError,
        startTransition,
        createLostReport,
        editLostReport: editFoundReport,
      }}>
      {children}
    </LostReportContext.Provider>
  );
}
