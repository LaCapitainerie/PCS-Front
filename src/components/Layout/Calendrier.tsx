import React from 'react';
import { Calendar } from '../ui/customcalendar';
import Order from '../cavaservir/order';

interface CalendrierProps {
    // Define the props for the Calendrier component here
}

const Calendrier: React.FC<CalendrierProps> = () => {

    return (
        <div className='flex flex-row justify-between' style={{maxHeight: '100%'}}>
            <Calendar/>
            <Order/>
        </div>
    );
};

export default Calendrier;