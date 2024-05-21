import { Property } from '@/type/Property'
import z from 'zod'

export const propSchema = z.object({
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

  images: z.array(z.string()),
})

export type Prop = z.infer<typeof propSchema> & { id: Property['id']};

export type PropSummary = {
  id: Property['id']
  name: Property['name']
  type: Property["type"]
  description: Property["description"]
  address: Property["address"]
  images: Property["images"]
}