import { ServiceDTO } from "./Service";

export interface Reservation {
    travelerId: string;
    propertyId: string;
    beginDate: string;
    endDate: string;
    annulation: boolean;
};

export interface Bill {
    id: string;
    price: number;
    date: string;
    statut: string;
    content: string;
};

export interface ReservationDTO {
    reservations: {
        reservation: Reservation;
        bill: Bill;
        service: ServiceDTO[];
    }[];
};