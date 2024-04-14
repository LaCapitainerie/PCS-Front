import { Separator } from "./separator";

const Title = ({titre, sous_titre}: {titre:string, sous_titre:string | null | undefined}) => {
    return (
        <>
            <h1 className="w-full h-14 text-[2rem] leading-[3.25rem] px-4 font-semibold">
                {titre}
            </h1>
            <p className="px-4 leading-[3.25rem]">{sous_titre}</p>
            <Separator className="my-2 mb-4" />
        </>
    )
}

export default Title;