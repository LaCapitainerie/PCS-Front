"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { toComparable } from "../../../functions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/type/User";





const ContactList = ({
    onUserChange,
  }: React.HTMLAttributes<HTMLDivElement> & { onUserChange?: (user : User) => void }) => {
    const [state, setState] = useState<User[]>([]);
    const [User, setUser] = useState<User>((state[0] || {}) as User);
    const [filter, setFilter] = useState<string>("");

    // Temporary
    const ME = "3";

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/users`
                )
            ).json();

            setState(data.filter((value: User) => value.ID !== ME && toComparable(value.Nom, value.Prenom, value.Type).includes(toComparable(filter))));
            setUser(state[0]);
        };

        dataFetch();
    }, [filter]);
    
    
    
    useEffect(() => {
        onUserChange?.(User);
    }, [User, onUserChange]);

    const ContactListFiltered = (state: User[]) => {
        return (
            <div className="flex flex-col gap-2 py-4 pt-0">
                {state.map((value) => <>
                    <button className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" onClick={() => setUser(value)}>
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                                <div className="flex flex-row items-center gap-2">
                                    <div className="font-semibold">{value.Nom}</div>
                                </div>
                                <div className="ml-auto text-xs text-foreground">{}</div>
                            </div>
                            <div className="text-xs font-medium">{value.Type}</div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">{value.Prenom}</div>
                        <div className="flex items-center gap-2">
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                                {value.Type}</div>
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                {value.Nom}</div>
                        </div>
                    </button></>
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
                <Tabs defaultValue="Locataires" className="xl:col-span-2 w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="Tous" className="w-full">Tous</TabsTrigger>
                        <TabsTrigger value="Locataires" className="w-full">Locataires</TabsTrigger>
                        <TabsTrigger value="Prestataires" className="w-full">Prestataires</TabsTrigger>
                        <TabsTrigger value="Admins" className="w-full">Admins</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Tous">
                        {ContactListFiltered(state)}
                    </TabsContent>
                    <TabsContent value="Locataires">
                        {ContactListFiltered(state.filter((value) => value.Type === "Locataire"))}
                    </TabsContent>
                    <TabsContent value="Prestataires">
                        {ContactListFiltered(state.filter((value) => value.Type === "Prestataire"))}
                    </TabsContent>
                    <TabsContent value="Admins">
                        {ContactListFiltered(state.filter((value) => value.Type === "Admin"))}
                    </TabsContent>
                </Tabs>
            </div>
            
            

        </div>
    )
}

export default ContactList;