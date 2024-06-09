import { User } from "@/type/User";
import { PresCrudView } from "./Prestation/prescrud";
import { PropCrudView } from "./Property/propcrud";
import { KanbanBoard } from "../../Issue/KanbanBoard";
import { UserCrudView } from "./Users/usercrud";

export type CrudVariant = "Properties" | "Prestations" | "Users" | "Issues";

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

        case "Users":
            return <UserCrudView/>;

        case "Issues":
            return <KanbanBoard token={token}/>
    };
};