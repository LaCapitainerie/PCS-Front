"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from '@/components/ui/toaster';
import MainContent from '../component/Profil/MainContent';

interface LayoutProps {
    children?: ReactNode;
    id: string;
}

const ProfilLayout: React.FC<LayoutProps> = ({ children, id }) => {

    return (
      <>
          <Sidebar index={0}/>
          <MainContent id={id}/>
          <Toaster />
      </>
    );
}

export default ProfilLayout;