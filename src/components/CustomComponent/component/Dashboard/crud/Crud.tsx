import { PropCrudView } from "./Property/propcrud";

export type CrudVariant = "Properties";

interface CrudBoardProps {
    children?: React.ReactNode;
    variant: CrudVariant;
  }

export const CRUD: React.FC<CrudBoardProps> = ({children, variant}) => {
    switch (variant) {
        case "Properties":
            return <PropCrudView/>;

    };
};