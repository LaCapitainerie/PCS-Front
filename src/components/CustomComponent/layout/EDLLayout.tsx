"use client"

import React, { ReactNode } from 'react';
import { User } from '@/type/User';
import CookieConsent from '@/components/ui/cookie';
import Sidebar from '@/components/Sidebar/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import EDL from '../component/EDL/edl';

interface EDLProps {
    children?: ReactNode;
}

const EDL_Layout: React.FC<EDLProps> = ({ children }) => {

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            
            <EDL user={user}/>

            <Toaster />
        </>
    );
}

export default EDL_Layout;