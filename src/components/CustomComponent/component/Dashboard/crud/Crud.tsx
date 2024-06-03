import { User } from "@/type/User";
import { PresCrudView } from "./Prestation/prescrud";
import { PropCrudView } from "./Property/propcrud";

export type CrudVariant = "Properties" | "Prestations";

interface CrudBoardProps {
    children?: React.ReactNode;
    variant: CrudVariant;
    token: User["token"]
  }

export const CRUD = ({children, variant, token}: CrudBoardProps) => {
    
    switch (variant) {
        case "Properties":
            return PropCrudView({token: token});

        case "Prestations":
            return PresCrudView({token: token});
    };
};