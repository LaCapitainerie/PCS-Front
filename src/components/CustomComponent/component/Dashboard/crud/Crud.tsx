import { User } from "@/type/User";
import { PresCrudView } from "./Prestation/prescrud";
import { PropCrudView } from "./Property/propcrud";

export type CrudVariant = "Properties" | "Prestations";

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
    };
};