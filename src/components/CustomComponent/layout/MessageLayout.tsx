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
    children: ReactNode;
    categories: User["type"][];
}

const Message_Layout: React.FC<MessageProps> = ({ children, categories }) => {
    const [Contact, setContact] = useState<Contact>();

    const SelectedContact = (Contact: Contact) => {
        setContact(Contact);
    };

    var getUserfromLocalStorage = "{}";
    
    if (typeof window !== 'undefined') {
        getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}") : "{}";
    };

    const user = JSON.parse(getUserfromLocalStorage) as User;

    return (
        <>
            <CookieConsent/>
            <Sidebar user={user}/>
            <ContactList setContact={SelectedContact} Categories={categories} token={user.token} user_id={user.id}/>
            <MessageList contact={Contact} token={user.token} user_id={user.id}/>
            <Toaster />
        </>
    );
}

export default Message_Layout;