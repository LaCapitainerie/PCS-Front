"use client"

import { DatePickerWithRange } from "../../../ui/rangedate";

import React, { useEffect, useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { DateRange } from "react-day-picker";
import Usercard from "@/components/ui/usercard";
import { Reservation as ReservationType } from "@/type/Reservation";
import { User } from "@/type/User";

type aggregate = {
  Reservation: ReservationType;
  Locataire: User;
}

function ToBox(agg: aggregate, styleCol: React.CSSProperties) {
  
  return (
    <div className="my-4 rounded-lg border bg-card text-card-foreground shadow-sm w-full">
      <CardContent className="p-6 grid gap-8 items-start" style={styleCol}>
        <div className="flex items-center gap-4">
          <Usercard user={agg.Locataire}>
            <div className="flex items-center gap-4 w-full">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={agg.Locataire.avatar} alt="Avatar" />
                <AvatarFallback>{agg.Locataire?.lastName[0] + agg.Locataire?.firstName[0]}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {agg.Locataire.lastName + " " + agg.Locataire.firstName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {agg.Locataire.mail}
                </p>
              </div>
            </div>
          </Usercard>
        </div>
      </CardContent>

      <CardContent className="p-6 grid gap-8 items-start" style={styleCol}>
        <div>
          <Label htmlFor="paye">Statut du paiement : </Label>
          <Input id="paye" type="paye" defaultValue={agg.Reservation.status} readOnly/>
        </div>
      </CardContent>
    </div>
  )
}

export function CardWithForm({ DateVal, ReservationVal }: { DateVal: string | null, ReservationVal: ReservationType[] | undefined}) {

  const [choosen, setChoosen] = useState<aggregate | undefined>(undefined);
  const [aggregat, setAggregat] = useState<aggregate[]>([]);

  useEffect(() => {
    if(ReservationVal === undefined) return;

    const dataFetch = async () => {
      const data: User[] = await (
          await fetch(
            `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/users`
          )
      ).json();
      

      const tmpAggregat = ReservationVal.map((res) => {        
        return {
          Reservation: res,
          Locataire: data.filter((user) => user.id === res.idtenant)[0] || {} as User
        } as aggregate
      });

      setAggregat( tmpAggregat );
    };

    dataFetch();
  }, [ReservationVal]);

  useEffect(() => {
    if(aggregat.length == 0) return;
    setChoosen(aggregat[0]);
  }, [aggregat]);

  return (
    <Card className="w-full">
      <div className="flex flex-row items-center p-6 gap-6">
        <CardHeader className="p-0">
          <CardTitle>Réservations</CardTitle>
          <CardDescription>{`Reservation du ${DateVal}`}</CardDescription>
        </CardHeader>
      </div>
      <CardContent>
        <form>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Locataire :</Label>
              <div className="flex flex-row justify-between">
                <Select disabled={aggregat.length == 0} onValueChange={(value) => setChoosen(aggregat[parseInt(value)])} defaultValue={aggregat.length > 0 ? aggregat[0].Locataire.firstName :""}>
                  <SelectTrigger>
                    <SelectValue placeholder={(aggregat.length > 0 && "Select a tenant") || "No tenant" }></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {aggregat.map((value, index) => (
                    <SelectItem value={index.toString()} key={index}>{value.Locataire.firstName} {value.Locataire.lastName}</SelectItem>
                    ))}
                    
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {choosen?.Locataire && ToBox(choosen, {gridTemplateColumns: "auto 1fr"})}


        </form>
      </CardContent>
    </Card>
  )
}

const Reservation = ( { ReservationVal }: { ReservationVal: ReservationType[] | undefined } ) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: DateRange | undefined) => {
    if (date) {
      const fromDate = date.from?.toLocaleDateString();
      const toDate = date.to?.toLocaleDateString();
      setSelectedDate(`${fromDate} - ${toDate}`);
    } else {
      setSelectedDate(null);
    }
  };

  return (
    <>
      <DatePickerWithRange id="date" onDateChange={handleDateChange} />
      <CardWithForm DateVal={selectedDate} ReservationVal={ReservationVal}/>
    </>
  );
};

export { Reservation };