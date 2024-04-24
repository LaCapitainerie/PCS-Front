type DetailType = {
    title: string;
    description: string;
    color: string;
}

type DescriptionBien = {
    Bien: Bien_immobilier;
    utilisateur: Utilisateur[];
    reservation: Reservation[];
    className?: string
}

type Prestataire = {
    ID_Prestataire: number
    ID: number
    particulier: string
    Type: "reparation" | "peinture" | "jardinage" | "chauffage" | "electricite" | "conciergerie"
    Date: Date
    Heure: string
    Duree: number
    Prix: number
}

type Locataire = {
    ID_Locataire: number
    particulier: string
}

type Reservation = {
    ID_Reservation: number
    ID_Housing: number
    ID_Prestataire: number
    ID_Locataire: number
    Date: Date
    Heure: string
    Duree: number
    Prix: number
    Statut: "En attente" | "Acceptée" | "Refusée"
}

type Bien_immobilier = {
    ID: number
    Nom: string
    Type: "Maison" | "Appartement" | "Terrain" | "Villa"
    Prix: number
    Surface: number
    Chambres: number
    Salles_de_bain: number
    Garages: number
    Description: string
    Image: string
};

type Photos = {
    ID_Photo: number
    ID_Bien: number
    Image: string
}

type Message = {
    ID: number
    ID_Exp: number
    ID_Dest: number
    Date: Date
    Heure: Date
    Message: string
}

type Utilisateur = {
    ID: number
    Username: string
    Nom: string
    Prenom: string
    Email: string
    Type: string
    Avatar: string
    Description: string
    Joined: string
}

type Sidebar = {
    ID_tab: number
    Permission: number
    Icon: string
    Hover: string
    Href: string
};

export type { DetailType, DescriptionBien, Prestataire, Bien_immobilier, Photos, Reservation, Locataire, Message, Utilisateur, Sidebar }