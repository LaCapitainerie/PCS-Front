"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from '@/components/ui/toaster';
import MainContent from '../component/Profil/MainContent';

interface LayoutProps {
    children: ReactNode;
}

const ProfilLayout: React.FC<LayoutProps> = ({ children }) => {

    return (
      <>
          <Sidebar index={0}/>
          <MainContent/>
          <Toaster />
      </>
    );
}

export default ProfilLayout;