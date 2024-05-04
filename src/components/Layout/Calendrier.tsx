import React from 'react';
import { Calendar } from '../ui/customcalendar';
import Order from '../cavaservir/order';

interface CalendrierProps {
    // Define the props for the Calendrier component here
}

const Calendrier: React.FC<CalendrierProps> = () => {

    return (
        <div className='flex flex-row justify-between max-h-80' style={{maxHeight: '33rem'}}>
            <Calendar/>
            <Order/>
        </div>
    );
};

export default Calendrier;