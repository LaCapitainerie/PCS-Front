"use client"


const Me = 2;


import { SideBarDTO, Sidebar as SidebarType} from "../../type/Sidebar";

import * as React from "react"
import Link from "next/link"
import {
    Home,
    Settings,
    MessagesSquareIcon,
    GaugeIcon,
    User,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { useEffect, useState } from 'react';
import { Button } from "../ui/button"
import { toComparable } from "../functions";
import { useCookies } from "next-client-cookies";
import { User as UserType } from "@/type/User";


// Store the icons in an dictionary
const icons = {
    "home": Home,
    "msg": MessagesSquareIcon,
    "gauge": GaugeIcon,
    "user": User,
};



const Component = (index:number) => {

    const [state, setState] = useState<SidebarType[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: SideBarDTO = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/sidebar`
                )
            ).json();

            setState(data.Sidebar);
        };

        dataFetch();
    }, []);    

    return state.map((value, i) => (
        <TooltipProvider key={value.Id}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={value.Href}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-${i != index ? 'muted' : ''}-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
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



const Sidebar = ({ index }: {index:number}) => {
    const { setTheme } = useTheme();

    var user: UserType = {} as UserType;
    
    const cookies = useCookies();
    const sessionid = cookies.get("user");


    if (sessionid) {
        user = JSON.parse(sessionid)        
    }

    
    
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
                    <DropdownMenuLabel><a href={`/Profile?user=${user.nickname}`}>My Account</a></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
                
                { Component(index) }
            </nav>
            <nav key={1} className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}

export default Sidebar;