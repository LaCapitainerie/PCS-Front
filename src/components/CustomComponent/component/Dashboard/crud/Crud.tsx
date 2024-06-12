import { User } from "@/type/User";
import { PresCrudView } from "./Prestation/prescrud";
import { PropCrudView } from "./Property/propcrud";
import { KanbanBoard } from "../../Issue/KanbanBoard";
import { UserCrudView } from "./Users/usercrud";
import { ReservationCrudView } from "./Reservations/rescrud";
import React from "react";

export type CrudVariant = "Properties" | "Prestations" | "Reservations" | "Users" | "Issues";

interface CrudBoardProps {
    children?: React.ReactNode;
    variant: CrudVariant;
    token: User["token"]
  }

export default ({children, variant, token}: CrudBoardProps) => {
    
    switch (variant) {
        case "Properties":
            return <PropCrudView/>;

        case "Prestations":
            return <PresCrudView/>;

        case "Reservations":
            return <ReservationCrudView propertyID={"15e31706-4201-49ed-b808-69e353c20632"}/>;

        case "Users":
            return <UserCrudView/>;

        case "Issues":
            return <KanbanBoard token={token}/>
    };
};