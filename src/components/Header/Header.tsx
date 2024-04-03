import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


interface HeaderProps {
    children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header class="flex justify-between items-center bg-blue-800 p-4 h-24">
            <div className="flex items-center space-x-4">
            <div className="logo">
                <Link href="/admin">
                    <Image src="/images/icone.svg" alt="Logo" width={100} height={100}/>
                </Link>
            </div>
            <div>{children}</div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9">
                        <AvatarImage alt="profil" src="https://avatars.githubusercontent.com/u/45128700?v=4" />
                        <AvatarFallback>Av</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem asChild>
                        <Button asChild>
                            <Link href="/">Profil</Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Button asChild>
                            <Link href="/">Déconnexion</Link>
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}

export default Header;