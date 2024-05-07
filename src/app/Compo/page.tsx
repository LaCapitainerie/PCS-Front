import { Embed } from "@/components/CustomComponent/component/Message/Embed";
import { Command } from "@/type/Command";
import { Issue } from "@/type/Issue";


export default function Admin() {
    const command = {
        products: "products",
        description: "description",
        date: "date"
    } as Command;

    const issue = {
        id: "3b97b",
        idclient: "idclient",
        description: "description du problème",
        created: "2024-05-07",
        status: "open"
    } as Issue;

    return (
        <>
            <Embed Type={"Issue"} EmbedType={issue}/>
            <Embed Type={"Command"} EmbedType={command}/>
        </>
    );
}
