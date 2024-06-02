import { Property } from '@/type/Property'
import z from 'zod'

export const Schema = z.object({
  name: z
    .string({
      required_error: 'Name is required.',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    }),

  type: z
    .enum(['Maison', 'Appartement'], {
      required_error: 'Type is required.',
    }),

  description: z
    .string({
      required_error: 'Description is required.',
    })
    .min(10, {
      message: 'Description must be at least 10 characters.',
    }),

  address: z
    .string({
      required_error: 'Address is required.',
    })
    .min(10, {
      message: 'Address must be at least 10 characters.',
    }),

  price: z
    .number({
      required_error: 'Price is required.',
    })
    .min(1, {
      message: 'Price must be at least 1.',
    }),

  surface: z
    .number({
      required_error: 'Surface is required.',
    })
    .min(1, {
      message: 'Surface must be at least 1.',
    }),

  room: z
    .number({
      required_error: 'Room is required.',
    })
    .min(1, {
      message: 'Room must be at least 1.',
    }),

  bathroom: z
    .number({
      required_error: 'Bathroom is required.',
    })
    .min(1, {
      message: 'Bathroom must be at least 1.',
    }),

  garage: z
    .number({
      required_error: 'Garage is required.',
    })
    .min(1, {
      message: 'Garage must be at least 1.',
    }),

  urls: z
    .array(
      z.object({
        url: z.string(),
      })
    )
    .describe("Urls to the images")
})

// This is the type of the data that will be passed to the form
// & the type of the data that won't be passed to the form
export type ObjectType = z.infer<typeof Schema> & {
  id: Property['id']
  price: Property['price']
  surface: Property['surface']
  room: Property['room']
  bathroom: Property['bathroom']
  garage: Property['garage']
  urls?: {url: string}[] | undefined
  images: Property['images']
};

export type ObjectSummary = {
  id: Property['id']
  name: Property['name']
  type: Property["type"]
  description: Property["description"]
  address: Property["address"]
  price: Property['price']
  surface: Property['surface']
  images: Property['images']
}
