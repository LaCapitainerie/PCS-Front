import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import Usercard from "@/components/ui/usercard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Calendrier from "../../Calendrier";
import { Reservation } from "@/type/Reservation";
import { User } from "@/type/User";

const ReservationsBoard = () => {

    const [reservations, setReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: Reservation[] = await (
                await fetch(
                  `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/reservations`
                )
            ).json();

            setReservations(data.sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()));
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
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-2">
                <CardTitle>Reservations</CardTitle>
                <CardDescription>
                  Recent reservations from your store.
                </CardDescription>
              </div>


              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">View</Button>
                </DialogTrigger>
                <DialogContent className="aspect-w-16 aspect-h-9" style={{maxWidth: '90%'}}>

                  <Calendrier/>

                </DialogContent>
              </Dialog>

              
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

                    const tmpUser = Utilisateurs.find((user) => user.ID === reservation.ID_tenant);

                    const startDate = new Date(reservation.Date);
                    const endDate = addDays(new Date(reservation.Date), reservation.Duree);

                    // Is reservation passed , today between start and end date , or is it in the future
                    const isToday = new Date() >= new Date(startDate) && new Date() <= endDate;
                    const isFuture = new Date() < startDate;



                    return (
                    <TableRow key={reservation.ID}>
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
                        {reservation.ID_property}
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