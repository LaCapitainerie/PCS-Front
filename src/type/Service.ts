export interface Service {
    id: string;
    idStripe: string;
    name: string;
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
    type: string;
}

export interface ServiceDTO {
    service: Service
    userId: string;
    date: string;
};
