export interface Sidebar {
    Hover: string;
    Href: string;
    Icon: string;
    Id: string;
    Permission: number;
};

export interface SideBarDTO {
    Sidebar: Sidebar[];
}