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
import { User, UserDTO, UserReturnDTO } from "@/type/User";

import { useCookies } from 'next-client-cookies';
import StepperVariants from "./stepper";
import StepperComp from "./stepper";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";


// {
//   "type": "provider",
//   "mail": "thomas.poupard@outlook.com",
//   "password": "ElThomas123!",
//   "firstName": "Thomas",
//   "lastName": "Poupard",
//   "phoneNumber": "0623456789"
// }

const FormSchema = z.object({
  mail: z.string().email({
    message: "Please enter a valid email.",
  }),

  password: z.string().min(1, {
    message: "Please enter your password.",
  }),

  firstName: z.string().min(1, {
    message: "Please enter your first name.",
  }),

  lastName: z.string().min(1, {
    message: "Please enter your last name.",
  }),

  phoneNumber: z.string().min(1, {
    message: "Please enter your phone number.",
  }),

  type: z.string().min(1, {
    message: "Please enter your type.",
  }),
});

export default function Signup() {

  const cookies = useCookies();
  const currentUser = cookies.get("user");

  if (currentUser) {
    window.location.assign(`${JSON.parse(currentUser).type}/dashboard`);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })

    form.reset()

    // Call your API endpoint here    

    const retour: UserReturnDTO = await (
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).json();

    cookies.set('user', JSON.stringify(retour.user), {
      path: '/',
    });

    cookies.set('token', JSON.stringify(retour.user.token), {
      path: '/',
    });

    // Go to the dashboard
    window.location.assign(`${retour.user.type}/dashboard`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-y-hidden w-full h-screen space-y-6">
        <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">

          <div className="h-screen flex items-center justify-center px-8" style={{ paddingTop: '9rem', paddingBottom: '9rem' }}>
            <StepperComp steps={[{ label: "Personnal Information" }, { label: "OTP verification" }, { label: "Finish !"}]}>

              <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Sign up</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mail">Email</Label>
                    <FormField
                      control={form.control}
                      name="mail"
                      render={({ field }) => (
                        <Input
                          id="mail"
                          type="email"
                          placeholder="m@example.com"
                          required
                          onChange={field.onChange}
                          defaultValue={field.value}
                        />
                      )}
                    />

                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
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
                          onChange={field.onChange}
                          defaultValue={field.value}
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
                          onChange={field.onChange}
                          defaultValue={field.value}
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
                          onChange={field.onChange}
                          defaultValue={field.value}
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
                          onChange={field.onChange}
                          defaultValue={field.value}
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
                              <SelectItem value="traveler">Traveler</SelectItem>
                              <SelectItem value="lessor">Lessor</SelectItem>
                              <SelectItem value="provider">Provider</SelectItem>
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
                </div>
              </div>

              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button type="submit" className="w-full">
                Sign up
              </Button>

            </StepperComp>
          </div>

          <div className="h-screen hidden bg-muted lg:block">
            <img
              src="https://imgur.com/a/Q8ho4k3.png"
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
