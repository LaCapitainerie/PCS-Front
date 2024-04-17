"use client"


const Me = 2;



import { Sidebar as SidebarType } from "../customclass";

import * as React from "react"
import Link from "next/link"
import {
    Home,
    LineChart,
    Package,
    Settings,
    ShoppingCart,
    Users2,
    CalendarRangeIcon,
    MessagesSquareIcon,
    GaugeIcon,
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


// Store the icons in an dictionary
const icons = {
    Home: Home,
    LineChart: LineChart,
    Package: Package,
    ShoppingCart: ShoppingCart,
    Users2: Users2,
    Calendar: CalendarRangeIcon,
    Msg: MessagesSquareIcon,
    Gauge: GaugeIcon,
};

const Component = (index:number) => {
    const [state, setState] = useState<SidebarType[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    "http://localhost:2000/Sidebar"
                )
            ).json();

            setState(data.filter((value: SidebarType) => value.Permission <= Me));
        };

        dataFetch();
    }, []);

    return (
        <>
            {state.map((value, i) =>
                <TooltipProvider key={value.ID_tab}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={value.Href}
                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-${i != index ? 'muted' : ''}-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                            >
                                {React.createElement(icons[value.Icon as keyof typeof icons], { className: "h-5 w-5" })}
                                <span className="sr-only">{value.Hover}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{value.Hover}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            
            )}
        </>
    );
};



const Sidebar = ({ index }: {index:number}) => {
    const { setTheme } = useTheme();
    
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                    >
                    <Avatar>
                        <AvatarImage src="https://github.com/LaCapitainerie.png" />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>
                
                { Component(index) }
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
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