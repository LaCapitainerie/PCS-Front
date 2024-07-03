"use client"

import React from 'react';
import { User } from "@/type/User";
import { Property } from "@/type/Property";
import Calendar from "@/components/demo/index";

const Reservation = ( { property, user }: { property: Property, user: User } ) => {
  
  return (
    <Calendar property={property} user={user}/>
  );
};

export { Reservation };