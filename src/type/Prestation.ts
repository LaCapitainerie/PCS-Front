export interface Prestation {
    ID: string;
    ID_client: string;
    ID_prestataire: string;
    ID_property: string;
    Status: "pending" | "processing" | "success" | "failed";
    Date: string;
    Description: string;
    Duree: number;
};