"use client"

import { DatePickerWithRange } from "../../../ui/rangedate";

import React, { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Reservation as ReservationType } from "../../../customclass";

export function CardWithForm({ DateVal, ReservationVal }: { DateVal: string | null, ReservationVal: ReservationType[] | undefined}) {


  return (
    <Card className="w-full">
      <div className="flex flex-row items-center p-6 gap-6">
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src="https://github.com/LaCapitainerie.png" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
        </Button>
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
              <Input id="name" placeholder="Name of your project" disabled={true} value={ReservationVal && ReservationVal.length > 0 ? ReservationVal[0].ID_Locataire : ''}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        {

          <Button>Deploy</Button>
        }
      </CardFooter>
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