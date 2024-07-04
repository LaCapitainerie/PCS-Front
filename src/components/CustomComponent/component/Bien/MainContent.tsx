"use client"

import * as React from "react"
import { CarouselPlugin } from "./Carroussel";
import { CardProperty } from "./Cards";
import { Reservation } from "./Reservation";
import Title from "../../../ui/title";
import { useEffect, useState } from "react";
import {Property} from "@/type/Property";
import { ReservationDTO, Reservation as ReservationType } from "@/type/Reservation";
import { User } from "@/type/User";
import { Service, ServiceReturn } from "@/type/Service";


const MainContent = ({house, user}: {house:Property, user: User}) => {

    const [state, setState] = useState<Property>(house);
    
    useEffect(() => {
        setState(house);
    }, [house]);

    const [reservation, setReservation] = useState<ReservationType[]>([]);
    const [prestations, setPrestations] = useState<Service[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            if (house?.id === undefined) {
                setReservation([]);
                return;
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/reservation/property/allreservation/${house?.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': user.token || '',
                    },
                    method: 'GET',
                }
            )

            if (!response.ok) {
                setReservation([]);
                return;
            };

            const data: ReservationDTO = await (response).json();

            setReservation(data.reservation);
        };

        dataFetch();
    }, [house, user]);

    useEffect(() => {
        const dataFetch = async () => {
            if (house?.id === undefined) {
                setPrestations([]);
                return;
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/service/all`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': user.token || '',
                    },
                    method: 'GET',
                }
            )

            if (!response.ok) {
                setPrestations([]);
                return;
            };

            const data: ServiceReturn = await (response).json();

            setPrestations(data.service);
        };

        dataFetch();
    }, [house, user]);

    return (

        <div className="absolute w-auto right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%]">
            <main className="w-full h-full flex flex-col">
                <CarouselPlugin images={house?.images || []}/>
                <div className="p-1">
                    <div className="flex flex-col rounded-lg bg-card text-card-foreground shadow-sm p-2">
                        <Title titre="Nom du bien" sous_titre={state?.description}/>
                        <CardProperty Property={state} User_id={user.id} Prestation={prestations}/>
                    </div>
                </div>
                <div className="p-1">
                    <div className="flex flex-col rounded-lg bg-card text-card-foreground shadow-sm p-2">
                        <Title titre="Réservations" sous_titre=""/>
                        <div className="flex flex-col justify-around gap-2">
                            <Reservation property={house} user={user} prestations={prestations}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};


export default MainContent;