import { columns } from "./columns"
import { Housing } from "../customclass";
import { DataTable } from "./data-table"
 
async function getData(): Promise<Housing[]> {
    const data = await (
        await fetch(
            "http://localhost:2000/Housing"
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