"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import ContactList from '../component/Message/Contact';
import MessageList from '../component/Message/Messages';
import { Toaster } from '@/components/ui/toaster';
import { User } from '@/type/User';
import CookieConsent from '@/components/ui/cookie';
import { Contact } from "@/type/Chat";

interface MessageProps {
    categories: (User["type"])[];
}

const Message_Layout: React.FC<MessageProps> = ({ categories }) => {

    const [Contact, setContact] = useState<Contact>();

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") || "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    return (
        <>
            <style jsx>{`
                html {
                    overflow-hidden;
                }
            `}</style>
            <CookieConsent/>
            <Sidebar user={user}/>
            <ContactList setContact={setContact} Categories={categories} token={user.token} user_id={user.id}/>
            <MessageList contact={Contact} token={user.token} user_id={user.id}/>
            <Toaster />
        </>
    );
}

export default Message_Layout;