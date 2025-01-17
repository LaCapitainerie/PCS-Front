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

  console.log(token, propertyID);
  
  const retour: ObjectDTO = propertyID ? await (
    await fetch(
      `${path}${fetchPath}/${propertyID}`,
      {
          headers: {
              'Authorization': token,
          },
          method: 'GET',
      }
    )
  ).json() : { reservation: [] };

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
  
  delete props[(id as any).original.id]
}
