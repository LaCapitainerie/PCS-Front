"use client"

import * as React from "react"
import Upperband from "./Upperband";
import Lowerband from "./Lowerband";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { User, UserDTO } from "@/type/User";

interface MainContentProps {
    children?: React.ReactNode;
    id: string;
    token: User["token"];
}

const MainContent = ({ id, token }: MainContentProps) => {

    const [user, setUser] = useState({} as User);
    useEffect(() => {
        const dataFetch = async () => {
            const data: UserDTO = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/id/${id}`
                )
            ).json();
            
            const user = data.user as User;   
            
            console.log(user);
            

            setUser(user || {} as User);
        };

        dataFetch();
    }, [id]);

    return (
        <div className="flex flex-col w-full h-full overflow-hidden" style={{paddingLeft: '3.5rem'}}>
            <Upperband User={user} style={{ height: '33%' }} token={token}/>
            <Separator/>
            <Lowerband User={user} style={{ height: '66%' }} token={token}/>
        </div>
        
    )
};


export default MainContent;