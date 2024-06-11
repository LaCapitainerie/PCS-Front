"use client"

import React, {Suspense} from 'react';
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

const tokenUser: string = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI1ZmIzYjVjZS04NGUxLTQzZjAtODkwZi0zNjMyZGJiMmQ3NDEiLCJleHAiOjE3NDkyNTgwMTF9.qa9Ln5WkVnAf4_CQdjTP7OL0X6AqThjaYr3-dK67Ry8lgAOovc1PPY_0GhX_i-l0i_R9LIOZbM_NVgjnpqGsBA"

function VerifyParam(): string {
    const router = useRouter();
    const params = useSearchParams();
    const success = params.get('success');
    const idReservation = params.get('id_reservation');

    if (success != "true" || idReservation == "") {
        router.push("/stripe/test");
    }

    return idReservation || "";
}

async function valideReservation(id: string) {
    async function onSubmit() {
        const link= `${process.env.NEXT_PUBLIC_API_URL}/reservation/property/validation/${id}`
        try {
            const response = await fetch(link, {
                method: 'POST',
                headers: {
                    'Authorization': `${tokenUser}`,
                },
            });

            if (!response.ok) {
                throw new Error('La requête a échoué');
            }

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }

    }
    await onSubmit()
}
export default function SuccessPage() {

    console.log("Salut");
    const id = VerifyParam();
    console.log(id);
    valideReservation(id);


    return (
        <Suspense fallback={<div>Loading...</div>}>
            <h1>
                Bravo la commande est validé !
            </h1>
        </Suspense>
    );
}


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
