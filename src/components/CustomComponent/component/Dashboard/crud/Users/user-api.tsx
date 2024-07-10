import { ObjectType, ObjectSummary } from './user_schem'
import { User } from '@/type/User'


const props: { [id: string]: ObjectType } = {}
const path = `${process.env.NEXT_PUBLIC_API_URL}/user`
const fetchPath = `/all`
const createPath = `/register`
const updatePath = `/management`
const deletePath = `/management`
interface ObjectDTO { users: User[] }


export const fetchData = async (token: User["token"]) => {
  const retour: ObjectDTO = await (
    await fetch(
      `${path}${fetchPath}`,
      {
        method: "GET",
        headers: {
          "Authorization": token || "",
        },
      }
    )
  ).json();

  console.log("FETCH", retour);
  

  retour.users.forEach(element => {
    props[element.id] = element as ObjectType;
  });

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

  console.log("UPDATE", data);
  console.log(props, id);
  
  
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
  
  delete props[(id as any).original.id]
}
