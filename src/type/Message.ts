export interface Message {
    id: string;
    idexpediteur: string;
    iddestinataire: string;
    date: string;
    message: string;
    lu: boolean;

    idembed?: string;
    resourceType?: "Command" | "Issue";
};