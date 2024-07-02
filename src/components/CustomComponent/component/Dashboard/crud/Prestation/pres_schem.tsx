import { Prestation } from '@/type/Prestation'
import z from 'zod'

export const Schema = z.object({
  
  price: z.coerce.string(),
  targetCustomer: z.enum(["traveler", "lessor"]),
  address: z.string(),
  city: z.string(),
  zipCode: z.string(),
  country: z.string(),
  
  rangeAction: z.coerce.string(),
  description: z.string().min(10, "The description must be at least 10 characters long")

})

// This is the type of the data that will be passed to the form
// & the type of the data that won't be passed to the form
export type ObjectType = z.infer<typeof Schema> & {
  id: Prestation["id"];
}

export type ObjectSummary = {
  id: Prestation["id"];
  targetCustomer: Prestation["targetCustomer"];
  address: Prestation["address"];
  city: Prestation["city"];
  price: Prestation["price"];
  rangeAction: Prestation["rangeAction"];
  description: Prestation["description"];
}
