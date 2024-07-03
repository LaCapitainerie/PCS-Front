"use client"

import React from 'react';
import { User } from "@/type/User";
import { Property } from "@/type/Property";
import Calendar from "@/components/demo/index";
import { Service } from '@/type/Service';

const Reservation = ( { property, user, prestations }: { property: Property, user: User, prestations: Service[] } ) => {
  
  return (
    <Calendar property={property} user={user} prestations={prestations}/>
  );
};

export { Reservation };