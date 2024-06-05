"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from '@/components/ui/toaster';
import MainContent from '../component/Profil/MainContent';
import CookieConsent from '@/components/ui/cookie';
import { User } from '@/type/User';

interface LayoutProps {
    children?: ReactNode;
    id: User["id"];
}

const ProfilLayout: React.FC<LayoutProps> = ({ children, id }) => {

    const user = JSON.parse(window.localStorage.getItem('user') || "") as User;
    const user_id = user.id;
    const token = user.token;

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <MainContent id={id} token={token} myid={user_id}/>
            <Toaster />
        </>
    );
}

export default ProfilLayout;