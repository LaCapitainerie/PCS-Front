import * as React from "react"
import { CarouselPlugin } from "../MainDashboard/Carroussel";
import { CardDemo } from "../MainDashboard/Description";
import { DescriptionBien } from "../MainDashboard/customclass";



const Biens: DescriptionBien = {
    detail: [
        {
            title: "Nom du bien",
            description: "Description du bien",
            color: "red",
        },
        {
            title: "Nom du bien",
            description: "Description du bien",
            color: "green",
        },
    ],
    prestataire: [
        {
            ID_Prestataire: "1",
            particulier: "Prestataire",
            status: "success",
            Type: "peinture",
            Date: "2021-10-10",
            Heure: "10:00",
            Duree: 2,
            Prix: 20,
        },
        {
            ID_Prestataire: "2",
            particulier: "Prestataire",
            status: "processing",
            Type: "reparation",
            Date: "2021-10-10",
            Heure: "10:00",
            Duree: 2,
            Prix: 20,
        },
    ],
}


const MainContent = () => {
    const style = { "padding-right": "calc(3.5rem + 30%)" } as React.CSSProperties;
    return (

        <div className="fixed flex flex-col left-[calc(3.5rem+30%)] w-full" style={style}>
            <main className="w-full h-full flex flex-col">
                <CarouselPlugin />
                <div className="p-1">
                    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm p-2">
                        <h1 className="w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">Nom du Bien</h1>
                        <div className="flex flex-row justify-around">
                            <CardDemo Desc={Biens} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};


export default MainContent;