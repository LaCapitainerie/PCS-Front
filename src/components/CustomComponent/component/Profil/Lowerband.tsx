"use client"

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import BienCard from "./BienCard";
import { User } from "@/type/User";
import { Property, PropertyDTO } from "@/type/Property";
import { useEffect, useState } from "react";

interface LowerbandProps {
    children?: React.ReactNode;
    User: User;
    token: User["token"];
}

const Lowerband = ({User, token}: React.HTMLAttributes<HTMLDivElement> & LowerbandProps) => {

    const [property, setProperty] = useState<Property[]>([]);

    useEffect(() => {
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
            ).json();            

            setProperty(data.Property);
        };

        dataFetch();
    }, [User]);



    return (
        <div className="flex flex-row justify-around w-full p-4" style={{height: '66%'}}>
            <div className="flex flex-col w-full justify-between gap-8 p-4">
                <div className="border rounded-lg w-full h-full p-4">
                    <h1 className="text-2xl font-bold">Présentation</h1>
                    <p className="text-sm">{User.description || "no description was provided"}</p>
                </div>
                <div className="border rounded-lg w-full h-full p-4">
                    <h1 className="text-2xl font-bold">Contact</h1>
                    <p className="text-sm">{User.mail}</p>
                    <p className="text-sm">{User.phoneNumber}</p>
                </div>
            </div>
            <Carousel className="w-full h-full p-4" opts={{loop: true}}>
                <CarouselContent className="h-full">
                    {property.map((property_value, index) => (
                        <CarouselItem key={index} className="basis-full xl:basis-1/2" >
                            <BienCard property={property_value}/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
        
    )
};


export default Lowerband;