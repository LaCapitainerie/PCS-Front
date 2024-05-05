export interface User {
    ID: string;
    Username: string;
    Nom: string;
    Prenom: string;
    Email: string;
    Type: "Bailleur" | "Locataire" | "Prestataire" | "Admin";
    Avatar: string;
    Description: string;
    Joined: string;
    Phone: string;
};