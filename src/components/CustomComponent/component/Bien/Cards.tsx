"use client"

import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Edit2, UserPlus, Heater, Cable, Drill, KeyRound, Paintbrush2, Fence, Check, CarTaxiFront, SprayCan } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Property } from "@/type/Property"
import { Prestataire } from "@/type/Prestataire"
import { User } from "@/type/User"
import { Prestation, PrestationDTO } from "@/type/Prestation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Service } from "@/type/Service"

function statusToColor(params: Prestation["status"]) {
  switch (params) {
    case "pending":
      return "yellow"
    case "accepted":
      return "blue"
    case "done":
      return "green"
    case "refused":
      return "red"
  }

}

export function typeToDom(type: Service["type"], id: number = 0) {

  switch (type) {
    case "transport":
      return <CarTaxiFront key={id} className={`h-10 w-10 text-grey-500`} />
    case "nettoyage":
      return <SprayCan key={id} className={`h-10 w-10 text-grey-500`} />
    case "chauffage":
      return <Heater key={id} className={`h-10 w-10 text-grey-500`} />
    case "electricite":
      return <Cable key={id} className={`h-10 w-10 text-grey-500`} />
    case "jardinage":
      return <Fence key={id} className={`h-10 w-10 text-grey-500`} />
    case "peinture":
      return <Paintbrush2 key={id} className={`h-10 w-10 text-grey-500`} />
    case "reparation":
      return <Drill key={id} className={`h-10 w-10 text-grey-500`} />
    case "conciergerie":
      return <KeyRound key={id} className={`h-10 w-10 text-grey-500`} />
  }
}

const descriptionKey = {
  "type": "type",
  "price": "prix",
  "surface": "surface",
  "room": "pièces",
  "bathroom": "salle de bain",
  "garage": "garage",
  "address": "adresse",
  "city": "ville",
  "zipCode": "code postal",
}

export function CardProperty({ Property, User_id, Prestation }: { Property: Property | undefined, Prestation: Service[], User_id: User["id"] }) {  

  function toTitleCase(str:string) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <div className="flex flew-row w-full gap-4">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-row justify-between">
            <CardTitle className="">Details du bien</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">

          <div className="grid max-h-64 gap-2" style={{
              gridTemplateColumns: '1fr 1fr 1fr',
              gridTemplateRows: '1fr 1fr 1fr',
              gridTemplateAreas: `
                ". . ."
                ". . ."
                ". . ."
              `
            }}>

              

            {Property && Object.entries(descriptionKey).map((key, index) => (
              <div key={index} className="mb-4 pb-4 last:mb-0 last:pb-0" >
                <div className="w-full flex flex-col">
                  <p className="text-l font-semibold leading-none tracking-tight">{toTitleCase(key[1])} : </p>
                  <p id={key[0]} className="text-sm text-muted-foreground">{Property ? Object.entries(Property).find((value, _index) => value[0] == key[0])?.[1] : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>

      <Card className="w-full flex flex-col justify-between">
        <div>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <CardTitle className="">Prestataires associés</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">

            <div className="grid max-h-64 gap-2" style={{
              gridTemplateColumns: 'repeat(5, 1fr)',
              gridTemplateRows: 'repeat(3, 1fr)',
              gridRowGap: '2rem',
              gridTemplateAreas: `
              ". . . . ."
              ". . . . ."
              ". . . . ."
              `
            }}>
              <TooltipProvider delayDuration={100}>
                {Prestation.map((presta, index) =>
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      {typeToDom(presta.type, index)}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{presta.description}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </div>
          </CardContent>
        </div>
        <CardFooter className="">
        </CardFooter>
      </Card>
    </div>
  )
}