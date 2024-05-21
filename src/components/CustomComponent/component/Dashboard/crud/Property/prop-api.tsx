import { Property, PropertyDTO } from '@/type/Property'
import { Prop } from './prop_schem'

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
    props: Object.values(props).map((prop, id) => (
      { 
        id: prop.id,
        name: prop.name,
        type: prop.type,
        description: prop.description,
        address: prop.address,
        images: prop.images,
      }
    )),
  }
}


export const createProp = async (prop: Prop) => {

  const propToCreate = {
    name: prop.name,
    type: prop.type,
    description: prop.description,
    address: prop.address,
    images: prop.images,

    lessorId: "1",
    
    administrationvalidation: true,
    city: "Paris",
    country: "France",
    garage: 0,
    position: {latitute: 0, longitude: 0},
    price: 0,
    room: 0,
    surface: 0,
    zipcode: "75000",
  } as Property

  console.log("Creating :", prop as Property);
  

  const retour: PropertyDTO = await (
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/property`,
      {
        method: "POST",
        body: JSON.stringify(prop as Property),
        headers: {
          "Authorization": localStorage.getItem('token') || "",
        },
      }
    )
  ).json();

  await sleep(1000)
  if (Object.values(props).find((u) => u.name === prop.name)) {
    throw new Error('Propname already exists')
  }

  console.log("Added :", retour.Property);
  
  props[prop.id] = prop
}

export const readProp = async (id: string) => {
  await sleep(500)
  return props[id]! // TODO: handle undefined
}

export const updateProp = async (id: string, prop: Prop) => {
  await sleep(1000)
  props[id] = prop
}

export const deleteProp = async (id: string) => {
  await sleep(1000)
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}