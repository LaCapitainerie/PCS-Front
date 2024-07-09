"use client"

import React from 'react';
import { User } from "@/type/User";
import { Property } from "@/type/Property";
import Calendar from "@/components/demo/index";
import { Service } from '@/type/Service';
import { Reservation as ReservationT } from '@/type/Reservation';

const Reservation = ( { property, user, prestations, reservationsV }: { property: Property, user: User, prestations: Service[], reservationsV: ReservationT[] } ) => {
  
  return (
    <Calendar property={property} user={user} prestations={prestations} reservations={reservationsV}/>
  );
};

export { Reservation };