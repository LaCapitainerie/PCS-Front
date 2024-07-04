import {Bill} from "@/type/Bill";
import { ServiceDTO } from "./Service";

export interface ReservationCommand {
    id: string;
    travelerId: string;
    propertyId: string;
    beginDate: string;
    endDate: string;
    annulation: boolean

    bill: Bill;

    service: ServiceDTO[];
}