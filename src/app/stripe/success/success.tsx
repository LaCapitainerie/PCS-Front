"use client";

import { toast } from "@/components/ui/use-toast";
import { User } from "@/type/User";
import { useSearchParams } from "next/dist/client/components/navigation";
import React, { ReactNode, use, useEffect, useState } from "react";

interface LayoutProps {
    children?: ReactNode;
}

const SuccessPageLayout: React.FC<LayoutProps> = ({ children }) => {

    
    const params = useSearchParams();
    const success = params.get('success');
    const idReservation = params.get('id_reservation') || "";

    console.log(success, idReservation);

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {

        getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    if(typeof window !== 'undefined' && success !== "true") {
        window.location.href = `/${user.type}/property`;
    }


    const [valide, setValide] = useState(false);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reservation/property/validation/${idReservation}`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `${user?.token}`,
                        },
                    }
                );
                const data = await response.json();

                setValide(data.ok);
            } catch (error) {
                console.error('Error:', error);
                toast({
                    title: "Erreur lors de la validation de la réservation",
                    description: "Veuillez réessayer plus tard",
                })
            }
        };

        dataFetch();
    }, [user, idReservation]);

    if (typeof window !== 'undefined') {
        window.location.href = `/${user.type}/property`;
    };

    return (
        <div>
            {valide && children}
        </div>
    );
};

export default SuccessPageLayout;