"use client"

import * as React from "react"
import { CarouselPlugin } from "./Carroussel";
import { CardProperty } from "./Cards";
import { Reservation } from "./Reservation";
import Title from "../../../ui/title";
import { useEffect, useState } from "react";
import {Property} from "@/type/Property";
import { ReservationDTO, Reservation as ReservationType } from "@/type/Reservation";
import { Prestataire } from "@/type/Prestataire";
import { User } from "@/type/User";


const MainContent = ({house, User_id, token}: {house:Property | undefined, User_id: User["id"], token: User["token"]}) => {

    const [state, setState] = useState<Property | undefined>(house);
    
    useEffect(() => {
        setState(house);
    }, [house]);

    const [reservation, setReservation] = useState<ReservationType[]>([]);
    const [prestataire, setPrestataire] = useState<Prestataire[]>([]);

    useEffect(() => {
        const dataFetch = async () => {

            const data2: ReservationDTO = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reservation/property/allreservation/${house?.id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token,
                        },
                        method: 'GET',
                    }
                )
            ).json();
            
            setReservation(data2.reservation);

            // setPrestataire(data3.filter((prest) => reservation.map((res) => res.idlessor).includes(prest.id)));
        };

        dataFetch();
    }, [house]);

    return (

        <div className="absolute w-fit right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%]">
            <main className="w-full h-full flex flex-col">
                <CarouselPlugin images={house?.images || []}/>
                <div className="p-1">
                    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                        <Title titre="Nom du bien" sous_titre={state?.description}/>
                        <CardProperty Prestataire={prestataire} Property={state} User_id={User_id} />
                    </div>
                </div>
                <div className="p-1">
                    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2" style={{height: '400px'}}>
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