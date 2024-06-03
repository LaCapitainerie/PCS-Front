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
    const [House, setHouse] = useState<Property>();

    const SelectedHouse = (house: Property) => {
        setHouse(house);
    };

    const user = JSON.parse(window.localStorage.getItem('user') || "") as User;
    const id = user.id;
    const token = user.token;

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <BienImmo onHouseChange={SelectedHouse} token={token}/>
            <MainContent house={House} User_id={id}/>
            <Toaster />
        </>
    );
}

export default Bien_Layout;