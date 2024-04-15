"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Utilisateur } from '../../Prestataire/customclass';
import ContactList from '@/components/Prestataire/Message/Contact';
import MessageList from '@/components/Prestataire/Message/Messages';

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
          <Sidebar/>
          <ContactList onUserChange={SelectedUser}/>
          <MessageList CurrentUser={User}/>
      </>
    );
}

export default PrestaMessage;