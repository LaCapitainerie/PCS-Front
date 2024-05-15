import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { useEffect, useState } from "react";
import Usercard from "@/components/ui/usercard";
import { User } from "@/type/User";
import Calendrier from "../Calendrier/Calendrier";
import { ValuableThing } from "@/components/CustomComponent/component/Dashboard/dashboard";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface DataBoardProps {
  children?: React.ReactNode;
  card: ValuableThing;
}

interface dataProps {
  idtenant: string;
  idproperty: string;
  date: string;
  duree: number;
  prix: number;
}

const DataBoard: React.FC<DataBoardProps> = ({children, card}) => {

    const [data, setData] = useState<dataProps[]>([]);

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
        <Card className="h-full xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center justify-between">
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
                  {data.map((dataLoop, index) => {

                    const tmpUser = Utilisateurs.find((user) => user.id === dataLoop.idtenant);

                    const startDate = new Date(dataLoop.date);
                    const endDate = addDays(new Date(dataLoop.date), dataLoop.duree);

                    // Is dataLoop passed , today between start and end date , or is it in the future
                    const isToday = new Date() >= new Date(startDate) && new Date() <= endDate;
                    const isFuture = new Date() < startDate;



                    return (
                    <TableRow key={index}>
                      <TableCell>


                      <Usercard user={tmpUser}>
                        <div>
                          <div className="font-medium">{tmpUser?.firstName} {tmpUser?.lastName}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {tmpUser?.mail}
                          </div>
                        </div>
                      </Usercard>


                        
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        {dataLoop.idproperty}
                      </TableCell>
                      <TableCell className="">
                        <Badge className="text-xs" variant="outline">
                          {isToday ? "En cours" : (isFuture ? "A venir" : "Passée")}
                        </Badge>
                      </TableCell>
                      <TableCell className="md:table-cell ">
                        {(new Date(dataLoop.date)).toDateString() + " - " + endDate.toDateString()}
                      </TableCell>

                      <TableCell className="text-right">
                        {
                          new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'USD' }).format(dataLoop.prix)
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


export const DefaultDashboard = () => {
  return (
    <Card className="h-full w-full col-span-2">
      <CardHeader className="px-7 flex flex-row justify-between">
        <div>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent orders from your store.</CardDescription>
        </div>
        <Button variant="gooeyRight">View</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-accent">
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">Sale</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Fulfilled
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Olivia Smith</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  olivia@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">Refund</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="outline">
                  Declined
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
            {<TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                Sale
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Fulfilled
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                2023-06-23
              </TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>}
            <TableRow>
              <TableCell>
                <div className="font-medium">Noah Williams</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  noah@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                Subscription
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Fulfilled
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2023-06-25</TableCell>
              <TableCell className="text-right">$350.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Emma Brown</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  emma@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">Sale</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Fulfilled
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
              <TableCell className="text-right">$450.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">Sale</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Fulfilled
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Olivia Smith</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  olivia@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">Refund</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="outline">
                  Declined
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
              <TableCell className="text-right">$150.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Emma Brown</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  emma@example.com
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">Sale</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Fulfilled
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
              <TableCell className="text-right">$450.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


export default DataBoard;