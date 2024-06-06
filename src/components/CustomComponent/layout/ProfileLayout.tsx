"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from '@/components/ui/toaster';
import MainContent from '../component/Profil/MainContent';
import CookieConsent from '@/components/ui/cookie';
import { User } from "@/type/User";
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function Search(): User["id"] {
    
    const params = useSearchParams()
    const search = params.get('user')
   
    return search || "";
}

interface LayoutProps {
    children?: ReactNode;
}

const ProfilLayout: React.FC<LayoutProps> = ({ children }) => {

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    const id = Search();

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <MainContent id={id} token={token} myid={user.id}/>
            <Toaster />
        </>
    );
}

export default ProfilLayout;