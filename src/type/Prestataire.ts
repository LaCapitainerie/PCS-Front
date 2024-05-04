export interface Prestataire {
    ID: string;
    ID_user: string;
    Type: "reparation" | "peinture" | "jardinage" | "chauffage" | "electricite" | "conciergerie";
    Prix: number;
};