export interface Issue {
    id: string;
    idclient: string;
    type: string;
    description: string;
    status: "open" | "closed";
    created: string;
    done: string;
};