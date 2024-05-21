import { Property } from '@/type/Property'
import z from 'zod'

export const propSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required.',
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: 'Name must be at least 2 characters.',
    }),

  type: z
    .enum(['house', 'flat'], {
      required_error: 'Type is required.',
    }),

  price: z
    .number({
      required_error: 'Price is required.',
    })
    .min(0, {
      message: 'Price must be at least 0.',
    }),

  surface: z
    .number({
      required_error: 'Surface is required.',
    })
    .min(0, {
      message: 'Surface must be at least 0.',
    }),

  room: z
    .number({
      required_error: 'Room is required.',
    })
    .min(0, {
      message: 'Room must be at least 0.',
    }),

  bathroom: z
    .number({
      required_error: 'Bathroom is required.',
    })
    .min(0, {
      message: 'Bathroom must be at least 0.',
    }),

  garage: z
    .number({
      required_error: 'Garage is required.',
    })
    .min(0, {
      message: 'Garage must be at least 0.',
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

  images: z.array(z.string()),
})

export type Prop = z.infer<typeof propSchema>

export type PropSummary = {
  id: Property['id']
  name: Property['name']
  type: Property['type']
  price: Property['price']
  surface: Property['surface']
  address: Property['address']
}