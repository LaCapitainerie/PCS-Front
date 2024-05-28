import { Property } from '@/type/Property'
import { ObjectType, ObjectSummary } from './prop_schem'
import { useToast } from '@/components/ui/use-toast'


const props: { [id: string]: ObjectType } = {}
const path = `${process.env.NEXT_PUBLIC_API_URL}/property`
const fetchPath = ``
const createPath = ``
const updatePath = ``
const deletePath = ``
interface ObjectDTO { Property: Property[] }


export const fetchData = async () => {
  const retour: ObjectDTO = await (
    await fetch(
      `${path}${fetchPath}`,
      {
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem('token') || "",
        },
      }
    )
  ).json();  

  retour.Property.forEach(element => {
    props[element.id] = element;
  });

  return {
    total: props.length,
    props: Object.values(props),
  }
}

export const createData = async (prop: ObjectType) => {

  const propToCreate = {
    name: prop.name,
    type: prop.type,
    price: 120,
    surface: 200,
    room: 1,
    bathroom: 1,
    garage: 1,
    description: prop.description,
    address: prop.address,
    city: "Paris",
    zipCode: "75000",
    position: {latitute: 0, longitude: 0},
    images: prop.images,
    country: "France",
    administrationValidation: true,
    userId: localStorage.getItem("user"),
  }

  await fetch(
    `${path}${createPath}`,
    {
      method: "POST",
      body: JSON.stringify(propToCreate),
      headers: {
        "Authorization": localStorage.getItem('token') || "",
      },
    }
  )
}

export const readData = async (id: string) => {
  return props[id]! // TODO: handle undefined
}

export const updateData = async (id: string, data: ObjectType) => {
  props[id] = data

  console.log("UPDATE", data);
  console.log(props, id);
  
  
  await fetch(
    `${path}${updatePath}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Authorization": localStorage.getItem('token') || "",
      },
    }
  )
}

export const deleteData = async (id: ObjectSummary) => {
  const result = await fetch(
    `${path}${deletePath}/${(id as any).original.id}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem('token') || "",
      },
    }
  )

  if (result.status !== 200) {
    throw new Error("Failed to delete")
  }

  const { toast } = useToast()

  toast({
    title: "Deleted",
    description: (
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(id, null, 2)}</code>
      </pre>
    ),
  });

  
  delete props[(id as any).original.id]
}
