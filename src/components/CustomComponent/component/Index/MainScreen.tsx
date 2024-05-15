import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Castle, Dog, Home, Tent } from "lucide-react";

export function MainScreen() {
  
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

  return (
    <div className="flex flex-col justify-between gap-4 p-4">
        <div className="flex flex-row justify-between">
            
            <div className="flex flex-row items-center gap-4 text-center text-2xl font-bold">
                <img 
                    alt="logo"
                    className="w-8 h-8 rounded-lg object-cover"
                    src="https://raw.githubusercontent.com/LaCapitainerie/Media-PCS/main/PetitLogo.png?token=GHSAT0AAAAAACOEC4IELBADBQRB77F4DGZKZSFE26Q"
                />
                Paris Caretaker Services
            </div>

            <div className="flex flex-row justify-between items-center gap-4">
                <text className="text-center align-center font-bold">Voyager</text>
                <text className="text-center align-center font-bold">Services</text>
                <text className="text-center align-center font-bold">À propos</text>
                <text className="text-center align-center font-bold">Blog</text>
                <text className="text-center align-center font-bold">Contact</text>
            </div>

            <div className="flex flex-row justify-between gap-4 items-center">
                <Button variant="gooeyRight"><a href="/login">Connexion</a></Button>
                <Button variant="ghost" size="icon" className="overflow-hidden rounded-full">
                    <Avatar>
                        <AvatarImage src={"https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png"} />
                        <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                </Button>
            </div>
        </div>


        <div className="">
            <img
                src={"https://images.pexels.com/photos/454880/pexels-photo-454880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt={"background image"}
                className="w-full object-cover rounded-md"
                style={{maxHeight: '45rem'}}
            />
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
