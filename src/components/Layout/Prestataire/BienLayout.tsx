"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import BienImmo from './Bien/BienImmo';
import MainContent from './Bien/MainContent';
import {Property} from "@/type/Property";

interface PrestaLayoutProps {
    children: ReactNode;
}

const PrestaLayout: React.FC<PrestaLayoutProps> = ({ children }) => {
    const [House, setHouse] = useState<Property>();

    const SelectedHouse = (house: Property) => {
        setHouse(house);
    };


    return (
      <>
          <Sidebar index={0}/>
          <BienImmo onHouseChange={SelectedHouse}/>
          <MainContent house={House}/>
      </>
    );
}

export default PrestaLayout;