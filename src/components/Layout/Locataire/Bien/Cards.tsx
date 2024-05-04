import { CheckIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Edit2, UserPlus, Heater, Cable, Drill, KeyRound, Paintbrush2, Fence, Tag, Home, DollarSign, LandPlot, Bed, Bath, SquareParking, Zap, Check } from "lucide-react"
import { DescriptionBien, Prestation, Utilisateur } from "../../../customclass"
import { useEffect, useState } from "react"
import { log } from "console"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { getIcon } from "./BienImmo"
import { useToast } from "@/components/ui/use-toast"

export function statusToColor(params: "pending" | "processing" | "success" | "failed") {
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

export function attributeToDom(key: string, value: any) {
  switch (key.toLocaleLowerCase()) {
    case "nom":
      return <Tag className="text-sm font-medium leading-none">{value} </Tag>
    case "type":
      return getIcon(value)
    case "prix":
      return <DollarSign className="text-sm">{value} </DollarSign>
    case "surface":
      return <LandPlot className="text-sm">{value} </LandPlot>
    case "chambres":
      return <Bed className="text-sm">{value} </Bed>
    case "salles_de_bain":
      return <Bath className="text-sm">{value} </Bath>
    case "garages":
      return <SquareParking className="text-sm">{value} </SquareParking>
  }
}

export function typeToDom(type: Prestation["Type"], status: "pending" | "processing" | "success" | "failed", color: string | null = null) {
  switch (type.toLocaleLowerCase()) {
    case "chauffage":
      return <Heater className={`h-9 w-9 ${color || `text-${statusToColor(status)}-500`}`} />
    case "electricite":
      return <Zap className={`h-9 w-9 ${color || `text-${statusToColor(status)}-500`}`} />
    case "jardinage":
      return <Fence className={`h-9 w-9 ${color || `text-${statusToColor(status)}-500`}`} />
    case "peinture":
      return <Paintbrush2 className={`h-9 w-9 ${color || `text-${statusToColor(status)}-500`}`} />
    case "reparation":
      return <Drill className={`h-9 w-9 ${color || `text-${statusToColor(status)}-500`}`} />
    case "conciergerie":
      return <KeyRound className={`h-9 w-9 ${color || `text-${statusToColor(status)}-500`}`} />
  }
}

const descriptionKey = ["Nom", "Type", "Prix", "Surface", "Chambres", "Salles_de_bain", "Garages"]

export function CardDesc({ Desc }: { Desc: DescriptionBien | undefined }) {

  const { toast } = useToast();
  
  const [prestations, setPrestations] = useState<Prestation[]>([]);

  useEffect(() => {
      const dataFetch = async () => {
          const data: Prestation[] = await (
              await fetch(
                  "http://localhost:2000/Housing"
              )
          ).json();

          setPrestations(data);
          
      };

      dataFetch();
  }, []);

  console.log(prestations);
  
  
  return (<>
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle className="">Details du bien</CardTitle>
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
              className="mb-4 grid grid-cols-[25px_1fr] items-center pb-4  gap-4"
            >
              {attributeToDom(key, value)}
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
            <CardTitle className="">Prestations associés</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">

          <div className="flex flex-row cols-3 w-full gap-2">
          
            {prestations.map((presta, index) => {
              console.log(presta.ID_Bien_Immobilier, Desc?.Bien.id);

              if (presta.ID_Bien_Immobilier !== Desc?.Bien.id) return null;
              
              return (
                <HoverCard>
                  <HoverCardTrigger>{typeToDom(presta.Type, presta.status, "white")}</HoverCardTrigger>
                  <HoverCardContent>
                    {presta.Type}
                  </HoverCardContent>
                </HoverCard>
                
              )
              })}
          </div>
        </CardContent>
      </div>
    </Card></>
  )
}