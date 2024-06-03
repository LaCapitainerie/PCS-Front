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

const Dashboard_Layout: React.FC<DashBoardProps> = ({ children, dataColumn, customOnes }) => {

    const user = JSON.parse(window.localStorage.getItem('user') || "") as User;
    const id = user.id;
    const token = user.token;

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <Dashboard Column={dataColumn} CustomOnes={customOnes} Token={token}/>
            <Toaster />
        </>
    );
}

export default Dashboard_Layout;