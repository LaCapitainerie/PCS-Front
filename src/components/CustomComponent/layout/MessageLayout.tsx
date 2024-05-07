"use client"

import React, { ReactNode, useState } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import ContactList from '../component/Message/Contact';
import MessageList from '../component/Message/Messages';
import { Toaster } from '@/components/ui/toaster';
import { User } from '@/type/User';

interface MessageProps {
    children: ReactNode;
    categories: User["type"][];
}

const Message_Layout: React.FC<MessageProps> = ({ children, categories }) => {
    const [User, setUser] = useState<User>();

    const SelectedUser = (User: User) => {
        setUser(User);
    };


    return (
      <>
          <Sidebar index={1}/>
          <ContactList onUserChange={SelectedUser} Categories={categories}/>
          <MessageList CurrentUser={User}/>
          <Toaster />
      </>
    );
}

export default Message_Layout;