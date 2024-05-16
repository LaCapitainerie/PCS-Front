"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { ValuableThing, Dashboard } from '../component/Dashboard/dashboard';
import CookieConsent from '@/components/ui/cookie';
import { CookiesProvider } from 'next-client-cookies';

interface DashBoardProps {
    children?: ReactNode;
    dataColumn: ValuableThing[];
}

const Dashboard_Layout: React.FC<DashBoardProps> = ({ children, dataColumn }) => {

    return (
        <>
            <CookiesProvider value={[]}>
                <CookieConsent/>
                <Sidebar index={2}/>
                <Dashboard Column={dataColumn}/>
            </CookiesProvider>
        </>
    );
}

export default Dashboard_Layout;