"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// {
//   "type": "provider",
//   "mail": "thomas.poupard@outlook.com",
//   "password": "ElThomas123!",
//   "firstName": "Thomas",
//   "lastName": "Poupard",
//   "phoneNumber": "0623456789"
// }

const FormSchema = z.object({

  mail: z.string({
    required_error: "Please enter your email.",
    message: "Please enter a valid email.",
  }),

  password: z.string({
    required_error: "Please enter your password.",
  }),

  firstName: z.string({
    required_error: "Please enter your first name.",
  }),

  lastName: z.string({
    required_error: "Please enter your last name.",
  }),

  phoneNumber: z.string({
    required_error: "Please enter your phone number.",
  }),

  type: z
    .string({
      required_error: "Please select a role.",
    })

    .refine((value) => {
      return ["Traveler", "Lessor", "Provider", "Admin"].includes(value)
    }),
})

export default function Signup() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <div className="h-full w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Sign up</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <FormField
                    control={form.control}
                    name="mail"
                    render={({ field }) => (
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    )}
                  />

                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <Input
                        id="password"
                        type="password"
                        placeholder="*****"
                        required
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        required
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="doe"
                        required
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <Input
                        id="phoneNumber"
                        type="text"
                        placeholder="0623456789"
                        required
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rôle</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a rôle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Traveler">Traveler</SelectItem>
                            <SelectItem value="Lessor">Lessor</SelectItem>
                            <SelectItem value="Provider">Provider</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          You can manage email addresses in your{" "}
                          <Link href="/examples/forms">email settings</Link>.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden bg-muted lg:block">
            <img
              src="https://media.discordapp.net/attachments/597782659430613002/1240054056442007552/sciana-za-lozkiem-20-pomyslow-do-sypialni-piekne-inspiracje-5.webp?ex=664529d6&is=6643d856&hm=785cf56fa6238725f80eab7c159ab8f3d29f04c51b5ff0811d1fc6e683f9ff93&=&format=webp"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
