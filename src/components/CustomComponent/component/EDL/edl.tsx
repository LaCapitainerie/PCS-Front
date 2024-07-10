"use client"

import CalendarLayout from '@/components/demo';
import { Reservation } from '@/type/Reservation';
import { User } from '@/type/User';
import React, { useEffect } from 'react';
import EDLForm from './EdlMaker';
import { toast } from '@/components/ui/use-toast';

interface LayoutProps {
    user: User;
}

const EDL: React.FC<LayoutProps> = ({ user }: LayoutProps ) => {

    const [reservation, setReservation] = React.useState<Reservation[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response: any = await (await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reservation/all`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `${user?.token}`,
                        },
                    }
                )).json();                

                setReservation(response.reservations);

            } catch (error) {
                console.error('Error:', error);
                toast({
                    title: "Erreur lors de la récupération des réservations",
                    description: "Veuillez réessayer plus tard",
                })
            }
        }

        dataFetch();
    }, [user])

    const [idReservation, setIdReservation] = React.useState<Reservation["id"]>('');

    return (
        <div className='flex flex-col justify-around gap-8 items-center mt-8'>
            <CalendarLayout user={user} property={null} prestations={[]} reservations={reservation} mode='lessor' setReservation={setIdReservation}/>
            <EDLForm user={user} idReservation={idReservation} />
        </div>
    )
}

export default EDL;