import { Property, PropertyDTO } from '@/type/Property'
import { Prop, PropSummary } from './prop_schem'

const props: { [id: string]: Prop } = {}

export const fetchProps = async () => {
  const retour: PropertyDTO = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/property`,
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


export const createProp = async (prop: Prop) => {

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
  } as Property

  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property`,
    {
      method: "POST",
      body: JSON.stringify(propToCreate),
      headers: {
        "Authorization": localStorage.getItem('token') || "",
      },
    }
  )
}

export const readProp = async (id: string) => {
  return props[id]! // TODO: handle undefined
}

export const updateProp = async (id: string, prop: Prop) => {
  props[id] = prop
}

export const deleteProp = async (id: PropSummary) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/property/${(id as any).original.id}`,
    {
      method: "DELETE",
      headers: {
        "Authorization": localStorage.getItem('token') || "",
      },
    }
  ) 
}
