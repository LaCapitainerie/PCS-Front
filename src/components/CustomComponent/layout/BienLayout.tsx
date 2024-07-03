"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import BienImmo from '../component/Bien/BienImmo';
import MainContent from '../component/Bien/MainContent';
import { Toaster } from '@/components/ui/toaster';
import {Property} from "@/type/Property";
import CookieConsent from '@/components/ui/cookie';
import { User } from '@/type/User';

interface LayoutProps {
    children: ReactNode;
}

const Bien_Layout: React.FC<LayoutProps> = ({ children }) => {

    const [House, setHouse] = useState<Property>({} as Property);

    const SelectedHouse = (house: Property) => {
        setHouse(house);
    };

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <BienImmo onHouseChange={SelectedHouse} token={user.token}/>
            <MainContent house={House} user={user}/>
            <Toaster />
            {/* <script src="//code.tidio.co/rrhxy5qfajr80zppfhfaenxthcf0pkkw.js" async></script> */}
        </>
    );
}

export default Bien_Layout;