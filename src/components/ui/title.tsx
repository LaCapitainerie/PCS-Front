"use client"

import { User as TUser } from "@/type/User";
import { Separator } from "./separator";
import { User } from "lucide-react";
import { Button } from "./button";
import { toast } from "./use-toast";

async function createChat(user: TUser, proprio: TUser["id"]) {
    
    const dataFetch = async () => {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/chat/create`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token || '',
                },
                method: 'POST',
                body: JSON.stringify({
                    "UserId": [
                      {"ID": user.id},
                      {"ID": proprio}
                    ]
                })
            }
        )

        if (!response.ok) {
            toast({
              title: "Erreur lors de la création du chat",
              description: "Une erreur est survenue lors de la création du chat",
            })
            return false;
        };

        return true;
    };

    dataFetch();

    // if (await dataFetch()) {
    //     if (typeof window !== "undefined") {
    //         window.location.href = `/${user.type}/messages?chatId=${proprio}`;
    //     };
    // }
}

const Title = ({titre, sous_titre, proprio, user}: {titre:string | undefined, sous_titre:string | null | undefined, proprio: TUser["id"], user: TUser}) => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">
                        {titre}
                    </h1>
                    <p className="px-4 leading-[3.25rem]">{sous_titre}</p>
                </div>
                <Button variant="outline" size="icon" className="w-fit" onClick={() => createChat(user, proprio)}>
                    <div className="mx-6 flex flex-row gap-6">
                        <p>Contacter</p>
                        <User className="h-4 w-4" />
                    </div>
                </Button>
            </div>
            <Separator className="my-2 mb-4" />
        </>
    )
}

export default Title;