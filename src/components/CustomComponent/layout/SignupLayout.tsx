import React, { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Signup from '../component/connection/signup';
import { CookiesProvider } from 'next-client-cookies';

interface LayoutProps {
    children?: ReactNode;
}

const SignupLayout: React.FC<LayoutProps> = ({ children }) => {


    return (
        <>
            <CookiesProvider value={[]}>
                <Signup/>
                <Toaster />
            </CookiesProvider>
        </>
    );
}

export default SignupLayout;