"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import BienImmo from './Bien/BienImmo';
import MainContent from './Bien/MainContent';
import { Bien_immobilier } from '../../customclass';
import { Toaster } from '@/components/ui/toaster';

interface PrestaLayoutProps {
    children: ReactNode;
}

const PrestaLayout: React.FC<PrestaLayoutProps> = ({ children }) => {
    const [House, setHouse] = useState<Bien_immobilier>();

    const SelectedHouse = (house: Bien_immobilier) => {
        setHouse(house);
    };


    return (
      <>
          <Sidebar index={0}/>
          <BienImmo onHouseChange={SelectedHouse}/>
          <MainContent house={House}/>
          <Toaster />
      </>
    );
}

export default PrestaLayout;