import { Prestation } from '@/type/Prestation'
import z from 'zod'

export const Schema = z.object({
  
  price: z.number(),
  targetCustomer: z.string(),
  address: z.string(),
  city: z.string(),
  zipCode: z.string(),
  country: z.string(),
  rangeAction: z.number(),
  description: z.string(),

})

// This is the type of the data that will be passed to the form
// & the type of the data that won't be passed to the form
export type ObjectType = z.infer<typeof Schema>

export type ObjectSummary = {
  targetCustomer: Prestation["targetCustomer"];
  address: Prestation["address"];
  city: Prestation["city"];
  price: Prestation["price"];
  rangeAction: Prestation["rangeAction"];
  description: Prestation["description"];
}
