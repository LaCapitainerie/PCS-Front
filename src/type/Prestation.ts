import { User } from "./User";

export interface Prestation {
    id: string;
    price: number;
    targetCustomer: "traveler" | "lessor";
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
    date: string;
    _user: User;

    status: "pending" | "accepted" | "refused" | "done";
    idStripe: string;
    name: string;
    type: string;
};

export interface PrestationDTO {
    service: Prestation[];
};