export interface Prestataire {
    id: string;
    iduser: string;
    type: "reparation" | "peinture" | "jardinage" | "chauffage" | "electricite" | "conciergerie";
    prix: number;
};