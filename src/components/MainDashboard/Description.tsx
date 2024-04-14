import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Edit2, UserPlus, Heater, Cable, Drill, KeyRound, Paintbrush2, Fence } from "lucide-react"
import { DescriptionBien, Prestataire } from "./customclass"


type CardProps = React.ComponentProps<typeof Card>

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

export function CardDemo({ Desc }: { Desc: DescriptionBien }) {
  return (<>
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="">Details du bien</CardTitle>
          <Button variant="outline" size="icon">
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">

        <div>
          {Desc.detail.map((immo, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className={`flex h-2 w-2 translate-y-1 rounded-full bg-${immo.color}-500`} />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {immo.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {immo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card>

    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="">Prestataires associés</CardTitle>
          <Button variant="outline" size="icon">
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">

        <div>
          {Desc.prestataire.map((presta, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              {typeToDom(presta.Type, presta.status)}
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {presta.particulier}
                </p>
                <p className="text-sm text-muted-foreground">
                  {presta.Type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <CheckIcon className="mr-2 h-4 w-4" /> Mark all as read
        </Button>
      </CardFooter>
    </Card></>
  )
}