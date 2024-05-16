"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import BienImmo from '../component/Bien/BienImmo';
import MainContent from '../component/Bien/MainContent';
import { Toaster } from '@/components/ui/toaster';
import {Property} from "@/type/Property";
import CookieConsent from '@/components/ui/cookie';

interface LayoutProps {
    children: ReactNode;
}

const Bien_Layout: React.FC<LayoutProps> = ({ children }) => {
    const [House, setHouse] = useState<Property>();

    const SelectedHouse = (house: Property) => {
        setHouse(house);
    };


    return (
        <>
            <CookieConsent/>
            <Sidebar index={0}/>
            <BienImmo onHouseChange={SelectedHouse}/>
            <MainContent house={House}/>
            <Toaster />
        </>
    );
}

export default Bien_Layout;