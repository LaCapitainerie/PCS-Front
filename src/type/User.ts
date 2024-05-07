export interface User {
    id: string;
    username: string;
    nom: string;
    prenom: string;
    email: string;
    type: "Bailleur" | "Locataire" | "Prestataire" | "Admin";
    avatar: string;
    description: string;
    joined: string;
    phone: string;
};