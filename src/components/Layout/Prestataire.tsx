import React, { ReactNode } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import BienImmo from '../Sidebar/Bienlist';
import MainContent from '../Sidebar/MainContent';

interface PrestaLayoutProps {
    children: ReactNode;
}

const PrestaLayout: React.FC<PrestaLayoutProps> = ({ children }) => {
    return (
      <body className='w-full h-full'>
          <Sidebar/>
          <BienImmo/>
          <MainContent/>
      </body>
    );
}

export default PrestaLayout;