import { Service } from '@/type/Service'
import z from 'zod'

export const Schema = z.object({

  name: z.string().min(3, "The name must be at least 3 characters long"),

  type: z.enum(["transport", "nettoyage", "chauffage", "electricite", "jardinage", "peinture", "reparation", "conciergerie"]),
  
  targetCustomer: z.enum(["traveler", "lessor"]),
  price: z.coerce.number(),
  address: z.string(),
  city: z.string(),
  zipCode: z.string(),
  country: z.string(),
  
  rangeAction: z.coerce.number(),
  description: z.string().min(10, "The description must be at least 10 characters long")

})

// This is the type of the data that will be passed to the form
// & the type of the data that won't be passed to the form
export type ObjectType = z.infer<typeof Schema> & {
  id: Service["id"];
}

export type ObjectSummary = {
  id: Service["id"];
  type: Service["type"];
  targetCustomer: Service["targetCustomer"];
  address: Service["address"];
  city: Service["city"];
  price: Service["price"];
  rangeAction: Service["rangeAction"];
  description: Service["description"];
}
