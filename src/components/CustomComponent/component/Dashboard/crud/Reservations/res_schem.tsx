import { User } from '@/type/User'
import z from 'zod'

// Create a zod object from the type
// This is used to validate the data that will be passed to the form

export const Schema = z.object({
  address: z.string(),
  city: z.string(),
  country: z.string(),
  description: z.string(),
  id: z.string(),
  idStripe: z.string(),
  lat: z.number(),
  lon: z.number(),
  name: z.string(),
  price: z.number(),
  providerId: z.string(),
  rangeAction: z.number(),
  targetCustomer: z.string(),
  zipCode: z.string(),
});



// This is the type of the data that will be passed to the form
// & the type of the data that won't be passed to the form
export type ObjectType = z.infer<typeof Schema> & {
};

export type ObjectSummary = {
  id: User["id"];
  name: ObjectType["name"];
  targetCustomer: ObjectType["targetCustomer"];
  address: ObjectType["address"];
  city: ObjectType["city"];
  price: ObjectType["price"];
};
