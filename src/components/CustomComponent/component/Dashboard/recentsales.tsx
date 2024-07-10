import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast";
import Usercard from "@/components/ui/usercard";
import { PrestationDTO } from "@/type/Prestation";
import { Reservation } from "@/type/Reservation";
import { User } from "@/type/User";
import { useEffect, useState } from "react";

export default function RecentSales({token}: {token: User["token"]}) {

  const [retour, setRetour] = useState<PrestationDTO>({service: []});

  const [reservation, setReservation] = useState<Reservation[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response: any = await (await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reservation/all`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `${token}`,
                        },
                    }
                )).json();                

                setReservation(response.reservations);

            } catch (error) {
                console.error('Error:', error);
                toast({
                    title: "Erreur lors de la récupération des réservations",
                    description: "Veuillez réessayer plus tard",
                })
            }
        }

        dataFetch();
    }, [token])
  
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Ventes Recentes</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {reservation.map((prestation, index) => (
          <div className="flex items-center gap-4" key={index}>
              <div className="flex items-center gap-4 w-full">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {prestation.travelerId}
                  </p>
                </div>
                <div className="ml-auto font-medium">+${prestation.bill.price}</div>
              </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
