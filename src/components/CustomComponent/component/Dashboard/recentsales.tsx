import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import Usercard from "@/components/ui/usercard";
import { PrestationDTO } from "@/type/Prestation";
import { use, useEffect, useState } from "react";

export default function RecentSales() {

  const [retour, setRetour] = useState<PrestationDTO>({service: []});

  useEffect(() => {
    const dataFetch = async () => {
      const retourDTO: PrestationDTO = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/service/all`,
          {
            method: "GET",
            headers: {
              "Authorization": localStorage.getItem('token') || "",
            },
          }
        )
      ).json();

      setRetour(retourDTO);
    };

    dataFetch();
  }, []);
  

  console.log("retour", retour);
  
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {retour.service.map((prestation, index) => (
          <div className="flex items-center gap-4" key={index}>
            <Usercard user={prestation._user}>
              <div className="flex items-center gap-4 w-full">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={prestation._user?.avatar} alt="Avatar" />
                  <AvatarFallback>{prestation._user?.lastName[0] + prestation._user?.firstName[0]}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {prestation._user?.lastName + " " + prestation._user?.firstName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {prestation._user?.mail}
                  </p>
                </div>
                <div className="ml-auto font-medium">+${prestation.price}</div>
              </div>
            </Usercard>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
