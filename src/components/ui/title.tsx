"use client"

import { User as TUser } from "@/type/User";
import { Separator } from "./separator";
import { User } from "lucide-react";
import { toast } from "./use-toast";
import { LoadingButton } from "./loading-button";
import { Dispatch, SetStateAction, useState } from "react";

async function createChat(user: TUser, proprio: TUser["id"], setLoading: Dispatch<SetStateAction<boolean>>) {

    setLoading(true);
    
    try {
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

        if (await dataFetch()) {
            if (typeof window !== "undefined") {
                window.location.href = `/${user.type}/messages?chatId=${proprio}`;
            };
        };

    } catch (error) {
        console.error('Error:', error);
        toast({
            title: "Erreur lors de la création du chat",
            description: "Une erreur est survenue lors de la création du chat",
        })
    } finally {
        setLoading(false);
    };

    
}

const Title = ({titre, sous_titre, proprio, user}: {titre:string | undefined, sous_titre:string | null | undefined, proprio: TUser["id"], user: TUser}) => {

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <>
            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">
                        {titre}
                    </h1>
                    <p className="px-4 leading-[3.25rem]">{sous_titre}</p>
                </div>
                <LoadingButton loading={loading} variant="outline" size="icon" className="w-fit" onClick={() => createChat(user, proprio, setLoading)}>
                    <div className="mx-6 flex flex-row gap-6">
                        <p>Contacter</p>
                        <User className="h-4 w-4" />
                    </div>
                </LoadingButton>
            </div>
            <Separator className="my-2 mb-4" />
        </>
    )
}

export default Title;