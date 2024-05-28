import { PresCrudView } from "./Prestation/prescrud";
import { PropCrudView } from "./Property/propcrud";

export type CrudVariant = "Properties" | "Prestations";

interface CrudBoardProps {
    children?: React.ReactNode;
    variant: CrudVariant;
  }

export const CRUD: React.FC<CrudBoardProps> = ({children, variant}) => {
    switch (variant) {
        case "Properties":
            return <PropCrudView/>;

        case "Prestations":
            return <PresCrudView/>;
    };
};