import { User } from '@/type/User'
import z from 'zod'

// Create a zod object from the type
// This is used to validate the data that will be passed to the form

export const Schema = z.object({
  id: z.string(),
  type: z.enum(["traveler", "provider", "lessor", "admin"]),
  mail: z.string(),
  password: z.string(),
  registerdate: z.string(),
  lastConnectionDate: z.string(),
  avatar: z.string(),
  description: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  nickname: z.string(),
  phoneNumber: z.string(),
  token: z.string(),
});



// This is the type of the data that will be passed to the form
// & the type of the data that won't be passed to the form
export type ObjectType = z.infer<typeof Schema> & {
};

export type ObjectSummary = {
  id: User["id"];
  type: User["type"];
  mail: User["mail"];
  password: User["password"];
  registerdate: User["registerdate"];
  lastConnectionDate: User["lastConnectionDate"];
  avatar: User["avatar"];
  description: User["description"];
  firstName: User["firstName"];
  lastName: User["lastName"];
  nickname: User["nickname"];
  phoneNumber: User["phoneNumber"];
  token: User["token"];
};
