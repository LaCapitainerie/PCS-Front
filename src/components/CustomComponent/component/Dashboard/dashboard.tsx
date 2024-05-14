import { DollarSign } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Usercard from "@/components/ui/usercard"
import { User } from "@/type/User"
import DataBoard, { DefaultDashboard } from "./board"
import RecentSales from "./recentsales"

function MakeCard(name:string, currentPresta:string, ratioPresta:string, index:number) {
  return (
    <Card x-chunk={`dashboard-01-chunk-${index}`} key={index}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {name}
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currentPresta}$</div>
        <p className="text-xs text-muted-foreground">
          {ratioPresta == "not enought data"?ratioPresta:`+${ratioPresta}%`} from last month
        </p>
      </CardContent>
    </Card>
  )
}

export interface cardProps {
  name: string;
  currentPresta: string;
  ratioPresta: string;
}

export interface ValuableThing {
  name: string;
  path: string;
  valueColumn: string;
  dateColumn: string;
}

export function Dashboard({Column}: {Column: ValuableThing[]}) {
  
  const stylePage = {
    "padding-left": '3.5rem'
  } as React.CSSProperties;

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
      const dataFetch = async () => {
          const data: User[] = await (
              await fetch(
                `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/users`
              )
          ).json();

          setUsers(data);
      };

      dataFetch();
  }, []);

  const [currentValuable, setValuable] = useState<cardProps[]>([]);
  const [cards, setCards] = useState<cardProps[]>([]);

  useEffect(() => {
    const dataFetch = async () => {

      Column.map(async (column) => {

        const data: any[] = await (
          await fetch(
            `${process.env.NEXT_PUBLIC_LOCAL_API_URL}${column.path}`
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
          const date = new Date(house[column.dateColumn]);
          return date.getMonth() === prevMonth && date.getFullYear() === prevYear;
        });

        // Get the prestation from this month
        const prestaThis = data.filter((house) => {
          const date = new Date(house[column.dateColumn]);
          return date.getMonth() === month && date.getFullYear() === year;
        });

        // Get the $ of prestation from the previous month
        const previousMonthDollar:number = prestaPrev.reduce((acc, house) => acc + house[column.valueColumn], 0);
        const thisMonthDollar:number = prestaThis.reduce((acc, house) => acc + house[column.valueColumn], 0);

        // Get the augment percentage of $ from the previous month to this month
        const dollarAugmentNumber = ((thisMonthDollar - previousMonthDollar) / previousMonthDollar) * 100;        

        let newValuable = {
          name: column.name,
          currentPresta: thisMonthDollar.toFixed(2),
          ratioPresta: dollarAugmentNumber.toFixed(2)
        }

        if (["Infinity", "-Infinity", "NaN", "-NaN"].includes(newValuable.ratioPresta)) {
          newValuable.ratioPresta = "not enought data";
        };

        let tmpCurrentValuable = currentValuable;

        if (!tmpCurrentValuable.map((valuable) => valuable.name).includes(column.name)) { tmpCurrentValuable.push(newValuable); }

        

        setValuable(tmpCurrentValuable);

      });
    };

    dataFetch();
    
    setCards(currentValuable);

  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col left-[3.5rem]" style={stylePage}>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className={`grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-${cards.length}`}>
          {
            cards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.name}</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${card.currentPresta}</div>
                  <p className="text-xs text-muted-foreground">+{card.ratioPresta}% from last month</p>
                </CardContent>
              </Card>
            ))
          }
        </div>



        <div className="h-full grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          
          <Tabs defaultValue="Reservations" className="h-full xl:col-span-2">
            <TabsList>
              <TabsTrigger value={"default"} key={0}>default</TabsTrigger>
              {
                cards.map((card, index) => (
                  <TabsTrigger value={card.name} key={index}>{card.name}</TabsTrigger>
                ))
              }
            </TabsList>
                <TabsContent value={"default"} key={0}>
                  <DefaultDashboard/>
                </TabsContent>
            {
              Column.map((card, index) => (
                <TabsContent value={card.name} key={index} className="h-full">
                  <DataBoard card={card}/>
                </TabsContent>
              ))
            }
          </Tabs>

          <RecentSales Sales={[]}/>

        </div>



      </main>
    </div>
  )
}

export default Dashboard