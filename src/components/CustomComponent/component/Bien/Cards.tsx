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

export function typeToDom(type: string = "", id: number = 0) {
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

const descriptionKey = ["type", "price", "surface", "room", "bathroom", "garage", "address", "city", "zipcode"]

interface UserTypeDTO {
  user: User[];
}

export function CardProperty({ Property, User_id }: { Property: Property | undefined, Prestataire: Prestataire[], User_id: User["id"] }) {

  const { toast } = useToast();
  
  const [edit, setEdit] = useState<boolean>(false);

  const [prestation, setPresta] = useState<Prestation[]>([]);

  useEffect(() => {
    const dataFetch = async () => {

        const data: PrestationDTO = await (
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/service/all`
            )
        ).json();
        
        setPresta(data.service);
    };

    dataFetch();
  }, [Property]);

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
            
            <Button hidden={Property?.userId != User_id} variant="outline" size="icon" onClick={() => {if(edit)toast({ description: "Your changes have been saved !", }); setEdit(!edit);}}>
              {edit?<Check className="h-4 w-4" />:<Edit2 className="h-4 w-4" />}
            </Button>
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

            {Property && descriptionKey.map((key, index) => (
              <div key={index} className="mb-4 pb-4 last:mb-0 last:pb-0" >
                <div className="w-full">
                  <Label htmlFor={key}>{toTitleCase(key)} : </Label>
                  <Input id={key} type="text" defaultValue={Property ? Object.entries(Property).find((value, _index) => value[0] == key)?.[1] : ""} readOnly={!edit} />
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
              <Button variant="outline" size="icon">
                <UserPlus className="h-4 w-4" />
              </Button>
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
                {prestation.map((presta, index) =>
                  <Tooltip>
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