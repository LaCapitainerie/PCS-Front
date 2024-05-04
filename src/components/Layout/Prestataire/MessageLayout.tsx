"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Utilisateur } from '../../functions';
import ContactList from '@/components/Layout/Prestataire/Message/Contact';
import MessageList from '@/components/Layout/Prestataire/Message/Messages';
import { Toaster } from '@/components/ui/toaster';

interface PrestaMessageProps {
    children: ReactNode;
}

const PrestaMessage: React.FC<PrestaMessageProps> = ({ children }) => {
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

export default PrestaMessage;