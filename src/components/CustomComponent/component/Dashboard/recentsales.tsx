import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Usercard from "@/components/ui/usercard";
import { Command } from "@/type/Command";
import { User } from "@/type/User";
import { ValuableThing } from "./dashboard";
  
  export default function RecentSales({card, Sales}: {card?: ValuableThing, Sales: Command[]}) {

    const user = {} as User;

    return (
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
            {Sales.map((command, index) => (
                <div className="flex items-center gap-4" key={index}>
                    <Usercard user={user}>
                        <div className="flex items-center gap-4 w-full">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={user.avatar} alt="Avatar" />
                            <AvatarFallback>{user?.lastName[0] + user?.firstName[0]}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {user.lastName + " " + user.firstName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {user.mail}
                            </p>
                            </div>
                            <div className="ml-auto font-medium">+$Recettes</div>
                        </div>
                    </Usercard>
                </div>
            ))}
        </CardContent>
      </Card>
    )
  }
  