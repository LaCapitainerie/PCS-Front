"use client"

import React, { useState } from 'react';
import { DateRange } from "react-day-picker";
import { Reservation as ReservationType } from "@/type/Reservation";
import { User } from "@/type/User";
import { Property } from "@/type/Property";
import Calendar from "@/components/demo/index";

const Reservation = ( { property, token, id }: { property: Property, token: User["token"], id: User["id"] } ) => {

  return (
    <Calendar property={property} token={token} mode={id == property.userId ? "lessor" : "traveler"}/>
  );
};

export { Reservation };