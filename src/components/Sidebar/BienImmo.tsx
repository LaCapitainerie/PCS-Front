"use client"

import * as React from "react"

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { HomeIcon, Hotel } from "lucide-react"
import { Separator } from "@/components/ui/separator";
import { Bien_immobilier } from "../Prestataire/customclass";
import { Button } from "../ui/button";

function getIcon(type: string) {
    switch (type) {
        case "Appartement":
            return <HomeIcon />;
        case "Maison":
            return <Hotel />;
    }
}

const BienImmo = ({
    onHouseChange,
  }: React.HTMLAttributes<HTMLDivElement> & { onHouseChange?: (house: Bien_immobilier) => void }) => {
    const [state, setState] = useState<Bien_immobilier[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    "http://localhost:2000/Bien_immobilier"
                )
            ).json();

            setState(data);
        };

        dataFetch();
    }, []);
    
    const [house, setHouse] = useState<Bien_immobilier>(
        {
            ID: 0,
            Nom: "",
            Type: "Maison",
            Prix: 0,
            Surface: 0,
            Chambres: 0,
            Salles_de_bain: 0,
            Garages: 0,
            Description: "",
            Image: ""
        }
    );
    
    useEffect(() => {
        onHouseChange?.(house);
    }, [house, onHouseChange]);


    return (
        <div className="fixed inset-y-0 left-[3.5rem] z-0 hidden w-[30%] flex-col border-r bg-background sm:flex">
            <a className="py-2 w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">Bien Immobiliers</a>

            <Separator className="my-2" />

            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Input placeholder="Search" className="w-full p-4" />
            </div>
            <div className="flex flex-col gap-2 p-4 pt-0">
                {state.map((value) => <>
                    <button className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent" onClick={() => setHouse(value)}>
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex items-center">
                                <div className="flex flex-row items-center gap-2">
                                    {getIcon(value.Type)}
                                    <div className="font-semibold">{value.Nom}</div>
                                </div>
                                <div className="ml-auto text-xs text-foreground">{}</div>
                            </div>
                            <div className="text-xs font-medium">{value.Type}</div>
                        </div>
                        <div className="line-clamp-2 text-xs text-muted-foreground">{value.Description}</div>
                        <div className="flex items-center gap-2">
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                                {value.Type}</div>
                            <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                Salle de bain : {value.Salles_de_bain}</div>
                            {value.Garages > 0 && <div
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                Garage</div>}
                        </div>
                    </button></>
                )}
            </div>

        </div>
    )
}

export default BienImmo;