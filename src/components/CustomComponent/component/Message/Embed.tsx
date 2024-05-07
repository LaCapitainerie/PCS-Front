import { Separator } from "@/components/ui/separator";
import { Command } from "@/type/Command";
import { Issue } from "@/type/Issue";
import { Cable, CircleDot, Drill, Fence, Heater, KeyRound, Paintbrush2 } from "lucide-react";
import { Prestation } from "@/type/Prestation";


export function typeToDom(type: string = "", status: Prestation["status"]) {
    switch (type) {
      case "chauffage":
        return <Heater className={`h-5 w-5 text-grey-500`} />
      case "electricite":
        return <Cable className={`h-5 w-5 text-grey-500`} />
      case "jardinage":
        return <Fence className={`h-5 w-5 text-grey-500`} />
      case "peinture":
        return <Paintbrush2 className={`h-5 w-5 text-grey-500`} />
      case "reparation":
        return <Drill className={`h-5 w-5 text-grey-500`} />
      case "conciergerie":
        return <KeyRound className={`h-5 w-5 text-grey-500`} />
    }
}

interface EmbedProps {
    Type: "Command" | "Issue";
    EmbedType: Command | Issue;
}



export const Embed = ( Embed : EmbedProps) => {

    switch (Embed.Type.toLocaleLowerCase()) {
        case "command":
            const EmbedCommand = Embed.EmbedType as Command;
            console.log(EmbedCommand);
            
            return (
                <div style={{maxWidth: '50%'}} className="border rounded-md flex flex-col justify-between w-fit min-w-40 min-h-40 m-4">
                    <div className="h-max">
                        <div className="mt-4 mx-4 uppercase font-bold flex flex-row gap-4">
                            {typeToDom(EmbedCommand.products.toLocaleLowerCase(), EmbedCommand.status)}
                            {EmbedCommand.products}
                        </div>
                        <Separator className="mt-4"/>
                    </div>
                    
                    <div className="h-4/6">
                        <div className="m-2 mx-4">{EmbedCommand.description}</div>
                    </div>
                    
                    <div className="h-max">
                        <Separator className="mb-4"/>
                        <div className="m-2 mx-4 text-xs text-right">{EmbedCommand.date}</div>
                    </div>
                </div>
            )

        case "issue":
            const EmbedIssue = Embed.EmbedType as Issue;
            return (
                <div style={{maxWidth: '50%'}} className="border rounded-md flex flex-col justify-between w-fit min-w-40 min-h-40 m-4">
                    <div className="h-max">
                        <div className="mt-4 mx-4 uppercase font-bold flex flex-row gap-4">
                            <CircleDot color={EmbedIssue.status == "open"?"#238636":"#237A84"}/>
                            Issue #{EmbedIssue.id.slice(0, 5)}
                        </div>
                        <Separator className="mt-4"/>
                    </div>
                    
                    <div className="h-4/6">
                        <div className="m-2 mx-4">{EmbedIssue.description}</div>
                    </div>
                    
                    <div className="h-max">
                        <Separator className="mb-4"/>
                        <div className="m-2 mx-4 text-xs text-right">{EmbedIssue.idclient} - {EmbedIssue.created}</div>
                    </div>
                </div>
            )
    }

};