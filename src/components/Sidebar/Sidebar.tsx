"use client"

import { SideBarDTO, Sidebar as SidebarType } from "../../type/Sidebar";
import * as React from "react"
import Link from "next/link"
import { Home, MessagesSquareIcon, GaugeIcon, User, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react';
import { Button } from "../ui/button"
import { toComparable } from "../functions";
import { User as UserType } from "@/type/User";
import { Separator } from "../ui/separator";

// Store the icons in an dictionary
const icons = {
    "home": Home,
    "msg": MessagesSquareIcon,
    "gauge": GaugeIcon,
    "user": User,
};

const RoleToPermission: Map<UserType["type"], number> = new Map([
    ["traveler", 1],
    ["provider", 2],
    ["lessor", 3],
    ["admin", 4]
]);

const Component = (user: UserType) => {

    const [state, setState] = useState<SidebarType[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: SideBarDTO = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/sidebar`
                )
            ).json();

            setState(data.Sidebar.filter((value) => value.Permission == RoleToPermission.get(user.type)));
        };

        dataFetch();
    }, [user.type]);

    return state.map((value, i) => (
        <TooltipProvider key={i}>
            <Tooltip key={i}>
                <TooltipTrigger asChild>
                    <Link
                        href={value.Href}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-${ true ? 'muted' : '' }-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                    >
                        {React.createElement(icons[toComparable(value.Icon) as keyof typeof icons], { className: "h-5 w-5" })}
                        <span className="sr-only">{value.Hover}</span>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{value.Hover}</TooltipContent>
            </Tooltip>
        </TooltipProvider>)
    );
};

const Sidebar = ({ user }: { user: UserType }) => {

    const { theme, setTheme } = useTheme();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav key={0} className="flex flex-col items-center gap-4 px-2 sm:py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <Avatar>
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel><a href={`/Profile?user=${user.id}`}>Mon compte</a></DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {
                            if(typeof window !== 'undefined' && confirm("Voulez-vous vraiment vous déconnecter ?")){
                                window.localStorage.clear();
                                window.location.assign("/login");
                            }
                        }}>
                            Deconnexion
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Separator className="my-2" />

                {Component(user)}
            </nav>
            <nav key={1} className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Changer de thème</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {
                            ["light", "dark", "system"].map((value, i) => (
                                <DropdownMenuItem key={i} onClick={() => setTheme(value)} className="capitalize justify-between">
                                    {["clair", "sombre", "système"][i]} {theme == value ? <Check /> : ""}
                                </DropdownMenuItem>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </aside>
    )
}

export default Sidebar;