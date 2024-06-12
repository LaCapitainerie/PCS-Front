import { ReservationDTO } from '@/type/Reservation'
import { ObjectType, ObjectSummary } from './res_schem'
import { User } from '@/type/User'
import { Property } from '@/type/Property'


const props: { [id: string]: ObjectType } = {}
const path = `${process.env.NEXT_PUBLIC_API_URL}/reservation/property`
const fetchPath = `/allreservation`
const createPath = `/`
const updatePath = `/`
const deletePath = `/annulation`
interface ObjectDTO { reservation: ReservationDTO[]; }


export const fetchData = async (propertyID?: Property["id"]) => {
  const retour: ObjectDTO = await (
    await fetch(
      `${path}${fetchPath}/${propertyID}`,
      {
        method: "GET",
        headers: {
          "Authorization": (JSON.parse(localStorage.getItem("user") as string) as User).token!,
        },
      }
    )
  ).json();

  console.log("FETCH", retour);
  

  retour.reservation.forEach(element => {
    //props[element.id] = element as ObjectType;
  });

  return {
    total: props.length,
    props: Object.values(props),
  }
}

export const createData = async (prop: ObjectType, token?: User["token"]) => {

  await fetch(
    `${path}${createPath}`,
    {
      method: "POST",
      body: JSON.stringify(prop),
      headers: {
        "Authorization": (JSON.parse(localStorage.getItem("user") as string) as User).token!,
      },
    }
  )
}

export const readData = async (id: string) => {
  return props[id]! // TODO: handle undefined
}

export const updateData = async (id: string, data: ObjectType, token?: User["token"]) => {  

  props[id] = data

  console.log("UPDATE", data);
  console.log(props, id);
  
  
  await fetch(
    `${path}${updatePath}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Authorization": (JSON.parse(localStorage.getItem("user") as string) as User).token!,
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
        "Authorization": (JSON.parse(localStorage.getItem("user") as string) as User).token!,
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
