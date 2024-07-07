"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { toComparable } from "../../../functions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  User } from "@/type/User";
import { ChatDTO, ChatMessageDTO, Contact } from "@/type/Chat";

const ContactList = ({
    setContact,
    Categories,
    token,
    user_id
  }: React.HTMLAttributes<HTMLDivElement> & { setContact: (contact : Contact) => void , Categories: (User["type"])[], token: User["token"], user_id: User["id"]}) => {    
    
    const [chat, setChat] = useState<Contact[]>([]);
    const [filter, setFilter] = useState<string>("");
    
    useEffect(() => {
        const dataFetch = async () => {
            const data: ChatDTO = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/chat/allchatbyuser`,
                    {
                        method: "GET",
                        headers: {
                          "Authorization": token,
                        },
                    }
                            
                )
            ).json() || {chat: []};

            console.log(data);
            

            

            const chatPromise = data.chat.map(async (value) => {
                
                const contactFetch = async () => {
                    const data: ChatMessageDTO = await (
                        await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/chat/${value.id}`,
                            {
                                method: "GET",
                                headers: {
                                  "Authorization": token,
                                },
                            }
                                    
                        )
                    ).json() || {chat: []};

                    return data.chat;
                };

                const chat = await contactFetch();

                console.log(chat);
                
                
                
                return {
                    user1: chat.userId[0].id == user_id ? chat.userId[0] : chat.userId[1] as User,
                    user2: chat.userId[0].id == user_id ? chat.userId[1] : chat.userId[0] as User,
                    chat: chat
                } as Contact;
            });

            const finalChat = await Promise.all(chatPromise);
            
            setChat(finalChat.filter((val) => toComparable(val.user2.firstName, val.user2.lastName).includes(filter)));

            if (finalChat.length > 0) {
                // Assuming finalChat is an array of chat objects and each chat has an id property
                const searchParams = new URLSearchParams(window.location.search);
                const chatId = searchParams.get("chatId");

                if (chatId) {
                    const chat = finalChat.find(c => c.chat.id === chatId);
                if (chat) {
                    setContact(chat);
                } else {
                    // If no chat matches the provided chatId, default to the first chat
                    setContact(finalChat[0]);
                }
                } else {
                    // If no chatId is provided in the search params, default to the first chat
                    setContact(finalChat[0]);
                }
            };
        };

        dataFetch();
    }, [filter]);


    const ContactListFiltered = (contacts: Contact[]) => {
        return (
            <div className="flex flex-col gap-2 py-4 pt-0">
                {contacts.map((value, index) =>
                    {
                        console.log(value);
                        
                        return (
                            <button key={index} className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" onClick={() => {setContact(value)}}>
                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex items-center">
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="font-semibold">{value.chat.ticket?.type || value.user2.firstName + value.user2.lastName}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground">
                                    {value.user2.type}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                                        {value.user2.type}</div>
                                    <div
                                        className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                        {value.user2.lastName}</div>
                                </div>
                            </button>
                        )
                    }
                )}
            </div>
        )
    };

    return (
        <div className="fixed inset-y-0 left-[3.5rem] z-0 hidden w-[30%] flex-col border-r bg-background sm:flex">
            <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">Messages</a>

            <Separator className="my-2" />

            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Input placeholder="Rechercher" className="w-full p-4" onChange={(event) => {setFilter(event.target.value)}}/>
            </div>

            <div className="flex flex-col gap-2 p-4 pt-0">
                <Tabs defaultValue="All" className="xl:col-span-2 w-full" onValueChange={(e) => {
                    // e === "All" ?
                    // setUser(state[0]) :
                    // setUser(state.filter((val) => val.type === e)[0]) 
                }}>
                    <TabsList className="w-full">
                        <TabsTrigger key={-1} value="All" className="w-full">All</TabsTrigger>
                        {
                            Categories.map((value, index) => (
                                <TabsTrigger key={index} value={value} className="w-full">{value+"s"}</TabsTrigger>
                            ))
                        }
                        <TabsTrigger key={Categories.length} value="Issue" className="w-full">Issues</TabsTrigger>
                    </TabsList>
                    <TabsContent value={"All"}>
                        {ContactListFiltered(chat)}
                    </TabsContent>
                    {
                        Categories.map((value, index) => (
                            <TabsContent key={index} value={value}>
                                {ContactListFiltered(chat.filter((val) => val.user2.type === value))}
                            </TabsContent>
                        ))
                    }
                    <TabsContent value="Issue">
                        {ContactListFiltered(chat.filter((val) => val.chat.ticket))}
                    </TabsContent>
                </Tabs>
            </div>
            
            

        </div>
    )
}

export default ContactList;