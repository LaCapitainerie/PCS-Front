"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import { Utilisateur } from '../../customclass';
import ContactList from '@/components/Layout/Prestataire/Message/Contact';
import MessageList from '@/components/Layout/Prestataire/Message/Messages';

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
      </>
    );
}

export default PrestaMessage;