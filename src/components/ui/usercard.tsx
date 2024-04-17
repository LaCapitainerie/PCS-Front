import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { CalendarIcon } from "lucide-react";
import { Utilisateur } from "../customclass";
import { ReactNode } from "react";

const Usercard = ({user, children}: {user: Utilisateur | undefined, children: ReactNode}) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={user?.Avatar} alt="Avatar" />
                    <AvatarFallback>{user?.Nom[0]}{user?.Prenom[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{user?.Username}</h4>
                    <p className="text-sm">
                    {user?.Description}
                    </p>
                    <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                        Joined {user?.Joined}
                    </span>
                    </div>
                </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}

export default Usercard;