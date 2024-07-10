import { Property } from '@/type/Property'
import { ObjectType, ObjectSummary } from './prop_schem'
import { User } from '@/type/User'


const props: { [id: string]: ObjectType } = {}
const path = `${process.env.NEXT_PUBLIC_API_URL}/property`
const fetchPath = ``
const createPath = ``
const updatePath = ``
const deletePath = ``
interface ObjectDTO { Property: Property[] }


export const fetchData = async (token: User["token"]) => {
  const retour: ObjectDTO = await (
    await fetch(
      `${path}`,
      {
        method: "GET",
        headers: {
          "Authorization": token || "",
        },
      }
    )
  ).json();

  retour?.Property.forEach(element => {
    props[element.id] = {
      ...element,
      images: element.images.map((image) => { return { url: image } }),
    } as ObjectType;
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
  
  const finalData = {
    ...data,
    images: data.images.map((image) => image.url),
  }
  
  props[id] = data

  console.log("UPDATE", data);
  console.log(props, id);
  
  
  await fetch(
    `${path}${updatePath}/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(finalData),
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
