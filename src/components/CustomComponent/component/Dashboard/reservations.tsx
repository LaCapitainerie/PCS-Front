import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reservation, Utilisateur } from "@/components/functions";
import { useEffect, useState } from "react";
import Usercard from "@/components/ui/usercard";

const ReservationsBoard = () => {

    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: Reservation[] = await (
                await fetch(
                    "http://localhost:2000/Reservations"
                )
            ).json();

            setReservations(data.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()));
        };

        dataFetch();
    }, []);

    const [Utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: Utilisateur[] = await (
                await fetch(
                    "http://localhost:2000/Utilisateurs"
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
                <CardTitle>Reservations</CardTitle>
                <CardDescription>
                  Recent reservations from your store.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Locataire</TableHead>
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
                  {reservations.map((reservation) => {

                    const tmpUser = Utilisateurs.find((user) => user.id === reservation.ID_Locataire);

                    const startDate = new Date(reservation.Date);
                    const endDate = addDays(new Date(reservation.Date), reservation.Duree);

                    // Is reservation passed , today between start and end date , or is it in the future
                    const isToday = new Date() >= new Date(startDate) && new Date() <= endDate;
                    const isFuture = new Date() < startDate;



                    return (
                    <TableRow key={reservation.ID_Reservation}>
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
                        {reservation.ID_Housing}
                      </TableCell>
                      <TableCell className="">
                        <Badge className="text-xs" variant="outline">
                          {isToday ? "En cours" : (isFuture ? "A venir" : "Passée")}
                        </Badge>
                      </TableCell>
                      <TableCell className="md:table-cell ">
                        {(new Date(reservation.Date)).toDateString() + " - " + endDate.toDateString()}
                      </TableCell>

                      <TableCell className="text-right">
                        {
                          new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'USD' }).format(reservation.Prix)
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

export default ReservationsBoard;