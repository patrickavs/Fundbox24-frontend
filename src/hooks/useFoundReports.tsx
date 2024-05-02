import {FoundReport} from '../types/report-found';
import {
  useTransition,
  useEffect,
  useContext,
  useState,
  createContext,
} from 'react';

type FoundReportsContextType = {
  isPending: boolean;
  foundReports: Array<FoundReport>;
};

const FoundReportsContext = createContext<FoundReportsContextType>({
  isPending: true,
  foundReports: [],
});

export function useFoundReports() {
  return useContext(FoundReportsContext);
}

export function FoundReportProvider({children}: {children: React.ReactNode}) {
  const [report, setReports] = useState<Array<FoundReport>>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      // TODO: fetch userdata
      // TODO: fetch data
      const reportData: FoundReport = {
        id: '1',
        object: 'Schlüssel',
        description: 'Ein kleiner Schlüssel',
        status: 'lost',
        placeOfDelivery: 'Im Fundbüro abgegeben',
        timeOfDiscovery: new Date(),
        placeOfDiscovery: 'In der Nähe des Eingangs',
        category: {
          id: '1',
          value: 'key',
          title: 'Schlüssel',
          requiresAction: false,
        },
      };
      setReports([reportData]);
    });
  });

  return (
    <FoundReportsContext.Provider value={{isPending, foundReports: report}}>
      {children}
    </FoundReportsContext.Provider>
  );
}
