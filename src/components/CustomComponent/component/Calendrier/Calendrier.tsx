import React, { useState } from 'react';
import { Calendar } from '../../../ui/customcalendar';
import Order from '../../../cavaservir/order';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

interface CalendrierProps {
    children?: React.ReactNode;
}

const Calendrier: React.FC<CalendrierProps> = ({children}) => {

    const [Day, setDay] = useState<Date>(new Date());

    const SelectedDay = (Day: Date) => {
        setDay(Day);
    };

    return (
        <Dialog>
            <DialogTrigger>
                <div>View</div>
            </DialogTrigger>
            <DialogContent style={{maxWidth: '90vw', width: '90vw', height: '90vh'}}>
                <div className='flex flex-row justify-between' style={{maxHeight: '100%'}}>
                    <Calendar SetSelectedReservation={SelectedDay} style={{width: '66%'}}/>
                    <Order day={Day} style={{width: '33%'}}/>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Calendrier;