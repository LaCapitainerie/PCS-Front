import React, { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Login from '../component/connection/login';

interface LayoutProps {
    children?: ReactNode;
}

const LoginLayout: React.FC<LayoutProps> = ({ children }) => {


    return (
        <>
            <Login/>
            <Toaster />
        </>
    );
}

export default LoginLayout;