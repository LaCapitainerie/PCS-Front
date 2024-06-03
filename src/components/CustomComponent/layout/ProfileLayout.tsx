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

    const user = JSON.parse(window.localStorage.getItem('user') || "") as User;
    const user_id = user.id;
    const token = user.token;

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <MainContent id={id} token={token}/>
            <Toaster />
        </>
    );
}

export default ProfilLayout;