import { Activity, CalendarIcon, CircleDot, CreditCard, DollarSign, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Prestation, Reservation, Utilisateur } from "@/components/customclass"
import { useEffect, useState } from "react"
import ReservationsBoard from "./reservations"
import PrestationsBoard from "./prestations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Usercard from "@/components/ui/usercard"
import IssuesBoard from "./issues"

export function Dashboard() {
  
  const stylePage = {
    "padding-left": '3.5rem'
  } as React.CSSProperties;

  const styleCol = {
    "height": "27vh",
    "overflow-y": "scroll",
    "overflow-x": "hidden"
  } as React.CSSProperties;

  const toComparable = (...str: string[]) => str.join().normalize().toLowerCase();
  

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

          setUsers(data.sort((a, b) => a.ID - b.ID).filter((user) => toComparable(user.Email, user.Nom, user.Prenom).includes(toComparable(filterUser))).slice(0, filterUserCount));
      };

      dataFetch();
  }, [filterUser, filterUserCount]);


  const [currentPresta, setCurrentPresta] = useState<string>();
  const [ratioPresta, setRatioPresta] = useState<string>();

  useEffect(() => {
      const dataFetch = async () => {
          const data: Prestation[] = await (
              await fetch(
                  "http://localhost:2000/Housing"
              )
          ).json();

          // Get prestation from the previous month and from this month

          // Get the current date
          const date = new Date();
          const month = date.getMonth();
          const year = date.getFullYear();

          // Get the previous month
          const prevMonth = month === 0 ? 11 : month - 1;
          const prevYear = month === 0 ? year - 1 : year;

          // Get the prestation from the previous month
          const prestaPrev = data.filter((house) => {
              const date = new Date(house.Date);
              return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
          });

          // Get the prestation from this month
          const prestaThis = data.filter((house) => {
              const date = new Date(house.Date);
              return date.getMonth() === month && date.getFullYear() === year;
          });

          // Get the $ of prestation from the previous month
          const previousMonthDollar = prestaPrev.reduce((acc, house) => acc + house.Prix, 0);
          const thisMonthDollar = prestaThis.reduce((acc, house) => acc + house.Prix, 0);

          // Get the augment percentage of $ from the previous month to this month
          const dollarAugmentNumber = ((thisMonthDollar - previousMonthDollar) / previousMonthDollar) * 100;
          
          setCurrentPresta(thisMonthDollar.toFixed(2));
          setRatioPresta(dollarAugmentNumber.toFixed(2));
      };

      dataFetch();
  }, [filterUser, filterUserCount]);

  const [currentReserv, setCurrentReserv] = useState<string>();
  const [ratioReserv, setRatioReserv] = useState<string>();

  useEffect(() => {
      const dataFetch = async () => {
          const data: Reservation[] = await (
              await fetch(
                  "http://localhost:2000/Reservations"
              )
          ).json();

          // Get prestation from the previous month and from this month

          // Get the current date
          const date = new Date();
          const month = date.getMonth();
          const year = date.getFullYear();

          // Get the previous month
          const prevMonth = month === 0 ? 11 : month - 1;
          const prevYear = month === 0 ? year - 1 : year;

          // Get the prestation from the previous month
          const prestaPrev = data.filter((house) => {
              const date = new Date(house.Date);
              return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
          });

          // Get the prestation from this month
          const prestaThis = data.filter((house) => {
              const date = new Date(house.Date);
              return date.getMonth() === month && date.getFullYear() === year;
          });

          // Get the $ of prestation from the previous month
          const previousMonthDollar = prestaPrev.reduce((acc, house) => acc + house.Prix, 0);
          const thisMonthDollar = prestaThis.reduce((acc, house) => acc + house.Prix, 0);

          // Get the augment percentage of $ from the previous month to this month
          const dollarAugmentNumber = ((thisMonthDollar - previousMonthDollar) / previousMonthDollar) * 100;
          
          setCurrentReserv(thisMonthDollar.toFixed(2));
          setRatioReserv(dollarAugmentNumber.toFixed(2));
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
              <div className="text-2xl font-bold">{currentPresta}$</div>
              <p className="text-xs text-muted-foreground">
                +{ratioPresta}% from last month
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
              <div className="text-2xl font-bold">{currentReserv}$</div>
              <p className="text-xs text-muted-foreground">
                +{ratioReserv}% from last month
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues</CardTitle>
              <CircleDot className="h-4 w-4 text-muted-foreground" />
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
          
        <Tabs defaultValue="Reservations" className="xl:col-span-2">
          <TabsList>
            <TabsTrigger value="Reservations">Reservations</TabsTrigger>
            <TabsTrigger value="Prestations">Prestations</TabsTrigger>
            <TabsTrigger value="Issues">Issues</TabsTrigger>
          </TabsList>
          <TabsContent value="Reservations">
            <ReservationsBoard />
          </TabsContent>
          <TabsContent value="Prestations">
            <PrestationsBoard />
          </TabsContent>
          <TabsContent value="Issues">
            <IssuesBoard />
          </TabsContent>
        </Tabs>


          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
            </CardHeader>
            <div className="p-6 pt-0">
              <Input type="email" placeholder="Search for users" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilterUser(event.target.value)}/>
            </div>
            <CardContent className="grid gap-8 items-start" style={styleCol}>
              {users.map((user, index) => (<>
                <div className="flex items-center gap-4" key={index}>
                  <Usercard user={user}>
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
                  </Usercard>
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

export default Dashboard