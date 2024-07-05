"use client";

import { User } from "@/type/User";
import { useSearchParams } from "next/navigation";
import React, { useEffect, Suspense, useState } from "react";

export default function SuccessPageLayout() {
    const [valide, setValide] = useState<boolean>(false);
    const [id, setId] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const getUserfromLocalStorage = localStorage.getItem("user") || "{}";
            setUser(JSON.parse(getUserfromLocalStorage) as User);
        }
    }, []);

    const VerifyParam = () => {
        const params = useSearchParams();
        const success = params.get('success');
        const idReservation = params.get('id_reservation') || "";

        if (success !== "true" || idReservation === "") {
            if (typeof window !== 'undefined') {
                window.location.href = "/stripe/test";
            }
        } else {
            setId(idReservation);
        }
    };

    useEffect(() => {
        VerifyParam();
    }, []);

    useEffect(() => {
        if (id && user) {
            const dataFetch = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/reservation/property/validation/${id}`,
                        {
                            method: 'POST',
                            headers: {
                                'Authorization': `${user.token}`,
                            },
                        }
                    );
                    const data = await response.json();
                    setValide(data.ok);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            dataFetch();
        }
    }, [id, user]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <h1>
                {valide ? "Bravo la commande est validée !" : "Validation en cours..."}
            </h1>
        </Suspense>
    );
};
