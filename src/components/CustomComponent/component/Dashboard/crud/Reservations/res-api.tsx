import { ObjectType, ObjectSummary } from './res_schem'
import { User } from '@/type/User'
import { Property } from '@/type/Property'
import { Reservation } from '@/type/Reservation'


const props: { [id: string]: ObjectType } = {}
const path = `${process.env.NEXT_PUBLIC_API_URL}/reservation/property`
const fetchPath = `/allreservation`
const createPath = `/`
const updatePath = `/`
const deletePath = `/annulation`
interface ObjectDTO { reservation: Reservation[] }


export const fetchData = async (token:User["token"], propertyID?: Property["id"]) => {

  var retour: ObjectDTO = {reservation: []}
  
  if (propertyID !== undefined && propertyID !== "") {
    const Tmpretour: ObjectDTO = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reservation/property/allreservation/${propertyID}`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            method: 'GET',
        }
      )
    ).json();

    retour = Tmpretour;
  }

  console.log(retour.reservation, propertyID);

  retour.reservation.forEach(element => {
    // Generate a random id
    element.id = Math.random().toString(36).substring(7);
    props[element.id] = element as ObjectType;
  });

  console.log(props.length, Object.values(props) )

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

export const deleteData = async (id: ObjectSummary, token:User["token"]) => {
  const result = await fetch(
    `${path}${deletePath}/${(id as any).original.id}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": token
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
