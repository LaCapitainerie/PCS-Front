type DetailType = {
    title: string;
    description: string;
    color: string;
}

type DescriptionBien = {
    detail: DetailType[];
    prestataire: Prestataire[];
    className?: string
}

type Housing = {
    ID_Housing: string
    ID_Client: number,
    ID_Bien_Immobilier: number,
    particulier: string
    status: "pending" | "processing" | "success" | "failed"
    Type: "reparation" | "peinture" | "jardinage" | "chauffage" | "electricite" | "conciergerie"
    Date: string
    Heure: string
    Duree: number
    Prix: number
}

type Prestataire = {
    ID_Prestataire: string
    particulier: string
    status: Housing["status"]
    Type: Housing["Type"]
    Date: string
    Heure: string
    Duree: number
    Prix: number
}

export type { DetailType, DescriptionBien, Housing, Prestataire }