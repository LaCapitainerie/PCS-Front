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

function statusToColor(params: "pending" | "processing" | "success" | "failed") {
  switch (params) {
    case "pending":
      return "yellow"
    case "processing":
      return "blue"
    case "success":
      return "green"
    case "failed":
      return "red"
  }

}

function typeToDom(type: string = "", status: "pending" | "processing" | "success" | "failed") {
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

const descriptionKey = ["Name", "Type", "Price", "Surface", "Room", "Bathroom", "Garage", "Address", "City"]

interface UserTypeDTO {
  User: User[];
}

export function CardProperty({ Property, Prestataire }: { Property: Property | undefined, Prestataire: Prestataire[]}) {

  const { toast } = useToast();
  
  const [edit, setEdit] = useState<boolean>(false);

  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const dataFetch = async () => {
        const data: User[] = await (
            await fetch(
                `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/users`
            )
        ).json();
        
        
        const user = data.filter((value: User) => Prestataire.map((val) => val.ID).includes(value.ID));

        setUser(user);
    };

    dataFetch();
}, []);

  return (<>
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="">Details du bien</CardTitle>
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
          {Property && Object.entries(Property).filter((val) => descriptionKey.includes(val[0].toString())).map(([key, value], index) => (
            <div key={index} className="mb-4 pb-4 last:mb-0 last:pb-0" >
              <div className="w-full">
                <Label htmlFor={key}>{key} : </Label>
                <Input id={key} type="text" defaultValue={value} readOnly={!edit}/>
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
            {user.map((presta, index) => (
              <Usercard user={presta as unknown as User}>
                {typeToDom("peinture", "pending")}
                    <div className="space-y-1">
                      
                      <p className="text-sm font-medium leading-none">
                        {presta.ID}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {presta.Type}
                      </p>
                    </div>
              </Usercard>
            ))}
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