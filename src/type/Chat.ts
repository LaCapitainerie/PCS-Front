import { Message } from "./Message";
import { User } from "./User";

export interface Chat {
    id: string;
    view: boolean;
    ticket: {
        id: string;
        type: string;
        state: string;
        description: string;
        chatId: string;
    };
    userId: User[];
    message: Message[];
};

export interface ChatDTO {
    chat: Chat[];
}

export interface Contact {
    user1: User;
    user2: User;
    chat: Chat;
}