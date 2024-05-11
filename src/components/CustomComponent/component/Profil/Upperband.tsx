"use client"

import { cn } from "@/lib/utils";
import { User } from "@/type/User";
import { Mail, Phone } from "lucide-react";
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
                    <div className="w-full flex flex-row gap-4" style={{paddingLeft: '10%'}}>
                        <img src={User.avatar} alt="Avatar" className={cn("h-24 w-24 rounded-full border-4 border-primary bg-background")} style={{width: '8rem', height: '8rem', marginTop: '-5rem'}} />
                        <div className="flex flex-col py-4">
                            <h1 className="text-3xl font-bold">{User.nom} {User.prenom}</h1>
                            <p className="text-lg">{User.description.split("\n")[0]}</p>
                        </div>
                        <div className="flex flex-col p-4 gap-2" style={{marginLeft: '10%'}}>
                            <div className="flex flex-row gap-4 text-center items-center"><Mail/><p className="text-sm">{User.email}</p></div>
                            <div className="flex flex-row gap-4 text-center items-center"><Phone/><p className="text-sm">{User.phone}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
};


export default Upperband;