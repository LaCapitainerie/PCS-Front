import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Edit2, UserPlus, Heater, Cable, Drill, KeyRound, Paintbrush2, Fence } from "lucide-react"
import { DescriptionBien, Prestataire } from "../../../customclass"
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"

function statusToColor(params: Prestataire["status"]) {
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

function typeToDom(type: Prestataire["Type"], status: Prestataire["status"]) {
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
  console.log(Desc);
  
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

        <div className="overflow-y-scroll max-h-64">
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
            {Desc?.prestataire.map((presta, index) => (
                <HoverCard openDelay={400}>
                  <HoverCardTrigger key={index} className="mb-4 flex items-center gap-3 pb-4 last:mb-0 last:pb-0">
                    {typeToDom(presta.Type, presta.status)}
                    <div className="space-y-1">
                      
                      <p className="text-sm font-medium leading-none">
                        {presta.particulier}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {presta.Type}
                      </p>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Carte de {presta.particulier}
                  </HoverCardContent>
                </HoverCard>
                
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