"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { toComparable } from "../../../functions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, UserDTO, UserReturnDTO } from "@/type/User";
import { Chat, ChatDTO } from "@/type/Chat";
import { useCookies } from "next-client-cookies";

interface ContactList {
    user1: User;
    user2: User;
    chat: Chat;
}

const ContactList = ({
    onUserChange,
    Categories
  }: React.HTMLAttributes<HTMLDivElement> & { onUserChange?: (user : User) => void , Categories: User["type"][]}) => {
    
    const cookies = useCookies();
    const token = cookies.get("token");

    console.log("token", token);
    

    const [chat, setChat] = useState<ContactList[]>([]);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        const dataFetch = async () => {
            const data: ChatDTO = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/chat/allchatbyuser`,
                    {
                        method: "GET",
                        headers: {
                          "Authorization": token || "",
                        },
                      }
                            
                )
            ).json() || {chat: []};

            const chatPromise = data.chat.map(async (value) => {

                const user1: UserReturnDTO = await (
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/user/${value.userId[0]}`,
                    )
                ).json();

                const user2: UserReturnDTO = await (
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/user/${value.userId[1]}`,
                    )
                ).json();

                return {
                    user1: user1.user,
                    user2: user2.user,
                    chat: value
                } as ContactList;
            })
            
            setChat(await Promise.all(chatPromise));
        };

        dataFetch();
    }, []);
    

    console.log("chat", chat);

    const ContactListFiltered = (state: User[]) => {



        return (
            <div className="flex flex-col gap-2 py-4 pt-0">
                {state.map((value, index) =>
                    <button key={index} className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" onClick={() => {}}>
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <div className="font-semibold">{value.lastName}</div>
                                </div>
                                <div className="ml-auto text-xs text-foreground">{}</div>
                            </div>
                            <div className="text-xs font-medium">{value.type}</div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">{value.firstName}</div>
                        <div className="flex items-center gap-2">
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                                {value.type}</div>
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                {value.lastName}</div>
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
                        {ContactListFiltered(chat.map((val) => val.user1).concat(chat.map((val) => val.user2)).filter((val) => toComparable(val.firstName, val.lastName, val.nickname).includes(filter)))}
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