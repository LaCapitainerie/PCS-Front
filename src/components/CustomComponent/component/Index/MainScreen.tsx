import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Castle, Dog, Home, Tent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { User } from "@/type/User";
import { useCookies } from "next-client-cookies";
import { tree } from "next/dist/build/templates/app-page";

export function MainScreen() {

    const cookies = useCookies();

    const Icons = [
        {
            "name": "Cabins",
            "icon": <Home size={24} />,
            "description": "Cozy Cabin around you"
        },
        {
            "name": "Campsite",
            "icon": <Tent size={24} />,
            "description": "Great spots for camping"
        },
        {
            "name": "Entire Home",
            "icon": <Castle size={24} />,
            "description": "Privacy is yours"
        },
        {
            "name": "Pet Friendly",
            "icon": <Dog size={24} />,
            "description": "Take your cuties with yourself"
        }
    ]

    const self = JSON.parse(cookies.get("user") || "{}") as User;
    const default_profile = "https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png";

    console.log("User", self);
    console.log(self.firstName?true:false)

    return (
        <div className="flex flex-col justify-between gap-4 p-4">
            <div className="flex flex-row justify-between">



                <div className="flex flex-row items-center gap-4 text-center text-2xl font-bold">
                    <img
                        alt="logo"
                        className="w-8 h-8 rounded-lg object-cover"
                        src={`${process.env.NEXT_PUBLIC_ICON_URL}`}
                    />
                    Paris Caretaker Services
                </div>

                <div className="flex flex-row justify-between items-center gap-4">
                    <a className="text-center align-center font-bold">Voyager</a>
                    <a className="text-center align-center font-bold">Services</a>
                    <a className="text-center align-center font-bold">À propos</a>
                    <a className="text-center align-center font-bold">Blog</a>
                    <a className="text-center align-center font-bold">Contact</a>
                </div>

                <div className="flex flex-row justify-between gap-4 items-center">
                    {
                        self.firstName ?
                        <Button variant="gooeyRight"><a href={`/${self.type}/dashboard`}>Dashboard</a></Button> :
                        <Button variant="gooeyRight"><a href="/login">Login</a></Button>
                    }
                    <Button variant="ghost" size="icon" className="overflow-hidden rounded-full">
                        <Avatar>
                            <AvatarImage src={self?.avatar || default_profile} alt={self?.firstName || "@icon"} />
                            <AvatarFallback>@Icon</AvatarFallback>
                        </Avatar>
                    </Button>
                </div>
            </div>


            <div className="grid">
                <img
                    src={"https://images.pexels.com/photos/454880/pexels-photo-454880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    alt={"background image"}
                    className="w-full object-cover rounded-md"
                    style={{ maxHeight: '45rem' }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] text-center">
                    <div className="text-6xl font-bold text-white">
                        Trouvez votre prochaine aventure
                    </div>
                    <div className="text-2xl text-white">
                        Découvrez des logements et des expériences uniques
                    </div>
                    <div className="flex flex-row justify-center gap-4 mt-4">
                        <Input placeholder="Rechercher un bien" className="w-1/2" />
                    </div>
                </div>
            </div>


            <div className="flex flex-row justify-around">
                {
                    Icons.map((icon, index) => (
                        <div key={index} className="flex flex-row items-center gap-2">
                            <div className="border rounded-lg p-4 flex flex-row items-center justify-center">
                                {icon.icon}
                            </div>
                            <div className="flex flex-col justify-between">
                                <div className="font-bold text-lg">
                                    {icon.name}
                                </div>
                                <div className="text-muted-foreground text-sm">
                                    {icon.description}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
