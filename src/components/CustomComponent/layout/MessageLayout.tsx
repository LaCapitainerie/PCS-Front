"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import ContactList from '../component/Message/Contact';
import MessageList from '../component/Message/Messages';
import { Toaster } from '@/components/ui/toaster';
import { User } from '@/type/User';
import CookieConsent from '@/components/ui/cookie';
import { Contact } from "@/type/Chat";
import { CookiesProvider } from 'next-client-cookies';

interface MessageProps {
    children: ReactNode;
    categories: User["type"][];
}

const Message_Layout: React.FC<MessageProps> = ({ children, categories }) => {
    const [Contact, setContact] = useState<Contact>();

    const SelectedContact = (Contact: Contact) => {
        setContact(Contact);
    };


    return (
        <>
            <CookiesProvider value={[]}>
                <CookieConsent/>
                <Sidebar index={1}/>
                <ContactList setContact={SelectedContact} Categories={categories}/>
                <MessageList contact={Contact}/>
                <Toaster />
            </CookiesProvider>
        </>
    );
}

export default Message_Layout;