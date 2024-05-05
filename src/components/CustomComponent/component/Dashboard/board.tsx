import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import Usercard from "@/components/ui/usercard";
import { User } from "@/type/User";
import Calendrier from "../Calendrier/Calendrier";
import { ValuableThing } from "@/components/CustomComponent/component/Dashboard/dashboard";

interface DataBoardProps {
  children?: React.ReactNode;
  card: ValuableThing;
}

const DataBoard: React.FC<DataBoardProps> = ({children, card}) => {

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: any[] = await (
                await fetch(
                  `${process.env.NEXT_PUBLIC_LOCAL_API_URL}${card.path}`
                )
            ).json();

            setData(data.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()));
        };

        dataFetch();
    }, []);

    const [Utilisateurs, setUtilisateurs] = useState<User[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: User[] = await (
                await fetch(
                  `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/users`
                )
            ).json();

            setUtilisateurs(data);
        };

        dataFetch();
    }, []);

    function addDays(date: Date, days: number) {
      var result = new Date(date);
      result.setDate(date.getDate() + days);
      return result;
    }

    return (
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Data</CardTitle>
                <CardDescription>
                  Recent reservations from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Calendrier/>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{card.name}</TableHead>
                    <TableHead className="">
                      Bien
                    </TableHead>
                    <TableHead className="">
                      Status
                    </TableHead>
                    <TableHead className="">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((dataLoop) => {

                    const tmpUser = Utilisateurs.find((user) => user.ID === dataLoop.ID_Tenant);

                    const startDate = new Date(dataLoop.Date);
                    const endDate = addDays(new Date(dataLoop.Date), dataLoop.Duree);

                    // Is dataLoop passed , today between start and end date , or is it in the future
                    const isToday = new Date() >= new Date(startDate) && new Date() <= endDate;
                    const isFuture = new Date() < startDate;



                    return (
                    <TableRow key={dataLoop.ID}>
                      <TableCell>


                      <Usercard user={tmpUser}>
                        <div>
                          <div className="font-medium">{tmpUser?.Prenom} {tmpUser?.Nom}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {tmpUser?.Email}
                          </div>
                        </div>
                      </Usercard>


                        
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        {dataLoop.ID_property}
                      </TableCell>
                      <TableCell className="">
                        <Badge className="text-xs" variant="outline">
                          {isToday ? "En cours" : (isFuture ? "A venir" : "Passée")}
                        </Badge>
                      </TableCell>
                      <TableCell className="md:table-cell ">
                        {(new Date(dataLoop.Date)).toDateString() + " - " + endDate.toDateString()}
                      </TableCell>

                      <TableCell className="text-right">
                        {
                          new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'USD' }).format(dataLoop.Prix)
                        }
                      </TableCell>
                    </TableRow>)
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
    );
}

export default DataBoard;