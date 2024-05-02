import {Property} from "@/type/Property";

export const toComparable = (...str: string[]) => str.join().normalize().toLowerCase();

type DetailType = {
    title: string;
    description: string;
    color: string;
}

type DescriptionBien = {
    Bien: Property;
    utilisateur: Utilisateur[];
    reservation: Reservation[];
    className?: string
}

type Prestation = {
    ID_Housing: string
    ID_Client: string
    ID_Bien_Immobilier: string
    Nom: string
    Prenom: string
    Prestataire: string
    status: "pending" | "processing" | "success" | "failed"
    Type: "reparation" | "peinture" | "jardinage" | "chauffage" | "electricite" | "conciergerie"
    Date: Date
    Heure: string
    Duree: number
    Prix: number
}

type Locataire = {
    ID_Locataire: string
    particulier: string
}

type Reservation = {
    ID_Reservation: string
    ID_Housing: string
    ID_Prestataire: string
    ID_Locataire: string
    Date: Date
    Heure: string
    Duree: number
    Prix: number
    Statut: "En attente" | "Acceptée" | "Refusée"
}

/*type Bien_immobilier = {
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
};*/

type Photos = {
    ID_Photo: string
    ID_Bien: string
    Image: string
}

type Message = {
    ID: string
    ID_Exp: string
    ID_Dest: string
    Date: Date
    Heure: Date
    Message: string
}

type Utilisateur = {
    id: string
    Username: string
    Nom: string
    Prenom: string
    Email: string
    Type: "Locataire" | "Prestataire" | "Bailleur" | "Admin"
    Avatar: string
    Description: string
    Joined: string
}

export type { DetailType, DescriptionBien, Prestation, Photos, Reservation, Locataire, Message, Utilisateur}