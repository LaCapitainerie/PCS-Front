export interface Message {
    id: string;
    content: string;
    date: string;
    type: "text" | "image";
    userId: string;
    chatId: string;
};

export interface MessageDTO {
    message: Message;
};

// export interface Message {
//     id: string;
//     idexpediteur: string;
//     iddestinataire: string;
//     date: string;
//     message: string;
//     lu: boolean;

//     idembed?: string;
//     resourceType?: "Command" | "Issue";
// };