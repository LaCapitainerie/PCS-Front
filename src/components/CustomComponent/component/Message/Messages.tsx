"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { User } from "@/type/User";
import { Message } from "@/type/Message";
import { Embed } from "./Embed";
import { Issue } from "@/type/Issue";
import { Command } from "@/type/Command";

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
    const [Issue, setIssue] = useState<Issue[]>([]);
    const [Command, setCommand] = useState<Command[]>([]);

    // Temporary
    const Me = "3";

    // Message
    useEffect(() => {
        const dataFetch = async () => {
            const data: Message[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/message`
                )
            ).json();
            
            setMessages(
                CurrentUser?
                data.filter((value: Message) => [value.iddestinataire, value.idexpediteur].includes(CurrentUser.id) && [value.iddestinataire, value.idexpediteur].includes(Me)):
                []
            );
        };

        dataFetch();
    }, [CurrentUser]);

    // Issue
    useEffect(() => {
        const dataFetch = async () => {
            const data: Issue[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/issue`
                )
            ).json();
            
            setIssue(
                CurrentUser?
                data:
                []
            );
        };

        dataFetch();
    }, [CurrentUser]);

    // Command
    useEffect(() => {
        const dataFetch = async () => {
            const data: Command[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/command`
                )
            ).json();
            
            setCommand(
                CurrentUser?
                data:
                []
            );
        };

        dataFetch();
    }, [CurrentUser]);
    
    return (
        <div className="absolute right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%] h-full">
            <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">{CurrentUser?.prenom} {CurrentUser?.nom}</a>

            <Separator className="my-2" />

            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-2 p-4 pt-0">
                    {Messages.map((value, index) =>
                        !(value.idembed && value.resourceType)?
                            <div key={index} className={`flex ${value.iddestinataire == Me && "justify-end"}`}>
                                <div className={`flex flex-col w-fit items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all ${value.iddestinataire == Me && "bg-accent"}`}>
                                    <div className="flex w-full flex-col gap-1">
                                        <div className="text-xs font-medium">{value.date.toString()}</div>
                                    </div>
                                    <div className="line-clamp-2 text-s font-medium text-muted-foreground">{value.message}</div>
                                </div>
                            </div>
                        :
                            <Embed Type={value.resourceType} EmbedType={
                                (
                                    value.resourceType=="Issue"?
                                    Issue.find((i) => i.id == value.idembed):
                                    Command.find((c) => c.id == value.idembed)
                                )
                                ||
                                {id: "0", idclient: "0", description: "Not found", created: "2024-05-07", status: "open"} as Issue
                            }/>

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