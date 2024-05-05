import React, { use, useEffect, useState } from 'react';
import { Calendar } from '../../../ui/customcalendar';
import Order from '../../../cavaservir/order';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Command } from '@/type/Command';

interface CalendrierProps {
    children?: React.ReactNode;
}

const Calendrier: React.FC<CalendrierProps> = ({children}) => {

    const [Day, setDay] = useState<Date>();

    const SelectedDay = (Day: Date) => {
        setDay(Day);
    };

    return (
        <Dialog>
            <DialogTrigger>View</DialogTrigger>
            <DialogContent style={{maxWidth: '90%'}}>
                <div className='flex flex-row justify-between' style={{maxHeight: '100%'}}>
                    <Calendar SetSelectedReservation={SelectedDay} style={{width: '66%'}}/>
                    <Order day={Day}/>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Calendrier;