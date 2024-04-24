import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Edit2, UserPlus, Heater, Cable, Drill, KeyRound, Paintbrush2, Fence } from "lucide-react"
import { DescriptionBien, Prestataire, Utilisateur } from "../../../customclass"
import Usercard from "@/components/ui/usercard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

function typeToDom(type: Prestataire["Type"], status: "pending" | "processing" | "success" | "failed") {
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

const descriptionKey = ["Nom", "Type", "Prix", "Surface", "Chambres", "Salles_de_bain", "Garages"]

export function CardDesc({ Desc }: { Desc: DescriptionBien | undefined }) {
  
  return (<>
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="">Details du bien</CardTitle>
          <Button variant="outline" size="icon">
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">

        <div className="max-h-64" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '0px',
            gridTemplateAreas: `
              ". . ."
              ". . ."
              ". . ."
            `
          }}>
          {Desc?.Bien && Object.entries(Desc.Bien).filter((val) => descriptionKey.includes(val[0].toString())).map(([key, value], index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {key}
                </p>
                <p className="text-sm text-muted-foreground">
                  {value}
                </p>
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
            {Desc?.utilisateur.map((presta, index) => (
              <Usercard user={presta as unknown as Utilisateur}>
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