import { User } from "@/type/User";
import { PrestationCrudView } from "./Prestation/prescrud";
import { PropertyCrudView } from "./Property/propcrud";
import { KanbanBoard } from "../../Issue/KanbanBoard";
import { UserCrudView } from "./Users/usercrud";
import { ReservationCrudView } from "./Reservations/rescrud";
import React from "react";

export type CrudVariant = "Properties" | "Prestations" | "Reservations" | "Users" | "Issues";

interface CrudBoardProps {
    variant: CrudVariant;
    token: User["token"]
  }

export default function Crud({variant, token}: CrudBoardProps): JSX.Element {
    
    switch (variant) {
        case "Properties":
            return <PropertyCrudView token={token}/>;

        case "Prestations":
            return <PrestationCrudView token={token}/>;

        case "Reservations":
            return <ReservationCrudView token={token} variant={variant}/>;

        case "Users":
            return <UserCrudView token={token}/>;

        case "Issues":
            return <KanbanBoard token={token}/>
    };
};