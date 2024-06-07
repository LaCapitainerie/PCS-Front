"use client"

import React, {Suspense} from 'react';
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";

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

function valideReservation(id: string) {

}
export default function SuccessPage() {
    VerifyParam();



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
