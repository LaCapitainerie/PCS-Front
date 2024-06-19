"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { ValuableThing, Dashboard } from '../component/Dashboard/dashboard';
import CookieConsent from '@/components/ui/cookie';
import { CrudVariant } from '../component/Dashboard/crud/Crud';
import { Toaster } from '@/components/ui/toaster';
import { User } from '@/type/User';

interface DashBoardProps {
    children?: ReactNode;
    dataColumn: ValuableThing[];
    customOnes: CrudVariant[];
}

const Dashboard_Layout: React.FC<DashBoardProps> = async ({ children, dataColumn, customOnes }) => {
    
    await new Promise((resolve) => setTimeout(resolve, 300000))

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <Dashboard Column={dataColumn} CustomOnes={customOnes} Token={user.token}/>
            <Toaster />
        </>
    );
}

export default Dashboard_Layout;