import { User } from "@/type/User";
import { PresCrudView } from "./Prestation/prescrud";
import { PropCrudView } from "./Property/propcrud";
import { KanbanBoard } from "../../Issue/KanbanBoard";

export type CrudVariant = "Properties" | "Prestations" | "Issues";

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

        case "Issues":
            return <KanbanBoard token={token}/>
    };
};