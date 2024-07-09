"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormField} from "@/components/ui/form"
import { User, UserDTO } from "@/type/User";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";


const FormSchema = z.object({
    avatar: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    nickname: z.string(),
    mail: z.string(),
    phoneNumber: z.string(),
});


export default function EditForm({user, token}: {user: User, token: User["token"]}) {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

	const [loading, setLoading] = useState(false);

    async function onSubmit(data: z.infer<typeof FormSchema>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {

        setLoading(true);

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })

        form.reset()

        const retour: UserDTO = await (
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/management/${user.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                }
            )
        ).json();

        setLoading(false);

        user = retour.user;

        if(typeof window !== 'undefined') {
            localStorage.setItem("user", JSON.stringify(user));
            location.reload();
        }


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((d) => onSubmit(d, setLoading))} className="overflow-y-hidden w-full space-y-6">

                <div className="flex flex-col items-center justify-center px-8 gap-4">

                    <div className="mx-auto grid gap-6">
                        <div className="grid gap-4">
                            <Label htmlFor="avatar">Avatar</Label>
                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
                                    <Input
                                        id="avatar"
                                        type="text"
                                        placeholder="https://www.example.com/avatar.jpg"
                                        required
                                        onChange={field.onChange}
                                        defaultValue={user.avatar}
                                    />
                                )}
                            />

                            <Label htmlFor="Firstname">
                                Prénom
                            </Label>
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
                                        defaultValue={user.firstName}
                                        contrains="text"
                                    />
                                )}
                            />

                            <Label htmlFor="Lastname">
                                Nom de famille
                            </Label>
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
                                        defaultValue={user.lastName}
                                        contrains="text"
                                    />
                                )}
                            />

                            <Label htmlFor="Nickname">
                                Pseudo
                            </Label>
                            <FormField
                                control={form.control}
                                name="nickname"
                                render={({ field }) => (
                                    <Input
                                        id="nickname"
                                        type="text"
                                        placeholder="johndoe"
                                        required
                                        onChange={field.onChange}
                                        defaultValue={user.nickname}
                                        contrains="text"
                                    />
                                )}
                            />

                            <Label htmlFor="Mail">
                                Mail
                            </Label>
                            <FormField
                                control={form.control}
                                name="mail"
                                render={({ field }) => (
                                    <Input
                                        id="mail"
                                        type="text"
                                        placeholder=""
                                        required
                                        onChange={field.onChange}
                                        defaultValue={user.mail}
                                        contrains="email"
                                    />
                                )}
                            />

                            <Label htmlFor="PhoneNumber">
                                Numéro de téléphone
                            </Label>
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
                                        defaultValue={user.phoneNumber}
                                        contrains="tel"

                                    />
                                )}
                            />
                        </div>
                    </div>

                    <LoadingButton loading={loading} type="submit" className="w-full">
                        Modifier
                    </LoadingButton>
                </div>
            </form>





        </Form>
    )
}
