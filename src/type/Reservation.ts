import { Service, ServiceDTO } from "./Service";

export interface Reservation {
    travelerId: string;
    propertyId: string;
    beginDate: string;
    endDate: string;
    annulation: boolean;

    bill: Bill;
    service: Service[];

    status: string;
};

export interface Bill {
    id: string;
    price: number;
    date: string;
    statut: string;
    content: string;
};

export interface ReservationDTO {
    reservation: Reservation[];
};