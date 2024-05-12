import { Category } from "./category";

export type LostReport = {
    id: string;
    object: string;
    description: string;
    status: "found" | "lost";
    timeOfDiscovery: Date;
    category: Category;
    placeOfDiscovery: string;
    placeOfDelivery?: string;
};