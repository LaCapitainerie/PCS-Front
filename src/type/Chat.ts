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
    userId: string[];
    message: null;
};

export interface ChatDTO {
    chat: Chat[];
}