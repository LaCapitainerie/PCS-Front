import { Reservation } from "./Reservation";

export interface edl {
    idreservation: Reservation["id"];
    remark: string;
    status: boolean;
    final: boolean;
};

export interface edlDTO {
    edl: edl[];
}