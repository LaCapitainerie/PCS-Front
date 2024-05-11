"use client"

import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
    children: ReactNode;
}

const ProfilLayout: React.FC<LayoutProps> = ({ children }) => {

    return (
      <>
          <Sidebar index={0}/>
          <Toaster />
      </>
    );
}

export default ProfilLayout;