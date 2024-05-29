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
    _user: User;

    status: "pending" | "accepted" | "refused" | "done";
};

export interface PrestationDTO {
    service: Prestation[];
};