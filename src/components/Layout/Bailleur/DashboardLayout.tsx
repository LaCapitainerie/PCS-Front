"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Bien_immobilier } from '../../customclass';
import { Dashboard } from './Dashboard/dashboard';

interface PrestaLayoutProps {
    children: ReactNode;
}

const Bailleur_Dashboard_Layout: React.FC<PrestaLayoutProps> = ({ children }) => {
    const [House, setHouse] = useState<Bien_immobilier>();

    const SelectedHouse = (house: Bien_immobilier) => {
        setHouse(house);
    };


    return (
        <>
          <Sidebar index={2}/>
          <Dashboard/>
        </>
    );
}

export default Bailleur_Dashboard_Layout;