import { Separator } from "@/components/ui/separator";
import { Command } from "@/type/Command";
import { Issue } from "@/type/Issue";
import { CircleDot } from "lucide-react";

interface EmbedProps {
    Type: "Command" | "Issue";
    EmbedType: Command | Issue;
}

export const Embed = ( Embed : EmbedProps) => {
   

    switch (Embed.Type) {
        case "Command":
            const EmbedCommand = Embed.EmbedType as Command;
            return (
                <div className="border rounded-md flex flex-col justify-between w-fit min-w-40 min-h-40 m-4">
                    <div className="h-max">
                        <div className="mt-4 mx-4 uppercase font-bold">{EmbedCommand.products}</div>
                        <Separator className="mt-4"/>
                    </div>
                    
                    <div className="h-4/6">
                        <div className="m-2 mx-4">{EmbedCommand.description}</div>
                    </div>
                    
                    <div className="h-max">
                        <Separator className="mt-4"/>
                        <div className="m-2 mx-4 text-xs text-right">{EmbedCommand.date}</div>
                    </div>
                </div>
            )

        case "Issue":
            const EmbedIssue = Embed.EmbedType as Issue;
            return (
                <div className="border rounded-md flex flex-col justify-between w-fit min-w-40 min-h-40 m-4">
                    <div className="h-max">
                        <div className="mt-4 mx-4 uppercase font-bold flex flex-row gap-4"><CircleDot color={EmbedIssue.status == "open"?"#238636":"#237A84"}/>Issue #{EmbedIssue.id.slice(0, 5)}</div>
                        <Separator className="mt-4"/>
                    </div>
                    
                    <div className="h-4/6">
                        <div className="m-2 mx-4">{EmbedIssue.description}</div>
                    </div>
                    
                    <div className="h-max">
                        <Separator className="mt-4"/>
                        <div className="m-2 mx-4 text-xs text-right">{EmbedIssue.idclient} - {EmbedIssue.created}</div>
                    </div>
                </div>
            )
    }

};