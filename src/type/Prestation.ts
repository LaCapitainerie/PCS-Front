export interface Prestation {
    id: string;
    idclient: string;
    idprestataire: string;
    idproperty: string;
    status: "pending" | "processing" | "success" | "failed";
    date: string;
    description: string;
    duree: number;
    prix: number;
};