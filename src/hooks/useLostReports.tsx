import { LostReport } from "../types/report-lost";
import { useTransition, useEffect, useContext, useState, createContext } from "react";

type LostReportContextType = {
    isPending: boolean;
    lostReport: LostReport | null;
}

const LostReportContext = createContext<LostReportContextType>({ isPending: true, lostReport: null });

export function useLostReport() {
    return useContext(LostReportContext);
}

export function LostReportProvider({ children }: { children: React.ReactNode }) {
    const [report, setReport] = useState<LostReport | null>(null);
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
            setReport(reportData)
        })
    });

    return (
        <LostReportContext.Provider value={{ isPending, lostReport: report }}>
            {children}
        </LostReportContext.Provider>
    )
}