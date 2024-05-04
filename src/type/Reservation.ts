export interface Reservation {
    ID: string;
    ID_tenant: string;
    ID_lessor: string;
    ID_property: string;
    Status: "En attente" | "Acceptée" | "Refusée";
    Date: string;
    Description: string;
    Duree: number;
    Prix: number;
};