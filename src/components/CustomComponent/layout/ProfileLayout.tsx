"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from '@/components/ui/toaster';
import MainContent from '../component/Profil/MainContent';
import CookieConsent from '@/components/ui/cookie';
import { User } from '@/type/User';

interface LayoutProps {
    children?: ReactNode;
    id: string;
}

const ProfilLayout: React.FC<LayoutProps> = ({ children, id }) => {

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <MainContent id={id} token={user.token}/>
            <Toaster />
        </>
    );
}

export default ProfilLayout;