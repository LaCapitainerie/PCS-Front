import { User } from "./User";

export interface Issue {
    id: string;
    type: string;
    state: "Backlog" | "Ready" | "In progress" | "Done";
    description: string;
    chat_id: string;
};

export interface IssueDTO {
    ticket: Issue[];
}

export interface IssueMakerDTO {
    user_id: User["id"];
    type: string;
    description: string;
}