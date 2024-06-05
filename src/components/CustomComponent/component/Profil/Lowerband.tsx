"use client"

import * as React from "react"
import { User } from "@/type/User";
import LessorVitrine from "./Role/Lessor";

interface LowerbandProps {
    children?: React.ReactNode;
    User: User;
    token: User["token"];
}

const Lowerband = ({User, token}: React.HTMLAttributes<HTMLDivElement> & LowerbandProps) => {

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
            {
                // switch on user type
                User.type === "lessor" &&
                <LessorVitrine User={User} token={token} />
            }
        </div>
    )

    
};


export default Lowerband;