export interface Command {
    id: string;
    idclient: string;
    idproperty: string;
    date: string;
    duree: number;
    shippinginfo: string;
    products: string;
    description: string;
    tjm: number;
    status: "pending" | "accepted" | "refused" | "done";
    done: string;
};