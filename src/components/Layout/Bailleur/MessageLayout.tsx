"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import ContactList from '@/components/Layout/Bailleur/Message/Contact';
import MessageList from '@/components/Layout/Bailleur/Message/Messages';
import { Toaster } from '@/components/ui/toaster';
import { User } from '@/type/User';

interface BailleurMessageProps {
    children: ReactNode;
}

const BailleurMessage: React.FC<BailleurMessageProps> = ({ children }) => {
    const [User, setUser] = useState<User>();

    const SelectedUser = (User: User) => {
        console.log(User);
        setUser(User);
    };


    return (
      <>
          <Sidebar index={1}/>
          <ContactList onUserChange={SelectedUser}/>
          <MessageList CurrentUser={User}/>
          <Toaster />
      </>
    );
}

export default BailleurMessage;