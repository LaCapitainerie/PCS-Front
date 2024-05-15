"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from '@/components/ui/toaster';
import MainContent from '../component/Profil/MainContent';
import CookieConsent from '@/components/ui/cookie';
import { CookiesProvider } from 'next-client-cookies';
import { useSearchParams } from 'next/navigation';

interface LayoutProps {
    children?: ReactNode;
}

const ProfilLayout: React.FC<LayoutProps> = ({ children }) => {

    const params = useSearchParams()
    const search = params.get('user')

    return (
        <>
            <CookiesProvider value={[]}>
                <CookieConsent/>
                <Sidebar index={0}/>
                <MainContent id={search || ""}/>
                <Toaster />
            </CookiesProvider>
        </>
    );
}

export default ProfilLayout;