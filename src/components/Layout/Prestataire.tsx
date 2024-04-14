"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import BienImmo from '../Sidebar/BienImmo';
import MainContent from '../Sidebar/MainContent';
import { Bien_immobilier } from '../Prestataire/customclass';

interface PrestaLayoutProps {
    children: ReactNode;
}

const PrestaLayout: React.FC<PrestaLayoutProps> = ({ children }) => {
    const [House, setHouse] = useState<Bien_immobilier>();

    const SelectedHouse = (house: Bien_immobilier) => {
        console.log(house);
        setHouse(house);
    };


    return (
      <>
          <Sidebar/>
          <BienImmo onHouseChange={SelectedHouse}/>
          <MainContent house={House}/>
      </>
    );
}

export default PrestaLayout;