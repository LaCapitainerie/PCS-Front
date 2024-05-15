"use client"

import * as React from "react"
import { CarouselPlugin } from "./Carroussel";
import { CardProperty } from "./Cards";
import { Reservation } from "./Reservation";
import Title from "../../../ui/title";
import { useEffect, useState } from "react";
import {Property} from "@/type/Property";
import { Property_image } from "@/type/Property_image";
import { Reservation as ReservationType } from "@/type/Reservation";
import { Prestataire } from "@/type/Prestataire";




const MainContent = ({house}: {house:Property | undefined}) => {

    const [state, setState] = useState<Property | undefined>(house);
    
    useEffect(() => {
        setState(house);
    }, [house]);
    
    const [photos, setPhotos] = useState<Property_image[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: Property_image[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/property_image`
                )
            ).json();

            const found = data.filter((photo) => photo.idproperty == house?.id)
            

            const template = {
                id: "null",
                idproperty: "null",
                image: "https://media.discordapp.net/attachments/597782659430613002/1240277108572553226/image.png?ex=6645f991&is=6644a811&hm=002225759fc0ae2abd6d171c7de15c058ec814514c9ca60d0f39dd6eff2c8221&=&format=webp&quality=lossless&width=1278&height=671"
            
            } as Property_image

            setPhotos(found?.length > 0 ? found : [template]);
        };

        dataFetch();
    }, [house]);

    const [reservation, setReservation] = useState<ReservationType[]>([]);
    const [prestataire, setPrestataire] = useState<Prestataire[]>([]);

    useEffect(() => {
        const dataFetch = async () => {

            const data2: ReservationType[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/reservation`
                )
            ).json();
            
            setReservation(data2.filter((res) => res.idproperty === house?.id));

            const data3: Prestataire[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/prestataires`
                )
            ).json();

            setPrestataire(data3.filter((prest) => reservation.map((res) => res.idlessor).includes(prest.id)));
        };

        dataFetch();
    }, [house]);

    return (

        <div className="absolute w-fit right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%]">
            <main className="w-full h-full flex flex-col">
                <CarouselPlugin images={photos}/>
                <div className="p-1">
                    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                        <Title titre="Nom du bien" sous_titre={state?.description}/>
                        <div className="flex flex-row justify-around gap-2">
                            <CardProperty Prestataire={prestataire} Property={state} />
                        </div>
                    </div>
                </div>
                <div className="p-1">
                    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                        <Title titre="Réservations" sous_titre=""/>
                        <div className="flex flex-col justify-around gap-2">
                            <Reservation ReservationVal={reservation}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};


export default MainContent;