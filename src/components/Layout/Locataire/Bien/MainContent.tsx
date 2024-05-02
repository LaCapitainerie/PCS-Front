"use client"

import * as React from "react"
import { CarouselPlugin } from "./Carroussel";
import { CardDesc } from "./Cards";
import { DescriptionBien, Photos, Utilisateur, Reservation as Res } from "../../../customclass";
import { Reservation } from "./Reservation";
import Title from "../../../ui/title";
import { useEffect, useState } from "react";
import {Property} from "@/type/Property";




const MainContent = ({house}: {house:Property | undefined}) => {
    
    const [photos, setPhotos] = useState<Photos[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: Photos[] = await (
                await fetch(
                    "http://localhost:2000/Photos"
                )
            ).json();

            setPhotos(data.filter((photo) => photo.ID_Bien === house?.id));
        };

        dataFetch();
    }, [house]);

    const [Desc, setDesc] = useState<DescriptionBien>();

    useEffect(() => {
        const dataFetch = async () => {
            const DescMaker = {} as DescriptionBien;

            DescMaker.Bien = house? house : {} as Property;

            const data2: Res[] = await (
                await fetch(
                    "http://localhost:2000/Reservations"
                )
            ).json();
            
            DescMaker.reservation = data2.filter((res) => res.ID_Housing === house?.id);

            const data3: Utilisateur[] = await (
                await fetch(
                    "http://localhost:2000/Prestataires"
                )
            ).json();

            DescMaker.utilisateur = data3.filter((prest) => DescMaker.reservation.map((res) => res.ID_Prestataire).includes(prest.id));
          
            setDesc(DescMaker);
        };

        dataFetch();
    }, [house]);

    return (

        <div className="absolute w-fit right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%]">
            <main className="w-full h-full flex flex-col">
                <CarouselPlugin images={photos} />
                <div className="p-1">
                    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                        <Title titre={Desc?.Bien.name} sous_titre={Desc?.Bien.description}/>
                        <div className="flex flex-row justify-around gap-2">
                            <CardDesc Desc={Desc} />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                        <Title titre="Réservations" sous_titre=""/>
                        <div className="flex flex-col justify-around gap-2">
                            <Reservation ReservationVal={Desc?.reservation}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};


export default MainContent;