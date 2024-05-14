import React, { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Signup from '../component/connection/page';

interface LayoutProps {
    children?: ReactNode;
}

const Bien_Layout: React.FC<LayoutProps> = ({ children }) => {


    return (
        <>
            <Signup/>
            <Toaster />
        </>
    );
}

export default Bien_Layout;