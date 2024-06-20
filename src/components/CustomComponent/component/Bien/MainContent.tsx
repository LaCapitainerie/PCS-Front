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
import { Service } from "@/type/Service";
import Calendar from "@/components/demo/index";


const MainContent = ({house, User_id, token}: {house:Property, User_id: User["id"], token: User["token"]}) => {

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
                setPrestations([]);
                return;
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/reservation/property/allreservation/${house?.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                    method: 'GET',
                }
            )

            if (!response.ok) {
                setReservation([]);
                setPrestations([]);
                return;
            };

            const data: ReservationDTO = await (response).json();

            setReservation(data.reservation);

            const myArr = data.reservation.map((res) => res.service).flat();
            
            

            setPrestations(
                myArr.filter((obj1, i, arr) => 
                    arr.findIndex(obj2 => (obj2.id === obj1.id)) === i
                )
            );
        };

        dataFetch();
    }, [house, token]);

    return (

        <div className="absolute w-auto right-0 flex flex-col left-[calc(3.5rem+30%)] w-[66%]">
            <main className="w-full h-full flex flex-col">
                <CarouselPlugin images={house?.images || []}/>
                <div className="p-1">
                    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                        <Title titre="Nom du bien" sous_titre={state?.description}/>
                        <CardProperty Property={state} User_id={User_id} Prestation={prestations}/>
                    </div>
                </div>
                <div className="p-1">
                    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                        <Title titre="Réservations" sous_titre=""/>
                        <div className="flex flex-col justify-around gap-2">
                            <Reservation ReservationVal={reservation} property={house} token={token}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};


export default MainContent;