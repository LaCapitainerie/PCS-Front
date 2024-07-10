import { Prestation } from '@/type/Prestation'
import { ObjectType, ObjectSummary } from './pres_schem'
import { User } from '@/type/User'
import { Service } from '@/type/Service'
import { toast } from '@/components/ui/use-toast'


const props: { [id: string]: ObjectType } = {}
const path = `${process.env.NEXT_PUBLIC_API_URL}/service`
const fetchPath = `/all`
const createPath = `/management`
const updatePath = `/management`
const deletePath = `/management`
interface ObjectDTO { service: Service[] }


export const fetchData = async (token: User["token"]) => {

  try {
    const retour: ObjectDTO = await (
      await fetch(
        `${path}${fetchPath}`,
        {
          method: "GET",
          headers: {
            "Authorization": token || "not found",
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
  } catch (error) {
    console.error('Error:', error);
    toast({
      title: "Erreur lors de la requête",
      description: "Veuillez réessayer plus tard",
    })
    return {
      total: 0,
      props: []
    }
  }
}

export const createData = async (prop: ObjectType, token: User["token"]) => {

  await fetch(
    `${path}${createPath}`,
    {
      method: "POST",
      body: JSON.stringify(prop),
      headers: {
        "Authorization": token || "",
      },
    }
  )
}

export const readData = async (id: string) => {
  return props[id]! // TODO: handle undefined
}

export const updateData = async (id: string, data: ObjectType, token: User["token"]) => {
  props[id] = data
  
  await fetch(
    `${path}${updatePath}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Authorization": token || "",
      },
    }
  )
}

export const use_deleteData = async (id: ObjectSummary, token: User["token"]) => {
  const result = await fetch(
    `${path}${deletePath}/${(id as any).original.id}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": token || "",
      },
    }
  )

  if (result.status !== 200) {
    throw new Error("Failed to delete")
  }

  // const { toast } = useToast()

  // toast({
  //   title: "Deleted",
  //   description: (
  //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //       <code className="text-white">{JSON.stringify(id, null, 2)}</code>
  //     </pre>
  //   ),
  // });

  
  delete props[(id as any).original.id]
}
