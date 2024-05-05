import { Prestation } from "@/type/Prestation";
import { columns } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Prestation[]> {
    const data = await (
        await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/prestations`
        )
    ).json();

  return data
}
 
export default async function PrestationTable() {
  const data = await getData()
 
  return (
    <div className="mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}