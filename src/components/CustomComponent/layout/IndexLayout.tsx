"use client"

import React, { ReactNode } from 'react';
import CookieConsent from '@/components/ui/cookie';
import { MainScreen } from '../component/Index/MainScreen';
import { Separator } from '@/components/ui/separator';
import { CarouselSize } from '../component/Index/Carrousel';
import Pricing from '../component/Index/Pricing';
import { Footer } from '../component/Index/footer';

interface IndexProps {
    children?: ReactNode;
}

const Index_Layout: React.FC<IndexProps> = ({ children }) => {

    return (
        <div className='flex flex-col gap-8'>
            <CookieConsent/>
            <MainScreen/>
            <Separator/>
            <CarouselSize/>
            <Separator/>
            <Pricing/>
            <Separator/>
            <Footer/>
        </div>
    );
}

export default Index_Layout;