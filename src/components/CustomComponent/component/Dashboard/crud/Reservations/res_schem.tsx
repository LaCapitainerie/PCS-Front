import { Reservation } from '@/type/Reservation';
import { User } from '@/type/User'
import z from 'zod'

// Create a zod object from the type
// This is used to validate the data that will be passed to the form
// & the data that will be passed to the form

export const Schema = z.object({

  id: z.string(),

  travelerId: z.string(),
  propertyId: z.string(),
  beginDate: z.string(),
  endDate: z.string(),
  annulation: z.boolean(),

  bill: z.object({
    id: z.string(),
    price: z.number(),
    date: z.string(),
    statut: z.string(),
    content: z.string(),
  }),

  service: z.array(z.object({
    id: z.string(),
    idStripe: z.string(),
    name: z.string(),
    price: z.number(),
    targetCustomer: z.string(),
    address: z.string(),
    city: z.string(),
    zipCode: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    rangeAction: z.number(),
    description: z.string(),
    providerId: z.string(),
  })),
})



// This is the type of the data that will be passed to the form
// & the type of the data that won't be passed to the form
export type ObjectType = z.infer<typeof Schema> & {
};

export type ObjectSummary = {
  id: ObjectType["id"];
  travelerId: ObjectType["travelerId"];
  propertyId: ObjectType["propertyId"];
  beginDate: ObjectType["beginDate"];
  endDate: ObjectType["endDate"];
  annulation: ObjectType["annulation"];
  bill: ObjectType["bill"];
  service: ObjectType["service"];
};
