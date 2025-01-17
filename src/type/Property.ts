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
    zipCode: string;
    position: {
        latitute: number,
        longitude: number
    };
    urls?: {url: string}[]
    images: string[];
    country: string;
    administrationValidation: boolean;
    userId: string;
    lessorId: string;

    idStripe: string;
}

export interface PropertyDTO {
    Property: Property[];
}