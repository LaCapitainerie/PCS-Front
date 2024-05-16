"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { toComparable } from "../../../functions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Token, User } from "@/type/User";
import { ChatDTO, Contact } from "@/type/Chat";
import { useCookies } from "next-client-cookies";



const ContactList = ({
    setContact,
    Categories
  }: React.HTMLAttributes<HTMLDivElement> & { setContact: (contact : Contact) => void , Categories: User["type"][]}) => {    
    
    const [chat, setChat] = useState<Contact[]>([]);
    const [filter, setFilter] = useState<string>("");

    const cookies = useCookies();
    const tokenT = cookies.get("token");

    const decodedToken = JSON.parse(atob((tokenT as string).split(".")[1])) as Token;
    
    useEffect(() => {
        const dataFetch = async () => {
            const data: ChatDTO = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/chat/allchatbyuser`,
                    {
                        method: "GET",
                        headers: {
                          "Authorization": tokenT || "",
                        },
                    }
                            
                )
            ).json() || {chat: []};

            const chatPromise = data.chat.map(async (value) => {

                return {
                    user1: {id: value.userId[0] == decodedToken.idUser ? value.userId[0] : value.userId[1]} as unknown as User,
                    user2: {id: value.userId[0] == decodedToken.idUser ? value.userId[1] : value.userId[0]} as unknown as User,
                    chat: value
                } as Contact;
            });

            const finalChat = await Promise.all(chatPromise);
            
            setChat(finalChat.filter((val) => toComparable(val.user2.firstName, val.user2.lastName).includes(filter)));
        };

        dataFetch();
    }, [filter]);


    const ContactListFiltered = (contacts: Contact[]) => {
        return (
            <div className="flex flex-col gap-2 py-4 pt-0">
                {contacts.map((value, index) =>
                    <button key={index} className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" onClick={() => {setContact(value)}}>
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <div className="font-semibold">{value.user2.id} {value.user2.lastName}</div>
                                </div>
                                <div className="ml-auto text-xs text-foreground">{}</div>
                            </div>
                            <div className="text-xs font-medium">{value.user2.type}</div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">{value.user2.firstName}</div>
                        <div className="flex items-center gap-2">
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                                {value.user2.type}</div>
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                {value.user2.lastName}</div>
                        </div>
                    </button>
                )}
            </div>
        )
    };

    return (
        <div className="fixed inset-y-0 left-[3.5rem] z-0 hidden w-[30%] flex-col border-r bg-background sm:flex">
            <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">Messages</a>

            <Separator className="my-2" />

            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Input placeholder="Search" className="w-full p-4" onChange={(event) => {setFilter(event.target.value)}}/>
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
                    </TabsList>
                    <TabsContent value={"All"}>
                        {ContactListFiltered(chat)}
                    </TabsContent>
                    {
                        Categories.map((value, index) => (
                            <TabsContent key={index} value={value}>
                                {/* {ContactListFiltered(state.filter((val) => val.type === value))} */}
                            </TabsContent>
                        ))
                    }
                </Tabs>
            </div>
            
            

        </div>
    )
}

export default ContactList;