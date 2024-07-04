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
import { Token, UserDTO } from "@/type/User";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import StepperComp from "./stepper";


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
    message: "Entrez un email valide.",
  }),

  password: z.string().min(1, {
    message: "Entrez votre mot de passe.",
  }),

  firstName: z.string().min(1, {
    message: "Entrez votre prénom.",
  }),

  lastName: z.string().min(1, {
    message: "Entrez votre nom.",
  }),

  phoneNumber: z.string().min(1, {
    message: "Entrez votre numéro de téléphone.",
  }),

  type: z.string().min(1, {
    message: "Entrez votre rôle.",
  }),
});

export default function Signup() {

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

    const retour: UserDTO = await (
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

    if(typeof window !== "undefined"){
      window.localStorage.setItem('user', JSON.stringify(retour.user));
      window.location.assign(`/profile?user=${retour.user.id}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-y-hidden w-full h-screen space-y-6">
        <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">

          <div className="h-screen flex items-center justify-center px-8" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            <StepperComp steps={[
              { label: "Information personnelle" },
              // { label: "OTP verification" },
              { label: "Terminé !"}
            ]}>

              <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Créer un compte</h1>
                  <p className="text-balance text-muted-foreground">
                    Entrez vos informations personnelles
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
                          placeholder="mail@example.com"
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
                          contrains="tel"
                        />
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Votre Rôle</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selectionner un rôle" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="traveler">Voyageur</SelectItem>
                              <SelectItem value="lessor">Bailleur</SelectItem>
                              <SelectItem value="provider">Prestataire</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* <InputOTP maxLength={6}>
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
              </InputOTP> */}

              <Button type="submit" className="w-full">
                Créer un compte
              </Button>

            </StepperComp>
          </div>

          <div className="h-screen hidden bg-muted lg:block">
            <img
              src="https://i.imgur.com/ae7ZTV6.png"
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
