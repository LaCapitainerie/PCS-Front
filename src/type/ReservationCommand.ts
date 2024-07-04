import {Bill} from "@/type/Bill";
import {Prestation} from "@/type/Prestation";
import { Service } from "./Service";

export interface ReservationCommand {
    id: string;
    travelerId: string;
    propertyId: string;
    beginDate: string;
    endDate: string;
    annulation: boolean
    bill: Bill;
    service: Service[];
}