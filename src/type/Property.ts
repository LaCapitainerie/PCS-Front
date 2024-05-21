export interface Property {
    id: string;
    name: string;
    type: "Maison" | "Appartement";
    price: number;
    surface: number;
    room: number;
    bathroom: number;
    garage: number;
    description: string;
    address: string;
    city: string;
    zipcode: string;
    position: {latitute: number, longitude: number};
    images: string[];
    country: string;
    administrationvalidation: boolean;
    lessorId: string;
}

export interface PropertyDTO {
    Property: Property[];
}