import { PropertyDTO } from '@/type/Property'
import { Prop } from './prop_schem'

const props: Prop[] = [{
  name: 'Appartement 1',
  type: "flat",
  price: 1000,
  surface: 100,
  room: 3,
  description: 'description',
  address: 'address',
  bathroom: 0,
  garage: 0,
  images: [],
}]

export const fetchProps = async () => {

  console.log("token", localStorage.getItem('token'), "url", `${process.env.NEXT_PUBLIC_API_URL}/property`);
  
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

  const props = retour.Property


  return {
    total: props.length,
    props: props.map((prop, id) => (
      { id,
        name: prop.name,
        type: prop.type,
        price: prop.price,
        surface: prop.surface,
        room: prop.room,
        description: prop.description,
        address: prop.address,
        city: prop.city,
        zip_code: prop.zipcode,
        bathroom: prop.bathroom,
        garage: prop.garage,
        position: prop.position,
        images: prop.images,
        country: prop.country,
        administration_validation: prop.administrationvalidation,
        user_id: prop.userid
      }
    )),
  }
}


export const createProp = async (prop: Prop) => {

  await sleep(1000)
  if (props.find((u) => u.name === prop.name)) {
    throw new Error('Propname already exists')
  }
  props.push(prop)
}

export const readProp = async (id: number) => {
  await sleep(500)
  return props[id]! // TODO: handle undefined
}

export const updateProp = async (id: number, prop: Prop) => {
  await sleep(1000)
  props[id] = prop
}

export const deleteProp = async (id: number) => {
  await sleep(1000)
  props.splice(id, 1)
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}