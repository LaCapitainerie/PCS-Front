"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { Token, User } from "@/type/User";
import { Message } from "@/type/Message";
import FileUploadDropzone from "./Filemessage";
import { Chat, Contact } from "@/type/Chat";

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

export interface ChatDTO {
    chat: Chat;
}

const MessageList = ({ contact }: { contact: Contact | undefined }) => {

    const [Messages, setMessages] = useState<Message[]>([]);

    const Send = (msg: Message) => {
        setMessages([...Messages, msg])

        console.log("Send", msg);
        console.log("Messages", Messages);
        
        
    };
    
    // Message
    useEffect(() => {
        const dataFetch = async () => {
            if (contact?.chat.id == undefined){
                setMessages([]);
                return;
            };

            const data: ChatDTO = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/chat/${contact?.chat.id}`,
                    {
                        method: "GET",
                        headers: {
                          "Authorization": localStorage.getItem("token") || "",
                        },
                    }
                )
            ).json();

            console.log("Data", data);
            

            setMessages(data?.chat?.message || []);
        };

        dataFetch();
    }, [contact]);

    return (
        <div className="absolute right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%] h-full">
            <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">{contact?.user2?.firstName} {contact?.user2?.lastName}</a>

            <Separator className="my-2" />

            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-2 p-4 pt-0">
                    {contact && Messages.map((value, index) => 
                        <div key={index} className={`flex ${value.userId == localStorage.getItem("id") && "justify-end"}`}>
                            {
                                <div style={{ maxWidth: '40%' }} className={`flex flex-col w-fit items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all ${value.userId !== localStorage.getItem("id") && "bg-accent"}`}>
                                    <div className="flex w-full flex-col gap-1">
                                        <div className="text-xs font-medium">{value.date.toString()}</div>
                                    </div>
                                    <div className="line-clamp-2 text-s font-medium text-muted-foreground">{value.content}</div>
                                </div>
                            }
                        </div>
                        

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
                        

                    )}
                </div>

                <div className="flex flex-row p-4 gap-4">
                    <FileUploadDropzone token={localStorage.getItem("token") as string} user1={contact?.user1.id || ""} user2={contact?.user2.id || ""} sendFunction={Send}/>
                </div>
            </div>

        </div>
    )
}

export default MessageList;