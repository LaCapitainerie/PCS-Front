"use client"

import { cn } from "@/lib/utils";
import { User } from "@/type/User";
import { Edit, Mail, Phone } from "lucide-react";
import * as React from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import EditForm from "./Edit";

interface UpperbandProps {
    children?: React.ReactNode;
    User: User;
    token: User["token"];
    myid: User["id"];
}





const Upperband = ({ children, User, token, myid }: React.HTMLAttributes<HTMLDivElement> & UpperbandProps) => {

    const Schema = z.object({
        avatar: z.string().default(User.avatar),
        // firstName: z.string().default(User.firstName),
        // lastName: z.string().default(User.lastName),
        // nickname: z.string().default(User.nickname),
        // mail: z.string().default(User.mail),
        // phoneNumber: z.string().default(User.phoneNumber),
    })

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
    })

    const onSubmit = (data: any) => {
        console.log(data);
        // Here you can handle your form submission logic
        // For example, you can send a POST request to your server with the form data
    };

    // async function onSubmit(data: z.infer<typeof Schema>) {

    //     console.log(data);
        
    //     toast({
    //         title: "You submitted the following values:",
    //         description: (
    //             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //                 <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //             </pre>
    //         ),
    //     })

    //     form.reset()


    //     const retour: any = await (
    //         await fetch(
    //             `${process.env.NEXT_PUBLIC_API_URL}/user/management/${User.id}`,
    //             {
    //                 method: "PUT",
    //                 body: JSON.stringify(data),
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": token,
    //                 },
    //             }
    //         )
    //     ).json();
    // }

    const { register, handleSubmit } = useForm();    

    return (
        <div className="flex flex-col w-full" style={{ height: '33%' }}>
            <div className="bg-muted" style={{ height: '66%' }}></div>
            <div className="" style={{ height: '33%' }}>
                <div className="flex justify-center items-center h-full">
                    <div className="w-full flex flex-row gap-4" style={{ paddingLeft: '10%' }}>
                        <img src={User?.avatar || "https://www.366icons.com/media/01/profile-avatar-account-icon-16699.png"} alt="Avatar" className={cn("h-24 w-24 rounded-full border-4 border-primary bg-background")} style={{ width: '8rem', height: '8rem', marginTop: '-5rem' }} />

                        <div className="flex flex-col py-4">
                            <h1 className="text-3xl font-bold">{User?.lastName} {User?.firstName}</h1>
                            <p className="text-lg">{User?.description?.split("\n")[0]}</p>
                        </div>

                        <div className="flex flex-col p-4 gap-2" style={{ marginLeft: '10%' }}>
                            <div className="flex flex-row gap-4 text-center items-center"><Mail /><p className="text-sm">{User?.mail || "no mail was provided"}</p></div>
                            <div className="flex flex-row gap-4 text-center items-center"><Phone /><p className="text-sm">{User?.phoneNumber || "no phone number was provided"}</p></div>
                        </div>

                        {
                            User.id == myid ? <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Edit Profile <Edit/></Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Edit profile</DialogTitle>
                                            <DialogDescription>
                                                Make changes to your profile here. Click save when you&apos;re done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <EditForm user={User} token={token}/>
                                        </div>
                                    </DialogContent>
                                </Dialog> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
};


export default Upperband;