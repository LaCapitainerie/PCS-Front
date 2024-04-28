"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Utilisateur } from '../../customclass';
import ContactList from '@/components/Layout/Bailleur/Message/Contact';
import MessageList from '@/components/Layout/Bailleur/Message/Messages';
import { Toaster } from '@/components/ui/toaster';

interface BailleurMessageProps {
    children: ReactNode;
}

const BailleurMessage: React.FC<BailleurMessageProps> = ({ children }) => {
    const [User, setUser] = useState<Utilisateur>();

    const SelectedUser = (User: Utilisateur) => {
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