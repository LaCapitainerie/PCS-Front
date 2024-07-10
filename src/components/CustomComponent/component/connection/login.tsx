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
  FormField,
} from "@/components/ui/form"
import { UserDTO } from "@/type/User";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  mail: z.string().email({
    message: "Entrez un email valide.",
  }),

  password: z.string().min(1, {
    message: "Entrez votre mot de passe.",
  })
});

export default function Login() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {

    setLoading(true);

    form.reset();

    // Call your API endpoint here

    try {

      const retour: UserDTO = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      if(typeof window !== "undefined"){
        window.localStorage.setItem('user', JSON.stringify(retour.user));
        window.location.assign(`/profile?user=${retour.user.id}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur lors de la connexion",
        description: "Vérifiez votre email et mot de passe",
      })
    } finally {
      setLoading(false);
    }

    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(d => onSubmit(d, setLoading))} className="overflow-y-hidden w-full h-screen space-y-6">
        <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="h-screen flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Connexion</h1>
                <p className="text-balance text-muted-foreground">
                  Entrer votre email et mot de passe pour vous connecter
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
                    <Label htmlFor="password">Mot de passe</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Mot de passe oublié ?
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
                        onChange={field.onChange}
                        defaultValue={field.value}
                      />
                    )}
                  />
                </div>
                <LoadingButton loading={loading} type="submit" className="w-full">
                  Se Connecter
                </LoadingButton>
              </div>
              <div className="mt-4 text-center text-sm">
                Pas de compte ?{" "}
                <Link href="/signup" className="underline">
                  Créer un compte
                </Link>
              </div>
            </div>
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
  );
}