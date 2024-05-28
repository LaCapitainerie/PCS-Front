import { Prestation } from '@/type/Prestation'
import { ObjectType, ObjectSummary } from './pres_schem'
import { useToast } from '@/components/ui/use-toast'


const props: { [id: string]: ObjectType } = {}
const path = `${process.env.NEXT_PUBLIC_API_URL}/services`
const fetchPath = `/all`
const createPath = `/management`
const updatePath = `/management`
const deletePath = `/management`
interface ObjectDTO { service: Prestation[] }


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

  retour.service.forEach(element => {
    props[element.id] = element;
  });

  return {
    total: props.length,
    props: Object.values(props),
  }
}

export const createData = async (prop: ObjectType) => {

  await fetch(
    `${path}${createPath}`,
    {
      method: "POST",
      body: JSON.stringify(prop),
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