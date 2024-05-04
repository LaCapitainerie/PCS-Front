"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Dashboard } from '../component/Dashboard/dashboard';

interface LayoutProps {
    children: ReactNode;
}

const Dashboard_Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <>
          <Sidebar index={2}/>
          <Dashboard/>
        </>
    );
}

export default Dashboard_Layout;