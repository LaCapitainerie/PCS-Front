"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Dashboard } from './Dashboard/dashboard';
import {Property} from "@/type/Property";

interface PrestaLayoutProps {
    children: ReactNode;
}

const Admin_Dashboard_Layout: React.FC<PrestaLayoutProps> = ({ children }) => {
    const [House, setHouse] = useState<Property>();

    const SelectedHouse = (house: Property) => {
        setHouse(house);
    };


    return (
        <>
          <Sidebar index={2}/>
          <Dashboard/>
        </>
    );
}

export default Admin_Dashboard_Layout;