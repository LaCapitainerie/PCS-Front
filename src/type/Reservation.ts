export interface Reservation {
    id: string;
    idtenant: string;
    idlessor: string;
    idproperty: string;
    status: "En attente" | "Acceptée" | "Refusée";
    date: string;
    description: string;
    duree: number;
    prix: number;
};