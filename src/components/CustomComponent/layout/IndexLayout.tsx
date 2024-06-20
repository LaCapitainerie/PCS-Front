"use client"

import React, { ReactNode } from 'react';
import CookieConsent from '@/components/ui/cookie';
import { MainScreen } from '../component/Index/MainScreen';
import { Separator } from '@/components/ui/separator';
import { CarouselSize } from '../component/Index/Carrousel';
import Pricing from '../component/Index/Pricing';
import { Footer } from '../component/Index/footer';
import { User } from '@/type/User';

interface IndexProps {
    children?: ReactNode;
}

const Index_Layout: React.FC<IndexProps> = ({ children }) => {

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    return (
        <div className='flex flex-col gap-8'>
            <CookieConsent/>
            <MainScreen self={user}/>
            <Separator/>
            <CarouselSize/>
            <Separator/>
            <Pricing/>
            <Separator/>
            <Footer/>
            <script src="//code.tidio.co/rrhxy5qfajr80zppfhfaenxthcf0pkkw.js" async></script>
        </div>
    );
}

export default Index_Layout;