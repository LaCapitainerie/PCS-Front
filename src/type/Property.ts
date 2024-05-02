export interface Property {
    id: string;
    name: string;
    surface: number;
    price: number;
    type: "Maison" | "Appartement" | "Terrain" | "Villa";
    address: string;
    city: string;
    zipCode: string;
    country: string;
    room: number;
    bathroom: number;
    garage: number;
    description: string;
    administrationValidation: boolean;
    lessorId: string;
}