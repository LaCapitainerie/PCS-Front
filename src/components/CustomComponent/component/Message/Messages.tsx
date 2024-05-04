"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { User } from "@/type/User";
import { Message } from "@/type/Message";

export function ToastSimple() {
    const { toast } = useToast()
   
    return (
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: "Your message has been sent.",
          })
        }}
      >
        Show Toast
      </Button>
    )
  }

const MessageList = ({
    CurrentUser,
  }: React.HTMLAttributes<HTMLDivElement> & { CurrentUser : User | undefined}) => {

    const { toast } = useToast();
    const [Messages, setMessages] = useState<Message[]>([]);

    // Temporary
    const Me = "3";

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/message`
                )
            ).json();

            if (CurrentUser === undefined) return;
            data.forEach((value: Message) => {
                console.log(value, CurrentUser.ID, Me, [value.ID_Destinataire, value.ID_Expediteur], [value.ID_Destinataire, value.ID_Expediteur].includes(CurrentUser.ID), [value.ID_Destinataire, value.ID_Expediteur].includes(Me));
            });
            
            setMessages(data.filter((value: Message) => [value.ID_Destinataire, value.ID_Expediteur].includes(CurrentUser.ID) && [value.ID_Destinataire, value.ID_Expediteur].includes(Me)));
        };

        dataFetch();
    }, [CurrentUser]);
    
    return (
        <div className="absolute right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%] h-full">
            <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">{CurrentUser?.Prenom} {CurrentUser?.Nom}</a>

            <Separator className="my-2" />

            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-2 p-4 pt-0">
                    {Messages.map((value) => 
                        <div className={`flex ${value.ID_Destinataire == Me && "justify-end"}`}>
                            <button className={`flex flex-col w-fit items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all ${value.ID_Destinataire == Me && "bg-accent"}`}>
                                <div className="flex w-full flex-col gap-1">
                                    <div className="text-xs font-medium">{value.Date.toString()}</div>
                                </div>
                                <div className="line-clamp-2 text-s font-medium text-muted-foreground">{value.Message}</div>
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-row p-4 gap-4">
                    <Input placeholder="Message" className="w-full" />
                    <Button className="w-full w-16" onClick={() => { toast({ description: "Your message has been sent.", }) }}>Send</Button>
                </div>
            </div>

        </div>
    )
}

export default MessageList;