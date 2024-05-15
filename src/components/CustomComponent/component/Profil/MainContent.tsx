"use client"

import * as React from "react"
import Upperband from "./Upperband";
import Lowerband from "./Lowerband";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { User } from "@/type/User";

interface MainContentProps {
    children?: React.ReactNode;
    id: string;
}

const MainContent = ({ id }: MainContentProps) => {

    const [user, setUser] = useState({} as User);
    useEffect(() => {
        const dataFetch = async () => {
            const data: User[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/users`
                )
            ).json();
            
            const user = data.find((user) => id == user.nickname);            

            setUser(user || {} as User);
        };

        dataFetch();
    }, [id]);    

    return (
        <div className="flex flex-col w-full h-full overflow-hidden" style={{paddingLeft: '3.5rem'}}>
            <Upperband User={user} style={{height: '33%'}}/>
            <Separator/>
            <Lowerband User={user} style={{height: '66%'}}/>
        </div>
        
    )
};


export default MainContent;