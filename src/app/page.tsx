"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// {
//   "type": "provider",
//   "mail": "thomas.poupard@outlook.com",
//   "password": "ElThomas123!",
//   "firstName": "Thomas",
//   "lastName": "Poupard",
//   "phoneNumber": "0623456789"
// }


function Signup(){
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Inscription</CardTitle>
        <CardDescription>Création de votre compte</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-row justify-between gap-4">
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label htmlFor="firstName">Firstname</Label>
                <Input type="text" name="firstName" placeholder="Prénom" contrains="text"/>
              </div>
              <div className="flex flex-col space-y-1.5 w-1/2">
                <Label htmlFor="lastName">Lastname</Label>
                <Input type="text" name="lastName" placeholder="Nom" contrains="text"/>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mail">Email</Label>
              <Input type="email" name="mail" placeholder="Email" contrains="email"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" placeholder="Password"/>
            </div>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="traveler">Traveler</SelectItem>
                <SelectItem value="lessor">Lessor</SelectItem>
                <SelectItem value="provider">Provider</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">S'inscrire</Button>
      </CardFooter>
    </Card>
  )
}

function LoginCard({title, description, button}: {title:string, description:string, button:string}) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" placeholder="Email"/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" placeholder="Password"/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{button}</Button>
      </CardFooter>
    </Card>
  )
}

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
    <Tabs defaultValue="signup" className="xl:col-span-2">
        <TabsList className="w-full justify-around">
          <TabsTrigger value={"signup"} key={0}>{"S'inscrire"}</TabsTrigger>
          <TabsTrigger value={"login"} key={1}>{"Se connecter"}</TabsTrigger>
        </TabsList>
        <TabsContent value={"signup"} key={0}>
          <Signup/>
        </TabsContent>
        <TabsContent value={"login"} key={1}>
          <LoginCard title={"Connection"} description={"Connectez vous à votre compte"} button={"Se Connecter"}/>
        </TabsContent>
      </Tabs>
    
    </div>
  )
}
