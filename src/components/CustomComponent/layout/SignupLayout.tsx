import React, { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Signup from '../component/connection/signup';

interface LayoutProps {
    children?: ReactNode;
}

const SignupLayout: React.FC<LayoutProps> = ({ children }) => {


    return (
        <>
            <Signup/>
            <Toaster />
        </>
    );
}

export default SignupLayout;