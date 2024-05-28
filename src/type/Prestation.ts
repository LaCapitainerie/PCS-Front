export interface Prestation {
    id: string;
    price: number;
    targetCustomer: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    lat: number;
    lon: number;
    rangeAction: number;
    description: string;
    providerId: string;
    userId: string;
};

export interface PrestationDTO {
    service: Prestation[];
};