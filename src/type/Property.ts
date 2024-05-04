export interface Property {
    ID: string;
    Name: string;
    type: "Maison" | "Appartement" | "Terrain" | "Villa";
    Price: number;
    Surface: number;
    Room: number;
    Bathroom: number;
    Garage: number;
    Description: string;
    Address: string;
    City: string;
    ZipCode: string;
    Country: string;
    AdministrationValidation: boolean;
    LessorId: string;
}