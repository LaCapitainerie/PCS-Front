"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Utilisateur } from '../../customclass';
import ContactList from '@/components/Layout/Locataire/Message/Contact';
import MessageList from '@/components/Layout/Locataire/Message/Messages';
import { Toaster } from '@/components/ui/toaster';

interface LocataireMessageProps {
    children: ReactNode;
}

const LocataireMessage: React.FC<LocataireMessageProps> = ({ children }) => {
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

export default LocataireMessage;