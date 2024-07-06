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