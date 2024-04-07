import { Housing, columns } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Housing[]> {
    const data = await (
        await fetch(
            "http://localhost:2000/Housing"
        )
    ).json();

  return data
}
 
export default async function DemoPage() {
  const data = await getData()
 
  return (
    <div className="mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}