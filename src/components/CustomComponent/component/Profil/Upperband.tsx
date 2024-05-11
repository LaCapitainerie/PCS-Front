"use client"

import { cn } from "@/lib/utils";
import { User } from "@/type/User";
import * as React from "react"

interface UpperbandProps {
    children?: React.ReactNode;
    User: User;
}

const Upperband = ({children, User}: React.HTMLAttributes<HTMLDivElement> & UpperbandProps) => {

    

    return (
        <div className="flex flex-col w-full" style={{height: '33%'}}>
            <div className="bg-muted" style={{height: '66%'}}></div>
            <div className="" style={{height: '33%'}}>
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-row gap-4">
                        <img src={User.avatar} alt="Avatar" className={cn("h-24 w-24 rounded-full border-4 border-primary bg-background")} style={{width: '8rem', height: '8rem', marginTop: '-5rem'}} />
                        <div className="flex flex-col py-4">
                            <h1 className="text-3xl font-bold">{User.nom} {User.prenom}</h1>
                            <p className="text-lg">{User.description.split("\n")[0]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
};


export default Upperband;