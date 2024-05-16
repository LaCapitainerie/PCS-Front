import React, { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Login from '../component/connection/login';
import { CookiesProvider } from 'next-client-cookies';

interface LayoutProps {
    children?: ReactNode;
}

const LoginLayout: React.FC<LayoutProps> = ({ children }) => {


    return (
        <>
            <CookiesProvider value={[]}>
                <Login/>
                <Toaster />
            </CookiesProvider>
        </>
    );
}

export default LoginLayout;