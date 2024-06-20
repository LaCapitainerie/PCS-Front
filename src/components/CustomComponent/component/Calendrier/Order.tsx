import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { Command } from "@/type/Command"
import { useEffect } from "react"
import { User, UserDTO } from "@/type/User"
import React from "react"
import { PDF_invoice } from "../../facture/invoice"


const Order = ({
        day,
        token
    }: React.HTMLAttributes<HTMLDivElement> & {day: Date, token: User["token"]}) => {

    const [order, setOrder] = React.useState<Command>();

    const isSameDay = (date1:Date, date2:Date) => date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

    useEffect(() => {
        const dataFetch = async () => {
            const data: Command[] = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/command`
                )
            ).json();

            setOrder(data.find((command) => isSameDay(new Date(command.date), day)) as Command);
        };

        dataFetch();
    }, [day]);



    const prixtotal = order?order.tjm * order.duree:0
    const [customer, setCustomer] = React.useState<User>();

    useEffect(() => {
        const dataFetch = async () => {
            const data: UserDTO = await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/id/${order?.idclient}`,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                )
            ).json();

            setCustomer(data.user);
        }

        dataFetch();
    }, [order, token]);

    return (
        <Card className="h-full" x-chunk="dashboard-05-chunk-4" style={{width: '33%'}}>
            <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                Order {order?.id?.split('-')[0]}
                <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                </Button>
                </CardTitle>
                <CardDescription>Date: {order?.date}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => PDF_invoice({ commande: order })}>Export</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                    {order?.products}
                    </span>
                    <span>${order?.tjm}</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                    Duree
                    </span>
                    <span>x{order?.duree}</span>
                </li>
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${prixtotal}</span>
                </li>
                <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${prixtotal*.2}</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>${prixtotal*1.2}</span>
                </li>
                </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>{customer?.firstName} {customer?.lastName}</span>
                    <span>{order?.shippinginfo}</span>
                </address>
                </div>
                <div className="grid auto-rows-max gap-3 text-right">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                        Same as shipping address
                    </div>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>{customer?.firstName} {customer?.lastName}</dd> 
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                    <a href="mailto:">{customer?.mail}</a>
                    </dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                    <a href="tel:">{customer?.phoneNumber}</a>
                    </dd>
                </div>
                </dl>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Visa
                    </dt>
                    <dd>**** **** **** 4532</dd>
                </div>
                </dl>
            </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
                Updated <time dateTime="2023-11-23">{order?.done}</time>
            </div>
            <Pagination className="ml-auto mr-0 w-auto">
                <PaginationContent>
                <PaginationItem>
                    <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span className="sr-only">Previous Order</span>
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <Button size="icon" variant="outline" className="h-6 w-6">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="sr-only">Next Order</span>
                    </Button>
                </PaginationItem>
                </PaginationContent>
            </Pagination>
            </CardFooter>
        </Card>
    )
}

export default Order;