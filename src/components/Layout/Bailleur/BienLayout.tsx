"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import BienImmo from './Bien/BienImmo';
import MainContent from './Bien/MainContent';
import { Toaster } from '@/components/ui/toaster';
import {Property} from "@/type/Property";

interface BailleurLayoutProps {
    children: ReactNode;
}

const BailleurLayout: React.FC<BailleurLayoutProps> = ({ children }) => {
    const [House, setHouse] = useState<Property>();

    const SelectedHouse = (house: Property) => {
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

export default BailleurLayout;