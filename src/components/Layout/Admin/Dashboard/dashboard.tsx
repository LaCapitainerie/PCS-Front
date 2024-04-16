import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  CalendarIcon,
  CreditCard,
  DollarSign,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Utilisateur } from "@/components/customclass"
import { ChangeEvent, useEffect, useState } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export function Dashboard() {
  
  const stylePage = {
    "padding-left": '3.5rem'
  } as React.CSSProperties;

  const styleCol = {
    "height": "27vh",
    "overflow-y": "scroll",
    "overflow-x": "hidden"
  } as React.CSSProperties;
  

  const [filterUser, setFilterUser] = useState<string>("");
  const [filterUserCount, setFilterUserCount] = useState<number>(5);

  const [users, setUsers] = useState<Utilisateur[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            const data: Utilisateur[] = await (
                await fetch(
                    "http://localhost:2000/Utilisateurs"
                )
            ).json();

            setUsers(data.filter((user) => (user.Email+user.Nom+user.Prenom).normalize().toLowerCase().includes(filterUser)).slice(0, filterUserCount));
        };

        dataFetch();
    }, [filterUser, filterUserCount]);






  return (
    <div className="flex min-h-screen w-full flex-col left-[3.5rem]" style={stylePage}>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prestations
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$Stats</div>
              <p className="text-xs text-muted-foreground">
                +Stats% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reservations
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+Stats</div>
              <p className="text-xs text-muted-foreground">
                +Stats% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+Stats</div>
              <p className="text-xs text-muted-foreground">
                +Stats% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+Stats</div>
              <p className="text-xs text-muted-foreground">
                +Stats since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  Recent transactions from your store.
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
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        olivia@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Refund
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-24
                    </TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        noah@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Subscription
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-25
                    </TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Emma Brown</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        emma@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-26
                    </TableCell>
                    <TableCell className="text-right">$450.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-27
                    </TableCell>
                    <TableCell className="text-right">$550.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
            </CardHeader>
            <div className="p-6 pt-0">
              <Input type="email" placeholder="Find by Email" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilterUser(event.target.value)}/>
            </div>
            <CardContent className="grid gap-8 items-start" style={styleCol}>
              {users.map((user) => (<>
                <div className="flex items-center gap-4">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex items-center gap-4 w-full">

                        
                          <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={user.Avatar} alt="Avatar" />
                            <AvatarFallback>{user.Nom[0] + user.Prenom[0]}</AvatarFallback>
                          </Avatar>
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                              {user.Nom + " " + user.Prenom}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.Email}
                            </p>
                          </div>
                          <div className="ml-auto font-medium">+$Recettes</div>
                      
                      </div>
                    </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={user.Avatar} alt="Avatar" />
                        <AvatarFallback>{user.Nom[0] + user.Prenom[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{user.Username}</h4>
                        <p className="text-sm">
                          {user.Description}
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            Joined {user.Joined}
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

              </div>
              
                    
                    </>)
                )
              }
            </CardContent>
            <div className="p-6">
              <Select defaultValue="5" value={filterUserCount.toString()} onValueChange={(value: string) => setFilterUserCount(parseInt(value))}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Number per Page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"3"}>3</SelectItem>
                    <SelectItem value={"5"}>5</SelectItem>
                    <SelectItem value={"10"}>10</SelectItem>
                    <SelectItem value={"20"}>20</SelectItem>
                    <SelectItem value={"50"}>50</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
