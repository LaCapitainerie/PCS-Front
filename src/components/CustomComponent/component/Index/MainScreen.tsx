import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Castle, Dog, Home, Tent } from "lucide-react";
import { Input } from "@/components/ui/input";

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
                    src="https://media.discordapp.net/attachments/597782659430613002/1240634715304890399/PetitLogo.png?ex=6647469e&is=6645f51e&hm=8c1a9e0ed74f2db3433556609f074423a43db351b808038da01e1a9272ef1cba&=&format=webp&quality=lossless"
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


        <div className="grid">
            <img
                src={"https://images.pexels.com/photos/454880/pexels-photo-454880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt={"background image"}
                className="w-full object-cover rounded-md"
                style={{maxHeight: '45rem'}}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[40%] text-center">
                <div className="text-6xl font-bold text-white">
                    Trouvez votre prochaine aventure
                </div>
                <div className="text-2xl text-white">
                    Découvrez des logements et des expériences uniques
                </div>
                <div className="flex flex-row justify-center gap-4 mt-4">
                    <Input placeholder="Rechercher un bien" className="w-1/2"/>
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