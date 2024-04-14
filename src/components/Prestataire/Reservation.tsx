"use client"

import { DatePickerWithRange } from "../ui/rangedate";

import React, { useState } from 'react';
 
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DateRange } from "react-day-picker";
 
export function CardWithForm({Date}: {Date: string | null}) {

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
          <CardDescription>{`Reservation du ${Date}`}</CardDescription>
        </CardHeader>
      </div>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
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

const Reservation = () => {
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
      <DatePickerWithRange id="date" onDateChange={handleDateChange}/>
      <CardWithForm Date={selectedDate}/>
    </>
  );
};

export { Reservation };