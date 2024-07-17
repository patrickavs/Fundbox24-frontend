import { LostReport } from '../types/report-lost.ts';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from 'react';
import {
  ALL_LOST_REPORTS_URL,
  CREATE_LOSTREPORT_URL,
  DELETE_LOSTREPORT_URL,
  EDIT_LOSTREPORT_URL,
} from '../routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LostReportRequest } from '../types/report-lost-request.ts';

type LostReportContextType = {
  isPending: boolean;
  lostReports: Array<LostReport>;
  setLostReports: React.Dispatch<React.SetStateAction<Array<LostReport>>>;
  refresh: () => void,
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  createLostReport: (userToken: string, report: LostReportRequest) => void;
  editLostReport: (report: LostReport) => void;
  deleteLostReport: (reportId: string) => void;
  startTransition: React.TransitionStartFunction;
};

const LostReportContext = createContext<LostReportContextType>(
  {} as LostReportContextType
);

export function useLostReports() {
  const context = useContext(LostReportContext);
  const {
    isPending,
    startTransition,
    lostReports,
    refresh,
    setLostReports,
    setError,
    createLostReport,
    editLostReport,
    deleteLostReport,
    error,
  } = context;

  if (!context) {
    throw new Error('useLostReports must be used within a LostReportProvider');
  }

  // Only loads data when the hook is called the first time
  useEffect(() => {
    startTransition(() => {
      AsyncStorage?.getItem('basicAuthCredentials').then(
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
        }
      );
    });
  }, [startTransition, setLostReports, setError]);

  return { isPending, lostReports, error, createLostReport, editLostReport, deleteLostReport, refresh };
}

export function LostReportProvider({ children }: { children: React.ReactNode }) {
  const [lostReports, setLostReports] = useState<LostReport[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const refresh = useCallback(() => {
      startTransition(() => {
        AsyncStorage?.getItem('basicAuthCredentials').then(
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
          }
        );
      });
    }, []
  );

  const createLostReport = useCallback(
    (userToken: string, report: LostReportRequest) => {
      fetch(CREATE_LOSTREPORT_URL(), {
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
            setLostReports(prev => [...prev, data as LostReport]);
          } else {
            setError(data);
          }
        })
        .catch(error => setError(JSON.stringify(error)));
    },
    []
  );

  const editLostReport = useCallback(
    (report: LostReport) => {
      startTransition(() => {
          AsyncStorage?.getItem('basicAuthCredentials').then(
            basicAuthCredentials => {
              if (!basicAuthCredentials) {
                throw 'No Basic Auth Header! Please login.';
              }

              fetch(EDIT_LOSTREPORT_URL(report.id), {
                method: 'PUT',
                body: JSON.stringify(report),
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Basic ${basicAuthCredentials}`,
                },
              })
                .then(async response => {
                  const data = await response.json();
                  if (response.ok) {
                    setLostReports(prev => [
                      ...prev.filter(({ id }) => id !== report.id),
                      data as LostReport,
                    ]);
                  } else {
                    setError(data);
                  }
                })
                .catch(error => setError(JSON.stringify(error)));
            }
          );
        }
      );
    },
    []
  );

  const deleteLostReport = useCallback(
    (reportId: string) => {
      startTransition(() => {
        AsyncStorage?.getItem('basicAuthCredentials').then(
          basicAuthCredentials => {
            if (!basicAuthCredentials) {
              throw 'No Basic Auth Header! Please login.';
            }
            fetch(DELETE_LOSTREPORT_URL(reportId), {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${basicAuthCredentials}`,
              },
            })
              .then(async response => {
                if (response.ok) {
                  setLostReports(prev => prev.filter(({ id }) => id !== reportId));
                } else {
                  const data = await response.json();
                  setError(data);
                }
              })
              .catch(errorRes => setError(JSON.stringify(errorRes)));
          });
      });
    },
    []
  );

  return (
    <LostReportContext.Provider
      value={{
        isPending,
        lostReports,
        refresh: refresh,
        setLostReports: setLostReports,
        error,
        setError,
        startTransition,
        createLostReport,
        editLostReport,
        deleteLostReport,
      }}>
      {children}
    </LostReportContext.Provider>
  );
}
