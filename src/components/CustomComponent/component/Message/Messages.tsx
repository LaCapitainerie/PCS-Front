"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast"
import { Token, User } from "@/type/User";
import { Message } from "@/type/Message";
import { Embed } from "./Embed";
import { Issue } from "@/type/Issue";
import { Command } from "@/type/Command";
import { toComparable } from "@/components/functions";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import FileUploadDropzone from "./Filemessage";
import { useCookies } from "next-client-cookies";

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
    chatId
}: React.HTMLAttributes<HTMLDivElement> & { CurrentUser: User | undefined, chatId: string }) => {

    const [Messages, setMessages] = useState<Message[]>([]);

    const cookies = useCookies();
    const token = cookies.get("token");
    const me = cookies.get("user");
    if(!me || !token){ window.location.href = "/login"; return;}
    const user = JSON.parse(me) as User;
    const decodedToken = JSON.parse(atob(token.split(".")[1])) as Token;
    console.log("Decoded Token", decodedToken);

    // Message
    useEffect(() => {
        const dataFetch = async () => {
            const data: Message[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/chat/allchatbyuser${chatId}`,
                    {
                        method: "GET",
                        headers: {
                          "Authorization": token || "",
                        },
                    }
                )
            ).json();

            setMessages(
                CurrentUser ? data : []
            );
        };

        dataFetch();
    }, [CurrentUser]);


    return (
        <div className="absolute right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%] h-full">
            <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">{CurrentUser?.firstName} {CurrentUser?.lastName}</a>

            <Separator className="my-2" />

            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-2 p-4 pt-0">
                    {Messages.map((value, index) => {

                        var result = null;

                        // if (value.idembed != undefined && value.resourceType != undefined) {

                        //     const EmbedType = {
                        //         "command": Command.find((c) => c.id == value.idembed),
                        //         "issue": Issue.find((i) => i.id == value.idembed)
                        //     }[toComparable(value.resourceType)];

                        //     if (EmbedType == undefined) return (<></>);

                        //     switch (value.resourceType) {
                        //         case "Command":
                        //             result = <Embed key={index} Type={value.resourceType} EmbedType={EmbedType} />
                        //             break;

                        //         case "Issue":
                        //             result = <Embed key={index} Type={value.resourceType} EmbedType={EmbedType} />
                        //             break;

                        //         default:
                        //             break;
                        //     }


                        // } else {

                        result = (
                            <div style={{ maxWidth: '40%' }} className={`flex flex-col w-fit items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all ${value.userId !== decodedToken.idUser && "bg-accent"}`}>
                                <div className="flex w-full flex-col gap-1">
                                    <div className="text-xs font-medium">{value.date.toString()}</div>
                                </div>
                                <div className="line-clamp-2 text-s font-medium text-muted-foreground">{value.content}</div>
                            </div>
                        )

                        return (
                            <div key={index} className={`flex ${value.userId == decodedToken.idUser && "justify-end"}`}>
                                {result}
                            </div>
                        );

                    })}
                </div>

                <div className="flex flex-row p-4 gap-4">
                    <FileUploadDropzone />
                    
                </div>
            </div>

        </div>
    )
}



function Keyboard() {
    return (
        <form
            className="w-full relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >
            <Label htmlFor="message" className="sr-only">
                Message
            </Label>
            <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />


            <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Paperclip className="size-4" />
                                <span className="sr-only">Attach file</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Mic className="size-4" />
                                <span className="sr-only">Use Microphone</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Use Microphone</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Button type="submit" size="sm" className="ml-auto gap-1.5" onClick={() => { toast({ description: "Your message has been sent.", }) }}>
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                </Button>
            </div>
        </form>
    )
}


export default MessageList;