"use client"

import { User } from "@/type/User";
import {useSearchParams} from "next/navigation";
import React, { useEffect } from "react";

const tokenUser: string = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI1ZmIzYjVjZS04NGUxLTQzZjAtODkwZi0zNjMyZGJiMmQ3NDEiLCJleHAiOjE3NDkyNTgwMTF9.qa9Ln5WkVnAf4_CQdjTP7OL0X6AqThjaYr3-dK67Ry8lgAOovc1PPY_0GhX_i-l0i_R9LIOZbM_NVgjnpqGsBA"

function VerifyParam(): string {
    const params = useSearchParams();
    const success = params.get('success');
    const idReservation = params.get('id_reservation') || "";

    if (success != "true" || idReservation == "") {
        if (typeof window !== 'undefined') {
            window.location.href = "/stripe/test";
        };
    };

    return idReservation;
}

export default function SuccessPageLayout() {

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;
    
    const id = VerifyParam();

    const [valide, setValide] = React.useState<boolean>(false);

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reservation/property/validation/${id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `${user.token}`,
                        },
                    }
                )
            )
            .json().catch((error) => {
                console.error('Error:', error);
            });
            
            setValide(data.ok);
        };

        dataFetch();
    }, [id, user.token]);

    return (
        <h1>
            Bravo la commande est validé !
        </h1>
    );
};

/*
import React, { ReactNode } from 'react';

function Search(): User["id"] {

    const params = useSearchParams()
    const search = params.get('user')

    return search || "";
}

interface LayoutProps {
    children?: ReactNode;
}

const ProfilLayout: React.FC<LayoutProps> = ({ children }) => {

    var getUserfromLocalStorage = "{}";

    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    const id = Search();

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <MainContent id={id} token={user.token} myid={user.id}/>
            <Toaster />
        </>
    );
}

export default ProfilLayout;

*/
