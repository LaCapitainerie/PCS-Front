"use client"

import * as React from "react"
import Upperband from "./Upperband";
import Lowerband from "./Lowerband";
import { User } from "@/type/User";
import { Separator } from "@/components/ui/separator";

const MainContent = () => {

    const u = {
        "id": "f3b2507f-3021-4f8e-836b-c15c5ee3a5a8",
        "username": "LaCapitainerie",
        "nom": "Antreassian",
        "prenom": "Hugo",
        "email": "Hugo.Antreassian@gmail.com",
        "type": "Admin",
        "avatar": "https://github.com/LaCapitainerie.png",
        "description": "C'est moi qui gère tout ça !",
        "joined": "2019-01-01",
        "phone": "06065644800"
      } as User

    return (
        <div className="flex flex-col w-full h-full overflow-hidden" style={{paddingLeft: '3.5rem'}}>
            <Upperband User={u} style={{height: '33%'}}/>
            <Separator/>
            <Lowerband User={u} style={{height: '66%'}}/>
        </div>
        
    )
};


export default MainContent;