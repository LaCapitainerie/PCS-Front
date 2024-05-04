"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { ValuableThing, Dashboard } from '../component/Dashboard/dashboard';

interface LayoutProps {
    children: ReactNode;
}

const Dashboard_Layout: React.FC<LayoutProps> = ({ children }) => {


    const Columns: ValuableThing[] = [
        {
            name: 'Prestations',
            path: '/prestation',
            valueColumn: 'Prix',
            dateColumn: 'Date',
        },
        {
            name: 'Reservations',
            path: '/reservation',
            valueColumn: 'Prix',
            dateColumn: 'Date',
        }
    ];

    return (
        <>
          <Sidebar index={2}/>
          <Dashboard Column={Columns}/>
        </>
    );
}

export default Dashboard_Layout;