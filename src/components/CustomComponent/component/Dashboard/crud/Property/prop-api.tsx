import { Property } from '@/type/Property'
import { ObjectType, ObjectSummary } from './prop_schem'


const props: { [id: string]: ObjectType } = {}
const path = `${process.env.NEXT_PUBLIC_API_URL}/property`
interface ObjectDTO { Property: Property[] }


export const fetchData = async () => {
  const retour: ObjectDTO = await (
    await fetch(
      `${path}`,
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
    `${path}`,
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
    `${path}/${id}`,
    {
      method: "UPDATE",
      body: JSON.stringify(data),
      headers: {
        "Authorization": localStorage.getItem('token') || "",
      },
    }
  )
}

export const deleteData = async (id: ObjectSummary) => {
  await fetch(
    `${path}/${(id as any).original.id}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem('token') || "",
      },
    }
  ) 
}
