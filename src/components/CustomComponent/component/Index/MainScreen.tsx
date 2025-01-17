import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import * as React from "react"
import { Castle, Dog, Home, Tent } from "lucide-react";
import { Input } from "@/components/ui/input";
import { User } from "@/type/User";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder";

export function MainScreen({ self }: { self: User }) {

    const Icons = [
        {
            "name": "Auberges",
            "icon": <Home size={24} />,
            "description": "Pour des échanges chaleureux"
        },
        {
            "name": "Camping",
            "icon": <Tent size={24} />,
            "description": "Pour des nuits à la belle étoile"
        },
        {
            "name": "Maisons",
            "icon": <Castle size={24} />,
            "description": "Votre vie privée vous appartient"
        },
        {
            "name": "Avec animaux de compagnie",
            "icon": <Dog size={24} />,
            "description": "Prenez vos amis poilus avec vous"
        }
    ]

    const default_profile = "https://i.imgur.com/y4N10Rt.png";

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

                <div className="flex flex-row justify-between gap-4 items-center">
                    <Button variant="gooeyRight"><a href={self.firstName ? `/${self.type}/dashboard` : "/login"}>Connexion</a></Button>
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
                    
                        <PlaceholdersAndVanishInput placeholders={
                            [
                                "Appartement Cosy au Centre-Ville",
                                "Évasion en Bord de Mer avec Vue sur l'Océan",
                                "Cabane Rustique dans les Bois",
                                "Loft Moderne avec Vue sur la Ville",
                                "Maison Familiale en plein Cœur de la Nature",
                            ]
                        } onChange={() => {}} onSubmit={() => {}}/>
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
