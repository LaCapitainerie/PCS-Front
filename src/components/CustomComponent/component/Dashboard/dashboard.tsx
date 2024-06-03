import { DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecentSales from "./recentsales"
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { CRUD, CrudVariant } from "./crud/Crud"
import { User } from "@/type/User"
const queryClient = new QueryClient()

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

export function Dashboard({Column, CustomOnes, Token}: {Column: ValuableThing[], CustomOnes: CrudVariant[], Token: User["token"]}) {

  const [currentValuable, setValuable] = useState<cardProps[]>([]);
  const [cards, setCards] = useState<cardProps[]>([]);

  useEffect(() => {
    const dataFetch = async () => {

      Column.map(async (column) => {

        const data: any[] = await (
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}${column.path}`
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

  }, [Column, currentValuable]);

  return (
    <div className="flex min-h-screen h-full w-full flex-col left-[3.5rem]" style={{paddingLeft: '3.5rem'}}>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        
        {
          cards.length > 0 ?

            <div className={`grid gap-4` + (cards.length>1?`md:grid-cols-2 md:gap-8 lg:grid-cols-${cards.length}`:"")}>
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
            </div> :
            ""
        }
        
        



        <div className="h-full w-full grid gap-y-8 gap-x-0 grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 lg:gap-y-0 lg:gap-x-8">
          
          <Tabs defaultValue={CustomOnes[0]} className="flex flex-col h-full w-full col-span-2">
            <TabsList className="w-fit">
              {
                CustomOnes.map((_, index) => (
                    <TabsTrigger value={CustomOnes[index]} key={index+1}>{CustomOnes[index]}</TabsTrigger>
                ))
              }
            </TabsList>
            {
              CustomOnes.map((value, index) => (
                  <TabsContent value={CustomOnes[index]} key={index+1}>
                      <QueryClientProvider client={queryClient}>
                        <CRUD variant={value} token={Token}/>
                      </QueryClientProvider>
                  </TabsContent>
                ))
            }
          </Tabs>

          <RecentSales token={Token}/>
        </div>

      </main>
    </div>
  )
}

export default Dashboard