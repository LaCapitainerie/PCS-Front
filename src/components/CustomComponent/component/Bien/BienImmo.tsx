"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { HomeIcon, Hotel } from "lucide-react"
import { Separator } from "@/components/ui/separator";
import { toComparable } from "../../../functions";
import { Property, PropertyDTO } from "@/type/Property";
import { User } from "@/type/User";
import { set } from "date-fns";
import { toast } from "@/components/ui/use-toast";

function getIcon(type: string) {
    
    switch (type) {
        case "Appartement":
            return <Hotel />;
        case "Maison": case "Villa":
            return <HomeIcon />;
    }
}

interface PropertyTypeDTO {
    property: Property[];
}

const BienImmo = ({
    onHouseChange, token
  }: React.HTMLAttributes<HTMLDivElement> & { onHouseChange?: (house: Property) => void, token: User["token"] }) => {
    const [Property, setProperty] = useState<Property[]>([]);
    const [house, setHouse] = useState<Property>({} as Property);
    const [filter, setFilter] = useState<string>("");

    useEffect(() => {
        try {
            const dataFetch = async () => {
                const data: PropertyDTO = await (
                    await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/property`,
                        {
                            method: "GET",
                            headers: {
                            "Authorization": token,
                            },
                        }
                    )
                )
                .json().catch((error) => {
                    console.error('Error:', error);
                });
                
                const biens = data.Property.filter((value: Property) => toComparable(value.name, value.description).includes(toComparable(filter)));

                setHouse(biens[0]);
                setProperty(biens);
            };
            
            dataFetch();
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Erreur lors de la récupération des biens immobiliers",
                description: "Veuillez réessayer plus tard",
            })
            setProperty([]);
        }

    }, [filter, token]);
    
    
    useEffect(() => {
        onHouseChange?.(house);
    }, [house, onHouseChange]);


    return (
        <div className="fixed inset-y-0 left-[3.5rem] z-0 w-[30%] flex-col border-r bg-background sm:flex">
            <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">Biens Immobiliers</a>

            <Separator className="my-2" />

            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Input contrains={"text"} placeholder="Rechercher" className="w-full p-4" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value)}/>
            </div>
            <div className="flex flex-col gap-2 p-4 pt-0 overflow-y-scroll">
                {Property.map((value, index) => 
                    <button key={index} className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" onClick={() => setHouse(value)}>
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                                <div className="flex flex-row items-center gap-2">
                                    {getIcon(value.type)}
                                    <div className="font-semibold">{value.name}</div>
                                </div>
                                <div className="ml-auto text-xs text-foreground">{}</div>
                            </div>
                            <div className="text-xs font-medium">{value.type}</div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">{value.description}</div>
                        <div className="flex items-center gap-2">
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                                {value.type}</div>
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                Salle de bain : {value.bathroom}</div>
                            {value.garage > 0 && <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                Garage</div>}
                        </div>
                    </button>
                )}
            </div>

        </div>
    )
}

export default BienImmo;