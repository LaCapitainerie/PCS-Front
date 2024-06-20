import {Bill} from "@/type/Bill";
import {Prestation} from "@/type/Prestation";

export interface ReservationCommand {
    id: string;
    travelerId: string;
    propertyId: string;
    beginDate: string;
    endDate: string;
    annulation: boolean
    bill: Bill;
    service: Prestation[];
}