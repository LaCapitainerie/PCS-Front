"use client"

import CalendarLayout from '@/components/demo';
import { Reservation, ReservationDTO } from '@/type/Reservation';
import { User } from '@/type/User';
import React, { useEffect } from 'react';
import EDLForm from './EdlMaker';

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
            }
        }

        dataFetch();
    }, [user])

    return (
        <div className='flex flex-col justify-around gap-8 items-center'>
            <CalendarLayout user={user} property={null} prestations={[]} reservations={reservation} mode='lessor' />
            <EDLForm user={user} />
        </div>
    )
}

export default EDL;