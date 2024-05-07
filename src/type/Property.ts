export interface Property {
    id: string;
    name: string;
    type: "Maison" | "Appartement" | "Terrain" | "Villa";
    price: number;
    surface: number;
    room: number;
    bathroom: number;
    garage: number;
    description: string;
    address: string;
    city: string;
    zipcode: string;
    country: string;
    administrationvalidation: boolean;
    lessorid: string;
}