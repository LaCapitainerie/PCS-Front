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
            return <PropertyCrudView/>;

        case "Prestations":
            return <PrestationCrudView/>;

        case "Reservations":
            return <ReservationCrudView variant={variant}/>;

        case "Users":
            return <UserCrudView/>;

        case "Issues":
            return <KanbanBoard token={token}/>
    };
};