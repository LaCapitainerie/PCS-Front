"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Dashboard } from './Dashboard/dashboard';

interface PrestaLayoutProps {
    children: ReactNode;
}

const Bailleur_Dashboard_Layout: React.FC<PrestaLayoutProps> = ({ children }) => {

    return (
        <>
          <Sidebar index={2}/>
          <Dashboard/>
        </>
    );
}

export default Bailleur_Dashboard_Layout;