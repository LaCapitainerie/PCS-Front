export interface Issue {
    id: string;
    status: "Backlog" | "Ready" | "In progress" | "Done";
};