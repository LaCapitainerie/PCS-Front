export interface Issue {
    id: string;
    idclient: string;
    idproperty: string;
    created: string;
    description: string;
    status: "open" | "closed";
    done: string;
};