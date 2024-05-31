import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Edit2, UserPlus, Heater, Cable, Drill, KeyRound, Paintbrush2, Fence, Check } from "lucide-react"
import Usercard from "@/components/ui/usercard"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { use, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Property } from "@/type/Property"
import { Prestataire } from "@/type/Prestataire"
import { User } from "@/type/User"
import { Prestation } from "@/type/Prestation"

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

export function typeToDom(type: string = "", status: Prestation["status"]) {
  switch (type) {
    case "chauffage":
      return <Heater className={`h-5 w-5 text-${statusToColor(status)}-500`} />
    case "electricite":
      return <Cable className={`h-5 w-5 text-${statusToColor(status)}-500`} />
    case "jardinage":
      return <Fence className={`h-5 w-5 text-${statusToColor(status)}-500`} />
    case "peinture":
      return <Paintbrush2 className={`h-5 w-5 text-${statusToColor(status)}-500`} />
    case "reparation":
      return <Drill className={`h-5 w-5 text-${statusToColor(status)}-500`} />
    case "conciergerie":
      return <KeyRound className={`h-5 w-5 text-${statusToColor(status)}-500`} />
  }
}

const descriptionKey = ["type", "price", "surface", "room", "bathroom", "garage", "address", "city", "zipcode"]

interface UserTypeDTO {
  user: User[];
}

export function CardProperty({ Property }: { Property: Property | undefined, Prestataire: Prestataire[]}) {

  const { toast } = useToast();
  
  const [edit, setEdit] = useState<boolean>(false);

  console.log(Property);
  

  function toTitleCase(str:string) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (<>
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="">Details du bien</CardTitle>
          {
            Property?.userId == localStorage.getItem('user') ?
            "" :
            ""
          }
          <Button variant="outline" size="icon" onClick={() => {if(edit)toast({ description: "Your changes have been saved !", }); setEdit(!edit);}}>
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

          <div className="">
            {/* {user.map((presta, index) => (
              <Usercard user={presta as unknown as User} key={index}>
                {typeToDom("peinture", "pending")}
                    <div className="space-y-1">
                      
                      <p className="text-sm font-medium leading-none">
                        {presta.id}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {presta.type}
                      </p>
                    </div>
              </Usercard>
            ))} */}
          </div>
        </CardContent>
      </div>
      <CardFooter className="">
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card></>
  )
}