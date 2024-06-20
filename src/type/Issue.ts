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