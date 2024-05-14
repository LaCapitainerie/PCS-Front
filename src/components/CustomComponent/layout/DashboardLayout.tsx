"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { ValuableThing, Dashboard } from '../component/Dashboard/dashboard';
import CookieConsent from '@/components/ui/cookie';

interface DashBoardProps {
    children: ReactNode;
    dataColumn: ValuableThing[];
}

const Dashboard_Layout: React.FC<DashBoardProps> = ({ children, dataColumn }: {children:React.ReactNode, dataColumn:ValuableThing[]}) => {

    return (
        <>
            <CookieConsent/>
            <Sidebar index={2}/>
            <Dashboard Column={dataColumn}/>
        </>
    );
}

export default Dashboard_Layout;