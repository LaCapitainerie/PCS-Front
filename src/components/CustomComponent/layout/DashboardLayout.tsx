"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { ValuableThing, Dashboard } from '../component/Dashboard/dashboard';
import CookieConsent from '@/components/ui/cookie';
import { CrudVariant } from '../component/Dashboard/crud/Crud';

interface DashBoardProps {
    children?: ReactNode;
    dataColumn: ValuableThing[];
    customOnes?: CrudVariant[];
}

const Dashboard_Layout: React.FC<DashBoardProps> = ({ children, dataColumn, customOnes }) => {
    return (
        <>
            <CookieConsent/>
            <Sidebar index={2}/>
            <Dashboard Column={dataColumn} CustomOnes={customOnes ?? []}/>
        </>
    );
}

export default Dashboard_Layout;