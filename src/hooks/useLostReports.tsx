import { LostReport } from "../types/report-lost";
import { useTransition, useEffect, useContext, useState, createContext } from "react";

type LostReportsContextType = {
    isPending: boolean;
    lostReports: Array<LostReport>;
}

const LostReportsContext = createContext<LostReportsContextType>({ isPending: true, lostReports: [] });

export function useLostReports() {
    return useContext(LostReportsContext);
}

export function LostReportProvider({ children }: { children: React.ReactNode }) {
    const [report, setReports] = useState<Array<LostReport>>([]);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            // TODO: fetch userdata
            // TODO: fetch data
            const reportData: LostReport = {
                id: '1',
                object: 'Schlüssel',
                description: 'Ein kleiner Schlüssel',
                status: 'lost',
                timeOfDiscovery: new Date(),
                placeOfDiscovery: "In der Nähe des Eingangs",
                category: {
                    id: '1',
                    value: 'key',
                    title: 'Schlüssel',
                    requiresAction: false
                },
            };
            setReports([reportData])
        })
    });

    return (
        <LostReportsContext.Provider value={{ isPending, lostReports: report }}>
            {children}
        </LostReportsContext.Provider>
    )
}