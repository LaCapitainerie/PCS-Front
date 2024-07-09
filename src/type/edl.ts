import { Reservation } from "./Reservation";

export interface edl {
    idReservation: Reservation["id"];
    remark: string;
    status: boolean;
    final: boolean;
};

export interface edlDTO {
    edl: edl[];
}