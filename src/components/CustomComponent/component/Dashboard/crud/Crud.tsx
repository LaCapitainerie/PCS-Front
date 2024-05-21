import { PropCrudView } from "./Property/propcrud";
import { UserCrudView } from "./User/usercrud"

export type CrudVariant = "Properties" | "Users";

interface CrudBoardProps {
    children?: React.ReactNode;
    variant: CrudVariant;
  }

export const CRUD: React.FC<CrudBoardProps> = ({children, variant}) => {
    switch (variant) {
        case "Properties":
            return <PropCrudView/>;

        case "Users":
            return <UserCrudView/>;
    };
};